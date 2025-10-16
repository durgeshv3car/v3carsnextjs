'use client'

import React, { useState } from "react";

interface FuelPrice {
    stateId: number;
    stateName: string;
    petrol: number | null;
    petrolPrev: number | null;
    petrolChange: number | null;
    diesel: number | null;
    dieselPrev: number | null;
    dieselChange: number | null;
    cng: number | null;
    cngPrev: number | null;
    cngChange: number | null;
    updatedAt: string; // ISO date string
}

interface StateWiseFuelListProps {
    data: FuelPrice[]
}

const StateWiseFuelList = ({ data }: StateWiseFuelListProps) => {
    const [activeTab, setActiveTab] = useState<"Petrol" | "Diesel" | "CNG" | null>(null);
    
    // Decide which columns to show
    const showAll = activeTab === null;

    return (
        <div className="space-y-4">
            {/* Heading & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <h1 className="text-2xl">State-wise List For Fuel Price</h1>

                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E]">
                    {["Petrol", "Diesel", "CNG"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`font-semibold px-6 py-2 ${activeTab === tab ? "text-black dark:text-white" : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">STATE</th>
                            {(showAll || activeTab === "Petrol") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">PETROL</th>
                            )}
                            {(showAll || activeTab === "Diesel") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">DIESEL</th>
                            )}
                            {(showAll || activeTab === "CNG") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">CNG</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="border border-gray-200 dark:border-[#2E2E2E]">
                        {data.map((row) => (
                            <tr
                                key={row.stateId}
                                className="even:bg-transparent odd:bg-gray-50 dark:odd:bg-[#171717]"
                            >
                                <td className="p-4 border dark:border-[#2E2E2E]">{row.stateName}</td>

                                {(showAll || activeTab === "Petrol") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.petrol ?? "N/A"}</td>
                                )}
                                {(showAll || activeTab === "Diesel") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.diesel ?? "N/A"}</td>
                                )}
                                {(showAll || activeTab === "CNG") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.cng ?? "N/A"}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StateWiseFuelList;
