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

const data = [
  { name: 'r1', b1: 1, b2: 2, b3: 3 },
  { name: 'r2', b1: 3, b2: 4, b3: 5 },
  { name: 'r3', b1: 5, b2: 6, b3: 7 },
];

export default function FuelCostBarGraph() {
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
      <div className="max-w-[1600px] mx-auto">
        <h3 className="text-[24px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Fuel Cost Graph
        </h3>

        <div className="h-[300px] md:h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
              <XAxis
                dataKey="name"
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
              <Bar dataKey="b1" fill="#1f77b4" />
              <Bar dataKey="b2" fill="#d62728" />
              <Bar dataKey="b3" fill="#f1b600" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}













