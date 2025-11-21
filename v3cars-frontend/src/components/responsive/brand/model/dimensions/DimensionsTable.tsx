'use client'

import React from "react";
import { Capacity, Conversions } from "./DimensionsPage";

interface DimensionsTableProps {
    title: string
    conversionsData: Conversions | null;
    capacityData: Capacity | null;
}

const DimensionsTable = ({ title, conversionsData, capacityData }: DimensionsTableProps) => {
    return (
        <div>
            {/* Heading */}
            <h2 className="text-2xl mb-3">Dimensions of {title}</h2>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
                {conversionsData
                    ? `${title} dimensions are ${conversionsData.length.mm}mm in length, ${conversionsData.width.mm}mm in width and ${conversionsData.height.mm}mm in height. A wider body normally results in better shoulder room inside the car while a higher roof makes it easier to get in and out of the car. ${new Date().getFullYear()} ${title} rides on a ${conversionsData.wheelbase.mm}mm wheelbase. The wheelbase is the distance between the centre of the front and rear wheels. A longer wheelbase usually results in better legroom. The ${new Date().getFullYear()} ${title} features a ground clearance of ${conversionsData.groundClearance.mm}mm. Higher ground clearance allows you to navigate tall speed breakers and rough roads without damaging the car's underbody.`
                    : `${title} dimensions information is loading...`}
            </p>

            {/* Dimensions Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-xl mb-6 dark:border-[#2E2E2E]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717]">
                        <tr>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                {title} Dimensions
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in mm
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in cm
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                in inches
                            </th>
                            <th className="p-5 font-semibold">in feet</th>
                        </tr>
                    </thead>

                    {/* Dynamic Rows */}
                    <tbody>
                        {conversionsData &&
                            Object.entries(conversionsData).map(([key, value], index) => {
                                const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
                                const isLast = index === Object.entries(conversionsData).length - 1;

                                return (
                                    <tr
                                        key={key}
                                        className={`${index % 2 === 0 ? "bg-white dark:bg-[#2E2E2E]" : ""}`}
                                    >
                                        <td className="p-5 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                            {label}
                                        </td>
                                        <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                            {value.mm}
                                        </td>
                                        <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                            {value.cm}
                                        </td>
                                        <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                            {value.inches}
                                        </td>
                                        <td className="p-5">{value.feet}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Below Table Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
                {capacityData
                    ? `The ${title} offers a boot space of ${capacityData.bootSpace.Petrol} litres, providing ample room for your luggage. The ${title} comes with a fuel tank capacity of ${capacityData.fuelTankCapacity.Petrol} litres. Please note that the ${title} maximum seating capacity is ${capacityData.seatingCapacity}; however, individual comfort levels may vary.`
                    : `${title} capacity information is loading...`}
            </p>

            {/* Capacity Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-xl mb-6 dark:border-[#2E2E2E]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717]">
                        <tr>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                {title} Capacity
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Petrol
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                Diesel
                            </th>
                            <th className="p-5 border-r border-gray-300 font-semibold dark:border-[#2E2E2E]">
                                CNG
                            </th>
                            <th className="p-5 font-semibold">Hybrid</th>
                        </tr>
                    </thead>

                    <tbody>
                        {capacityData && (
                            <>
                                {/* Boot Space */}
                                <tr className="bg-white dark:bg-[#2E2E2E]">
                                    <td className="p-5 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                        Boot Space
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.bootSpace.Petrol}L
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.bootSpace.Diesel}L
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.bootSpace.CNG}L
                                    </td>
                                    <td className="p-5">
                                        {capacityData.bootSpace.Hybrid ?? "N/A"}L
                                    </td>
                                </tr>

                                {/* Fuel Tank */}
                                <tr>
                                    <td className="p-5 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                        Fuel Tank Capacity
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.fuelTankCapacity.Petrol}L
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.fuelTankCapacity.Diesel}L
                                    </td>
                                    <td className="p-5 border-r border-gray-300 dark:border-[#2E2E2E]">
                                        {capacityData.fuelTankCapacity.CNG}L
                                    </td>
                                    <td className="p-5">
                                        {capacityData.fuelTankCapacity.Hybrid ?? "N/A"}L
                                    </td>
                                </tr>

                                {/* Seating Capacity */}
                                <tr className="bg-white dark:bg-[#2E2E2E]">
                                    <td className="p-5 border-r border-gray-300 font-medium dark:border-[#2E2E2E]">
                                        Seating Capacity
                                    </td>
                                    <td className="border-r border-gray-300 dark:border-[#2E2E2E] p-5">
                                        {capacityData.seatingCapacity}
                                    </td>
                                    <td className="border-r border-gray-300 dark:border-[#2E2E2E] p-5">
                                        {capacityData.seatingCapacity}
                                    </td>
                                    <td className="border-r border-gray-300 dark:border-[#2E2E2E] p-5">
                                        {capacityData.seatingCapacity}
                                    </td>
                                    <td className="p-5">
                                        {capacityData.seatingCapacity}
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DimensionsTable;
