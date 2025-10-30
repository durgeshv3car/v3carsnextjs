'use client'

import Link from "next/link";
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
    updatedAt: string;
}

interface StateWiseFuelListProps {
    data: FuelPrice[];
    type: string;
}

function toSlug(name: string) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const StateWiseFuelList = ({ type, data }: StateWiseFuelListProps) => {
    const [showAll, setShowAll] = useState(false);

    const isAllFuel = type === "Fuel";
    const visibleData = showAll ? data : data.slice(0, 20);

    return (
        <div className="space-y-4">
            {/* Heading */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <h1 className="text-2xl">State-wise List For {type} Price</h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">STATE</th>
                            {(isAllFuel || type === "Petrol") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">PETROL</th>
                            )}
                            {(isAllFuel || type === "Diesel") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">DIESEL</th>
                            )}
                            {(isAllFuel || type === "CNG") && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">CNG</th>
                            )}
                            {!isAllFuel && (
                                <th className="px-4 py-2 font-semibold min-w-[200px]">CHANGE</th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="border border-gray-200 dark:border-[#2E2E2E]">
                        {visibleData.map((row) => (
                            <tr
                                key={row.stateId}
                                className="even:bg-transparent odd:bg-gray-50 dark:odd:bg-[#171717]"
                            >
                                <td className="p-4 border dark:border-[#2E2E2E] cursor-pointer hover:underline">
                                    <Link
                                        href={
                                            type === "Fuel" ? 
                                            `/${toSlug(row.stateName)}/petrol-price`
                                            :
                                            `/${toSlug(row.stateName)}/${type.toLowerCase()}-price`
                                        }
                                    >
                                        {row.stateName}
                                    </Link>
                                </td>

                                {(isAllFuel || type === "Petrol") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.petrol ?? "0"}</td>
                                )}
                                {(isAllFuel || type === "Diesel") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.diesel ?? "0"}</td>
                                )}
                                {(isAllFuel || type === "CNG") && (
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.cng ?? "0"}</td>
                                )}

                                {type === "Petrol" && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.petrol === null || row.petrolPrev === null
                                                ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                : row.petrol > row.petrolPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : row.petrol < row.petrolPrev
                                                        ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                        : "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                }`}
                                        >
                                            {row.petrolChange ?? "0"}
                                        </div>
                                    </td>
                                )}

                                {type === "Diesel" && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.diesel === null || row.dieselPrev === null
                                                ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                : row.diesel > row.dieselPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : row.diesel < row.dieselPrev
                                                        ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                        : "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                }`}
                                        >
                                            {row.dieselChange ?? "0"}
                                        </div>
                                    </td>
                                )}

                                {type === "CNG" && (
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div
                                            className={`px-4 py-1 rounded w-fit ${row.cng === null || row.cngPrev === null
                                                ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                : row.cng > row.cngPrev
                                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                                    : row.cng < row.cngPrev
                                                        ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                        : "bg-green-200 text-green-700 dark:bg-green-900/30"
                                                }`}
                                        >
                                            {row.cngChange ?? "0"}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View More Button */}
            {data.length > 10 && !showAll && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                        View All States Diesel Prices
                    </button>
                </div>
            )}
        </div>
    );
};

export default StateWiseFuelList;
