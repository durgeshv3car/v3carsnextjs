'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';
import { useGet10DaysFuelPriceQuery } from '@/redux/api/fuelModuleApi';

interface Props {
  districtId: number;
}

interface FuelPriceDay {
  day: string;             // e.g., "2025-09-27"
  petrol: number;          
  petrolChange: number | null;
  diesel: number;
  dieselChange: number | null;
  cng: number;
  cngChange: number | null;
}

export default function FuelCostBarGraph({ districtId }: Props) {
  const { data: apiData } = useGet10DaysFuelPriceQuery({ districtId });
  const [fuelData, setFuelData] = useState<FuelPriceDay[]>([]);

  /** Transform API data to chart data */
  useEffect(() => {
    if (!apiData?.rows) return;

    const transformed: FuelPriceDay[] = apiData.rows
      .map((row: FuelPriceDay) => ({
        ...row,
        day: new Date(row.day).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      }))
      .reverse(); // show oldest first

    setFuelData(transformed);
  }, [apiData]);

  return (
    <div
      className="
        px-4 mt-10 lg:px-10
        bg-[var(--panel)]
        [--panel:#F6F6F6] dark:[--panel:#0f0f0f]
        [--axis:#1f2937] dark:[--axis:#e5e7eb]
        [--grid:rgba(0,0,0,0.12)] dark:[--grid:rgba(255,255,255,0.12)]
        [--legend:#111827] dark:[--legend:#e5e7eb]
        [--tooltip-bg:#ffffff] dark:[--tooltip-bg:#111827]
        [--tooltip-border:#e5e7eb] dark:[--tooltip-border:#374151]
        [--tooltip-text:#111827] dark:[--tooltip-text:#e5e7eb]
      "
    >
      <div className="app-container mx-auto">
        <h3 className="text-[24px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Fuel Cost Graph
        </h3>

        <div className="h-[300px] md:h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={fuelData}
              margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
              <XAxis
                dataKey="day"
                stroke="var(--axis)"
                tick={{ fill: 'var(--axis)' }}
                tickLine={{ stroke: 'var(--axis)' }}
                axisLine={{ stroke: 'var(--axis)' }}
                label={{
                  value: 'Regions by feature property value',
                  position: 'bottom',
                  offset: 10,
                  style: { fill: 'var(--axis)', fontWeight: 600 },
                }}
              />
              <YAxis
                stroke="var(--axis)"
                tick={{ fill: 'var(--axis)' }}
                tickLine={{ stroke: 'var(--axis)' }}
                axisLine={{ stroke: 'var(--axis)' }}
                label={{
                  value: 'Series reduction value',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'var(--axis)', fontWeight: 600 },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  borderColor: 'var(--tooltip-border)',
                  color: 'var(--tooltip-text)',
                }}
                labelStyle={{ color: 'var(--tooltip-text)' }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 10, color: 'var(--legend)' }}
              />
              <Bar dataKey="petrol" fill="#1f77b4" name="Petrol" />
              <Bar dataKey="diesel" fill="#d62728" name="Diesel" />
              <Bar dataKey="cng" fill="#f1b600" name="CNG" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
