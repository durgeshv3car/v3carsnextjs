'use client';

import React from "react";
import { DimensionsSpace } from "./CompareInterface";
import Image from "next/image";

/* ---------------- Props ---------------- */

interface DimensionsComparisonProps {
    data: DimensionsSpace[]; // max 4 items
}

/* ---------------- Component ---------------- */

export default function DimensionsTable({ data }: DimensionsComparisonProps) {

    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">
            {/* Header – SAME UI */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] p-4 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] px-3 py-2 rounded">
                    <Image
                        src={`/compare-car/space.png`}
                        alt="rs"
                        width={20}
                        height={20}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Dimensions & Space
                </h2>
            </div>

            <div className="px-4">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse text-sm">
                        <tbody>

                            {/* Length */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Length</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.length} mm
                                    </td>
                                ))}
                            </tr>

                            {/* Width */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Width</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.width} mm
                                    </td>
                                ))}
                            </tr>

                            {/* Height */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Height</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.height} mm
                                    </td>
                                ))}
                            </tr>

                            {/* Wheelbase */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Wheelbase</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.wheelbase} mm
                                    </td>
                                ))}
                            </tr>

                            {/* Ground Clearance */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Ground Clearance</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.groundClearance} mm
                                    </td>
                                ))}
                            </tr>

                            {/* Boot Space */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Boot Space</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.bootSpace} L
                                    </td>
                                ))}
                            </tr>

                            {/* Tyre Size */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Tyre Size</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.tyreSize}
                                    </td>
                                ))}
                            </tr>

                            {/* Fuel Tank */}
                            <tr>
                                <td className="py-5 font-semibold border-r dark:border-[#2e2e2e]">Fuel Tank Capacity</td>
                                {data.map((d, i) => (
                                    <td key={i} className="py-5 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {d.fuelTankCapacity} L
                                    </td>
                                ))}
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* Summary – SAME POSITION */}
                <div className="px-4 py-3 text-sm bg-[#F3F3F3] dark:bg-[#292929] my-3 rounded-md">
                    <strong>Space & Size Summary:</strong>{" "}
                    {data[0]?.summary || "—"}
                </div>
            </div>
        </div>
    );
}
