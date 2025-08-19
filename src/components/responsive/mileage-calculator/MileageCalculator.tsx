'use client';

import { useMemo, useState } from 'react';
import { IoReload } from 'react-icons/io5';

type DistanceUnit = 'km' | 'mi';
type FuelUnit = 'ltr' | 'gal';
type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

const GALLON_TO_LITER = 3.78541;
const MILE_TO_KM = 1.60934;

export default function MileageCalculator() {
  // --- Form state
  const [distance, setDistance] = useState<string>(''); // numeric string
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');

  const [fuel, setFuel] = useState<string>(''); // numeric string
  const [fuelUnit, setFuelUnit] = useState<FuelUnit>('gal');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [totalAmount, setTotalAmount] = useState<string>(''); // numeric string

  // --- Derived
  const parsedDistance = Number(distance) || 0;
  const parsedFuel = Number(fuel) || 0;
  const parsedAmount = Number(totalAmount) || 0;

  // Normalize for internal math (km + liters)
  const distanceKm = distanceUnit === 'km' ? parsedDistance : parsedDistance * MILE_TO_KM;
  const fuelLtr = fuelUnit === 'ltr' ? parsedFuel : parsedFuel * GALLON_TO_LITER;

  // Mileage in selected display units (keep original unit choices in label)
  const mileageValue = useMemo(() => {
    if (parsedFuel <= 0 || parsedDistance <= 0) return 0;

    // Show exactly as per chosen units: distanceUnit per fuelUnit
    const top = parsedDistance; // km or mi (as selected)
    const bottom = parsedFuel; // ltr or gal (as selected)
    return top / bottom;
  }, [parsedDistance, parsedFuel, distanceUnit, fuelUnit]);

  const mileageLabel = `${distanceUnit}/${fuelUnit === 'ltr' ? 'L' : 'gal'}`.replace('km', 'km').replace('mi', 'mi');

  const costPerKm = distanceKm > 0 ? parsedAmount / distanceKm : 0;

  const resetAll = () => {
    setDistance('');
    setFuel('');
    setTotalAmount('');
    setDistanceUnit('km');
    setFuelUnit('gal');
    setCurrency('INR');
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-2 gap-5">
        {/* LEFT: Form Card */}
        <div className="rounded-xl border border-neutral-200 bg-white  dark:bg-gray-900 shadow-sm overflow-hidden">
          {/* Top Banner */}
          <div className="bg-black text-yellow-400 px-5 py-4 text-lg md:text-xl font-semibold tracking-wide">
            Mileage: {mileageValue ? mileageValue.toFixed(2) : '0.00'} {mileageLabel}
          </div>

          <div className="p-5 space-y-6 ">
            {/* Distance */}
            <div className="space-y-2 ">
              <div className="text-sm font-medium text-neutral-700 dark:text-white">Distance</div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder={`Enter Distance ${distanceUnit === 'km' ? 'Km' : 'Miles'}`}
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <UnitToggle<DistanceUnit>
                  options={[
                    { key: 'km', label: 'Km' },
                    { key: 'mi', label: 'Miles' },
                  ]}
                  value={distanceUnit}
                  onChange={setDistanceUnit}
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
                  placeholder={`Enter Fuel ${fuelUnit === 'ltr' ? 'Ltr' : 'Gal'}`}
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <UnitToggle<FuelUnit>
                  options={[
                    { key: 'ltr', label: 'Ltr' },
                    { key: 'gal', label: 'Gal' },
                  ]}
                  value={fuelUnit}
                  onChange={setFuelUnit}
                />

              </div>
            </div>
                  
            {/* Price */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-700 dark:text-white">Price</div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Today Price (Total Amount)"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full h-10 rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="h-10 rounded-lg border border-neutral-300 px-3 text-sm outline-none bg-white focus:ring-2 focus:ring-yellow-400 dark:text-black"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>AED</option>
                </select>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetAll}
              className="w-full h-11 rounded-lg bg-yellow-400 text-black font-semibold flex items-center justify-center gap-2 hover:brightness-95 active:translate-y-[1px]"
            >
              <IoReload className="text-lg" />
              RESET
            </button>
          </div>
        </div>

        {/* RIGHT: Result Table */}
        <div className="space-y-10">
          <div className="rounded-xl border border-neutral-200 bg-white dark:bg-gray-900 overflow-hidden">

            <div className="grid grid-cols-2 bg-neutral-200 dark:bg-gray-800 text-neutral-800 text-sm font-semibold  dark:text-white">

              <div className="px-4 py-3 text-2xl ">Units</div>
              <div className="px-4 py-3 text-2xl">Output</div>

            </div>

            <Row label="Distance" value={`${parsedDistance || 0} ${distanceUnit}`} />
            <Row label="Fuel" value={`${parsedFuel || 0} ${fuelUnit === 'ltr' ? 'Ltr' : 'Gal'}`} />
            <Row label="Total Amount" value={`${(parsedAmount || 0).toFixed(2)} ${currency}`} />
            <Row
              label="Fuel Cost Per Kilometer"
              value={
                distanceKm > 0
                  ? `${currencySymbol(currency)} ${costPerKm.toFixed(2)}/km`
                  : `—`
              }
            />
          </div>

          {/* Bottom Black Highlight */}
          <div className="rounded-xl bg-black text-white px-6 py-5">
            <div className="text-lg font-semibold">Mileage</div>
            <div className="text-3xl md:text-5xl font-extrabold tracking-wide mt-1">
              {mileageValue ? mileageValue.toFixed(2) : '0.00'} {mileageLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Small UI helpers ----------------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 border-t border-neutral-200 dark:text-white">
      <div className="px-4 py-3 text-lg text-neutral-600 dark:text-white">{label}</div>
      <div className="px-4 py-3 text-lg font-medium">{value}</div>
    </div>
  );
}

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
    <div className="flex items-center rounded-full border border-neutral-300 px-1 h-10">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`px-3 h-8 rounded-full text-sm font-medium transition ${
              active ? 'bg-yellow-400 text-black' : 'text-neutral-600 hover:bg-neutral-100'
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
