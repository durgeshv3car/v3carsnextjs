'use client'

import React from "react";

const VariantTable: React.FC = () => {
    const variants = [
        { name: "Nexon Pure Plus", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Pure Plus S", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus S", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus S Dark", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
        { name: "Nexon Creative Plus PS Dual Tone", engine: "1199 cc, Petrol, Manual", exShowroom: "₹8.34 Lakh", onRoad: "₹8.34 Lakh" },
    ];

    return (

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 ">

            {/* Table */}
            <div className="border border-gray-200 rounded-xl rounded-b-none overflow-hidden">
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
                <button className="text-sm font-medium flex items-center justify-center mx-auto gap-1">
                    See Which Tata Nexon Variant Offers the <span className="font-semibold hover:underline"> Best Value for Money</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VariantTable;