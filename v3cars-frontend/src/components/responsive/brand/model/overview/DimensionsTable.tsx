'use client'

import Link from "next/link";
import React from "react";

const DimensionsTable: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E]">

            {/* Table */}
            <div className="border border-gray-200 rounded-xl rounded-b-none overflow-hidden dark:border-[#2E2E2E]">
                <div className="bg-gray-50 border-b border-gray-200 p-3 text-center font-semibold dark:bg-[#171717] dark:border-[#2E2E2E]">
                    Tata Nexon Dimension
                </div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                            <td className="p-3 w-1/2 font-medium">Length</td>
                            <td className="p-3">3995mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                            <td className="p-3 font-medium">Width</td>
                            <td className="p-3">1804mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                            <td className="p-3 font-medium">Height</td>
                            <td className="p-3">1620mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                            <td className="p-3 font-medium">Wheelbase</td>
                            <td className="p-3">2498mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                            <td className="p-3 font-medium">Ground Clearance</td>
                            <td className="p-3">208mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 align-top dark:border-[#2E2E2E]">
                            <td className="p-3 font-medium">Boot Space</td>
                            <td className="p-3">
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                                        Normal : 382L
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                                        CNG : 382L
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                                        Hybrid : 382L
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium">Tyre Size</td>
                            <td className="p-3">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                                        Base : 195/60 R16
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium dark:bg-[#171717] dark:border-[#2E2E2E]">
                                        Top : 215/60 R16
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer link */}
            <div className="text-center my-4 hover:underline">
                <Link
                    href="#"
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
