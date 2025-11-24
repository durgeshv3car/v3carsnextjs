'use client'

import { useGetMileageSpecsFeaturesQuery } from "@/redux/api/carModuleApi";
import React, { useEffect, useState } from "react";

interface SpecsListTableProps {
    model: string;
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

const SpecsListTable: React.FC<SpecsListTableProps> = ({ model, slug, childSlug }) => {
    const [powertrain, setPowertrain] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("");
    const { data, isLoading } = useGetMileageSpecsFeaturesQuery(
        {
            model_slug: slug,
            powertrainId: powertrain ?? undefined,
        },
        { skip: !slug }
    );

    const carSpecs = data as CarSpecification;

    useEffect(() => {
        if (carSpecs?.sections?.[0]?.group) {
            setActiveTab(carSpecs.sections[0].group);
        }
    }, [carSpecs]);

    return (
        <div>

            {/* Powertrain Dropdown */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-3">
                <h2 className="text-xl">{model} <span className="font-semibold">Mileage, Specs & Features</span></h2>
                <select
                    className="border p-2 rounded-lg dark:bg-[#171717] dark:border-[#2e2e2e] text-sm"
                    onChange={(e) => setPowertrain(Number(e.target.value))}
                >
                    {carSpecs && carSpecs.options.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex border rounded-lg overflow-hidden dark:border-[#2e2e2e]">
                {/* LEFT TABS */}
                <div className="w-1/2 md:w-1/5 bg-gray-100 border-r divide-y dark:bg-[#171717] dark:border-[#2e2e2e] dark:divide-[#2e2e2e]">
                    {carSpecs && carSpecs?.sections.map((sec) => (
                        <button
                            key={sec.group}
                            onClick={() => setActiveTab(sec.group)}
                            className={`w-full text-left p-4 text-sm font-medium 
                                ${activeTab === sec.group ? "bg-[#484848] text-white" : ""}
                            `}
                        >
                            {sec.group}
                        </button>
                    ))}
                </div>

                {/* RIGHT TABLE */}
                <div className="w-4/5">
                    <table className="w-full text-sm">
                        <tbody>
                            {carSpecs && carSpecs?.sections
                                .find((s) => s.group === activeTab)
                                ?.rows.map((row, i) => (
                                    <tr key={i} className="border-b dark:border-[#2e2e2e]">
                                        <td className="p-4 w-1/2 font-medium border-r dark:border-[#2e2e2e]">
                                            {row.label}
                                        </td>
                                        <td className="p-4">{row.value}</td>
                                    </tr>
                                ))
                            }

                            {
                                childSlug === "engine-specifications" && (
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="flex justify-center items-center">
                                                <div className="text-center py-4 w-fit">
                                                    <p className="text-sm mb-3">
                                                        Find the exact dimensions of Kia Seltos in feet, inches, centimeters,
                                                        and millimeters!
                                                    </p>
                                                    <button className="bg-yellow-400 text-black px-5 w-full py-2 rounded-full shadow hover:bg-yellow-500 transition">
                                                        Click Here To Explore All The Details
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default SpecsListTable;
