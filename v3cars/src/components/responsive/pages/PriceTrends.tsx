'use client';

import React, { useState } from "react";

interface PriceTrendsProps {
    type: string;
    city: string;
    data: CityFuelTrend | null;
}

interface CityInfo {
    districtId: number;
    name: string;
    stateId: number;
    stateName: string;
}

interface PriceRecord {
    price: number;
    date: string; // ISO date string (e.g. "2025-10-25")
}

interface MonthlyFuelData {
    month: string; // e.g. "2025-10"
    firstPrice: number;
    lastPrice: number;
    netChange: number;
    avgPrice: number;
    highest: PriceRecord;
    lowest: PriceRecord;
}

interface CityFuelTrend {
    success: boolean;
    city: CityInfo | null;
    fuelType: number;
    months: MonthlyFuelData[] | [];
}

const PriceTrends: React.FC<PriceTrendsProps> = ({ type, city, data }) => {
    const [open, setOpen] = useState<string | null>(null);

    if (!data || !data.months || data.months.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500 border rounded-lg">
                No data available for {type} in {city}.
            </div>
        );
    }

    const toggleSection = (month: string) => {
        setOpen(open === month ? null : month);
    };

    return (
        <div className="overflow-hidden">
            <h2 className="text-xl pb-4">Last Six Month Trends</h2>

            {data.months.map((m, idx) => {
                // convert "2025-10" to readable format
                const [year] = m.month.split("-");
                const monthName = new Date(`${m.month}-01`).toLocaleString("default", {
                    month: "long",
                });

                const isOpen = open === m.month;
                const netChangeSymbol = m.netChange > 0 ? "+" : "";

                return (
                    <div key={m.month} className="border dark:border-[#2e2e2e]">
                        <button
                            onClick={() => toggleSection(m.month)}
                            className={`w-full text-left bg-primary text-black px-4 py-2 font-semibold flex justify-between items-center dark:border-[#2e2e2e] ${idx !== 0 ? "border-t" : ""
                                }`}
                        >
                            <span>
                                Trend of {type} Rate in {city}, {monthName} {year}
                            </span>
                            <span>{isOpen ? "–" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div className="p-4 bg-gray-50 dark:bg-[#171717]">
                                <table className="w-full border border-gray-300 text-sm mb-4 dark:border-[#2e2e2e]">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-[#171717]">
                                            <th className="text-left px-3 py-2 border dark:border-[#2e2e2e]"> </th>
                                            <th className="text-left px-3 py-2 border uppercase dark:border-[#2e2e2e]">{type} PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">{monthName} 1st</td>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">₹{m.firstPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">Last day of {monthName}</td>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">₹{m.lastPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border font-semibold dark:border-[#2e2e2e]">Net Change in {monthName}</td>
                                            <td className="px-3 py-2 border font-semibold dark:border-[#2e2e2e]">
                                                ₹{netChangeSymbol}
                                                {m.netChange}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">Average Rate in {monthName}</td>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">₹{m.avgPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">Highest Rate in {monthName}</td>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">
                                                ₹{m.highest.price} (
                                                {new Date(m.highest.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                })}
                                                )
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">Lowest Rate in {monthName}</td>
                                            <td className="px-3 py-2 border dark:border-[#2e2e2e]">
                                                ₹{m.lowest.price} (
                                                {new Date(m.lowest.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                })}
                                                )
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 className="text-lg font-semibold mb-2">
                                    Monthly {type} Price Trend In {city} For {monthName}
                                </h3>

                                <ul className="list-disc pl-6 text-sm space-y-1">
                                    <li>
                                        Price of {type} in {city} on the 1st of {monthName} was ₹
                                        {m.firstPrice} per litre, which is{" "}
                                        {m.netChange >= 0 ? "₹" + m.netChange + " more" : "₹" + Math.abs(m.netChange) + " less"}{" "}
                                        than the price on the last day of {monthName}.
                                    </li>
                                    <li>
                                        The highest recorded price of {type} in the month of {monthName} was ₹
                                        {m.highest.price} on{" "}
                                        {new Date(m.highest.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                        })}.
                                    </li>
                                    <li>
                                        The lowest recorded price of {type} in the month of {monthName} was ₹
                                        {m.lowest.price} on{" "}
                                        {new Date(m.lowest.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                        })}.
                                    </li>
                                    <li>
                                        The average price of {type} in the month of {monthName} was ₹
                                        {m.avgPrice} per litre.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PriceTrends;
