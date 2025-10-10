'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useGetCountriesQuery } from '@/redux/api/locationModuleApi';

export type DistanceUnit = 'km' | 'mi';
export type Period = 'daily' | 'monthly' | 'yearly';
export type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

interface Country {
  countryId: number;
  countryName: string;
  pincodeLength: number;
  countryCurrency: string;
  currencySymbol: string;
  distanceCalcOption: number;
  currencyRate: number | null;
  fuelUnitOption: number;
  isActive: number;
  exchangeCurrencyRate: number;
  countryCode: string;
}

interface TopControlsProps {
  onInputChange: (data: Record<string, unknown>) => void;
}

export default function TopControls({ onInputChange }: TopControlsProps) {
  const [query, setQuery] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const { data: countriesData } = useGetCountriesQuery({ query }, { skip: !query } );
  const countries = countriesData?.rows ?? [];

  const [drivingDistance, setDrivingDistance] = useState<number>(70);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [period, setPeriod] = useState<Period>('daily');
  const [distanceValue, setDistanceValue] = useState<number>(70);

  // ✅ Initialize selectedCountry
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const defaultCountry = countries.find((c: Country) => c.countryName === 'India');
    return (
      defaultCountry || {
        countryName: "India",
        countryCurrency: 'INR',
        currencySymbol: '₹',
        exchangeCurrencyRate: 1,
        countryId: 226,
      }
    );
  });

  const filteredCountries =
    query.length >= 2
      ? countries.filter((c: Country) =>
        c.countryName.toLowerCase().includes(query.toLowerCase())
      )
      : [];

  // ✅ Country selection handler
  const handleCountryChange = (selectedOption: Country) => {
    setQuery("")
    setOpenModel(false)
    setSelectedCountry(selectedOption);
    onInputChange({
      country: selectedOption.countryName,
      currencySymbol: selectedOption.currencySymbol,
      exchangeCurrencyRate: selectedOption.exchangeCurrencyRate,
      drivingDistance,
      countryId: selectedOption.countryId,
    });
  };

  // ✅ Distance unit change + conversion
  const handleDistanceUnitChange = (unit: DistanceUnit) => {
    if (unit === distanceUnit) return;
    const conversionFactor = 0.621371; // 1 km = 0.621371 miles
    const newDistance =
      unit === 'mi'
        ? drivingDistance * conversionFactor
        : drivingDistance / conversionFactor;

    setDistanceUnit(unit);
    setDrivingDistance(newDistance);
    setDistanceValue(newDistance);
    onInputChange({ drivingDistance: newDistance, distanceUnit: unit });
  };

  // ✅ Period (daily/monthly/yearly) calculation logic
  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);

    let newDistance = 70; // base daily distance

    if (newPeriod === 'daily') newDistance = drivingDistance;
    if (newPeriod === 'monthly') newDistance = drivingDistance * 30;
    if (newPeriod === 'yearly') newDistance = drivingDistance * 365;

    setDistanceValue(newDistance);
    onInputChange({ period: newPeriod, drivingDistance: newDistance });
  };

  // ✅ Manual input change
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setDistanceValue(value);
      onInputChange({ drivingDistance: value });
    }
  };

  return (
    <div className="relative z-0 bg-gray-100 dark:bg-black">
      {/* skyline */}
      <Image
        src="/fuel-cost-calculator/topbar.png"
        alt="buildings"
        width={1920}
        height={360}
        className="w-full h-[190px] md:h-[300px] pointer-events-none select-none z-0"
        priority
      />

      {/* cars */}
      <Image
        src="/fuel-cost-calculator/fuel-cars.png"
        alt="cars"
        width={820}
        height={320}
        className="hidden md:block absolute right-10 -top-28 h-[330px] w-auto pointer-events-none select-none z-0"
        priority
      />

      {/* dark control strip */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="w-full text-white">
          <div className="w-full lg:app-container mx-auto px-4 lg:px-10">
            {/* Country Dropdown */}
            <div className="relative shrink-0 rounded-t-xl bg-[#171717] dark:text-black text-white min-w-[240px] border border-[#262626] w-[10%] transition-all duration-300 ease-in-out">
              {/* Header / Toggle */}
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none text-white"
                onClick={() => setOpenModel(!openModel)}
              >
                <label className="block">
                  {selectedCountry.countryName || "Country"}
                </label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-4 transform transition-transform duration-300 ${openModel ? "rotate-180" : "rotate-0"
                    }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              {/* Dropdown panel with smooth animation */}
              <div
                className={`absolute z-20 w-full bg-[#171717] rounded-b-lg border border-[#2E2E2E] overflow-hidden transition-all duration-300 ease-in-out origin-top ${openModel
                  ? "max-h-[300px] opacity-100 scale-y-100"
                  : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                  }`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full border-b border-[#2E2E2E] p-3 focus:outline-none bg-transparent text-white"
                />

                <div className="transition-opacity duration-300 ease-in-out">
                  {query.length < 2 && (
                    <p className="text-sm p-3 text-gray-300 italic">
                      Please enter 2 or more characters
                    </p>
                  )}

                  {query.length >= 2 && (
                    <ul className="max-h-40 overflow-y-auto bg-[#171717] overflow-hidden text-white">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country: Country, index: number) => (
                          <li
                            key={index}
                            className="p-3 hover:bg-[#2E2E2E] cursor-pointer border-b border-[#2E2E2E] transition-colors duration-200"
                            onClick={() => handleCountryChange(country)}
                          >
                            {country?.countryName}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="w-full bg-[#171717] px-4 lg:px-10">
            <div className="w-full lg:app-container mx-auto px-4 flex gap-0 lg:px-0 py-3 space-x-28 overflow-hidden">
              {/* Currency */}
              <div className="w-[10%]">
                <div className="mt-3 text-[12px] text-[#ffd84d] font-semibold">Currency</div>
                <div className="mt-1 flex items-center">
                  <div className="inline-flex items-center gap-2 bg-[#ffd84d] text-black text-sm rounded-md px-2 py-1">
                    <span>{selectedCountry.currencySymbol}</span>
                    <span>{selectedCountry.countryCurrency}</span>
                  </div>
                </div>
              </div>

              {/* Distance Unit */}
              <Group title="Distance Unit" divider>
                <Radio
                  label="Kilometre"
                  checked={distanceUnit === 'km'}
                  onClick={() => handleDistanceUnitChange('km')}
                />
                <Radio
                  label="Miles"
                  checked={distanceUnit === 'mi'}
                  onClick={() => handleDistanceUnitChange('mi')}
                />
              </Group>

              {/* Quantity */}
              <Group title="Quantity" divider>
                <Radio label="Liter" checked readOnly />
                <Radio label="Gallon" checked={false} readOnly />
              </Group>

              {/* Driving Distance (Period) */}
              <Group title="Driving Distance" divider>
                <Radio
                  label="Daily"
                  checked={period === 'daily'}
                  onClick={() => handlePeriodChange('daily')}
                />
                <Radio
                  label="Monthly"
                  checked={period === 'monthly'}
                  onClick={() => handlePeriodChange('monthly')}
                />
                <Radio
                  label="Yearly"
                  checked={period === 'yearly'}
                  onClick={() => handlePeriodChange('yearly')}
                />
              </Group>

              {/* Distance Value Input */}
              <div className="shrink-0 ml-4 bg-[#0b0d10] rounded-xl pl-4 pr-2 py-3 min-w-[160px] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase opacity-70 tracking-wide">
                    {period.toUpperCase()}
                  </div>
                  <input
                    type="number"
                    className="text-2xl bg-transparent focus:outline-none focus:ring-0"
                    value={distanceValue}
                    onChange={handleDistanceChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- small atoms ----------------- */

function Group({
  title,
  children,
  divider,
}: {
  title: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div
      className={[
        'shrink-0 px-5',
        divider ? 'border-l border-white/15 ml-4' : '',
        'flex flex-col justify-center',
      ].join(' ')}
    >
      <div className="text-[12px] font-semibold text-[#ffd84d] mb-1.5">{title}</div>
      <div className="flex items-center gap-6">{children}</div>
    </div>
  );
}

function Radio({
  label,
  checked,
  onClick,
  readOnly,
}: {
  label: string;
  checked: boolean;
  onClick?: () => void;
  readOnly?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={readOnly ? undefined : onClick}
      className={`inline-flex items-center gap-2 text-sm ${readOnly ? 'cursor-default opacity-70' : 'hover:opacity-90'
        }`}
    >
      <span
        className={`relative inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border ${checked ? 'border-white' : 'border-white/40'
          }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
