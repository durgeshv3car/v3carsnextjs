'use client'

import React from "react";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const salesData = {
    "Last Month": [
        { name: "May", units: 100 },
        { name: "June", units: 110 },
    ],
    "Last 6 Months": [
        { name: "Jan", units: 40 },
        { name: "Feb", units: 60 },
        { name: "Mar", units: 75 },
        { name: "Apr", units: 20 },
        { name: "May", units: 50 },
        { name: "June", units: 110 },
    ],
    "1 Year": [
        { name: "Jul", units: 30 },
        { name: "Aug", units: 45 },
        { name: "Sep", units: 70 },
        { name: "Oct", units: 50 },
        { name: "Nov", units: 65 },
        { name: "Dec", units: 90 },
        { name: "Jan", units: 40 },
        { name: "Feb", units: 60 },
        { name: "Mar", units: 75 },
        { name: "Apr", units: 20 },
        { name: "May", units: 50 },
        { name: "June", units: 110 },
    ],
};

interface MonthlySalesProps {
    title: string
}

const MonthlySales: React.FC<MonthlySalesProps> = ({ title }) => {
    const [selectedRange, setSelectedRange] = useState<keyof typeof salesData>(
        "Last 6 Months"
    );

    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-semibold">Monthly Sales</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col">
                <div className="p-4">
                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-2 mb-4">
                        {(["Last Month", "Last 6 Months", "1 Year"] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setSelectedRange(range)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium border ${selectedRange === range
                                    ? "bg-gray-100 border-gray-400 dark:bg-black dark:border-[#2E2E2E]"
                                    : "bg-white border-gray-300 hover:bg-gray-50 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    {/* Title */}
                    <div className="text-sm mb-4">
                        <span className="font-semibold">Tata Nexon</span> Sales Performance Data
                        last updated: <span className="text-gray-400">05-2024</span> No. of
                        Units&gt; Units (&lt;Filter Selection&gt;)
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" className={"-ml-7"}>
                            <LineChart data={salesData[selectedRange]}>
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        fontSize: "12px",
                                        borderRadius: "6px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="units"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => alert('Downloading Nexon Brochure..')}
                    >
                        View All {title} Cars
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthlySales;
