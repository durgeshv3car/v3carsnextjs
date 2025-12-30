"use client";

import React, { useState, useEffect } from "react";
import { FaCar, FaTruck } from "react-icons/fa";
import { RiMotorbikeLine } from "react-icons/ri";

interface FuelCalculatorUIProps {
    onInputChange: (data: FuelCostInputs) => void;
}

interface FuelCostInputs {
    vehicle?: string;
    fuel?: string;
    distance?: string;
    volume?: string;
}

export default function FuelCalculatorUI({ onInputChange }: FuelCalculatorUIProps) {
    const [vehicle, setVehicle] = useState<string>("car");
    const [fuel, setFuel] = useState<string>("petrol");
    const [distance, setDistance] = useState<string>("km");
    const [volume, setVolume] = useState<string>("ltr");

    // 🔥 Every time any input changes → send data to parent
    useEffect(() => {
        onInputChange({
            vehicle,
            fuel,
            distance,
            volume,
        });
    }, [vehicle, fuel, distance, volume]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

            {/* Vehicle Type */}
            <div className="col-span-1 border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">
                <p className="text-sm mb-3">Vehicle Type</p>

                <div className="flex gap-2">
                    {VehicleType.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setVehicle(item.name.toLowerCase())}
                            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-1
                                ${
                                    vehicle === item.name.toLowerCase()
                                        ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                                        : "bg-gray-100 dark:bg-[#232323] border-gray-300 hover:bg-gray-200 dark:border-[#2e2e2e]"
                                }
                            `}
                        >
                            {item.icon} {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Fuel Type */}
            <div className="col-span-1 border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">
                <p className="text-sm mb-3">Fuel Type</p>

                <div className="flex gap-2">
                    {FuelType.map((item) => (
                        <button
                            key={item}
                            onClick={() => setFuel(item.toLowerCase())}
                            className={`px-4 py-2 rounded-lg border transition-all
                                ${
                                    fuel === item.toLowerCase()
                                        ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                                        : "bg-gray-100 dark:bg-[#232323] border-gray-300 hover:bg-gray-200 dark:border-[#2e2e2e]"
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Distance + Volume */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center justify-between border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">

                {/* Distance */}
                <div>
                    <p className="text-sm mb-3">Distance</p>

                    <div className="flex flex-wrap gap-2">
                        {Distance.map((item) => (
                            <button
                                key={item.unit}
                                onClick={() => setDistance(item.unit)}
                                className={`px-4 py-2 rounded-lg border transition-all
                                    ${
                                        distance === item.unit
                                            ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                                            : "bg-gray-100 dark:bg-[#232323] border-gray-300 hover:bg-gray-200 dark:border-[#2e2e2e]"
                                    }
                                `}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Volume */}
                <div>
                    <p className="text-sm mb-3">Volume</p>

                    <div className="flex flex-wrap gap-2">
                        {Volume.map((item) => (
                            <button
                                key={item.unit}
                                onClick={() => setVolume(item.unit)}
                                className={`px-4 py-2 rounded-lg border transition-all
                                    ${
                                        volume === item.unit
                                            ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                                            : "bg-gray-100 dark:bg-[#232323] border-gray-300 hover:bg-gray-200 dark:border-[#2e2e2e]"
                                    }
                                `}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

const VehicleType = [
    { name: "Car", icon: <FaCar /> },
    { name: "Bike", icon: <RiMotorbikeLine /> },
    { name: "Other", icon: <FaTruck /> },
];

const FuelType = ["Petrol", "Diesel", "CNG", "Electric"];
const Distance = [
    {
        name: "Kilometre",
        unit: "km"
    },
    {
        name: "Miles",
        unit: "mi"
    },
];
const Volume = [
    {
        name: "Liter",
        unit: "ltr"
    },
    {
        name: "Gallon",
        unit: "gal"
    },
];
