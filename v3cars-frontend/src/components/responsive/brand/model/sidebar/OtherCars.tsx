'use client'

import { IMAGE_URL } from "@/utils/constant";
import React from "react";

interface OtherCarsProps {
    title: string;
    data: Model[]
}

export interface Model {
    modelId: number;
    name: string;
    slug: string;
    launchDate: string; // ISO Date string

    priceRange: {
        min: number;
        max: number;
    };

    image: {
        name: string;
        alt: string;
        url: string;
    };

    imageUrl: string;
}

const OtherCars: React.FC<OtherCarsProps> = ({ title, data }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} Car
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                {data && data.slice(0,4).map((car, idx) => (
                    <div
                        key={idx}
                        className="flex items-center border-b p-4 gap-4 w-full dark:border-[#2E2E2E]"
                    >
                        <img
                            src={`${IMAGE_URL}/media/model-imgs/${car.image.url}`}
                            alt={car.name}
                            width={130}
                            height={73}
                            className="object-contain rounded"
                        />
                        <div className="text-start">
                            <h2 className="text-lg">{car.name}</h2>
                            <p className="font-semibold text-gray-400">
                                ₹{`${(car.priceRange.min / 100000).toFixed(2)} - ${(car.priceRange.max / 100000).toFixed(2)}`} Lakh
                            </p>
                        </div>
                    </div>
                ))}

                {/* Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => alert('Downloading Nexon Brochure..')}
                    >
                        View All {title} Cars
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtherCars;
