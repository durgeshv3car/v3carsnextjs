'use client'

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";

interface OverviewProps {
    city: string;
    modelDetails?: CarData | null;
}

// Interfaces (same as your provided ones)
export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export interface Model {
    id: number;
    name: string;
    slug: string;
    brand: Brand;
    isUpcoming: boolean;
    discontinuedYear: number;
    launchedOn: string;
    segment: string;
    bodyType: string;
    seating: number;
}

export interface ExShowroom {
    min: number;
    max: number;
}

export interface PriceRange {
    exShowroom: ExShowroom;
    isExpected: boolean;
}

export interface AvailableWith {
    fuels: string[];
}

export interface Brochure {
    url: string;
}

export interface Media {
    primaryImage: PrimaryImage;
    images: Images[];
    colors: Colors[];
}

export interface PrimaryImage {
    url: string;
    alt: string;
}

export interface Images {
    id: string;
    url: string;
    alt: string;
    isMain: boolean;
    position: string;
}

export interface Colors {
    id: number;
    colorId: number;
    name: string;
    imageUrl: string;
}

export interface CarData {
    model: Model;
    priceRange: PriceRange;
    availableWith: AvailableWith;
    brochure: Brochure;
    media: Media;
}


function Overview({ city, modelDetails }: OverviewProps) {

    const images = modelDetails?.media?.images ?? [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between gap-10">
                {/* Left Side - Car Image */}
                <div className="flex flex-col justify-end flex-1 gap-4">
                    <Image
                        src={
                            images[currentIndex]?.url
                                ? `${IMAGE_URL}/media/model-imgs/${images[currentIndex].url}`
                                : "/model/tata.png"
                        }
                        alt={images[currentIndex]?.alt || "Car Image"}
                        width={800}
                        height={500}
                        priority={currentIndex === 0}
                        loading={currentIndex === 0 ? "eager" : "lazy"}
                        className="drop-shadow-lg rounded-lg object-cover"
                        placeholder="blur"
                        blurDataURL="/blur-placeholder.png"
                    />

                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-4">
                            <span className="flex gap-1 items-center">
                                <IoColorPaletteOutline size={24} className=" -rotate-90" />
                                <span className="text-xs">Colours</span>
                            </span>

                            <span className="flex gap-1 items-center">
                                <CiImageOn size={24} />
                                <span className="text-xs">Image</span>
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span onClick={handlePrev} className="bg-white dark:bg-[#171717] rounded-full p-2 hover:bg-slate-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </span>

                            <span onClick={handleNext} className="bg-white dark:bg-[#171717] rounded-full p-2 hover:bg-slate-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </div>

                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="flex-1 space-y-4 md:space-y-8">

                    {/* Title and launch date */}
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="text-4xl font-bold">
                                {modelDetails?.model?.brand?.name}{" "}
                                <span className="text-primary">
                                    {modelDetails?.model?.name || "-"}
                                </span>
                            </h1>

                            <p className="text-sm text-gray-400">
                                Launched on{" "}
                                {modelDetails?.model?.launchedOn
                                    ? new Date(modelDetails.model.launchedOn).toLocaleString("en-US", {
                                        month: "short",
                                    }) +
                                    "’" +
                                    String(new Date(modelDetails.model.launchedOn).getFullYear()).slice(2)
                                    : ""}
                            </p>

                        </div>

                        <p className="text-sm leading-relaxed mt-4">
                            The {modelDetails?.model?.brand?.name}{" "}
                            {modelDetails?.model?.name} is a{" "}
                            {modelDetails?.model?.segment}-segment{" "}
                            {modelDetails?.model?.bodyType} with seating for up to{" "}
                            {modelDetails?.model?.seating} occupants and costs between ₹
                            {((modelDetails?.priceRange?.exShowroom?.min ?? 0) / 100000).toFixed(2)} lakh
                            and ₹
                            {((modelDetails?.priceRange?.exShowroom?.max ?? 0) / 100000).toFixed(2)} lakh
                            (ex-showroom).
                        </p>
                    </div>

                    {/* Price */}
                    <div>
                        <p className="text-sm text-gray-400">Ex-Showroom</p>
                        <div className="flex justify-between items-end">
                            <p className="text-2xl font-semibold">
                                ₹{((modelDetails?.priceRange?.exShowroom?.min ?? 0) / 100000).toFixed(2)} – ₹
                                {((modelDetails?.priceRange?.exShowroom?.max ?? 0) / 100000).toFixed(2)} lakh
                            </p>

                            <Link href="#" className="text-blue-600 text-xs underline">
                                Check On Road Price in{" "}
                                <span className="font-semibold">{city || "Delhi"}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Fuel Types */}
                    <div>
                        <span className="text-sm text-gray-400">Available with</span>
                        <div className="flex items-center space-x-3 mt-1">
                            <div className="flex space-x-2">
                                {modelDetails?.availableWith?.fuels?.map((fuel) => (
                                    <button
                                        key={fuel}
                                        className="flex items-center gap-1 border-2 border-primary bg-white dark:bg-[#171717] p-2 rounded-md text-xs transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        {fuel}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="flex space-x-4 mt-4">
                        {[
                            { label: "Segment", value: modelDetails?.model?.segment },
                            { label: "Body Type", value: modelDetails?.model?.bodyType },
                            { label: "Seating", value: modelDetails?.model?.seating },
                        ].map((spec) => (
                            <div
                                key={spec.label}
                                className="border border-r-0 dark:border-[#2E2E2E] rounded-xl w-28 text-center py-3"
                            >
                                <p className="text-xs text-gray-400">{spec.label}</p>
                                <p className="font-semibold mt-1">{spec.value || "-"}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button className="bg-primary hover:bg-primary-hover transition text-black font-semibold px-6 py-2 rounded-md w-full">
                        View {modelDetails?.model?.name} Latest Offers
                    </button>
                </div>
            </div>
        </>
    );
}

export default Overview;
