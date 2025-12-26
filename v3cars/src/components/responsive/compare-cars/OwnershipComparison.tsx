'use client';

import React from "react";
import { Ownership } from "./CompareInterface";
import Image from "next/image";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value: number | null) =>
    value !== null ? `₹${value.toLocaleString("en-IN")}` : "-";

/* ---------------- Props ---------------- */

interface OwnershipComparisonProps {
    data: Ownership[]; // max 4 items
}

/* ---------------- Component ---------------- */

export default function OwnershipComparison({ data }: OwnershipComparisonProps) {

    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">
            {/* Header – SAME */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] p-1 rounded">
                    <Image
                        src={`/compare-car/cost.png`}
                        alt="rs"
                        width={28}
                        height={28}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Ownership & Running Cost
                </h2>
            </div>

            <div className="px-4">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse text-sm">
                        <tbody>

                            {/* Claimed Mileage */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Claimed Mileage
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {o.claimedMileage} kmpl
                                    </td>
                                ))}
                            </tr>

                            {/* Real World Mileage */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Real World Mileage
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {o.realWorldMileage} kmpl
                                    </td>
                                ))}
                            </tr>

                            {/* Fuel Price */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Fuel Price (per unit)
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {formatCurrency(o.fuelPricePerUnit)}
                                    </td>
                                ))}
                            </tr>

                            {/* Running Cost */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Running Cost (per km)
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {formatCurrency(o.runningCost)}
                                    </td>
                                ))}
                            </tr>

                            {/* Service & Maintenance */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Service & Maintenance Cost
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {formatCurrency(o.serviceAndMaintenanceCost)}
                                    </td>
                                ))}
                            </tr>

                            {/* Service Interval */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Service Interval
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {o.serviceInterval ? `${o.serviceInterval} km` : "-"}
                                    </td>
                                ))}
                            </tr>

                            {/* Service Network */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Service Network
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {o.serviceNetwork ?? "-"}
                                    </td>
                                ))}
                            </tr>

                            {/* Warranty */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Standard Warranty
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {o.standardWarrantyYear} / {o.standardWarrantyKm}
                                    </td>
                                ))}
                            </tr>

                            {/* Ownership Cost */}
                            <tr>
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Estimated Ownership Cost
                                </td>
                                {data.map((o, i) => (
                                    <td key={i} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {formatCurrency(o.carOwnershipCost)}
                                    </td>
                                ))}
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* Summary – SAME POSITION */}
                <div className="px-4 py-3 text-sm bg-[#F3F3F3] dark:bg-[#292929] my-3 rounded-md">
                    <strong>Ownership Summary:</strong>{" "}
                    {data[0]?.summary || "—"}
                </div>
            </div>
        </div>
    );
}
