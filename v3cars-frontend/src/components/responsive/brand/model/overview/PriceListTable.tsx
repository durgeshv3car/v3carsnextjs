'use client'

import React from "react";

const PriceListTable: React.FC = () => {
    const variants = [
        { name: "Nexon Pure Plus", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Pure Plus S", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus S", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus S Dark", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus PS Dual Tone", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
    ];

    return (
        <div>
            {/* Filter Buttons */}
            <div className="bg-white dark:bg-[#171717] rounded-lg shadow-sm border border-gray-200 dark:border-[#2E2E2E]">
                <div className="flex flex-wrap gap-2 p-2">
                    <button className="px-4 py-2 rounded-md bg-gray-100 dark:bg-[#171717] dark:border-[#2E2E2E] border border-gray-300 text-xs font-medium">
                        Petrol
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        CNG
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Diesel
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Hybrid
                    </button>

                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Manual
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Automatic
                    </button>

                    <button className="ml-auto px-4 py-2 rounded-md bg-blue-50 border border-blue-200 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Ex-Showroom
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                        OSD
                    </button>
                </div>

                {/* Table */}
                <div className="border border-gray-200 overflow-hidden dark:border-[#2E2E2E]">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold dark:bg-[#171717] dark:border-[#2E2E2E] p-4">
                        <span>Variants</span>
                        <span>Ex-Showroom Price</span>
                        <span>On-Road Price</span>
                    </div>

                    {variants.map((v, idx) => (
                        <div
                            key={idx}
                            className={`grid grid-cols-3 text-sm px-3 py-3 border-b border-gray-100 ${idx % 2 === 0 ? "bg-white dark:bg-[#171717] dark:border-[#2E2E2E]" : "bg-gray-50 dark:bg-[#2E2E2E] dark:border-[#2E2E2E]"
                                }`}
                        >
                            <div>
                                <p className="font-medium">{v.name}</p>
                                <p className="text-xs text-gray-400">{v.engine}</p>
                            </div>
                            <div className="flex items-center">{v.exShowroom}</div>
                            <div className="flex items-center">{v.onRoad}</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center my-4">
                    <button className="text-sm font-medium flex items-center justify-center mx-auto hover:underline">
                        View More Variants
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PriceListTable;
