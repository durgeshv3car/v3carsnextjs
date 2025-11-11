"use client";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const dataSets = {
    lastMonth: [
        { name: "Week 1", revenue: 45 },
        { name: "Week 2", revenue: 55 },
        { name: "Week 3", revenue: 65 },
        { name: "Week 4", revenue: 80 },
    ],
    last6Months: [
        { name: "Jan", revenue: 45 },
        { name: "Feb", revenue: 55 },
        { name: "Mar", revenue: 75 },
        { name: "Apr", revenue: 25 },
        { name: "May", revenue: 50 },
        { name: "Jun", revenue: 110 },
    ],
    oneYear: [
        { name: "Jan", revenue: 40 },
        { name: "Mar", revenue: 60 },
        { name: "May", revenue: 75 },
        { name: "Jul", revenue: 90 },
        { name: "Sep", revenue: 55 },
        { name: "Nov", revenue: 120 },
    ],
};

export default function SalesChart() {
    const [selectedRange, setSelectedRange] =
        useState<keyof typeof dataSets>("last6Months");

    return (
        <div>
            {/* Header */}
            <h2 className="text-xl font-semibold mb-2">
                Tata Nexon Sales
            </h2>
            <p className="text-gray-400 text-sm mb-6">
                Our interactive sales graph showcases the Tata Nexon performance over
                the last 6 months, allowing you to visualize sales trends.
            </p>

            {/* Chart Card */}
            <div className="bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2e2e2e] p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-semibold">
                        Monthly Revenue
                    </h3>
                    <div className="flex space-x-2">
                        {[
                            { label: "Last Month", value: "lastMonth" },
                            { label: "Last 6 Months", value: "last6Months" },
                            { label: "1 Year", value: "oneYear" },
                        ].map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setSelectedRange(btn.value as keyof typeof dataSets)}
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
                <div className="h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataSets[selectedRange]}>
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
