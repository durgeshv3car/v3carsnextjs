'use client'

import { useGetModelMonthlySalesQuery } from "@/redux/api/carModuleApi";
import React from "react";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { MonthlySales as MonthlySalesChart } from "../monthly-sales/SalesTable";
import { useRouter } from "next/navigation";

interface MonthlySalesProps {
    type: string
    title: string;
    slug: string;
}

const MonthlySales: React.FC<MonthlySalesProps> = ({ type, title, slug }) => {
    const router = useRouter()
    const [selectedRange, setSelectedRange] =
        useState<number>(6);
    const { data } = useGetModelMonthlySalesQuery({ model_slug: slug, months: selectedRange }, { skip: !slug })

    const chartData = (data?.rows ?? [])
        .slice()
        .reverse()
        .map((item: MonthlySalesChart) => ({
            name: item.monthKey,
            revenue: item.units,
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
                        {[
                            { label: "Last Month", value: 1 },
                            { label: "Last 6 Months", value: 6 },
                            { label: "1 Year", value: 12 }
                        ].map((range, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedRange(range.value)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium border ${selectedRange === range.value
                                    ? "bg-gray-100 border-gray-400 dark:bg-black dark:border-[#2E2E2E]"
                                    : "bg-white border-gray-300 hover:bg-gray-50 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]"
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {/* Title */}
                    <div className="text-sm mb-4">
                        <span className="font-semibold">{title}</span> Sales Performance Data
                        last updated: <span className="text-gray-400">{data?.summary?.month}</span> No. of
                        Units {data?.summary?.units}.
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" className={"-ml-7"}>
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

                {/* Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => router.push(`/${type}/${slug}/monthly-sales`)}
                    >
                        View All {title} Cars
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthlySales;
