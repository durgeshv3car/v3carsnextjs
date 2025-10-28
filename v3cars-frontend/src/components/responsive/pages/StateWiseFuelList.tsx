'use client'

import React, { useState, useEffect } from "react";

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
    updatedAt: string;
}

interface StateWiseFuelListProps {
    data: FuelPrice[];
    type: string;
}

const StateWiseFuelList = ({ type, data }: StateWiseFuelListProps) => {
    const [activeTab, setActiveTab] = useState(type);

    // ✅ update activeTab if prop "type" changes dynamically
    useEffect(() => {
        setActiveTab(type);
    }, [type]);

    const showAll = activeTab === "Fuel";

    return (
        <div className="space-y-4">
            {/* Heading & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <h1 className="text-2xl">State-wise List For {type} Price</h1>

                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E] overflow-hidden">
                    {["Petrol", "Diesel", "CNG"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as "Petrol" | "Diesel" | "CNG")}
                            className={`font-semibold px-6 py-2 transition-colors duration-200
                                ${activeTab === tab
                                    ? "bg-yellow-400 text-white dark:bg-yellow-500"
                                    : "bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
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
                            {(showAll || activeTab === "Petrol") && <th className="px-4 py-2 font-semibold min-w-[200px]">PETROL</th>}
                            {(showAll || activeTab === "Diesel") && <th className="px-4 py-2 font-semibold min-w-[200px]">DIESEL</th>}
                            {(showAll || activeTab === "CNG") && <th className="px-4 py-2 font-semibold min-w-[200px]">CNG</th>}
                            {(!showAll) && <th className="px-4 py-2 font-semibold min-w-[200px]">CHANGE</th>}
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

                                {(activeTab === "Petrol") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${
                                                row.petrol === null || row.petrolPrev === null
                                                    ? ""
                                                    : row.petrol > row.petrolPrev
                                                    ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                    : row.petrol < row.petrolPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : "bg-gray-200 text-gray-700 dark:bg-gray-800"
                                            }`}
                                        >
                                            {row.petrolChange ?? "N/A"}
                                        </div>
                                    </td>
                                )}

                                {(activeTab === "Diesel") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${
                                                row.diesel === null || row.dieselPrev === null
                                                    ? ""
                                                    : row.diesel > row.dieselPrev
                                                    ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                    : row.diesel < row.dieselPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : "bg-gray-200 text-gray-700 dark:bg-gray-800"
                                            }`}
                                        >
                                            {row.dieselChange ?? "N/A"}
                                        </div>
                                    </td>
                                )}

                                {(activeTab === "CNG") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${
                                                row.cng === null || row.cngPrev === null
                                                    ? ""
                                                    : row.cng > row.cngPrev
                                                    ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                    : row.cng < row.cngPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : "bg-gray-200 text-gray-700 dark:bg-gray-800"
                                            }`}
                                        >
                                            {row.cngChange ?? "N/A"}
                                        </div>
                                    </td>
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
