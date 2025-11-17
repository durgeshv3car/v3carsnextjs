'use client'

import React, { useState } from "react";

interface Spec {
    label: string;
    value: string;
}

const EngineSpecs: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Engine & Transmission");

    const specsData: Record<string, Spec[]> = {
        "Engine & Transmission": [
            { label: "Engine Type", value: "Turbo" },
            { label: "Engine Displacement", value: "1.2L" },
            { label: "Cubic capacity (CC)", value: "1199cc" },
            { label: "Cylinders", value: "3" },
            { label: "Max Power", value: "120PS @ 5500rpm" },
            { label: "Max Torque", value: "170Nm @ 1750 - 4000rpm" },
            { label: "Kerb Weight", value: "1221 Kg" },
            { label: "Power/Weight", value: "94.19PS/tonne" },
            { label: "Torque/Weight", value: "117.94Nm/tonne" },
            { label: "Gearbox", value: "1199cc" },
            { label: "Transmission", value: "6-speed MT" },
            { label: "Drivetrain", value: "FWD" },
        ],
        "Fuel & Performance": [
            { label: "Fuel Tank Capacity", value: "Fuel Tank Capacity" },
            { label: "Claimed Mileage (ARAI)", value: "17.00kmpl" },
            { label: "Real World Mileage", value: "Click here to check!" },
        ],
        Mileage: [
            { label: "Claimed FE", value: "17.00kmpl" },
            { label: "Real World Mileage", value: "17.00kmpl" },
            { label: "Mileage in City", value: "17.00kmpl" },
            { label: "Highway Mileage", value: "17.00kmpl" },
        ],
    };

    return (
        <div>
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">
                    Tata Nexon Engine Specs & Performance
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    In September 2025, the total sales figure of Nexon was 22,573 units,
                    which is a 37.96 percent MoM growth. In September 2025, the total
                    sales figure of Tata cars was 22,573 units. Want to compare monthly
                    sales figures for all Tata models?{" "}
                    <a href="#" className="text-blue-600 underline">
                        Click here to compare all Tata car sales.
                    </a>
                </p>
            </div>

            {/* Variant Selector */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl">Tata Nexon <span className="font-semibold">Mileage, Specs & Features</span></h2>
                <select name="" id="" className="border rounded-lg p-3 bg-gray-50 dark:bg-[#171717] dark:border-[#2e2e2e] text-sm">
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                </select>
            </div>

            <div className="flex border rounded-lg overflow-hidden dark:border-[#2e2e2e]">
                {/* Left Tabs */}
                <div className="w-1/5 bg-[#F6F6F6] dark:bg-[#171717] border-r divide-y dark:border-[#2e2e2e] dark:divide-[#2e2e2e]">
                    {Object.keys(specsData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left p-4 text-sm font-medium ${activeTab === tab
                                ? "bg-[#484848] text-white border-gray-900"
                                : ""
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right Table */}
                <div className="w-4/5">
                    <table className="w-full text-sm">
                        <tbody>
                            {specsData[activeTab].map((spec, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white dark:bg-[#171717]" : "bg-gray-50 dark:bg-[#2e2e2e]"
                                        } border-b dark:border-[#292929]`}
                                >
                                    <td className="p-4 w-1/2 font-medium border-r dark:border-[#2e2e2e]">
                                        {spec.label}
                                    </td>
                                    <td className="p-4">{spec.value}</td>
                                </tr>
                            ))}
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EngineSpecs;
