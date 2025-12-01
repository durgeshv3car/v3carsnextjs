'use client'

import { useGetMileageSpecsFeaturesQuery } from "@/redux/api/carModuleApi";
import React, { useState } from "react";

interface SpecsListTableProps {
    title: string;
    slug: string;
    childSlug?: string;
}

export interface PowertrainOption {
    id: number;
    label: string;
    fuelType: string;
    transmissionType: string;

}
export interface HeaderInfo {
    powertrainLabel: string;
    fuelType: string;
    transmission: string;
}

export interface SpecRow {
    label: string;
    value: string;
}

export interface SpecSection {
    group: string;
    rows: SpecRow[];
}

export interface CarSpecification {
    options: PowertrainOption[];
    selectedPowertrainId: number;
    header: HeaderInfo;
    sections: SpecSection[];
}

export default function SpecsTechnicalDetails({ title, slug, childSlug }: SpecsListTableProps) {
    const [powertrain, setPowertrain] = useState<number | null>(null);
    const { data } = useGetMileageSpecsFeaturesQuery(
        {
            model_slug: slug,
            powertrainId: powertrain ?? undefined,
        },
        { skip: !slug }
    );

    console.log(childSlug);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <h2 className="text-lg">
                    {title} Engine Specs and Technical Details
                </h2>

                <select
                    className="border rounded-lg px-2 py-4 text-sm w-[300px] bg-transparent dark:border-[#2e2e2e]"
                    onChange={(e) => {
                        setPowertrain(Number(e.target.value))
                    }}
                >
                    {
                        data && data.options.map((option: PowertrainOption, idx: number) => (
                            <option value={option.id} className="dark:bg-[#171717] dark:border-[#2e2e2e]" key={idx}>{option.label}</option>
                        ))
                    }
                </select>
            </div>

            <div className="border rounded-t-xl overflow-hidden border-b-0 dark:border-[#2e2e2e]">

                <table className="w-full text-sm">

                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#CED4DA] dark:bg-[#232323] border-b dark:border-[#2e2e2e] font-semibold">
                            <th className=" text-lg p-5 w-1/2 text-left border-r dark:border-[#2e2e2e]">Specification</th>
                            <th className=" text-lg p-5 w-1/2 text-left">Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data && data.sections.map((item, sIdx) =>
                            item.rows.map((row, rIdx) => (
                                <tr
                                    key={`${sIdx}-${rIdx}`}
                                    className="border-b dark:border-[#2e2e2e] bg-white dark:bg-[#171717]"
                                >
                                    <td className="p-5 border-r dark:border-[#2e2e2e]">{row.label}</td>
                                    <td className="p-5 font-medium">{row.value}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>


            <div className="text-sm text-center p-5 cursor-pointer hover:underline border border-t-0 rounded-b-xl bg-[#F2F5F9] dark:bg-[#232323] dark:border-[#2e2e2e]">
                Find The Exact Dimensions Of {title} In Feet, Inches, Centimeters And Millimeters
            </div>
        </div>
    );
}
