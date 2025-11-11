'use client'

import React from "react";

const DimensionsTable = () => {
    return (
        <div>
            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-3">
                Dimensions of Tata Nexon
            </h2>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
                Tata Nexon dimensions are 3995mm in length, 1804mm in width and
                1620mm in height. A wider body normally results in better shoulder room
                inside the car while a higher roof makes it easier to get in and out of
                the car. 2025 Tata Nexon rides on a 2498mm wheelbase. The wheelbase is
                the distance between the centre of the front and rear wheels. A longer
                wheelbase usually results in better legroom. The 2025 Tata Nexon
                features a ground clearance of 208mm. Higher ground clearance allows you
                to navigate tall speed breakers and rough roads without damaging the
                car’s underbody.
            </p>

            {/* Dimensions Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-xl mb-6 dark:border-[#2E2E2E]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717]">
                        <tr>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Nexon Dimensions
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in mm
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in cm
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in inches
                            </th>
                            <th className="px-4 py-3 font-semibold">
                                in feet
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Length", "3995", "399.5", "157.28", "13.10"],
                            ["Width", "1804", "180.4", "71.02", "5.91"],
                            ["Height", "1620", "162", "63.78", "5.31"],
                            ["Wheelbase", "2498", "249.8", "198.35", "8.19"],
                            ["Ground Clearance", "208", "20.8", "46", "2"],
                        ].map(([label, mm, cm, inches, feet], i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? "bg-white dark:bg-[#2E2E2E]" : ""}`}
                            >
                                <td className="px-4 py-2 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                    {label}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{mm}</td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{cm}</td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{inches}</td>
                                <td className="px-4 py-2">{feet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Description Below Table */}
            <p className="text-gray-400 mb-6 leading-relaxed">
                The Tata Nexon offers a boot space of 382 litres, providing ample room
                for your luggage. The Nexon comes with a fuel tank capacity of 44
                litres. Please note that the Nexon maximum seating capacity is 5;
                however, individual comfort levels may vary.
            </p>

            {/* Capacity Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-xl mb-6 dark:border-[#2E2E2E]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717]">
                        <tr>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Nexon Capacity
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Petrol
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Diesel
                            </th>
                            <th className="px-4 py-3 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                CNG
                            </th>
                            <th className="px-4 py-3">
                                Hybrid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Boot Space", "382L", "382L", "382L", "382L"],
                            ["Fuel Tank Capacity", "44L", "44L", "60L (app.8kg)", "44L"],
                            ["Maximum Seating Capacity", "5", "5", "5", "5"],
                        ].map(([label, petrol, diesel, cng, hybrid], i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? "bg-white dark:bg-[#2E2E2E]" : ""}`}
                            >
                                <td className="px-4 py-2 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                    {label}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{petrol}</td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{diesel}</td>
                                <td className="px-4 py-2 border-r border-gray-300 dark:border-[#2E2E2E]">{cng}</td>
                                <td className="px-4 py-2">{hybrid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DimensionsTable;
