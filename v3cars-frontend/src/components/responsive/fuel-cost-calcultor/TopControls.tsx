'use client';

import Image from 'next/image';
import { FiChevronDown, FiEdit2 } from 'react-icons/fi';

export type DistanceUnit = 'km' | 'mi';
export type Period = 'daily' | 'monthly' | 'yearly';
export type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

export default function TopControls({
  country, setCountry,
  currency, setCurrency,
  distanceUnit, setDistanceUnit,
  period, setPeriod,
  distanceValue, setDistanceValue,
}: {
  country: string; setCountry: (v: string) => void;
  currency: Currency; setCurrency: (v: Currency) => void;
  distanceUnit: DistanceUnit; setDistanceUnit: (v: DistanceUnit) => void;
  period: Period; setPeriod: (v: Period) => void;
  distanceValue: number; setDistanceValue: (v: number) => void;
}) {
  return (
    <div className="relative z-0 bg-gray-100 dark:bg-black">{/* ensure this stack is below header */}
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
        <div className="w-full  text-white">
          <div className="w-full lg:app-container mx-auto px-4 lg:px-10">
            {/* LEFT: Select Country block */}
            <div className="shrink-0 rounded-t-xl px-4 py-3 min-w-[240px] mr-4 bg-black dark:bg-[#171717] border dark:border-[#262626] w-[10%]">
              <div className="text-[13px] font-semibold">Select Country</div>
              <button
                type="button"
                className="mt-1 flex w-full items-center justify-between text-sm"
                onClick={()=>{setCountry("India")}}
              >
                <span className="truncate">{country}</span>
                <FiChevronDown className="opacity-80" />
              </button>
            </div>
          </div>

          <div className="w-full bg-[#171717] px-4 lg:px-10">
            <div className="app-container mx-auto px-4 flex items-stretch gap-0 lg:px-0 py-3 overflow-x-auto space-x-28">
              <div className="w-[10%]">
                <div className="mt-3 text-[12px] text-[#ffd84d] font-semibold">Currency</div>
                <div className="mt-1 flex items-center">
                  <div className="inline-flex items-center gap-2 bg-[#ffd84d] text-black text-xs rounded-md px-2 py-1">
                    <span>{symbol(currency)}</span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="bg-transparent outline-none"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="AED">AED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Currency unit */}
              <Group title="Currency" divider>
                <Radio label="Kilometre" checked={distanceUnit === 'km'} onClick={() => setDistanceUnit('km')} />
                <Radio label="Miles" checked={distanceUnit === 'mi'} onClick={() => setDistanceUnit('mi')} />
              </Group>

              {/* Quantity (display only) */}
              <Group title="Quantity" divider>
                <Radio label="Liter" checked readOnly />
                <Radio label="Gallon" checked={false} readOnly />
              </Group>

              {/* Driving Distance */}
              <Group title="Driving Distance" divider>
                <Radio label="Daily" checked={period === 'daily'} onClick={() => setPeriod('daily')} />
                <Radio label="Monthly" checked={period === 'monthly'} onClick={() => setPeriod('monthly')} />
                <Radio label="Yearly" checked={period === 'yearly'} onClick={() => setPeriod('yearly')} />
              </Group>

              {/* RIGHT: value pill */}
              <div className="shrink-0 ml-4 bg-[#0b0d10] rounded-xl pl-4 pr-2 py-3 min-w-[160px] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase opacity-70 tracking-wide">{period.toUpperCase()}</div>
                  <div className="text-2xl font-semibold leading-none">{distanceValue}</div>
                </div>
                <button
                  onClick={() => {
                    const v = prompt(`Enter ${period} distance (${distanceUnit})`, String(distanceValue));
                    if (!v) return;
                    const n = Number(v);
                    if (!Number.isNaN(n) && n >= 0) setDistanceValue(n);
                  }}
                  className="inline-flex items-center gap-1 text-sm border border-white/20 rounded-md px-3 py-1 hover:bg-white/10"
                >
                  <FiEdit2 className="text-[14px]" /> Edit
                </button>
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
      className={`inline-flex items-center gap-2 text-sm ${readOnly ? 'cursor-default opacity-70' : 'hover:opacity-90'}`}
    >
      <span className={`relative inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border ${checked ? 'border-white' : 'border-white/40'}`}>
        {checked && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export const symbol = (c: Currency) =>
  c === 'INR' ? '₹' : c === 'USD' ? '$' : c === 'EUR' ? '€' : 'د.إ';
