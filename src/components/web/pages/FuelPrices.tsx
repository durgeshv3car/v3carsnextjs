'use client'

import React, { useState } from "react";

const FuelPrices = () => {
    const [activeTab, setActiveTab] = useState<"Petrol" | "Diesel" | "CNG">("Petrol");

    const fuelData = [
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0, negative: true },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0, negative: true },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0, negative: true },
        { city: "New Delhi", price: 87.62, change: 0.0 },
        { city: "New Delhi", price: 87.62, change: 0.0, negative: true },
        { city: "New Delhi", price: 87.62, change: 0.0 },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className=" flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                    <h1 className="text-2xl">Fuel Prices In Metro Cities</h1>
                    <div className="flex items-center gap-1 mt-2 text-black">
                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">
                            THU
                        </span>
                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">
                            19
                        </span>
                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">
                            SEP
                        </span>
                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">
                            2024
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E]">
                    {["Petrol", "Diesel", "CNG"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`font-semibold px-6 py-2 ${activeTab === tab
                                ? "text-black dark:text-white"
                                : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fuelData.map((item, idx) => (
                    <div
                        key={idx}
                        className={`p-4 rounded-lg border ${item.negative
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-semibold text-black">{item.city}</h2>
                            <span
                                className={`text-sm font-bold text-white px-2 py-0.5 rounded ${item.negative
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                    }`}
                            >
                                {item.change.toFixed(2)}
                            </span>
                        </div>
                        <div className={`text-xs font-bold text-gray-500 ${item.negative ? "text-red-600" : "text-green-600"}`}>PETROL</div>
                        <div
                            className={`text-2xl font-bold ${item.negative ? "text-red-600" : "text-green-600"
                                }`}
                        >
                            ₹ {item.price.toFixed(2)}{" "}
                            <span className={`text-lg ${item.negative ? "text-red-600" : "text-green-600"}`}>L</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FuelPrices;
