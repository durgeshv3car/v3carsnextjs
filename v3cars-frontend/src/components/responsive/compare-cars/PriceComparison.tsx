'use client';

import React from "react";
import { Price } from "./CompareInterface";
import Image from "next/image";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value?: number) =>
    value ? `₹${value.toLocaleString("en-IN")}` : "-";

const formatEmi = (emi?: number) =>
    emi ? `₹${emi.toLocaleString("en-IN")} (5 years @ 9.5% p.a.)` : "-";

/* ---------------- Props ---------------- */

interface PriceComparisonProps {
    priceData: Price[]; // max 4 items
}

/* ---------------- Component ---------------- */

export default function PriceComparison({ priceData }: PriceComparisonProps) {
    const columns = 4;

    // find lowest on-road price for highlight
    const onRoadPrices = priceData.map((p) => p.onRoadPrice);
    const lowestIndex = onRoadPrices.indexOf(Math.min(...onRoadPrices));

    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">
            {/* Header */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] px-3 py-2 rounded">
                    <Image
                        src={`/compare-car/rs.png`}
                        alt="rs"
                        width={10}
                        height={10}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Price & On-Road Cost Comparison
                </h2>
            </div>

            <div className="lg:px-4">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            {/* Ex-Showroom */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Ex-Showroom Price
                                </td>

                                {priceData.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]">
                                        {index === lowestIndex ? (
                                            <span className="inline-block rounded-full bg-[#D6FFDA] dark:bg-[#232323] px-10 py-1.5">
                                                {p.exShowroomMin === p.exShowroomMax
                                                    ? formatCurrency(p.exShowroomMin)
                                                    : `${formatCurrency(p.exShowroomMin)} - ${formatCurrency(
                                                        p.exShowroomMax
                                                    )}`}
                                            </span>
                                        ) : (
                                            p.exShowroomMin === p.exShowroomMax
                                                ? formatCurrency(p.exShowroomMin)
                                                : `${formatCurrency(p.exShowroomMin)} - ${formatCurrency(
                                                    p.exShowroomMax
                                                )}`
                                        )}
                                    </td>
                                ))}
                            </tr>

                            {/* EMI */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Estimated Monthly EMI
                                </td>

                                {priceData.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]">
                                        {formatEmi(p.estimatedEmi)}
                                    </td>
                                ))}
                            </tr>

                            {/* Insurance */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Approx. Insurance (1st year)
                                </td>

                                {priceData.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]">
                                        {formatCurrency(p.insuranceFirstYear)}
                                    </td>
                                ))}
                            </tr>

                            {/* On-road */}
                            <tr>
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Estimated On-Road Price
                                </td>

                                {priceData.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]">
                                        {index === lowestIndex ? (
                                            <span className="inline-block rounded-full bg-[#D6FFDA] dark:bg-[#232323] px-10 py-1.5">
                                                {formatCurrency(p.onRoadPrice)}
                                            </span>
                                        ) : (
                                            formatCurrency(p.onRoadPrice)
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Note */}
                <div className="text-xs text-gray-500 m-4 lg:m-0 py-1">
                    Note: EMI values are indicative and calculated for a 5-year tenure at
                    9.5% p.a. Actual EMI may vary based on bank, down payment and credit
                    profile.
                </div>

                {/* Summary */}
                <div className="px-4 py-3 text-sm bg-[#F3F3F3] dark:bg-[#292929] m-4 lg:mx-0 lg:my-3 rounded-md">
                    <strong>Price Summary:</strong>{" "}
                    {priceData[lowestIndex]?.summary || "—"}
                </div>
            </div>
        </div>
    );
}
