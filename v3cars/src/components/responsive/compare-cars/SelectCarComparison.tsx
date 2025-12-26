import React from "react";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { EnginePerformance, Price } from "./CompareInterface";

export interface VariantBasicInfo {
    variantId: number;
    variantName: string;
    modelId: number;
    modelName: string;
    image: Image;
    imageUrl: string;
    enginePerformance: EnginePerformance
    price: Price
}

export interface Image {
    name: string;
    alt: string;
    url: string;
}

interface SelectCarComparisonProps {
    variantData: VariantBasicInfo[];
}

const SelectCarComparison: React.FC<SelectCarComparisonProps> = ({
    variantData,
}) => {
    return (
        <div className="bg-white dark:bg-[#171717] rounded-xl border overflow-hidden dark:border-[#2e2e2e]">
            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[32.70%] lg:auto-cols-[24.60%] gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {/* Left Info Panel */}
                <div className="flex flex-col justify-center items-center p-4 border-r dark:border-[#2e2e2e]">
                    <h3 className="font-semibold mb-2">
                        Selected Cars <br /> for Comparison
                    </h3>

                    <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input type="checkbox" />
                        Highlight Differences
                    </label>
                </div>

                {/* Selected Cars (from interface data) */}
                {variantData.map((variant) => (
                    <div
                        key={variant.variantId}
                        className="text-center space-y-1 p-4 border-r last:border-none dark:border-[#2e2e2e]"
                    >
                        <Image
                            src={`${IMAGE_URL}/media/model-imgs/${variant.imageUrl}`}
                            alt={variant.image?.alt || variant.variantName}
                            width={300}
                            height={140}
                            className="w-full rounded-lg mb-3"
                        />

                        <h4 className="font-semibold text-sm">
                            {variant.modelName} {variant.variantName}
                        </h4>

                        <p className="text-xs text-gray-400 mt-1">
                            {variant.enginePerformance.cubicCapacity}CC | {variant.enginePerformance.fuelType} | {variant.enginePerformance.transmissionType}
                        </p>

                        <div className="flex flex-col">
                            <span className="text-[10px]">Ex-showroom</span>
                            <span className="text-lg">
                                ₹{(variant.price.exShowroomMax / 100000).toFixed(2)} Lakh
                            </span>
                        </div>

                        <button className="text-blue-600 text-xs mt-2 underline">
                            View December Offers
                        </button>
                    </div>
                ))}

                {/* Add Car Placeholder (only if less than 3 cars) */}
                {variantData.length < 3 && (
                    <div className="border-r h-[300px] flex flex-col items-center justify-center text-gray-400 dark:border-[#2e2e2e]">
                        <div className="w-12 h-12 flex items-center justify-center border rounded-full mb-2">
                            <span className="text-2xl">+</span>
                        </div>
                        <p className="text-sm">Add car to compare</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectCarComparison;
