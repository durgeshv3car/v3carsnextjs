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
                const [year, month] = m.month.split("-");
                const monthName = new Date(`${m.month}-01`).toLocaleString("default", {
                    month: "long",
                });

                const isOpen = open === m.month;
                const netChangeSymbol = m.netChange > 0 ? "+" : "";

                return (
                    <div key={m.month} className="border">
                        <button
                            onClick={() => toggleSection(m.month)}
                            className={`w-full text-left bg-yellow-400 px-4 py-2 font-semibold flex justify-between items-center ${idx !== 0 ? "border-t" : ""
                                }`}
                        >
                            <span>
                                Trend of {type} Rate in {city}, {monthName} {year}
                            </span>
                            <span>{isOpen ? "–" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div className="p-4 bg-gray-50">
                                <table className="w-full border border-gray-300 text-sm mb-4">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="text-left px-3 py-2 border"> </th>
                                            <th className="text-left px-3 py-2 border uppercase">{type} PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 border">{monthName} 1st</td>
                                            <td className="px-3 py-2 border">₹{m.firstPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Last day of {monthName}</td>
                                            <td className="px-3 py-2 border">₹{m.lastPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border font-semibold">Net Change in {monthName}</td>
                                            <td className="px-3 py-2 border font-semibold">
                                                ₹{netChangeSymbol}
                                                {m.netChange}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Average Rate in {monthName}</td>
                                            <td className="px-3 py-2 border">₹{m.avgPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Highest Rate in {monthName}</td>
                                            <td className="px-3 py-2 border">
                                                ₹{m.highest.price} (
                                                {new Date(m.highest.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                })}
                                                )
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Lowest Rate in {monthName}</td>
                                            <td className="px-3 py-2 border">
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
