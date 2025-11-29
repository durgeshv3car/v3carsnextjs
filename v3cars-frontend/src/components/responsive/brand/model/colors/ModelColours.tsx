"use client";

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { useState, useEffect } from "react";

export interface ColorsResponse {
    success: boolean;
    modelId: number;
    colors: CarColor[];
    variants: {
        id: number;
        name: string;
    }[];
    availability: Availability[]
}

export interface CarColor {
    id: number;
    colorId: number;
    name: string;
    colorCode: string;
    imageUrl: string;
}

export interface Availability {
    id: number;
    color: string;
}

interface ModelColoursProps {
    title: string;
    data: ColorsResponse | undefined;
}

export default function ModelColours({ title, data }: ModelColoursProps) {
    const colors = data?.colors ?? [];

    // store selected full object
    const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);

    // Load first color automatically on mount or when API data arrives
    useEffect(() => {
        if (colors.length > 0 && !selectedColor) {
            setSelectedColor(colors[0]);
        }
    }, [colors]);

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{title} Available Colours</h2>

            <p className="text-gray-400">
                Here’s a detailed look at all the colour options available for each
                variant of the {title}. Use the table below to see which paint shades
                are offered with specific variants and find the combination that best
                matches your style.
            </p>

            <div className="p-4 w-full bg-white dark:bg-[#171717] border rounded-xl dark:border-[#2e2e2e]">
                <div className="flex flex-col md:flex-row gap-4">

                    {/* Car Preview */}
                    <div className="flex-1 flex flex-col items-center justify-center border rounded-xl dark:border-[#2e2e2e]">

                        {selectedColor ? (
                            <Image
                                src={`${IMAGE_URL}/media/model-imgs/${selectedColor.imageUrl}`}
                                alt={selectedColor.name}
                                width={300}
                                height={300}
                                className="w-full h-auto rounded-xl"
                            />
                        ) : (
                            <p className="text-gray-500 text-sm py-20">
                                Loading image...
                            </p>
                        )}
                    </div>

                    {/* Colour Selector */}
                    <div className="border rounded-xl p-3 flex dark:border-[#2e2e2e]">
                        <div className="grid grid-cols-1 gap-3 h-fit w-full">
                            {colors.map((color) => (
                                <div
                                    key={color.id}
                                    onClick={() => setSelectedColor(color)}
                                    style={{ borderColor: selectedColor?.id === color.id ? color.colorCode : "#ddd", }}
                                    className={`
                                        flex items-center justify-between 
                                        w-full p-1 rounded-full cursor-pointer gap-14
                                        border-2 transition shadow-sm bg-white hover:bg-gray-50
                                    `}>
                                    {/* Name */}
                                    <span className="font-medium text-sm ml-3">
                                        {color.name}
                                    </span>

                                    {/* Color Pill */}
                                    <div className="w-14 h-8 rounded-full overflow-hidden flex border border-gray-300">
                                        <div
                                            className="w-full h-full"
                                            style={{ backgroundColor: color.colorCode }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}
