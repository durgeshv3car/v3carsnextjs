'use client'

import React, { useState } from "react";

interface VariantDetails {
    label: string;
    value: string;
}

interface Variant {
    name: string;
    engine: string;
    exShowroom: string;
    onRoad: string;
    details: VariantDetails[];
}

interface OnRoadPriceTableProps {
    title: string
    desc: string
    data: Variant[]
    slug: string
}

const OnRoadPriceTable: React.FC<OnRoadPriceTableProps> = ({ title, desc, data, slug }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            {/* Header */}
            <div className="pb-5">
                <h2 className="text-lg font-semibold">
                    {title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    {desc}
                </p>
            </div>

            <div className="border rounded-xl overflow-hidden dark:border-[#2E2E2E]">
                <div className="flex flex-wrap items-center justify-between text-xs p-1 gap-2">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]">
                            Petrol
                        </button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]">
                            CNG
                        </button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]">
                            Diesel
                        </button>
                        <button className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]">
                            Manual
                        </button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:bg-[#171717] dark:border-[#2E2E2E] hover:dark:bg-[#292929]">
                            Automatic
                        </button>
                    </div>
                    <p className="mr-4">Last Updated: 24/10/2025</p>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 font-semibold bg-[#DEE2E6] px-4 py-3 border-b text-sm dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <span>Variants</span>
                    <span>Ex-Showroom Price</span>
                    <span>On-Road Price</span>
                </div>

                {/* Variants */}
                <div className="divide-y bg-white dark:bg-[#171717] dark:divide-[#2E2E2E]">
                    {data.map((variant, index) => (
                        <div key={index} className="border-b p-4 space-y-4 dark:border-[#2E2E2E]">
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="grid grid-cols-3 w-full text-left items-center"
                            >
                                <div>
                                    <p className="font-medium">{variant.name}</p>
                                    <p className="text-xs text-gray-400">{variant.engine}</p>
                                </div>
                                <span className="">{variant.exShowroom}</span>
                                <div className="flex items-center justify-between">
                                    <span className="">{variant.onRoad}</span>
                                    {openIndex === index ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            {/* Expanded Section */}
                            {openIndex === index && (
                                <div className="text-sm border rounded-xl overflow-hidden dark:border-[#2E2E2E]">
                                    {variant.details.map((d, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between px-4 py-3 border-b last:border-none bg-gray-50 dark:bg-[#171717] dark:border-[#2E2E2E]"
                                        >
                                            <span>{d.label}</span>
                                            <span className="font-medium">{d.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {
                slug === "csd-price" && (
                    <p className="text-gray-500 mt-4 text-sm">For serving/retired defence personnel with valid CSD entitlement. Prices/eligibility depend on CSD/DGQA norms, depot/URC availability and may vary by city. Registration, insurance and handling are extra. Please confirm with your URC and dealer.</p>
                )
            }
        </div>
    );
};

export default OnRoadPriceTable;
