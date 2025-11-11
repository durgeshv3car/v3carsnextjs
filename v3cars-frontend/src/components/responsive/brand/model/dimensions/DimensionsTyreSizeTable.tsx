'use client'

import React, { useState } from "react";

const DimensionsTyreSizeTable = () => {
    const [fuelType, setFuelType] = useState("Petrol");
    const [transmission, setTransmission] = useState("Manual");

    const fuelOptions = ["Petrol", "CNG", "Diesel", "Hybrid"];
    const transmissionOptions = ["Manual", "Automatic"];

    const tyreData = [
        { variant: "Smart", tyre: "215/55 R15" },
        { variant: "Smart +", tyre: "215/55 R15" },
        { variant: "Pure +", tyre: "215/55 R15" },
        { variant: "Pure + S", tyre: "215/55 R15" },
    ];

    return (
        <div>
            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-3">
                Tata Nexon Tyre Size by Variant
            </h2>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
                See the stock tyre size for every Nexon variant with section width,
                profile, rim size and spare tyre detail. The base variant uses 195/60 R16
                while the top variant gets 215/60 R16. Larger wheels can sharpen steering
                feel and high-speed stability yet may firm up the ride and add a small
                penalty to acceleration and braking due to extra rotational mass. Use this
                table to verify OEM fitment so you can pick the right replacement.
            </p>

            <div className="border rounded-xl dark:border-[#2e2e2e]">
                {/* Filter Buttons */}
                <div className="flex flex-wrap items-center gap-3 p-2">
                    {/* Fuel Type Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {fuelOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setFuelType(option)}
                                className={`px-4 py-1.5 text-sm rounded-md border transition-all ${fuelType === option
                                    ? "bg-slate-50 dark:border-[#2E2E2E] dark:bg-[#171717]"
                                    : "bg-white dark:bg-[#2E2E2E] dark:border-[#292929] hover:bg-gray-200 dark:hover:bg-[#292929]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Transmission Buttons */}
                    <div className="flex flex-wrap gap-2 ml-auto">
                        {transmissionOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setTransmission(option)}
                                className={`px-4 py-1.5 text-sm rounded-md border transition-all ${transmission === option
                                    ? "bg-slate-50 dark:border-[#2E2E2E] dark:bg-[#171717]"
                                    : "bg-white dark:bg-[#2E2E2E] dark:border-[#292929] hover:bg-gray-200 dark:hover:bg-[#292929]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tyre Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 dark:bg-[#171717]">
                            <tr>
                                <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                    Nexon Variant
                                </th>
                                <th className="px-4 py-3">
                                    Tyre Size
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tyreData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white dark:bg-[#292929]" : ""}`}
                                >
                                    <td className="px-4 py-2 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                        {item.variant}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.tyre}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DimensionsTyreSizeTable;
