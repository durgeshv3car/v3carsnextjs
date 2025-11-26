'use client'

import React, { useState } from "react";

interface PriceListTableProps {
    data: Variant[] | null;
    fuelTypes?: string[];
    fuelType?: string;
    setFuelType?: React.Dispatch<React.SetStateAction<string>>;
    transmissionType?: string;
    setTransmissionType?: React.Dispatch<React.SetStateAction<string>>;
}

export interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

export interface Variant {
    variantId: number;
    name: string;
    powertrain: Powertrain;
    exShowroom: number;
    exShowroomMax: number;
    onRoad: number | null;
    updatedDate: string;
}

const PriceListTable: React.FC<PriceListTableProps> = ({ data, setFuelType, fuelType, fuelTypes, transmissionType, setTransmissionType }) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <div>
            {/* Filter Buttons */}
            <div className="bg-white dark:bg-[#171717] rounded-lg shadow-sm border border-gray-200 dark:border-[#2E2E2E]">
                <div className="flex flex-wrap gap-2 p-2">

                    {/* Dynamic Fuel Buttons */}
                    {fuelTypes && fuelTypes.map((fuel) => (
                        <button
                            key={fuel}
                            onClick={() => setFuelType?.(fuel.toLowerCase() ?? "petrol")}
                            className={`flex items-center gap-1 p-3 rounded-md border shadow text-xs 
                                dark:border-[#2E2E2E] ${fuel.toLowerCase() === fuelType ? "bg-primary text-black" : "bg-white dark:bg-[#171717] hover:bg-gray-200"}`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {fuel}
                        </button>
                    ))}

                    {/* Static Transmission Buttons */}
                    <button
                        onClick={() => setTransmissionType?.("manual")}
                        className={`flex items-center gap-1 p-3 rounded-md border shadow text-xs
                                dark:border-[#2E2E2E] ${transmissionType === "manual" ? "bg-primary text-black" : "bg-white dark:bg-[#171717] hover:bg-gray-200"}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Manual
                    </button>
                    <button
                        onClick={() => setTransmissionType?.("automatic")}
                        className={`flex items-center gap-1 p-3 rounded-md border shadow text-xs
                                dark:border-[#2E2E2E] ${transmissionType === "automatic" ? "bg-primary text-black" : "bg-white dark:bg-[#171717] hover:bg-gray-200"}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Automatic
                    </button>

                    {/* Price type */}
                    <button className="ml-auto px-4 py-2 rounded-md bg-[#B3B3B3] border text-xs dark:bg-[#171717] dark:border-[#2E2E2E]">
                        Ex-Showroom
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-gray-100 opacity-50 border border-gray-300 text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]"
                        disabled
                    >
                        OSD
                    </button>
                </div>

                {/* Variant Table */}
                <div
                    className={`border border-gray-200 overflow-hidden dark:border-[#2E2E2E]
                        transition-all duration-500 ease-in-out
                        ${showAll ? "max-h-[3000px]" : "max-h-[420px]"}
                    `}
                >
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold dark:bg-[#171717] dark:border-[#2E2E2E] p-4">
                        <span>Variants</span>
                        <span>Ex-Showroom Price</span>
                        <span>On-Road Price</span>
                    </div>

                    {data?.map((v, idx) => (
                        <div
                            key={v.variantId}
                            className={`grid grid-cols-3 text-sm px-3 py-3 border-b dark:border-[#2e2e2e] ${idx % 2 === 0
                                ? "bg-white dark:bg-[#171717]"
                                : "bg-gray-50 dark:bg-[#2E2E2E]"
                                }`}
                        >
                            <div>
                                <p className="font-medium">{v.name}</p>
                                <p className="text-xs text-gray-400">
                                    {v.powertrain.label}
                                </p>
                            </div>

                            <div className="flex items-center">
                                ₹{(v.exShowroom / 100000).toFixed(2)} Lakh
                            </div>

                            <div className="flex items-center">
                                {v.onRoad
                                    ? `₹${(v.onRoad / 100000).toFixed(2)} Lakh`
                                    : "—"}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center my-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-sm font-medium flex items-center justify-center mx-auto hover:underline gap-1"
                    >
                        {showAll ? "View Less" : "View More Variants"}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PriceListTable;
