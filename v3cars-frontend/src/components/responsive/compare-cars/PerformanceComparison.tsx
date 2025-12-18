'use client';

import React from "react";
import { EnginePerformance } from "./CompareInterface";
import Image from "next/image";

interface PerformanceComparisonProps {
    data: EnginePerformance[];
}

export default function PerformanceComparison({ data }: PerformanceComparisonProps) {

    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] dark:border-[#2e2e2e] overflow-hidden shadow-md">
            {/* Header – SAME */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] px-3 py-2 rounded">
                    <Image
                        src={`/compare-car/engine.png`}
                        alt="rs"
                        width={20}
                        height={20}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Engine & Performance Comparison
                </h2>
            </div>

            <div className="px-4">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse text-sm">
                        <tbody>

                            {/* Engine & Fuel Type */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Engine & Fuel Type
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.engineFuelType}
                                    </td>
                                ))}
                            </tr>

                            {/* Engine Displacement */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Engine Displacement
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.engineDisplacement} L
                                    </td>
                                ))}
                            </tr>

                            {/* Cubic Capacity */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Cubic Capacity (cc)
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.cubicCapacity} cc
                                    </td>
                                ))}
                            </tr>

                            {/* Cylinders */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Cylinders
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.cylinders}
                                    </td>
                                ))}
                            </tr>

                            {/* Max Power */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Max. Power
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.powerPS} PS @ {p.powerMaxRPM} rpm
                                    </td>
                                ))}
                            </tr>

                            {/* Max Torque */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Max. Torque
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.torqueNM} Nm @ {p.torqueMaxRPM} rpm
                                    </td>
                                ))}
                            </tr>

                            {/* Transmission */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Transmission Type
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.transmissionType}
                                    </td>
                                ))}
                            </tr>

                            {/* Kerb Weight */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Kerb Weight
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.kerbWeight} kg
                                    </td>
                                ))}
                            </tr>

                            {/* Power to Weight */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Power-to-Weight Ratio
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.powerToWeight} PS/tonne
                                    </td>
                                ))}
                            </tr>

                            {/* Torque to Weight */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Torque-to-Weight Ratio
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.torqueToWeight} Nm/tonne
                                    </td>
                                ))}
                            </tr>

                            {/* Mileage */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Claimed Fuel Efficiency (ARAI)
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.claimedFE} kmpl
                                    </td>
                                ))}
                            </tr>

                            {/* Range */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Claimed Range
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.claimedRange ?? "-"}
                                    </td>
                                ))}
                            </tr>

                            {/* Top Speed */}
                            <tr className="border-b dark:border-[#2e2e2e]">
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    Top Speed
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.topSpeed ?? "-"}
                                    </td>
                                ))}
                            </tr>

                            {/* 0-100 */}
                            <tr>
                                <td className="py-4 font-semibold border-r dark:border-[#2e2e2e]">
                                    0–100 km/h Time
                                </td>
                                {data.map((p, index) => (
                                    <td key={index} className="p-4 text-center border-r dark:border-[#2e2e2e] last:border-none">
                                        {p.zeroToHundred ?? "-"}
                                    </td>
                                ))}
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* Summary – SAME POSITION */}
                <div className="px-4 py-3 text-sm bg-[#F3F3F3] my-3 rounded-md dark:bg-[#292929]">
                    <strong>Performance Summary:</strong>{" "}
                    {data[0]?.summary || "—"}
                </div>
            </div>
        </div>
    );
}
