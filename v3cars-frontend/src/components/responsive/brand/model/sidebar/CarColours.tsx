'use client';

import React, { useState } from "react";
import { Colors } from "../overview/Overview";
import { IMAGE_URL } from "@/utils/constant";
import { useRouter } from "next/navigation";

interface CarColoursProps {
    title: string;
    data: Colors[];
    type: string;
    slug: string;
}

const CarColours: React.FC<CarColoursProps> = ({ title, data, type, slug }) => {
    const router = useRouter()

    // Default selected: First color
    const [selected, setSelected] = useState<number>(data[0]?.colorId);

    // Find selected color object
    const selectedColor = data.find(c => c.colorId === selected);

    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">

            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3>
                    {title} <span className="font-semibold">Colours</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center justify-center p-4 gap-4 w-full">

                    {/* Car Image (changes with selected color) */}
                    <img
                        src={`${IMAGE_URL}/media/model-imgs/${selectedColor?.imageUrl || data[0]?.imageUrl}`}
                        alt={selectedColor?.name}
                        width={310}
                        height={162}
                        className="object-contain rounded-lg"
                    />

                    {/* Color Selection Circles */}
                    <div className="flex items-center gap-3 flex-wrap justify-center px-2">
                        {data.map((color) => (
                            <button
                                key={color.colorId}
                                onClick={() => setSelected(color.colorId)}
                                style={{ backgroundColor: color.colorCode }}   // ✅ BG from backend
                                className={`
                                    w-10 h-10 rounded-full border overflow-hidden
                                    ${selected === color.colorId
                                        ? "ring-2 ring-blue-500 ring-offset-2"
                                        : "border-gray-300"
                                    }
    `}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => { router.push(`/${type}/${slug}/colors`) }}
                    >
                        View All {title} Colours by Variant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarColours;
