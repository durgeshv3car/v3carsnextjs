'use client'

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export interface ModelImagesResponse {
    success: boolean;
    modelId: number;
    featured: ImageItem;
    thumbnails: ImageItem[];
    tabs: ImageTabs;
}

export interface ImageTabs {
    all: ImageTabData;
    exterior: ImageTabData;
    interior: ImageTabData;
    others: ImageTabData;
}

export interface ImageTabData {
    total: number;
    items: ImageItem[];
}

export interface ImageItem {
    id: number;
    url: string;
    alt: string;
    type: string;
    isMain: boolean;
    position: number | null;
    variantId: number | null;
    colorId: number;
    is360: boolean;
    uploadedAt: string;
}

interface ImageDisplayProps {
    brand: string;
    model: string;
    data: ModelImagesResponse | undefined;
}

export default function ImageDisplay({ brand, model, data }: ImageDisplayProps) {

    // Build gallery list using interface
    const thumbnails = data?.thumbnails ?? [];
    const featured = data?.featured;

    // Active image state
    const [activeImage, setActiveImage] = useState<ImageItem | null>(null);

    // On first load → set featured image
    useEffect(() => {
        if (featured) {
            setActiveImage(featured);
        }
    }, [featured]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-1">{brand} {model} Image Display</h2>
            <p className="text-gray-400 mb-4">
                Browse the complete {brand} {model} image gallery.
            </p>


            <div className="w-full bg-[#EEEEEE] p-3 rounded-xl">
                <div
                    className="relative w-full rounded-xl overflow-hidden transition-all">
                    {activeImage && (
                        <Image
                            src={`${IMAGE_URL}/media/model-imgs/${activeImage.url}`}
                            alt={activeImage.alt}
                            width={700}
                            height={700}
                            className="w-full h-full rounded-xl"
                        />
                    )}
                    {/* Thumbnails */}
                    <div className=" absolute bottom-2 flex gap-2 overflow-x-auto px-2 scrollbar-hide">
                        {thumbnails.map((thumb) => (
                            <button
                                key={thumb.id}
                                onClick={() => setActiveImage(thumb)}
                                className={`
                                rounded-xl overflow-hidden border flex-shrink-0 transition-all
                                ${activeImage?.id === thumb.id
                                        ? "border-4 border-white shadow-xl scale-105"
                                        : "border-gray-300 opacity-70 hover:opacity-100"
                                    }
                            `}
                            >
                                <Image
                                    src={`${IMAGE_URL}/media/model-imgs/${thumb.url}`}
                                    alt={thumb.alt}
                                    width={150}
                                    height={90}
                                    className="h-[40px] md:h-full w-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
