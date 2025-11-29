'use client'

import { useRouter } from "next/navigation";
import React from "react";

interface VariantTableProps {
    data: VariantWithPowertrain[] | null;   // FIXED
    type: string;
    slug: string;
}

export interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

export interface VariantDetails {
    variantId: number;
    name: string;
    exShowroom: number;
    exShowroomMax: number;
    vfmValue: number;
    vfmRank: number;
    recommendation: string;
    updatedDate: string;
}

export interface VariantWithPowertrain {
    powertrain: Powertrain;
    variant: VariantDetails;
}

const VariantTable: React.FC<VariantTableProps> = ({ data, type, slug }) => {
    const router = useRouter()

    // ✅ Transform + reverse + match UI structure
    const variants = data
        ?.slice()
        .reverse()
        .map((item) => ({
            powertrain: item.powertrain.label,
            variant: item.variant.name,
        })) ?? [];

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E]">

            {/* Table */}
            <table className="w-full">
                <thead className="bg-[#DEE2E6] border-b border-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <tr className="text-sm font-semibold">
                        <th className="p-4 border-r dark:border-[#2e2e2e] text-left">Powertrain</th>
                        <th className="p-4 text-left">Top Recommended Variant</th>
                    </tr>
                </thead>

                <tbody>
                    {variants.map((v, idx) => (
                        <tr
                            key={idx}
                            className={`text-sm border-b dark:border-[#2e2e2e] ${idx % 2 === 0
                                ? "bg-white dark:bg-[#171717]"
                                : "bg-gray-50 dark:bg-[#2E2E2E]"
                                }`}
                        >
                            <td className="p-6 border-r dark:border-[#2e2e2e]">
                                <p className="font-medium">{v.powertrain}</p>
                            </td>

                            <td className="p-6">
                                <p className="font-medium">{v.variant}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="text-center my-4">
                <button 
                className="text-sm font-medium flex items-center justify-center mx-auto gap-1"
                onClick={() => {router.push(`/${type}/${slug}/which-variant-to-buy`)}}
                >
                    <span className="hidden md:block">See Which Tata Nexon Variant Offers the</span>
                    <span className="font-semibold hover:underline"> Best Value for Money</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VariantTable;
