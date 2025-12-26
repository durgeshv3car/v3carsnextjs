'use client'

import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface SpecsFeaturesProps {
    title: string
}

export default function SpecsFeatures({ title }: SpecsFeaturesProps) {
    const categories = [
        {
            label: "Safety",
            sub: [
                "Advance Safety Features",
                "Basic Safety Features",
                "Lighting",
                "Mirror & Parking Aid",
                "Standard Safety Features",
            ],
        },
        { label: "ADAS" },
        { label: "Infotainment" },
        { label: "Functional" },
        { label: "Style" },
    ];

    const variants = ["LXI", "LXI", "LXI", "LXI", "LXI"];

    const features = [
        { name: "Blind View Monitor", values: [true, true, true, true, true] },
        { name: "All Wheel Disc Brakes", values: [false, "-", "-", "-", "-"] },
        { name: "Multi Collision Brakes", values: [true, true, true, true, true] },
        { name: "Roll Over Protection", values: ["-", "-", "-", "-", "-"] },
        { name: "Electronic Differential Lock System", values: ["-", "-", "-", "-", "-"] },
        { name: "Hill Descent Control", values: [true, true, true, true, true] },
        { name: "Electronic Stability Control", values: [true, true, true, true, true] },
        { name: "Hill Assist Control", values: [true, true, true, true, true] },
        { name: "Driver Rear View Monitor", values: [true, true, true, true, true] },
        { name: "Airbags", values: [true, true, true, true, true] },
        { name: "Traction Control", values: [true, true, true, true, true] },
        { name: "Dashcam", values: ["-", "-", "-", "-", "-"] },
    ];

    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold">{title} <span className="font-medium">Variant-Wise Features</span></h2>

                {/* Top Right Dropdown */}
                <div className="flex">
                    <div className="relative">
                        <select className="border rounded-lg px-2 py-4 text-sm w-[300px] bg-transparent dark:border-[#2e2e2e] shadow-sm appearance-none">
                            <option className="dark:bg-[#171717] dark:border-[#2e2e2e]">1.2L Turbo Petrol with 6-speed MT</option>
                        </select>
                        <BiChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {/* LEFT SIDEBAR */}
                <div className="w-[170px] md:w-[220px] border rounded-xl overflow-hidden bg-gray-50 dark:bg-[#171717] dark:border-[#2e2e2e]">
                    {categories.map((cat, idx) => (
                        <div key={idx}>
                            <button
                                onClick={() => setActiveCategory(idx)}
                                className={`w-full text-left px-4 py-3 font-medium border-b dark:border-[#2e2e2e] ${activeCategory === idx ? "bg-gray-200 dark:bg-[#232323]" : "bg-gray-100 dark:bg-[#232323]"
                                    }`}
                            >
                                {cat.label}
                            </button>

                            {/* Sub features */}
                            {activeCategory === idx && cat.sub && (
                                <div className="border-b bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                                    {cat.sub.map((s, i) => (
                                        <div
                                            key={i}
                                            className="px-4 py-3 text-sm border-b last:border-none hover:bg-gray-100 cursor-pointer dark:border-[#2e2e2e]"
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* FEATURES TABLE */}
                <div className="flex-1 border rounded-xl overflow-x-auto shadow-sm dark:border-[#2e2e2e]">
                    <div className="grid grid-cols-[2fr_repeat(5,1fr)] bg-gray-100 dark:bg-[#232323] p-3 font-semibold text-sm border-b dark:border-[#2e2e2e]">
                        <div className="w-[100px]">Features Name</div>
                        {variants.map((v, i) => (
                            <div key={i} className="text-center w-[100px]">
                                {v}
                            </div>
                        ))}
                    </div>

                    {features.map((f, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-[2fr_repeat(5,1fr)] p-4 text-sm border-b last:border-none dark:border-[#2e2e2e]"
                        >
                            <div className="flex items-center gap-1 w-[100px]">
                                {f.name}
                                <span className="text-gray-400 cursor-pointer">ⓘ</span>
                            </div>

                            {f.values.map((val, i) => (
                                <div key={i} className="flex justify-center items-center w-[100px]">
                                    {val === true ? (
                                        <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                                            ✓
                                        </div>
                                    ) : val === "-" ? (
                                        <span className="text-gray-500">-</span>
                                    ) : (
                                        <span className="text-gray-600">{val}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
