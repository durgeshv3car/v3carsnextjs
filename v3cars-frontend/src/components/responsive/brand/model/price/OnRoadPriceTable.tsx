'use client'

import React, { useState } from "react";

export interface PriceListItem {
    variantId: number;
    name: string;
    powertrain: Powertrain;
    exShowroom: number;
    exShowroomMax: number;
    onRoad: number;
    updatedDate: string; // ISO date string
    breakdown?: Breakdown; // optional
}

export interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

export interface Breakdown {
    exShowroom: number;
    roadTax: number;
    registrationCharges: number;
    fastag: number;
    hypothecationEndorsement: number;
    roadSafetyCess: number;
    otherCharges: number;
    insurance: number;
    total: number;
}

interface OnRoadPriceTableProps {
    title: string;
    desc: string;
    data: PriceListItem[];
    slug: string;
    fuelTypes?: string[];
    setVariantId?: (id: number) => void;
    fuelType?: string;
    setFuelType?: (fuel: string) => void;
    transmissionType?: string;
    setTransmissionType?: (type: string) => void;
}

export interface PriceListDetailsResponse {
    success: boolean,
    modelId: number,
    cityId: number,
    rows: []
}

export const toLakh = (value: number): string => {
    if (!value || value <= 0) return "₹0";

    return `₹${(value / 100000).toFixed(2)} Lakh`;
};

const OnRoadPriceTable: React.FC<OnRoadPriceTableProps> = ({ title, desc, data, slug, fuelTypes, fuelType, transmissionType, setVariantId, setFuelType, setTransmissionType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const normalizeData = (rows: PriceListItem[]) => {
        return rows.map((item) => ({
            variantId: item.variantId,
            name: item.name,
            engine: item.powertrain.label,
            exShowroom: toLakh(item.exShowroom),
            onRoad: toLakh(item.onRoad),
            details: item.breakdown
                ? [
                    { label: "Ex-Showroom", value: `₹${item.breakdown.exShowroom.toLocaleString("en-IN")}` },
                    { label: "Road Tax", value: `₹${item.breakdown.roadTax.toLocaleString("en-IN")}` },
                    { label: "Registration Charges", value: `₹${item.breakdown.registrationCharges.toLocaleString("en-IN")}` },
                    { label: "Fastag", value: `₹${item.breakdown.fastag.toLocaleString("en-IN")}` },
                    { label: "Cess", value: `₹${item.breakdown.roadSafetyCess.toLocaleString("en-IN")}` },
                    { label: "Other Charges", value: `₹${item.breakdown.otherCharges.toLocaleString("en-IN")}` },
                    { label: "Insurance", value: `₹${item.breakdown.insurance.toLocaleString("en-IN")}` },
                    { label: "Total", value: `₹${item.breakdown.total.toLocaleString("en-IN")}` }
                ]
                : []
        }));
    };

    const normalized = normalizeData(data);

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
                    {normalized.map((variant, index) => (
                        <div key={index} className="border-b p-4 space-y-4 dark:border-[#2E2E2E]">
                            <button
                                onClick={() => {
                                    setOpenIndex(openIndex === index ? null : index)
                                    setVariantId?.(variant.variantId)
                                }}
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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            {/* Expanded Section */}
                            {variant.details.length > 0 && (
                                <div className="text-sm border rounded-xl overflow-hidden dark:border-[#2E2E2E] pl-1 bg-primary">
                                    {variant.details.map((d, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between p-5 border-b last:border-none bg-gray-50 dark:bg-[#171717] dark:border-[#2E2E2E]"
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
