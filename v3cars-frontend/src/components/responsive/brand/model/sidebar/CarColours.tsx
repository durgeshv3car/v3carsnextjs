'use client'

import React from "react";
import { useState } from "react";

const colors = [
    { name: "Silver", code: "#d9d9d9" },
    { name: "Red", code: "#a00" },
    { name: "Blue", code: "#0000aa" },
    { name: "Green", code: "#1a7f3c" },
    { name: "Cyan", code: "#12cbd3" },
    { name: "White", code: "#ffffff" },
    { name: "Magenta", code: "#c01b7e" },
];

interface CarColoursProps {
    title: string
}

const CarColours: React.FC<CarColoursProps> = ({ title }) => {
    const [selected, setSelected] = useState<string>(colors[2].code);
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-semibold">Colours</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                <div
                    className="flex flex-col items-center justify-center p-4 gap-4 w-full"
                >
                    <img
                        src={"/model/tata.png"}
                        alt={'/tata'}
                        width={283}
                        height={162}
                        className="object-contain"
                    />

                    <div className="flex items-center gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.code}
                                onClick={() => setSelected(color.code)}
                                className={`w-8 h-8 rounded-full border ${selected === color.code
                                    ? "ring-2 ring-blue-500 ring-offset-2"
                                    : "border-gray-300"
                                    }`}
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => alert('Downloading Nexon Brochure..')}
                    >
                        View All {title} Colours by Variant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarColours;
