'use client';

import { FiInfo, FiEdit2 } from 'react-icons/fi';
import { Currency, symbol, DistanceUnit, Period } from './TopControls';

const DAYS = { daily: 1, monthly: 30, yearly: 365 };

export default function FuelCostTable({
  currency,
  distanceUnit,
  period,
  distanceValue,
  prices,
  setPrices,
  efficiencies,
  setEfficiencies,
}: {
  currency: Currency;
  distanceUnit: DistanceUnit;
  period: Period;
  distanceValue: number;
  prices: { petrol: number; diesel: number; cng: number };
  setPrices: (p: { petrol: number; diesel: number; cng: number }) => void;
  efficiencies: { petrol: number; diesel: number; cng: number }; // km/L or km/kg
  setEfficiencies: (e: { petrol: number; diesel: number; cng: number }) => void;
}) {
  const s = symbol(currency);
  const dailyDistanceKm = toKmPerDay(distanceValue, period, distanceUnit);

  const calc = (type: 'petrol' | 'diesel' | 'cng') => {
    const kmPerUnit = efficiencies[type] || 0;
    const unitNeeded = kmPerUnit > 0 ? dailyDistanceKm / kmPerUnit : 0;
    const costPerUnit = prices[type] || 0;
    const daily = unitNeeded * costPerUnit;
    const monthly = daily * DAYS.monthly;
    const yearly = daily * DAYS.yearly;
    return { unitNeeded, costPerUnit, daily, monthly, yearly };
  };

  const petrol = calc('petrol');
  const diesel = calc('diesel');
  const cng = calc('cng');

  /** ---------- MOBILE CARDS (md:hidden) ---------- */
  const mobileCards: Array<{
    key: 'petrol' | 'diesel' | 'cng';
    title: string;
    suffix: string;
    unit: 'L' | 'kg';
    data: ReturnType<typeof calc>;
  }> = [
    { key: 'petrol', title: 'PETROL', suffix: 'km/L', unit: 'L', data: petrol },
    { key: 'diesel', title: 'DIESEL', suffix: 'km/L', unit: 'L', data: diesel },
    { key: 'cng', title: 'CNG*', suffix: 'km/kg', unit: 'kg', data: cng },
  ];

  return (
    <div className="mt-8">
      {/* --------- Mobile layout: stacked cards --------- */}
      <div className="md:hidden space-y-4">
        {/* City + edit (shared info) */}
        <div className="rounded-xl border border-neutral-200 bg-white dark:bg-[#171717] dark:border-neutral-700 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              Fuel Prices (Per Unit)
            </div>
            <div className="text-right">
              <div className="text-[13px] font-semibold text-neutral-800 dark:text-neutral-100">
                Cost of fuel in Saharanpur{' '}
                <button className="align-middle inline-flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                  <FiEdit2 />
                </button>
              </div>
              <div className="text-[11px] text-neutral-500">last updated on 17.09.2024</div>
            </div>
          </div>
        </div>

        {mobileCards.map((card) => (
          <div
            key={card.key}
            className="rounded-xl border border-neutral-200 bg-white dark:bg-[#171717] dark:border-neutral-700 overflow-hidden"
          >
            {/* Card header */}
            <div className="px-4 py-3 text-sm font-semibold bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100">
              {card.title}
            </div>

            {/* Efficiency */}
            <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Enter Fuel Efficiency
                </span>
                <FiInfo className="text-neutral-400 dark:text-neutral-500" />
              </div>
              <NumberInput
                value={efficiencies[card.key]}
                onChange={(v) => setEfficiencies({ ...efficiencies, [card.key]: v })}
                suffix={card.suffix}
              />
            </div>

            {/* Price per unit (highlight) */}
            <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-[#fff9ea] dark:bg-[#2b2412]">
              <div className="text-xs mb-2 text-neutral-700 dark:text-neutral-200">
                Enter Fuel Cost Per Unit
              </div>
              <CurrencyInput
                currency={s}
                value={prices[card.key]}
                onChange={(v) => setPrices({ ...prices, [card.key]: v })}
              />
            </div>

            {/* Calculations */}
            <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
              <MobileRow
                label={`Quantity Needed (${periodLabel(period)})`}
                value={
                  card.data.unitNeeded ? `${card.data.unitNeeded.toFixed(2)} ${card.unit}` : '—'
                }
              />
              <MobileRow label="Daily Fuel Cost" value={formatMoney(s, card.data.daily)} />
              <MobileRow label="Monthly Fuel Cost" value={formatMoney(s, card.data.monthly)} />
              <MobileRow label="Yearly Fuel Cost" value={formatMoney(s, card.data.yearly)} />
            </div>

            {/* Footnote for CNG */}
            {card.key === 'cng' && (
              <div className="px-4 pb-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                * CNG efficiency is in km/kg.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --------- Desktop/Tablet layout: original table --------- */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:bg-[#171717] dark:border-neutral-700">
          {/* header row (first col = empty, no box/border) */}
          <div className="grid [grid-template-columns:2fr_1fr_1fr_1fr]">
            <div className="px-4 py-4 bg-transparent border-0" />
            <HeaderCell>PETROL</HeaderCell>
            <HeaderCell>DIESEL</HeaderCell>
            <HeaderCell>CNG*</HeaderCell>
          </div>

          {/* efficiency input */}
          <Row>
            <LeftCell>
              <div className="flex items-center gap-2">
                <span>Enter Fuel Efficiency (kmpl)</span>
                <FiInfo className="text-neutral-400 dark:text-neutral-500" />
              </div>
            </LeftCell>
            <RightCell>
              <NumberInput
                value={efficiencies.petrol}
                onChange={(v) => setEfficiencies({ ...efficiencies, petrol: v })}
                suffix="km/L"
              />
            </RightCell>
            <RightCell>
              <NumberInput
                value={efficiencies.diesel}
                onChange={(v) => setEfficiencies({ ...efficiencies, diesel: v })}
                suffix="km/L"
              />
            </RightCell>
            <RightCell>
              <NumberInput
                value={efficiencies.cng}
                onChange={(v) => setEfficiencies({ ...efficiencies, cng: v })}
                suffix="km/kg"
              />
            </RightCell>
          </Row>

          {/* price per unit (highlight only on right cells) */}
          <Row>
            <LeftCell>
              <div className="flex items-start justify-between gap-4">
                <div className="font-medium">Enter Fuel Cost Per Liter</div>

                <div className="text-right">
                  <div className="text-[13px] font-semibold">
                    Cost of fuel in Saharanpur{' '}
                    <button className="align-middle inline-flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-300">
                      <FiEdit2 />
                    </button>
                  </div>
                  <div className="text-[11px] text-neutral-500">last updated on 17.09.2024</div>
                </div>
              </div>
            </LeftCell>

            <RightCell highlight>
              <CurrencyInput
                currency={s}
                value={prices.petrol}
                onChange={(v) => setPrices({ ...prices, petrol: v })}
              />
            </RightCell>
            <RightCell highlight>
              <CurrencyInput
                currency={s}
                value={prices.diesel}
                onChange={(v) => setPrices({ ...prices, diesel: v })}
              />
            </RightCell>
            <RightCell highlight>
              <CurrencyInput
                currency={s}
                value={prices.cng}
                onChange={(v) => setPrices({ ...prices, cng: v })}
              />
            </RightCell>
          </Row>

          {/* quantity */}
          <Row>
            <LeftCell>Quantity Needed ({periodLabel(period)})</LeftCell>
            <RightCell>{petrol.unitNeeded ? petrol.unitNeeded.toFixed(2) + ' L' : '—'}</RightCell>
            <RightCell>{diesel.unitNeeded ? diesel.unitNeeded.toFixed(2) + ' L' : '—'}</RightCell>
            <RightCell>{cng.unitNeeded ? cng.unitNeeded.toFixed(2) + ' kg' : '—'}</RightCell>
          </Row>

          {/* daily */}
          <Row>
            <LeftCell>Daily Fuel Cost</LeftCell>
            <RightCell>{formatMoney(s, petrol.daily)}</RightCell>
            <RightCell>{formatMoney(s, diesel.daily)}</RightCell>
            <RightCell>{formatMoney(s, cng.daily)}</RightCell>
          </Row>

          {/* monthly */}
          <Row>
            <LeftCell>Monthly Fuel Cost</LeftCell>
            <RightCell>{formatMoney(s, petrol.monthly)}</RightCell>
            <RightCell>{formatMoney(s, diesel.monthly)}</RightCell>
            <RightCell>{formatMoney(s, cng.monthly)}</RightCell>
          </Row>

          {/* yearly */}
          <Row noBorder>
            <LeftCell>Yearly Fuel Cost</LeftCell>
            <RightCell>{formatMoney(s, petrol.yearly)}</RightCell>
            <RightCell>{formatMoney(s, diesel.yearly)}</RightCell>
            <RightCell>{formatMoney(s, cng.yearly)}</RightCell>
          </Row>
        </div>
      </div>
    </div>
  );
}

/* ---------- layout atoms (first col wider, clean borders) ---------- */

function Row({
  children,
  noBorder,
}: {
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div
      className={[
        'grid [grid-template-columns:2fr_1fr_1fr_1fr]',
        noBorder ? '' : 'border-t border-neutral-200 dark:border-neutral-700',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-4 text-sm font-semibold bg-neutral-100 text-neutral-800 border-b border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700">
      {children}
    </div>
  );
}

function LeftCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-5 text-sm text-neutral-700 dark:text-neutral-200">
      {children}
    </div>
  );
}

function RightCell({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        'px-4 py-5 text-sm font-medium border-l border-neutral-200 dark:border-neutral-700',
        highlight ? 'bg-[#fff9ea] dark:bg-[#2b2412]' : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

/* ---------- MOBILE helpers ---------- */

function MobileRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-neutral-600 dark:text-neutral-300">{label}</div>
      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{value}</div>
    </div>
  );
}

/* ---------- inputs ---------- */

function NumberInput({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 h-9 rounded-md border border-neutral-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-100"
      />
      {suffix && <span className="text-xs text-neutral-500 dark:text-neutral-400">{suffix}</span>}
    </div>
  );
}

function CurrencyInput({
  currency,
  value,
  onChange,
}: {
  currency: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center text-neutral-900 dark:text-neutral-100">
      <span className="mr-1">{currency}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 h-9 rounded-md border border-neutral-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-100"
      />
    </div>
  );
}

/* ---------- utils ---------- */

function periodLabel(p: Period) {
  return p === 'daily' ? 'per day' : p === 'monthly' ? 'per month' : 'per year';
}

// deterministic Indian-numbering formatting to avoid SSR/CSR mismatch
function formatMoney(sym: string, n?: number) {
  if (!n || Number.isNaN(n)) return '—';
  const formatted = formatNumberIndian(Math.round(n));
  return `${sym} ${formatted}`;
}

function formatNumberIndian(num: number) {
  const sign = num < 0 ? '-' : '';
  const str = Math.abs(num).toString();
  if (str.length <= 3) return sign + str;
  const lastThree = str.slice(-3);
  const other = str.slice(0, -3);
  const withCommas = other.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return sign + withCommas + ',' + lastThree;
}

function toKmPerDay(value: number, p: Period, unit: DistanceUnit) {
  const perDay = p === 'daily' ? value : p === 'monthly' ? value / 30 : value / 365;
  const km = unit === 'km' ? perDay : perDay * 1.60934;
  return km;
}
