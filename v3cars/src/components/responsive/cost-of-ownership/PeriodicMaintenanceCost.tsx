'use client';

import React from "react";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value?: number) =>
    value ? `₹${value.toLocaleString("en-IN")}` : "-";

/* ---------------- Demo Data ---------------- */

const maintenanceData = [
    { year: "Year 1", car1: 1601, car2: 2171 },
    { year: "Year 2", car1: 1818, car2: 2641 },
    { year: "Year 3", car1: 4694, car2: 5840 },
    { year: "Year 4", car1: 4689, car2: 5617 },
    { year: "Year 5", car1: 5657, car2: 6332 },
];

const totalCar1 = 18459;
const totalCar2 = 21601;

const avgCar1 = 3691.8;
const avgCar2 = 4320.2;

/* ---------------- Component ---------------- */

export default function PeriodicMaintenanceCost() {
    return (
        <div>
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">
                Periodic Maintenance Cost
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-5xl mb-6">
                Each car brand follows its own service schedule, with different
                intervals and part replacement cycles. To make the comparison fair and
                easy to read, we’ve converted every model’s schedule into year-wise
                maintenance costs based on your selected ownership period and running
                distance.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed max-w-5xl mb-6">
                This lets you see, at a glance, how much each car is likely to cost in
                routine servicing every year.
            </p>

            {/* Table Card */}
            <div className="rounded-lg border bg-white dark:bg-[#171717] shadow-md overflow-hidden dark:border-[#2e2e2e]">
                {/* Table Header */}
                <div className="bg-[#DEE2E6] dark:bg-[#232323] p-4 border-b dark:border-[#2e2e2e] text-sm font-semibold">
                    Service & Maintenance Cost Comparison
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            {maintenanceData.map((row) => (
                                <tr key={row.year} className="border-b dark:border-[#2e2e2e]">
                                    <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                        {row.year}
                                    </td>
                                    <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                        {formatCurrency(row.car1)}
                                    </td>
                                    <td className="p-4 text-center">
                                        {formatCurrency(row.car2)}
                                    </td>
                                </tr>
                            ))}

                            {/* Total */}
                            <tr className="bg-[#E6E9FA] dark:bg-[#232323] font-semibold">
                                <td className="p-4 border-r dark:border-[#2e2e2e] flex items-center gap-2">
                                    Total Maintenance Cost
                                    <select className="border rounded px-2 py-0.5 text-xs bg-transparent dark:border-[#2e2e2e]">
                                        <option>5yr</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                    {formatCurrency(totalCar1)}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(totalCar2)}
                                </td>
                            </tr>

                            {/* Average */}
                            <tr>
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Avg. Yearly Maintenance Cost
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                    {formatCurrency(avgCar1)}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(avgCar2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="m-4 px-4 py-3 text-xs bg-[#F3F3F3] rounded-md dark:bg-[#292929]">
                    <strong>Summary:</strong> Based on your selected usage,{" "}
                    <strong>Car A</strong> has the lowest routine servicing cost over the
                    chosen period.
                </div>
            </div>
        </div>
    );
}
