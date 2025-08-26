"use client";
import React, { useState } from "react";
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

const StateWiseFuelChart: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"Petrol" | "Diesel" | "CNG">(
        "Petrol"
    );

    const data = [
        { date: "Sep, 10", delhi: 94.72, chennai: 100.86, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 11", delhi: 94.72, chennai: 100.78, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 12", delhi: 94.72, chennai: 100.82, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 13", delhi: 94.72, chennai: 101.00, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 14", delhi: 94.72, chennai: 100.90, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 15", delhi: 94.72, chennai: 100.75, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 16", delhi: 94.72, chennai: 100.70, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 17", delhi: 94.72, chennai: 100.72, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 18", delhi: 94.72, chennai: 100.75, mumbai: 103.44, kolkata: 104.95 },
        { date: "Sep, 19", delhi: 94.72, chennai: 100.80, mumbai: 103.44, kolkata: 104.95 },
    ];

    return (
        <div className=" space-y-4">
            {/* Title & Description */}
            <h1 className="text-2xl text-center font-semibold">
                State-wise List For Fuel Price
            </h1>
            <p className="text-center text-sm">
                This chart provides a comprehensive view of fuel price fluctuations in India’s four major metro cities:
                Delhi, Chennai, Mumbai, and Kolkata.
                The data spans the last 10 days (as of Sep 19, 2024), allowing you to track the trends for petrol, diesel,
                and CNG prices.
            </p>

            {/* Tabs */}
            <div>
                <div className="flex justify-center border dark:border-[#2E2E2E] rounded-t-xl">
                    {["Petrol", "Diesel", "CNG"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`flex-1 py-2 font-medium border-b-2 dark:border-[#2E2E2E] ${activeTab === tab
                                    ? "border-yellow-400 dark:border-yellow-400 text-black dark:text-white font-semibold"
                                    : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Chart */}
                <div className="border border-t-0 rounded-b-xl pt-10 pb-4 dark:border-[#2E2E2E]">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={data} margin={{ top: 0, right: 30, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[94, 106]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="delhi" stroke="#ff4f81" name="New Delhi" />
                            <Line type="monotone" dataKey="chennai" stroke="#00bcd4" name="Chennai" />
                            <Line type="monotone" dataKey="mumbai" stroke="#ffca28" name="Mumbai" />
                            <Line type="monotone" dataKey="kolkata" stroke="#8bc34a" name="Kolkata" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StateWiseFuelChart;
