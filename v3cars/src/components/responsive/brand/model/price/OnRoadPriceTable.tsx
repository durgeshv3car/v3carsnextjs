'use client'

import React, { useState } from "react";

export interface PriceListItem {
    variantId: number;
    name: string;
    powertrain: Powertrain;
    exShowroom: number;
    exShowroomMax: number;
    onRoad: number;
    csdPrice: number;
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
    childSlug: string;
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

const OnRoadPriceTable: React.FC<OnRoadPriceTableProps> = ({ title, desc, data, childSlug, fuelTypes, fuelType, transmissionType, setVariantId, setFuelType, setTransmissionType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const normalizeData = (rows: PriceListItem[]) => {
        return rows.map((item) => ({
            variantId: item.variantId,
            name: item.name,
            engine: item.powertrain.label,
            exShowroom: toLakh(item.exShowroom),
            onRoad: toLakh(item.onRoad),
            csdPrice: toLakh(item.csdPrice),
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

            <div className={`border rounded-xl overflow-hidden dark:border-[#2E2E2E] ${childSlug === "csd-price" ? "border-b-0 rounded-b-none" : ""}`}>
                <div className="flex flex-wrap items-center justify-between text-xs p-1 gap-2 mb-2">
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
                    <p className="mx-4">Last Updated: 24/10/2025</p>
                </div>

                <div className="overflow-x-auto scrollbar-hide">

                    <table className="w-full text-left text-sm bg-white dark:bg-[#171717]">

                        {/* Table Header */}
                        <thead>
                            <tr className="bg-[#DEE2E6] dark:bg-[#232323] border-b dark:border-[#2E2E2E] font-semibold">

                                <th className="px-4 py-3 min-w-[250px] border-r dark:border-[#2E2E2E]">Variants</th>

                                {childSlug === "csd-price" && (
                                    <th className="px-4 py-3 min-w-[250px] text-center border-r dark:border-[#2E2E2E]">
                                        Eligibility (Rank/Pay level)
                                    </th>
                                )}

                                <th className="px-4 py-3 min-w-[250px] text-center border-r dark:border-[#2E2E2E]">
                                    {childSlug === "csd-price"
                                        ? "CSD Price"
                                        : "Ex-Showroom Price"}
                                </th>

                                <th className="px-4 py-3 min-w-[250px] text-center">On-Road Price</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y dark:divide-[#2E2E2E]">

                            {normalized.map((variant, index) => (
                                <React.Fragment key={index}>

                                    {/* Variant Row */}
                                    <tr
                                        className="border-b dark:border-[#2E2E2E] hover:bg-gray-50 dark:hover:bg-[#1D1D1D] cursor-pointer"
                                        onClick={() => {
                                            setOpenIndex(openIndex === index ? null : index);
                                            setVariantId?.(variant.variantId);
                                        }}
                                    >
                                        {/* Variant Name + Engine */}
                                        <td className="px-4 py-4 w-[250px] border-r dark:border-[#2E2E2E]">
                                            <p className="font-medium">{variant.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {variant.engine}
                                            </p>
                                        </td>

                                        {/* Eligibility column */}
                                        {childSlug === "csd-price" && (
                                            <td className="px-4 py-4 w-[250px] border-r text-center dark:border-[#2E2E2E]">
                                                -
                                            </td>
                                        )}

                                        {/* CSD / Ex-showroom */}
                                        <td className="px-4 py-4 w-[250px] border-r text-center dark:border-[#2E2E2E]">
                                            {childSlug === "csd-price"
                                                ? variant.csdPrice
                                                : variant.exShowroom}
                                        </td>

                                        {/* On-Road Price */}
                                        <td className="px-4 py-4 w-[250px]">
                                            <div className="flex items-center">
                                                <span className="text-center w-full">
                                                    {variant.onRoad}
                                                </span>

                                                {openIndex === index ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" strokeWidth={1.5}
                                                        stroke="currentColor" className="size-5 text-primary transition duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M5 12h14" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" strokeWidth={1.5}
                                                        stroke="currentColor" className="size-5 transition duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expanded Details Row */}
                                    {openIndex === index && variant.details.length > 0 && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    childSlug === "csd-price" ? 5 : 4
                                                }
                                            >
                                                <div className="m-2 border border-b-0 dark:border-[#2E2E2E] rounded-xl overflow-hidden">

                                                    {variant.details.map((d, i) => (
                                                        <div key={i} className="border-l-4 border-primary">
                                                            <div
                                                                className={`
                                                                    flex justify-between p-5 border-b dark:border-[#2E2E2E]
                                                                    ${i === variant.details.length - 1
                                                                        ? "bg-[#E5E5E5] font-semibold dark:bg-[#232323]"
                                                                        : "bg-gray-50 dark:bg-[#171717]"
                                                                    }
    `}
                                                            >
                                                                <span>{d.label}</span>
                                                                <span>
                                                                    {d.value}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </React.Fragment>
                            ))}

                        </tbody>
                    </table>

                </div>

            </div>

            {
                childSlug === "csd-price" && (
                    <p className="bg-gray-200 dark:bg-[#232323] border border-t-0 p-4 rounded-xl rounded-t-none dark:border-[#2e2e2e] text-sm">For serving/retired defence personnel with valid CSD entitlement. Prices/eligibility depend on CSD/DGQA norms, depot/URC availability and may vary by city. Registration, insurance and handling are extra. Please confirm with your URC and dealer.</p>
                )
            }
        </div>
    );
};

export default OnRoadPriceTable;
