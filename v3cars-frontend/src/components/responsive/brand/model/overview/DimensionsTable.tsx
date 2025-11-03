'use client'

import React from "react";

const DimensionsTable: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* Table */}
            <div className="border border-gray-200 rounded-xl rounded-b-none overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 py-2 px-3 text-center font-semibold text-gray-800">
                    Tata Nexon Dimension
                </div>
                <table className="w-full text-sm text-gray-700">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 w-1/2 font-medium">Length</td>
                            <td className="p-3">3995mm</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium">Width</td>
                            <td className="p-3">1804mm</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium">Height</td>
                            <td className="p-3">1620mm</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium">Wheelbase</td>
                            <td className="p-3">2498mm</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium">Ground Clearance</td>
                            <td className="p-3">208mm</td>
                        </tr>
                        <tr className="border-b border-gray-200 align-top">
                            <td className="p-3 font-medium">Boot Space</td>
                            <td className="p-3">
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium">
                                        Normal : 382L
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium">
                                        CNG : 382L
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium">
                                        Hybrid : 382L
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium">Tyre Size</td>
                            <td className="p-3">
                                <div className="flex flex-col sm:flex-row sm:gap-4">
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium">
                                        Base : 195/60 R16
                                    </span>
                                    <span className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-medium">
                                        Top : 215/60 R16
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer link */}
            <div className="text-center my-3 hover:underline">
                <a
                    href="#"
                    className="text-sm flex justify-center gap-1 items-center"
                >
                    Find the exact dimensions of Tata Nexon in{" "}
                    <span className="font-semibold">
                        feet, inches, centimeters, and millimeters!
                    </span>{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default DimensionsTable;
