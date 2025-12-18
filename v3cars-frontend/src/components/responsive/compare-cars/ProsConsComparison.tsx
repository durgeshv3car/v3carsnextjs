'use client';

import React from "react";
import { ProsCons } from "./CompareInterface";
import Image from "next/image";

/* ---------------- Props ---------------- */

interface ProsConsComparisonProps {
    data: ProsCons[]; // max 4 cars
}

/* ---------------- Component ---------------- */

export default function ProsConsComparison({ data }: ProsConsComparisonProps) {
    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">

            {/* Header – SAME */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b">
                <span className="text-lg bg-white p-2 rounded">
                    <Image
                        src={`/compare-car/pros-cons.png`}
                        alt="rs"
                        width={20}
                        height={20}
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Pros & Cons
                </h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full border-collapse text-sm">
                    <tbody>

                        {/* Advantages */}
                        <tr className="border-b bg-[#F9FFFB]">
                            <td className="p-4 font-semibold border-r text-green-600 w-56 align-top">
                                Advantages
                            </td>

                            {data.map((item, i) => (
                                <td
                                    key={i}
                                    className="p-4 border-r last:border-none align-top"
                                >
                                    <ul className="list-disc pl-5 space-y-1">
                                        {item.pros.map((pro, idx) => (
                                            <li key={idx}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: pro.desc || pro.heading,
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            ))}
                        </tr>

                        {/* Disadvantages */}
                        <tr className="bg-[#FFF5F5]">
                            <td className="p-4 font-semibold border-r text-red-600 align-top">
                                Disadvantages
                            </td>

                            {data.map((item, i) => (
                                <td
                                    key={i}
                                    className="p-4 border-r last:border-none align-top"
                                >
                                    <ul className="list-disc pl-5 space-y-1">
                                        {item.cons?.map((con, idx) => (
                                            <li key={idx}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: con.desc || con.heading,
                                                    }}
                                                />
                                            </li>
                                        )) || "-"}
                                    </ul>
                                </td>
                            ))}
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}
