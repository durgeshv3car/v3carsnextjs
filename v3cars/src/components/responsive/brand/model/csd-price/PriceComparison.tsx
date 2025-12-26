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
            </div>

            <p className="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="font-semibold">Tata Nexon Civilian Ex-showroom vs CSD Price</span>
                <span className="text-xs">Last Updated : 24/10/2025</span>
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
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse text-sm text-left">
                        <thead>
                            <tr className="bg-[#DEE2E6] border border-gray-200 dark:bg-[#171717] dark:border-[#2e2e2e] text-nowrap">
                                <th className="p-3 font-semibold border-r border-gray-300 dark:border-[#2e2e2e]">Variants</th>
                                <th className="p-3 font-semibold border-r border-gray-300 dark:border-[#2e2e2e] text-center">Civilian Ex-showroom</th>
                                <th className="p-3 font-semibold border-r border-gray-300 dark:border-[#2e2e2e] text-center">Difference</th>
                                <th className="p-3 font-semibold text-center">CSD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {variants.map((variant, index) => (
                                <tr
                                    key={index}
                                    className="bg-white dark:bg-[#232323] border-t border-gray-200 hover:bg-gray-50 transition dark:hover:bg-[#292929] dark:border-[#2e2e2e] text-nowrap"
                                >
                                    <td className="py-3 px-3 border-r border-gray-300 dark:border-[#2e2e2e]">
                                        <p className="font-medium">{variant.name}</p>
                                        <p className="text-xs ">{variant.engine}</p>
                                    </td>
                                    <td className="py-3 px-3 border-r border-gray-300 dark:border-[#2e2e2e] text-center">{variant.exShowroom}</td>
                                    <td className="py-3 px-3 border-r border-gray-300 dark:border-[#2e2e2e] text-center">{variant.difference}</td>
                                    <td className="py-3 px-3 text-center">{variant.csd}</td>
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
