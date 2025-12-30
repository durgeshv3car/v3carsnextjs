'use client'

import { convertToSlug } from "@/utils/helperFunction";
import Link from "next/link";
import React, { useState } from "react";

interface CityFuelPrice {
    districtId: number;
    cityName: string;
    stateId: number;
    price: number;
    prevPrice: number;
    change: number;
    updatedAt: string; // ISO date string
}

interface CityWiseFuelListProps {
    data: CityFuelPrice[];
    type: string;
    slug: string;
}

const CityWiseFuelList = ({ type, data, slug }: CityWiseFuelListProps) => {
    const [showAll, setShowAll] = useState(false);

    const visibleData = showAll ? data : data.slice(0, 10);

    return (
        <div className="space-y-4">
            {/* Heading */}
            <div className="">
                <h1 className="text-2xl mb-2">
                    City-wise List For {type} Price
                </h1>
                <p className="text-sm">Fuel rates can differ significantly between cities, even within the same state. By selecting a state, you can explore city-wise petrol prices, including metro areas, tier-2 cities and key districts.This detailed view helps you:
                    Compare petrol price</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">CITY</th>
                            <th className="px-4 py-2 font-semibold min-w-[200px] uppercase">
                                {type} PRICE
                            </th>
                            {/* <th className="px-4 py-2 font-semibold min-w-[200px]">CHANGE</th> */}
                        </tr>
                    </thead>

                    <tbody className="border border-gray-200 dark:border-[#2E2E2E]">
                        {visibleData.map((row) => {
                            // const isIncrease = row.change > 0;
                            // const isDecrease = row.change < 0;

                            // const changeClass = isIncrease
                            //     ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                            //     : isDecrease
                            //         ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                            //         : "bg-green-200 text-green-700 dark:bg-green-900/30";

                            return (
                                <tr
                                    key={row.districtId}
                                    className="even:bg-white dark:even:bg-transparent odd:bg-[#F0F0F0] dark:odd:bg-[#171717]"
                                >
                                    <td className="p-4 border dark:border-[#2E2E2E] hover:underline cursor-pointer">
                                        <Link href={`/${convertToSlug(slug)}/${type.toLowerCase()}-price-in-${convertToSlug(row.cityName)}`} >
                                            {row.cityName}
                                        </Link>
                                    </td>

                                    <td className="p-4 border dark:border-[#2E2E2E]">
                                        {
                                            row.price ? `${row.price}${type === "CNG" ? "₹/kg" : "₹/L"}` : "___"
                                        }
                                    </td>

                                    {/* <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div className={`px-4 py-1 rounded w-fit ${changeClass}`}>
                                            {row.change > 0 ? "+" : ""}
                                            {row.change === null ? "0" : row.change}
                                        </div>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* View More / View Less Button */}
            {data.length > 10 && !showAll && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary-hover transition"
                    >
                        {`View All Cities ${type} Prices`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CityWiseFuelList;
