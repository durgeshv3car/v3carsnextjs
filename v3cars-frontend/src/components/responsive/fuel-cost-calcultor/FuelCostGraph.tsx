'use client';

import { useGet10DaysFuelPriceQuery } from "@/redux/api/fuelModuleApi";
import React, { useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

/* ----------------------------- TYPES ----------------------------- */

const fuelTypes = ["petrol", "diesel", "cng"] as const;

type FuelType = typeof fuelTypes[number];

interface City {
    cityId: number;
    cityName: string;
}

interface FuelCostGraphProps {
    districtId: number;
    selectedCity?: City | null;
}

interface FuelPriceDay {
    day: string;
    petrol: number;
    petrolChange: number | null;
    diesel: number;
    dieselChange: number | null;
    cng: number;
    cngChange: number | null;
}

/* ----------------------------- COMPONENT ----------------------------- */

export default function FuelCostGraph({ districtId, selectedCity }: FuelCostGraphProps) {
    const { data: apiData } = useGet10DaysFuelPriceQuery({ districtId });

    const [fuelData, setFuelData] = useState<FuelPriceDay[]>([]);
    const [activeTab, setActiveTab] = useState<FuelType>("petrol");
    const [chartData, setChartData] = useState<{ date: string; price: number }[]>([]);

    /* ---------------- Transform API data into interface structure ---------------- */

    useEffect(() => {
        if (!apiData?.rows) return;

        const formatted: FuelPriceDay[] = apiData.rows.map((item: any) => ({
            day: item.day,
            petrol: item.petrol,
            petrolChange: item.petrolChange ?? null,
            diesel: item.diesel,
            dieselChange: item.dieselChange ?? null,
            cng: item.cng,
            cngChange: item.cngChange ?? null,
        }));

        setFuelData(formatted);
    }, [apiData]);

    /* ---------------- Convert interface data into chart data ---------------- */

    useEffect(() => {
        if (!fuelData.length) return;

        const transformed = fuelData
            .map((row) => ({
                date: new Date(row.day).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                }),
                price: row[activeTab], // pick the correct fuel rate dynamically
            }))
            .reverse(); // oldest first

        setChartData(transformed);
    }, [fuelData, activeTab]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Fuel Cost Graph</h2>

            <div className="w-full bg-white rounded-xl shadow-sm dark:bg-[#171717]">
                {/* Header */}
                <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-[#232323] rounded-t-lg p-4 gap-2">
                    <div className="flex md:flex-col items-center justify-between md:justify-center w-full">
                        <h3 className="font-semibold capitalize">{activeTab} Price Trend</h3>
                        <p className="text-xs text-gray-400">Last 10 Days | {selectedCity?.cityName}</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2">
                        {fuelTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveTab(type)}
                                className={`flex items-center px-4 py-2 rounded-md border uppercase ${activeTab === type
                                    ? "bg-yellow-400 border-yellow-500 text-gray-900"
                                    : "bg-white dark:bg-[#171717] dark:border-[#2e2e2e]"
                                    }`}
                            >
                                {activeTab === type && <IoIosCheckmark size={24} />}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <div className="h-[400px] md:h-[600px] py-4">
                    <ResponsiveContainer width="100%" height="100%" className={"pr-4"}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#e0e0e0" />
                            <XAxis dataKey="date" />
                            <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#3cb4c7"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
