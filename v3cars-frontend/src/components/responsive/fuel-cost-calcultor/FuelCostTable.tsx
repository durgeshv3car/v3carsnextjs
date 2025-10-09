'use client';

import { useEffect, useState } from 'react';
import { FiInfo, FiEdit2 } from 'react-icons/fi';

type FuelCostInputs = {
  drivingDistance?: number;
  country?: string;
  currencySymbol?: string;
  exchangeCurrencyRate?: number;
};

interface City {
  cityId: number,
  cityName: string,
}

interface Props {
  inputs: FuelCostInputs;
  selectedCity: City & { cityId: number | undefined };
}

export default function FuelCostTable({ inputs, selectedCity }: Props) {
  const [fuelEfficiencies, setFuelEfficiencies] = useState({
    petrol: 15,
    diesel: 20,
    cng: 22,
  });

  const [fuelCosts, setFuelCosts] = useState({
    petrol: 94.77,
    diesel: 87.67,
    cng: 75.09,
  });

  const { drivingDistance = 70, country = 'India', currencySymbol = '₹', exchangeCurrencyRate } = inputs;

  // Dynamically set fuel types
  const fuelTypes: Array<'petrol' | 'diesel' | 'cng'> =
    country === 'India' ? ['petrol', 'diesel', 'cng'] : ['petrol'];

  /** 🔁 Update fuel cost based on country & exchange rate */
  useEffect(() => {
    if (country !== 'India' && exchangeCurrencyRate) {
      setFuelCosts({
        petrol: parseFloat((exchangeCurrencyRate * 95.6).toFixed(2)),
        diesel: parseFloat((exchangeCurrencyRate * 87.67).toFixed(2)),
        cng: parseFloat((exchangeCurrencyRate * 75.09).toFixed(2)),
      });
    } else {
      setFuelCosts({
        petrol: 94.77,
        diesel: 87.67,
        cng: 75.09,
      });
    }
  }, [country, exchangeCurrencyRate]);

  /** 🏙️ Fetch city-specific fuel prices */
  const handleCitySelect = async () => {
    if (!selectedCity) return;
    console.log(selectedCity);
  };

  useEffect(() => {
    handleCitySelect();
  }, [selectedCity]);

  /** ⚙️ Calculation */
  const calc = (type: 'petrol' | 'diesel' | 'cng') => {
    const kmPerUnit = fuelEfficiencies[type] || 0;
    const costPerUnit = fuelCosts[type] || 0;
    const daily = kmPerUnit > 0 ? (drivingDistance / kmPerUnit) * costPerUnit : 0;
    const monthly = daily * 30;
    const yearly = daily * 365;
    return { daily, monthly, yearly };
  };

  const s = currencySymbol;

  /** Dynamically calculate grid template based on fuelTypes */
  const gridTemplate = `2fr ${fuelTypes.map(() => '1fr').join(' ')}`;

  /** ---------- UI rendering ---------- */
  return (
    <div className="mt-8">
      <div className="hidden md:block">
        <div>
          {/* Header */}
          <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
            <div className="px-4 py-4 bg-transparent border-0" />
            {fuelTypes.includes('petrol') && <HeaderCell>{inputs.country !== "India" ? "Fuel Price" : "PETROL"}</HeaderCell>}
            {fuelTypes.includes('diesel') && <HeaderCell>DIESEL</HeaderCell>}
            {fuelTypes.includes('cng') && <HeaderCell>CNG*</HeaderCell>}
          </div>

          {/* Efficiency input */}
          <Row gridTemplate={gridTemplate}>
            <LeftCell>
              <div className="flex items-center gap-2">
                <span>Enter Fuel Efficiency (kmpl)</span>
                <FiInfo className="text-neutral-400 dark:text-neutral-500" />
              </div>
            </LeftCell>
            {fuelTypes.map((type) => (
              <RightCell key={type}>
                <NumberInput
                  value={fuelEfficiencies[type]}
                  onChange={(v) => setFuelEfficiencies({ ...fuelEfficiencies, [type]: v })}
                  suffix={type === 'cng' ? 'km/kg' : 'km/L'}
                />
              </RightCell>
            ))}
          </Row>

          {/* Fuel price per unit */}
          <Row gridTemplate={gridTemplate}>
            <LeftCell>
              <div className="flex items-start justify-between gap-4">
                <div className="font-medium">Enter Fuel Cost Per Liter</div>
                <div className="text-right">
                  {country === 'India' ? (
                    <div className="font-semibold">
                      Cost of fuel in {selectedCity?.cityName || 'your city'}{' '}
                      <button className="align-middle inline-flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                        <FiEdit2 />
                      </button>
                    </div>
                  ) : (
                    <div className="font-semibold">
                      Cost of fuel in <span className="text-yellow-500 font-normal">{country}</span>
                    </div>
                  )}
                </div>
              </div>
            </LeftCell>
            {fuelTypes.map((type) => (
              <RightCell key={type} highlight>
                <CurrencyInput
                  currency={s}
                  value={fuelCosts[type]}
                  onChange={(v) => setFuelCosts({ ...fuelCosts, [type]: v })}
                />
              </RightCell>
            ))}
          </Row>

          {/* Calculated output */}
          <Row gridTemplate={gridTemplate}>
            <LeftCell>Daily Fuel Cost</LeftCell>
            {fuelTypes.map((type) => (
              <RightCell key={type}>{formatMoney(s, calc(type).daily)}</RightCell>
            ))}
          </Row>
          <Row gridTemplate={gridTemplate}>
            <LeftCell>Monthly Fuel Cost</LeftCell>
            {fuelTypes.map((type) => (
              <RightCell key={type}>{formatMoney(s, calc(type).monthly)}</RightCell>
            ))}
          </Row>
          <Row gridTemplate={gridTemplate}>
            <LeftCell>Yearly Fuel Cost</LeftCell>
            {fuelTypes.map((type) => (
              <RightCell key={type}>{formatMoney(s, calc(type).yearly)}</RightCell>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

/* ---------- layout atoms ---------- */
function Row({ children, gridTemplate }: { children: React.ReactNode; gridTemplate?: string }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: gridTemplate || '2fr 1fr 1fr 1fr' }}>
      {children}
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-6 text-center text-sm font-semibold bg-[#F1F1F1] text-neutral-800 border border-b-0 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700">
      {children}
    </div>
  );
}

function LeftCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-5 text-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200">
      {children}
    </div>
  );
}

function RightCell({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className={[
        'px-4 py-5 text-sm flex flex-col items-center font-medium border border-neutral-200 dark:border-neutral-700',
        highlight ? 'bg-[#fff9ea] dark:bg-[#2b2412]' : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function NumberInput({ value, onChange, suffix }: { value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24 h-9 rounded-md border border-neutral-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-100"
      />
      {suffix && <span className="text-xs text-neutral-500">{suffix}</span>}
    </div>
  );
}

function CurrencyInput({ currency, value, onChange }: { currency: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center text-neutral-900 dark:text-neutral-100">
      <span className="mr-1">{currency}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-28 h-9 rounded-md border border-neutral-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-100"
      />
    </div>
  );
}

function formatMoney(sym: string, n?: number) {
  if (!n || Number.isNaN(n)) return '—';
  const formatted = n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  return `${sym} ${formatted}`;
}
