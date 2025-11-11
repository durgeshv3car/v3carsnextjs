'use client'

import React, { useState } from "react";

const PriceComparison: React.FC = () => {
    const [fuelType, setFuelType] = useState("Petrol");
    const [transmission, setTransmission] = useState("Manual");

    const fuelTypes = ["Petrol", "CNG", "Diesel", "Hybrid"];
    const transmissions = ["Manual", "Automatic"];

    const variants = [
        {
            name: "Nexon Pure Plus",
            engine: "1199 cc, Petrol, Manual",
            exShowroom: "₹7,99,000",
            difference: "−₹10,000 (−1.25%)",
            csd: "₹7,89,000",
        },
        {
            name: "Nexon Pure Plus",
            engine: "1199 cc, Petrol, Manual",
            exShowroom: "₹7,99,000",
            difference: "−₹10,000 (−1.25%)",
            csd: "₹7,89,000",
        },
        {
            name: "Nexon Pure Plus",
            engine: "1199 cc, Petrol, Manual",
            exShowroom: "₹7,99,000",
            difference: "−₹10,000 (−1.25%)",
            csd: "₹7,89,000",
        },
        {
            name: "Nexon Pure Plus",
            engine: "1199 cc, Petrol, Manual",
            exShowroom: "₹7,99,000",
            difference: "−₹10,000 (−1.25%)",
            csd: "₹7,89,000",
        },
        {
            name: "Nexon Pure Plus",
            engine: "1199 cc, Petrol, Manual",
            exShowroom: "₹7,99,000",
            difference: "−₹10,000 (−1.25%)",
            csd: "₹7,89,000",
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Tata Nexon - Civilian Ex-showroom vs CSD Price
                    </h2>
                    <p className="text-sm text-gray-400">
                        Compare civilian ex-showroom with CSD for each variant to understand base price difference.
                    </p>
                </div>
                <p className="text-xs">Last Updated : 24/10/2025</p>
            </div>

            <p className="font-semibold mb-3">
                Tata Nexon Civilian Ex-showroom vs CSD Price
            </p>

            {/* Tabs Section */}
            <div className="border rounded-xl dark:border-[#2e2e2e]">
            <div className="flex flex-wrap gap-2 m-2">
                {fuelTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setFuelType(type)}
                        className={`px-4 py-2 text-sm rounded-md border ${fuelType === type
                                ? "bg-gray-100 border-gray-400 dark:bg-[#171717] dark:border-[#2e2e2e]"
                                : "bg-white dark:bg-[#171717] dark:border-[#2e2e2e] hover:dark:bg-[#292929] hover:bg-slate-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}

                {transmissions.map((type) => (
                    <button
                        key={type}
                        onClick={() => setTransmission(type)}
                        className={`px-4 py-2 text-sm rounded-md border ${transmission === type
                                ? "bg-gray-100 border-gray-400 dark:bg-[#171717] dark:border-[#2e2e2e]"
                                : "bg-white dark:bg-[#171717] dark:border-[#2e2e2e] hover:dark:bg-[#292929] hover:bg-slate-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm text-left">
                    <thead>
                        <tr className="bg-gray-100 border border-gray-200 dark:bg-[#171717] dark:border-[#2e2e2e]">
                            <th className="p-4 font-semibold">Variants</th>
                            <th className="p-4 font-semibold">Civilian Ex-showroom</th>
                            <th className="p-4 font-semibold">Difference</th>
                            <th className="p-4 font-semibold">CSD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((variant, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-200 hover:bg-gray-50 transition dark:hover:bg-[#292929] dark:border-[#2e2e2e]"
                            >
                                <td className="py-3 px-3">
                                    <p className="font-medium">{variant.name}</p>
                                    <p className="text-xs ">{variant.engine}</p>
                                </td>
                                <td className="py-3 px-3">{variant.exShowroom}</td>
                                <td className="py-3 px-3">{variant.difference}</td>
                                <td className="py-3 px-3">{variant.csd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default PriceComparison;
