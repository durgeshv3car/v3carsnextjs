'use client';

import React from "react";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value?: number) =>
    value ? `₹${value.toLocaleString("en-IN")}` : "-";

/* ---------------- Demo Data ---------------- */

const tcoData = {
    city: "Gurugram",
    ownershipYears: 5,
    distance: "50,000km",

    onRoad: [897109, 1227782],
    maintenance: [18459, 21601],
    runningCost: [247079, 288142],
    total: [1162647, 1537525],

    lowestIndex: 0,
};

/* ---------------- Component ---------------- */

export default function TotalCostOfOwnership() {
    return (
        <div>
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">
                Total Cost of Ownership (TCO)
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-5xl mb-6">
                TCO combines the on-road price, periodic maintenance cost and running
                cost for your selected ownership period. This gives you the full
                picture of how much each car will cost to own over time. If you prefer
                to factor in EMIs instead of upfront on-road price, you can enable
                include finance cost in TCO from the top section.
            </p>

            {/* Card */}
            <div className="rounded-lg border bg-white dark:bg-[#171717] shadow-md overflow-hidden dark:border-[#2e2e2e] text-black">
                {/* Card Header */}
                <div className="bg-[#656FC4] p-4 text-sm font-semibold">
                    Total Cost of Ownership
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            {/* On-road */}
                            <tr className="bg-[#DCDFF8] border-b">
                                <td className="p-4 font-semibold border-r">
                                    On-Road Price
                                    <div className="text-xs font-normal text-gray-600">
                                        {tcoData.city}
                                    </div>
                                </td>
                                <td className="p-4 text-center border-r">
                                    {formatCurrency(tcoData.onRoad[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(tcoData.onRoad[1])}
                                </td>
                            </tr>

                            {/* Maintenance */}
                            <tr className="bg-[#DCDFF8] border-b">
                                <td className="p-4 font-semibold border-r flex items-center gap-2">
                                    Total Maintenance Cost
                                    <select className="border rounded px-2 py-0.5 text-xs">
                                        <option>{tcoData.ownershipYears}yr</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center border-r">
                                    {formatCurrency(tcoData.maintenance[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(tcoData.maintenance[1])}
                                </td>
                            </tr>

                            {/* Running Cost */}
                            <tr className="bg-[#DCDFF8] border-b">
                                <td className="p-4 font-semibold border-r flex items-center gap-2">
                                    Running Cost
                                    <select className="border rounded px-2 py-0.5 text-xs">
                                        <option>{tcoData.distance}</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center border-r">
                                    {formatCurrency(tcoData.runningCost[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(tcoData.runningCost[1])}
                                </td>
                            </tr>

                            {/* Total */}
                            <tr className="bg-[#C1C5E8] font-semibold">
                                <td className="p-4 border-r">
                                    Total Cost of Ownership
                                </td>
                                <td className="p-4 text-center border-r">
                                    {formatCurrency(tcoData.total[0])}
                                </td>
                                <td className="p-4 text-center">
                                    {formatCurrency(tcoData.total[1])}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="m-4 px-4 py-3 text-xs bg-[#F3F3F3] dark:bg-[#292929] dark:text-white rounded-md">
                    <strong>Summary:</strong> Over your selected ownership period of{" "}
                    <strong>{tcoData.ownershipYears} years</strong> and{" "}
                    <strong>{tcoData.distance}</strong>,{" "}
                    <strong>Car A</strong> is the most economical with an estimated total
                    cost of{" "}
                    <strong>{formatCurrency(tcoData.total[0])}</strong>. The costliest
                    among the selected cars is <strong>Car B</strong>, mainly due to
                    higher running and maintenance costs.
                </div>
            </div>
        </div>
    );
}
