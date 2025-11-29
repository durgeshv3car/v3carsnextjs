'use client'

import Link from "next/link";
import React from "react";

interface DimensionsTableProps {
    model: string;
    data: ModelSpecificationResponse[] | null
    type: string;
    slug: string;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    groundClearance: number;
}

export interface BootSpace {
    normal: number;
    cng: number;
    hybrid: number;
}

export interface TyreSize {
    base: string;
    top: string;
}

export interface ModelSpecificationResponse {
    success: boolean;
    modelId: number;
    modelName: string;
    dimensions: Dimensions;
    bootSpace: BootSpace;
    tyreSize: TyreSize;
}


const DimensionsTable: React.FC<DimensionsTableProps> = ({ model, data, type, slug }) => {
    const item = data?.[0];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E] overflow-hidden">

            {/* Table */}
            <div className="border-b dark:border-[#2E2E2E]">
                <div className="bg-[#DEE2E6] border-b border-gray-200 p-3 text-center dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <span className="font-semibold">{model}</span> Dimensions
                </div>

                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Length</td>
                            <td className="p-6 text-center">{item?.dimensions.length} mm</td>
                        </tr>

                        <tr className="border-b dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Width</td>
                            <td className="p-6 text-center">{item?.dimensions.width} mm</td>
                        </tr>

                        <tr className="border-b dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Height</td>
                            <td className="p-6 text-center">{item?.dimensions.height} mm</td>
                        </tr>

                        <tr className="border-b dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Wheelbase</td>
                            <td className="p-6 text-center">{item?.dimensions.wheelbase} mm</td>
                        </tr>

                        <tr className="border-b dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Ground Clearance</td>
                            <td className="p-6 text-center">{item?.dimensions.groundClearance} mm</td>
                        </tr>

                        <tr className="border-b align-top dark:border-[#2E2E2E]">
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Boot Space</td>
                            <td className="p-6 text-center">
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <span className="bg-gray-100 dark:bg-[#2e2e2e] dark:border-[#2e2e2e] border px-2 py-1 rounded text-xs font-medium">
                                        Normal: {item?.bootSpace.normal} L
                                    </span>
                                    <span className="bg-gray-100 dark:bg-[#2e2e2e] dark:border-[#2e2e2e] border px-2 py-1 rounded text-xs font-medium">
                                        CNG: {item?.bootSpace.cng} L
                                    </span>
                                    <span className="bg-gray-100 dark:bg-[#2e2e2e] dark:border-[#2e2e2e] border px-2 py-1 rounded text-xs font-medium">
                                        Hybrid: {item?.bootSpace.hybrid} L
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="p-6 border-r dark:border-[#2e2e2e] w-1/2 font-semibold">Tyre Size</td>
                            <td className="p-6 ">
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <span className="bg-gray-100 dark:bg-[#2e2e2e] dark:border-[#2e2e2e] border px-2 py-1 rounded text-xs font-medium">
                                        Base: {item?.tyreSize.base}
                                    </span>
                                    <span className="bg-gray-100 dark:bg-[#2e2e2e] dark:border-[#2e2e2e] border px-2 py-1 rounded text-xs font-medium">
                                        Top: {item?.tyreSize.top}
                                    </span>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <div className="text-center my-4 hover:underline">
                <Link
                    href={`/${type}/${slug}/dimensions`}
                    className="text-sm flex justify-center gap-1 items-center"
                >
                    Find the exact dimensions of Tata Nexon in{" "}
                    <span className="font-semibold hidden md:block">
                        feet, inches, centimeters, and millimeters!
                    </span>{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};


export default DimensionsTable;
