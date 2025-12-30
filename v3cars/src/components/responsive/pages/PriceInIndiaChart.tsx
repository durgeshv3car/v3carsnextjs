"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface FuelHistory {
    day: string;
    price: number;
}

interface FuelData {
    history: FuelHistory[];
}

interface CityFuelData {
    districtId: number;
    cityName: string;
    stateId: number;
    stateName: string;
    petrol: FuelData;
    diesel: FuelData;
    cng: FuelData;
}

interface PriceInIndiaChartProps {
    data: CityFuelData[];
    type: string; // "Fuel" | "Petrol" | "Diesel" | "CNG"
}

interface FuelEntry {
    date: string;
    [cityName: string]: string | number | undefined;
}

const cityColors: Record<string, string> = {
    "new delhi": "#ef4444",
    mumbai: "#facc15",
    chennai: "#3b82f6",
    kolkata: "#84cc16",
};

const PriceInIndiaChart: React.FC<PriceInIndiaChartProps> = ({ data, type }) => {
    const [activeTab, setActiveTab] = useState<"Petrol" | "Diesel" | "CNG">("Petrol");

    useEffect(() => {
        if (type !== "Fuel") {
            setActiveTab(type as "Petrol" | "Diesel" | "CNG");
        }
    }, [type]);

    const chartData = useMemo(() => {
        if (!data.length) return [];

        const keyMap: Record<"Petrol" | "Diesel" | "CNG", "petrol" | "diesel" | "cng"> = {
            Petrol: "petrol",
            Diesel: "diesel",
            CNG: "cng",
        };

        const fuelKey = keyMap[activeTab];
        const dates = data[0][fuelKey]?.history.map((h: FuelHistory) => h.day);
        if (!dates) return [];

        return dates.map((date, index) => {
            const entry: FuelEntry = { date };

            data.forEach((city) => {
                const cityFuel = city[fuelKey];
                if (cityFuel?.history?.[index]) {
                    entry[city.cityName.toLowerCase()] = cityFuel.history[index].price;
                }
            });

            return entry;
        });
    }, [data, activeTab]);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl">
                <span className=" capitalize">{type === "Fuel" ? "Fuel" : type}</span> Price in India Chart
            </h1>
            <p className="text-sm">
                This chart provides a comprehensive view of petrol price fluctuations in India&apos;s four major metro cities: Delhi, Chennai, Mumbai, and Kolkata.{" "}
                The data spans the last 10 days (as of Oct 30, 2025), allowing you to track the trends for{" "}
                {
                    type === "Fuel" ?
                        "petrol, diesel, and CNG"
                        :
                        type
                }{" "}
                prices.
            </p>

            {/* Tabs (show only if type === "Fuel") */}
            <div>
                {type === "Fuel" && (
                    <div className="flex justify-center border dark:border-[#2E2E2E] rounded-t-xl">
                        {["Petrol", "Diesel", "CNG"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as typeof activeTab)}
                                className={`flex-1 py-2 font-medium border-b-2 ${activeTab === tab
                                    ? "border-primary text-black dark:text-white font-semibold"
                                    : "text-gray-500 dark:border-[#2E2E2E]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {/* Chart */}
                <div
                    className={`border ${type === "Fuel" ? "border-t-0 rounded-b-xl" : "rounded-xl"} pt-10 pb-4 dark:border-[#2E2E2E]`}
                >
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                domain={[
                                    (dataMin: number) => Math.floor(dataMin - 1),
                                    (dataMax: number) => Math.ceil(dataMax + 1),
                                ]}
                            />
                            <Tooltip />
                            <Legend />
                            {data.map((city, index) => {
                                const hue = (index * 60) % 360;
                                const color =
                                    cityColors[city.cityName.toLowerCase()] || `hsl(${hue}, 70%, 50%)`;

                                return (
                                    <Line
                                        key={city.cityName}
                                        type="monotone"
                                        dataKey={city.cityName.toLowerCase()}
                                        name={city.cityName}
                                        stroke={color}
                                        strokeWidth={2.5}
                                        dot={{ r: 2 }}
                                        activeDot={{ r: 4 }}
                                    />
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PriceInIndiaChart;
