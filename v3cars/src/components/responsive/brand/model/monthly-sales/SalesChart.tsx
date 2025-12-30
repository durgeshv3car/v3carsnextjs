"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { MonthlySalesResponse, MonthlySales } from "./SalesTable";

interface SalesChartProps {
    title: string;
    data: MonthlySalesResponse | undefined;
    selectedRange: number;
    setSelectedRange: (value: number) => void;
}

export default function SalesChart({
    title,
    data,
    selectedRange,
    setSelectedRange,
}: SalesChartProps) {

    // Convert API rows → chart-ready format
    const chartData = (data?.rows ?? [])
        .slice()                   // copy array
        .reverse()                 // latest month first
        .map((item: MonthlySales) => ({
            name: item.month,      // X-axis value
            revenue: item.units,   // Y-axis value
        }));

    // Apply selected range
    const filteredData =
        selectedRange === 1
            ? chartData.slice(-1)
            : selectedRange === 6
                ? chartData.slice(-6)
                : selectedRange === 12
                    ? chartData.slice(-12)
                    : chartData;

    return (
        <div>
            {/* Header */}
            <h2 className="text-xl font-semibold mb-2">{title} Sales Figures</h2>

            <p className="text-gray-400 text-sm mb-6">
                Track the monthly sales performance of {title} over the last{" "}
                {data?.total ?? 0} months.
            </p>

            {/* CHART CARD */}
            <div className="bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2e2e2e] p-5">

                {/* Range Buttons */}
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h3 className="text-md font-semibold">Monthly Revenue</h3>

                    <div className="flex space-x-2">
                        {[
                            { label: "Last Month", value: 1 },
                            { label: "Last 6 Months", value: 6 },
                            { label: "1 Year", value: 12 }
                        ].map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setSelectedRange(btn.value)}
                                className={`px-3 py-1.5 text-sm rounded-md border transition ${selectedRange === btn.value
                                    ? "bg-gray-100 dark:bg-[#292929] dark:border-[#2e2e2e]"
                                    : "bg-white dark:bg-[#171717] border-gray-300 hover:bg-gray-100 hover:dark:bg-[#292929] dark:border-[#2e2e2e]"
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div className="h-[300px] md:h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
