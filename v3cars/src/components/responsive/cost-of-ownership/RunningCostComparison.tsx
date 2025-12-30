'use client';

import React from "react";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value?: number) =>
    value ? `₹${value.toLocaleString("en-IN")}` : "-";

/* ---------------- Demo Data ---------------- */

const runningCostData = {
    fuelEfficiency: ["20.21 kmpl", "17.33 kmpl"],
    fuelPrice: 99.87,
    runningCost: [247079, 288142],
    costPerKm: [4.96, 5.76],
    distance: "50,000km",
    city: "Gurugram",
};

/* ---------------- Component ---------------- */

export default function RunningCostComparison() {
    return (
        <div>
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">
                Running Cost
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-5xl mb-6">
                We estimate the fuel/charging cost for your selected usage period using
                the ARAI-claimed mileage for each powertrain and the latest fuel or
                energy price in your city. This helps you understand how much each car
                is likely to cost to run over time.
            </p>

            {/* Card */}
            <div className="rounded-lg border bg-white dark:bg-[#171717] shadow-md overflow-hidden dark:border-[#2e2e2e]">
                {/* Header */}
                <div className="bg-[#DEE2E6] dark:bg-[#232323] p-4 border-b dark:border-[#2e2e2e] text-sm font-semibold">
                    Running Cost Comparison
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            {/* Fuel Efficiency */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Fuel Efficiency (ARAI)
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e] text-blue-600 cursor-pointer">
                                    {runningCostData.fuelEfficiency[0]}
                                </td>
                                <td className="p-4 text-center text-blue-600 cursor-pointer">
                                    {runningCostData.fuelEfficiency[1]}
                                </td>
                            </tr>

                            {/* Fuel Price */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Fuel Price in{" "}
                                    <span className="text-blue-600 cursor-pointer">
                                        {runningCostData.city}
                                    </span>
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                    {formatCurrency(runningCostData.fuelPrice)}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(runningCostData.fuelPrice)}
                                </td>
                            </tr>

                            {/* Running Cost */}
                            <tr className="bg-[#E6E9FA] dark:bg-[#232323] font-semibold">
                                <td className="p-4 border-r dark:border-[#2e2e2e] flex items-center gap-2">
                                    Running Cost
                                    <select className="border rounded px-2 py-0.5 text-xs bg-transparent dark:border-[#2e2e2e]">
                                        <option>{runningCostData.distance}</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                    {formatCurrency(runningCostData.runningCost[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(runningCostData.runningCost[1])}
                                </td>
                            </tr>

                            {/* Cost per km */}
                            <tr>
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Running Cost per km
                                </td>
                                <td className="p-4 text-center border-r dark:border-[#2e2e2e]">
                                    {formatCurrency(runningCostData.costPerKm[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(runningCostData.costPerKm[1])}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="m-4 px-4 py-3 text-xs bg-[#F3F3F3] dark:bg-[#292929] rounded-md">
                    <strong>Ownership Summary:</strong> Based on estimated mileage and
                    current fuel prices in{" "}
                    <strong>{runningCostData.city}</strong>,{" "}
                    <strong>Car A</strong> has the lowest running cost, while long-term
                    maintenance over 5 years is expected to be most affordable with{" "}
                    <strong>Car A</strong>.
                </div>
            </div>
        </div>
    );
}
