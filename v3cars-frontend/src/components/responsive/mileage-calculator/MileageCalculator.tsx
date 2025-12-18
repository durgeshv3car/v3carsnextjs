'use client';

import { useGetLatestFuelPriceQuery } from '@/redux/api/fuelModuleApi';
import { RootState } from '@/redux/store';
import { useState, useEffect } from 'react';
import { IoReload } from 'react-icons/io5';
import { useSelector } from 'react-redux';

// --- Types ---
type DistanceUnit = 'km' | 'mi';
type FuelUnit = 'ltr' | 'gal';
type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

type LatestFuelPriceType = {
  scope: string;
  stateId: number;
  stateName: string;
  districtId: number;
  cityName: string;
  price: number;
  prevPrice: number;
  change: number;
  updatedAt: string;
};

// --- Constants ---
const kmToMiles = 1.60934; 
const literToGallon = 3.78541;
const exchangeRates = { INR: 1, USD: 0.012, EUR: 0.011, AED: 0.044 };

// --- Helpers ---
function currencySymbol(c: Currency) {
  switch (c) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'AED':
      return 'د.إ';
    default:
      return '';
  }
}

// --- Unit Toggle Component ---
function UnitToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center rounded-full border dark:border-[#2E2E2E] px-1 h-10">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`px-3 h-8 rounded-full text-sm font-medium transition ${active ? 'bg-primary text-black' : 'text-neutral-600 dark:hover:bg-black'
              }`}
            type="button"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function MileageCalculator() {
  const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

  const { data: LatestFuelPriceData } = useGetLatestFuelPriceQuery({ districtId: Number(selectedCity?.cityId) });
  const latestFuelPrice = (LatestFuelPriceData?.data ?? null) as LatestFuelPriceType | null;

  // --- State ---
  const [distance, setDistance] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');

  const [fuel, setFuel] = useState<string>('');
  const [fuelUnit, setFuelUnit] = useState<FuelUnit>('ltr');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [cityPrice, setCityPrice] = useState<number | null>(null);

  const [mileage, setMileage] = useState<number>(0);
  const [costPerKm, setCostPerKm] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // --- Auto-load latest fuel price ---
  useEffect(() => {
    if (latestFuelPrice?.price) {
      setCityPrice(latestFuelPrice.price);
    }
  }, [latestFuelPrice]);

  const convertUnit = (
    value: number,
    from: DistanceUnit | FuelUnit,
    to: DistanceUnit | FuelUnit
  ) => {
    if (!value) return value;
    if (from === 'km' && to === 'mi') return value * kmToMiles;
    if (from === 'mi' && to === 'km') return value / kmToMiles;
    if (from === 'ltr' && to === 'gal') return value * literToGallon;
    if (from === 'gal' && to === 'ltr') return value / literToGallon;
    return value;
  };

  // --- Calculation Logic ---
  const calculateMileage = (
    distVal = distance,
    fuelVal = fuel,
    priceVal = cityPrice,
    currVal = currency
  ) => {
    const distNum = Number(distVal);
    const fuelNum = Number(fuelVal);
    const priceNum = Number(priceVal);

    console.log(currVal);
    

    if (distNum > 0 && fuelNum > 0 && priceNum > 0) {
      // Base conversions
      const distKm = distanceUnit === "mi" ? distNum * kmToMiles : distNum;
      const fuelLtr = fuelUnit === "gal" ? fuelNum * literToGallon : fuelNum;

      // Mileage according to selected unit
      let mileageCalc = 0;

      if (distanceUnit === "km" && fuelUnit === "ltr") {
        mileageCalc = distNum / fuelNum; // km per litre
      }
      else if (distanceUnit === "mi" && fuelUnit === "gal") {
        mileageCalc = distNum / fuelNum; // miles per gallon
      }
      else if (distanceUnit === "km" && fuelUnit === "gal") {
        mileageCalc = distNum / fuelNum; // km per gallon
      }
      else if (distanceUnit === "mi" && fuelUnit === "ltr") {
        mileageCalc = distNum / fuelNum; // miles per litre
      }

      // Total price (always using litre base)
      const totalPriceCalc = fuelLtr * priceNum;

      // Cost per km (base)
      const costPerKmCalc = totalPriceCalc / distKm;

      setMileage(Number(mileageCalc.toFixed(2)));
      setTotalPrice(Number(totalPriceCalc.toFixed(2)));
      setCostPerKm(Number(costPerKmCalc.toFixed(2)));
    } else {
      setMileage(0);
      setTotalPrice(0);
      setCostPerKm(0);
    }
  };


  // --- Input Handlers ---
  const handleDistanceChange = (val: string) => {
    setDistance(val);
    calculateMileage(val, fuel, cityPrice, currency);
  };

  const handleFuelChange = (val: string) => {
    setFuel(val);
    calculateMileage(distance, val, cityPrice, currency);
  };

  const handleAmountChange = (val: string) => {
    const num = val === '' ? null : Number(val);
    setCityPrice(num);
    calculateMileage(distance, fuel, num, currency);
  };

  const handleCurrencyChange = (val: Currency) => {
    if (cityPrice == null) return;
    const converted = (cityPrice / exchangeRates[currency]) * exchangeRates[val];
    setCurrency(val);
    setCityPrice(Number(converted.toFixed(2)));
    calculateMileage(distance, fuel, Number(converted.toFixed(2)), val);
  };

  const handleDistanceUnitChange = (newUnit: DistanceUnit) => {
    const convertedDistance = convertUnit(Number(distance), distanceUnit, newUnit).toFixed(2);
    setDistanceUnit(newUnit);
    setDistance(convertedDistance);
    calculateMileage(convertedDistance, fuel, cityPrice, currency);
  };

  const handleFuelUnitChange = (newUnit: FuelUnit) => {
    const convertedFuel = convertUnit(Number(fuel), fuelUnit, newUnit).toFixed(2);
    setFuelUnit(newUnit);
    setFuel(convertedFuel);
    calculateMileage(distance, convertedFuel, cityPrice, currency);
  };

  const handleReset = () => {
    setDistance('');
    setFuel('');
    setCityPrice(latestFuelPrice?.price ?? null);
    setDistanceUnit('km');
    setFuelUnit('ltr');
    setCurrency('INR');
    setMileage(0);
    setCostPerKm(0);
    setTotalPrice(0);
  };

  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="w-full lg:app-container mx-auto">
        <div className="grid lg:grid-cols-2 gap-5">
          {/* LEFT CARD */}
          <div className="rounded-xl border dark:border-[#2E2E2E] bg-white dark:bg-[#171717] shadow-sm overflow-hidden">
            <div className="bg-black text-primary px-5 py-4 text-lg md:text-xl font-semibold tracking-wide">
              Mileage: {mileage.toFixed(2)} {distanceUnit}/{fuelUnit === 'ltr' ? 'L' : 'Gal'}
            </div>

            <div className="p-5 space-y-6">
              {/* Distance */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-neutral-700 dark:text-white">Distance</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder={`Enter Distance (${distanceUnit})`}
                    value={distance}
                    onChange={(e) => handleDistanceChange(e.target.value)}
                    className="w-full h-10 rounded-lg border dark:border-[#2E2E2E] bg-white dark:bg-[#171717] px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <UnitToggle<DistanceUnit>
                    options={[
                      { key: 'km', label: 'Km' },
                      { key: 'mi', label: 'Miles' },
                    ]}
                    value={distanceUnit}
                    onChange={handleDistanceUnitChange}
                  />
                </div>
              </div>

              {/* Fuel */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-neutral-700 dark:text-white">Fuel</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder={`Enter Fuel (${fuelUnit})`}
                    value={fuel}
                    onChange={(e) => handleFuelChange(e.target.value)}
                    className="w-full h-10 rounded-lg border dark:border-[#2E2E2E] bg-white dark:bg-[#171717] px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <UnitToggle<FuelUnit>
                    options={[
                      { key: 'ltr', label: 'Ltr' },
                      { key: 'gal', label: 'Gal' },
                    ]}
                    value={fuelUnit}
                    onChange={handleFuelUnitChange}
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-neutral-700 dark:text-white">Total Amount</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Total Amount"
                    value={cityPrice ?? ''}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full h-10 rounded-lg border dark:border-[#2E2E2E] bg-white dark:bg-[#171717] px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <select
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
                    className="h-10 rounded-lg border dark:border-[#2E2E2E] bg-white dark:bg-[#171717] px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>AED</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full h-11 rounded-lg bg-primary text-black font-semibold flex items-center justify-center gap-2 hover:brightness-95 active:translate-y-[1px]"
              >
                <IoReload className="text-lg" />
                RESET
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="space-y-10">
            <div className="rounded-xl border dark:border-[#2E2E2E] dark:bg-[#171717] overflow-hidden">
              <div className="grid grid-cols-2 bg-neutral-200 dark:bg-black text-neutral-800 text-sm font-semibold dark:text-white">
                <div className="px-4 py-3 text-2xl ">Units</div>
                <div className="px-4 py-3 text-2xl">Output</div>
              </div>

              <Row label="Distance" value={`${distance || 0} ${distanceUnit}`} />
              <Row label="Fuel" value={`${fuel || 0} ${fuelUnit}`} />
              <Row
                label="Total Amount"
                value={`${currencySymbol(currency)} ${totalPrice ?? 0} ${currency}`}
              />
              <Row
                label="Fuel Cost Per"
                value={`${currencySymbol(currency)} ${costPerKm} / ${distanceUnit}`}
              />
            </div>

            <div className="rounded-xl bg-black text-white border dark:border-[#2E2E2E] px-6 py-5">
              <div className="text-lg font-semibold">Mileage</div>
              <div className="text-3xl md:text-5xl font-extrabold tracking-wide mt-1">
                {mileage} {distanceUnit}/{fuelUnit === 'ltr' ? 'L' : 'Gal'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Row helper ---
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 border-t dark:border-[#2E2E2E] dark:text-white">
      <div className="px-4 py-3 text-lg text-neutral-600 dark:text-white">{label}</div>
      <div className="px-4 py-3 text-lg font-medium">{value}</div>
    </div>
  );
}
