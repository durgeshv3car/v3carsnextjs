'use client';

import React from "react";
import { Colours } from "./CompareInterface";
import Image from "next/image";

/* ---------------- Props ---------------- */

interface ColoursComparisonProps {
    data: Colours[]; // max 4 cars
}

/* ---------------- Component ---------------- */

export default function ColoursComparison({ data }: ColoursComparisonProps) {
    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">

            {/* Header – SAME */}
            <div className="flex items-center gap-3 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] p-2 rounded">
                    <Image
                        src={`/compare-car/color.png`}
                        alt="rs"
                        width={20}
                        height={20}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">Colours</h2>
            </div>

            <div className="px-4">
                <table className="w-full border-collapse text-sm">
                    <tbody>
                        <tr>
                            {/* Label */}
                            <td className="py-4 font-semibold border-r dark:border-[#2e2e2e] align-top w-56">
                                Colour Options
                            </td>

                            {/* Colour Columns */}
                            {data.map((item, index) => (
                                <td
                                    key={index}
                                    className="p-4 border-r dark:border-[#2e2e2e] last:border-none"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {item.options.map((colour) => (
                                            <span
                                                key={colour.colorId}
                                                title={colour.name}
                                                className="w-12 h-8 rounded border dark:border-[#2e2e2e]"
                                                style={{ backgroundColor: colour.code }}
                                            />
                                        ))}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                {/* Summary – SAME POSITION */}
                <div className="my-3 px-4 py-3 text-sm bg-[#F3F3F3] dark:bg-[#292929] rounded-md">
                    <strong>Colour Summary:</strong>{" "}
                    {data[0]?.summary || "—"}
                </div>
            </div>
        </div>
    );
}
