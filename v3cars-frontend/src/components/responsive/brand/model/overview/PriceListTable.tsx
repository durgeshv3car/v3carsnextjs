'use client'

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface PriceListTableProps {
    slug?: string;
    type?: string;
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
    csdPrice: number;
    onRoad: number | null;
    updatedDate: string;
}

export const convertToSlug = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
};

const PriceListTable: React.FC<PriceListTableProps> = ({ type, slug, data, setFuelType, fuelType, fuelTypes, transmissionType, setTransmissionType }) => {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const [priceType, setPriceType] = useState("Ex-Showroom");
    const router = useRouter()

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
                            {
                                fuel.toLowerCase() === fuelType && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                )
                            }
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
                        {
                            transmissionType === "manual" && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            )
                        }
                        Manual
                    </button>
                    <button
                        onClick={() => setTransmissionType?.("automatic")}
                        className={`flex items-center gap-1 p-3 rounded-md border shadow text-xs
                            dark:border-[#2E2E2E] ${transmissionType === "automatic" ? "bg-primary text-black" : "bg-white dark:bg-[#171717] hover:bg-gray-200"}`
                        }
                    >
                        {
                            transmissionType === "automatic" && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            )
                        }
                        Automatic
                    </button>

                    {/* Price type */}
                    <div className="border rounded ml-auto flex items-center p-1 dark:border-[#2e2e2e]">
                        {
                            priceTypes && priceTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`p-2 text-xs ${type === priceType ? "bg-primary rounded text-black" : ""}`}
                                    onClick={() => setPriceType(type)}
                                >
                                    {type}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* Variant Table */}
                <div
                    className={`border border-gray-200 overflow-x-auto dark:border-[#2E2E2E] scrollbar-hide`}
                >
                    <table className="w-full">
                        <thead className="bg-[#DEE2E6] border-b border-gray-200 text-sm font-semibold dark:bg-[#2e2e2e] dark:border-[#2E2E2E] text-left">
                            <tr>
                                <th className="p-4 min-w-[200px]">Variants</th>
                                <th className="p-4 min-w-[200px]">{priceType} Price</th>
                                <th className="p-4 min-w-[200px]">On-Road Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.slice(0, 4)?.map((v, idx) => (
                                <tr
                                    key={v.variantId}
                                    className={`text-sm border-b dark:border-[#2e2e2e] bg-white dark:bg-[#171717]`}
                                >
                                    <td className="p-4 min-w-[200px]">
                                        <p className="font-medium">{v.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {v.powertrain.label}
                                        </p>
                                    </td>

                                    <td className="p-4 min-w-[200px]">
                                        {
                                            priceType === "Ex-Showroom" ? (
                                                <span>₹{(v.exShowroom / 100000).toFixed(2)} Lakh</span>
                                            )
                                                : (
                                                    <span>₹{(v.csdPrice / 100000).toFixed(2)} Lakh</span>
                                                )
                                        }
                                    </td>

                                    <td className="p-4 min-w-[200px]">
                                        {v.onRoad
                                            ? `₹${(v.onRoad / 100000).toFixed(2)} Lakh`
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="text-center bg-[#F2F5F9] dark:bg-[#232323]">
                    <button
                        onClick={() => router.push(`/${type}/${slug}/price-in-${convertToSlug(selectedCity.cityName)}`)}
                        className="text-sm font-medium flex items-center justify-center mx-auto hover:underline gap-1 py-4"
                    >
                        View All Model Price
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className={`size-4 -rotate-90`}>
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


const priceTypes = [
    "Ex-Showroom",
    "CSD",
]