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
            <div className="bg-white rounded-md shadow-sm border border-gray-200 ">
                <div className="flex flex-wrap gap-2 p-2">
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-200">
                        Petrol
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        CNG
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        Diesel
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        Hybrid
                    </button>

                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        Manual
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        Automatic
                    </button>

                    <button className="ml-auto px-4 py-2 rounded-md bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
                        Ex-Showroom
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700">
                        OSD
                    </button>
                </div>

                {/* Table */}
                <div className="border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700 p-4">
                        <span>Variants</span>
                        <span>Ex-Showroom Price</span>
                        <span>On-Road Price</span>
                    </div>

                    {variants.map((v, idx) => (
                        <div
                            key={idx}
                            className={`grid grid-cols-3 text-sm px-3 py-3 border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                        >
                            <div>
                                <p className="font-medium text-gray-800">{v.name}</p>
                                <p className="text-xs text-gray-500">{v.engine}</p>
                            </div>
                            <div className="flex items-center">{v.exShowroom}</div>
                            <div className="flex items-center">{v.onRoad}</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center my-3">
                    <button className="text-blue-600 text-sm font-medium flex items-center justify-center mx-auto hover:underline">
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
