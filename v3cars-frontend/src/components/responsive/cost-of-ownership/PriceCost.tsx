'use client';

import React from "react";
import Image from "next/image";

/* ---------------- Helpers ---------------- */

const formatCurrency = (value?: number | string) =>
    value ? `₹${Number(value).toLocaleString("en-IN")}` : "-";

/* ---------------- Demo Data ---------------- */

const priceData = [
    {
        name: "Car A",
        exShowroom: 789900,
        roadTax: 63192,
        tcs: 0,
        registration: 600,
        fastag: 600,
        hypothecation: 1500,
        roadSafety: 1422,
        other: 400,
        insurance: 39495,
        onRoad: 897109,
        emi: 14930,
    },
    {
        name: "Car B",
        exShowroom: 1072589,
        roadTax: 85807,
        tcs: 10726,
        registration: 600,
        fastag: 600,
        hypothecation: 1500,
        roadSafety: 1931,
        other: 400,
        insurance: 53629,
        onRoad: 1227782,
        emi: 20274,
    },
];

const lowestIndex = 0;

/* ---------------- Component ---------------- */

export default function PriceCost() {
    return (
        <div className="rounded-lg border bg-white overflow-hidden shadow-md dark:bg-[#171717] dark:border-[#2e2e2e]">
            {/* Header */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="bg-white dark:bg-[#171717] px-3 py-2 rounded">
                    <Image src="/compare-car/rs.png" alt="rs" width={12} height={12} className="invert" />
                </span>
                <h2 className="font-semibold text-sm">
                    Price & On-Road Cost Comparison
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <tbody>
                        {[
                            ["Ex-Showroom Price", "exShowroom"],
                            ["Road Tax", "roadTax"],
                            ["TCS", "tcs"],
                            ["Registration Charges", "registration"],
                            ["FASTag", "fastag"],
                            ["Hypothecation Endorsement", "hypothecation"],
                            ["Road Safety Cess", "roadSafety"],
                            ["Other Charges", "other"],
                            ["Insurance", "insurance"],
                        ].map(([label, key]) => (
                            <tr key={label} className="border-b dark:border-[#2e2e2e]">
                                <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">{label}</td>
                                {priceData.map((car, i) => (
                                    <td
                                        key={i}
                                        className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]"
                                    >
                                        {car[key as keyof typeof car] === 0
                                            ? "Nil"
                                            : formatCurrency(car[key as keyof typeof car] as number)}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* On-Road Price */}
                        <tr className="bg-[#E6E9FA] dark:bg-[#292929] font-semibold">
                            <td className="p-4 border-r dark:border-[#171717]">
                                On-Road Price
                                <div className="text-xs font-normal text-gray-400">
                                    Gurugram
                                </div>
                            </td>
                            {priceData.map((car, i) => (
                                <td
                                    key={i}
                                    className="p-4 text-center border-r last:border-none dark:border-[#171717]"
                                >
                                    {i === lowestIndex ? (
                                        <span className="inline-block rounded-full bg-[#D6FFDA] dark:bg-[#232323] px-6 py-1.5">
                                            {formatCurrency(car.onRoad)}
                                        </span>
                                    ) : (
                                        formatCurrency(car.onRoad)
                                    )}
                                </td>
                            ))}
                        </tr>

                        {/* EMI */}
                        <tr>
                            <td className="p-4 font-semibold border-r dark:border-[#2e2e2e]">
                                EMI (5-year @ 9.5%)
                            </td>
                            {priceData.map((car, i) => (
                                <td
                                    key={i}
                                    className="p-4 text-center border-r last:border-none dark:border-[#2e2e2e]"
                                >
                                    {formatCurrency(car.emi)}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="px-4 py-3 text-sm bg-[#F3F3F3] dark:bg-[#232323] m-4 rounded-md">
                Among the selected cars,{" "}
                <strong>{priceData[lowestIndex].name}</strong> has the lowest on-road
                price, making it the most affordable to purchase upfront.
            </div>
        </div>
    );
}
