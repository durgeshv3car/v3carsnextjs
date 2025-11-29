'use client'

import React from "react";
import { ModelImagesResponse, ImageTabs } from "./ImageDisplay";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";

interface CarGalleryProps {
    imageType: string;
    setImageType: (value: string) => void;
    data: ModelImagesResponse | undefined;
}

export default function CarGallery({ imageType, setImageType, data }: CarGalleryProps) {

    const tabs = [
        { label: "All Images", value: "" },
        { label: "Interior", value: "interior" },
        { label: "Exterior", value: "exterior" },
        { label: "Others", value: "others" },
    ];

    const images =
        imageType === ""
            ? data?.tabs.all.items
            : data?.tabs[imageType as keyof ImageTabs]?.items;

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-6 bg-[#DEE2E6] dark:bg-[#232323] px-8 py-4 pb-0 rounded-lg mb-4 overflow-x-auto scrollbar-hide">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setImageType(tab.value)}
                        className={`text-nowrap text-sm transition-all pb-3 px-4 ${imageType === tab.value
                            ? "border-b-2 border-black dark:border-[#ffffff] font-semibold"
                            : ""
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images?.map((img) => (
                    <div key={img.id}>
                        <Image
                            src={`${IMAGE_URL}/media/model-imgs/${img.url}`}
                            alt={img.alt}
                            width={300}
                            height={300}
                            className="w-full object-cover hover:scale-105 transition rounded-xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
