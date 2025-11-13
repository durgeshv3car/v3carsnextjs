'use client'

import React, { useState } from "react";

interface SpecsListTableProps {
    model: string
}

const SpecsListTable: React.FC<SpecsListTableProps> = ({ model }) => {
    const [selectedVariant, setSelectedVariant] = useState(
        "1.2L Turbo Petrol with 6-speed MT"
    );

    const specs = [
        { category: "Engine & Transmission", label: "Engine Type", value: "Turbo" },
        { category: "Fuel & Performance", label: "Engine Displacement", value: "1.2L" },
        { category: "Mileage", label: "Cubic Capacity", value: "1199cc" },
        { category: "Features", label: "Cylinders", value: "3" },
        { category: "Safety", label: "Max. Power", value: "120PS @ 5500rpm" },
        { category: "ADAS", label: "Max. Torque", value: "170Nm @ 1750 - 4000rpm" },
        { category: "Infotainment", label: "Transmission", value: "6-speed MT" },
        { category: "Functional", label: "Kerb Weight", value: "1240kg" },
        { category: "Style", label: "Power : Weight", value: "96.77PS/tonne" },
        { category: "Style", label: "Torque : Weight", value: "137.10Nm/tonne" },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg">
                    {model}{" "}
                    <span className="font-semibold">Mileage, Specs & Features</span>
                </h2>

                {/* Variant Dropdown */}
                <div className="relative">
                    <select
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        className="appearance-none text-sm border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                        <option>1.2L Turbo Petrol with 6-speed MT</option>
                        <option>1.2L Turbo Petrol with 6-speed AMT</option>
                        <option>1.5L Diesel with 6-speed MT</option>
                    </select>
                </div>
            </div>

            {/* Specs Table */}
            <div className="border border-gray-200 rounded-md overflow-hidden text-sm">
                <div className="grid grid-cols-3 bg-gray-50 font-semibold border-b border-gray-200">
                    <div className="p-4 text-gray-700">Category</div>
                    <div className="p-4 text-gray-700">Specification</div>
                    <div className="p-4 text-gray-700">Details</div>
                </div>

                {specs.map((item, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-3 border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }`}
                    >
                        <div className="p-4 font-medium text-gray-800 border-r border-gray-100">
                            {item.category}
                        </div>
                        <div className="p-4 text-gray-700 border-r border-gray-100">
                            {item.label}
                        </div>
                        <div className="p-4 text-gray-600">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecsListTable;
