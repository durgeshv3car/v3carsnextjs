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

    const showAll = type === "Fuel";

    return (
        <div className="space-y-4">
            {/* Heading & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <h1 className="text-2xl">State-wise List For {type} Price</h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">STATE</th>
                            {(showAll || type === "Petrol") && <th className="px-4 py-2 font-semibold min-w-[200px]">PETROL</th>}
                            {(showAll || type === "Diesel") && <th className="px-4 py-2 font-semibold min-w-[200px]">DIESEL</th>}
                            {(showAll || type === "CNG") && <th className="px-4 py-2 font-semibold min-w-[200px]">CNG</th>}
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

                                {(showAll || type === "Petrol") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.petrol ?? "N/A"}</td>
                                )}
                                {(showAll || type === "Diesel") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.diesel ?? "N/A"}</td>
                                )}
                                {(showAll || type === "CNG") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.cng ?? "N/A"}</td>
                                )}

                                {(type === "Petrol") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.petrol === null || row.petrolPrev === null
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

                                {(type === "Diesel") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.diesel === null || row.dieselPrev === null
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

                                {(type === "CNG") && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.cng === null || row.cngPrev === null
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
