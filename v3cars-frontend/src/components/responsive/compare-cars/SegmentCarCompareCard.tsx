'use client';

import { useGetSegmentCompareQuery } from '@/redux/api/carModuleApi';
import { IMAGE_URL } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBolt, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import { CarCompareModel, ModelRow } from './CompareInterface';

interface SegmentCarCompareCardProps {
    modelSlug: string;
}

const SegmentCarCompareCard = ({ modelSlug }: SegmentCarCompareCardProps) => {
    const { data } = useGetSegmentCompareQuery({ modelId: modelSlug });
    const router = useRouter();

    if (!data) return null;

    const car1: CarCompareModel = data.model; // 🔒 FIXED MODEL
    const comparisons: ModelRow[] = data.rows; // 🔁 VARIABLE MODELS

    return (
        <div>
            <h2 className="text-lg font-semibold mb-6">{car1.brand.name} {car1.name} - Compare with Other {data.segment.name}</h2>

            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[49.40%] lg:auto-cols-[32.90%] gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {comparisons.map((car2) => (
                    <div key={car2.modelId}>
                        <div className="relative h-auto snap-start flex gap-2 items-start justify-center border dark:border-[#2E2E2E] rounded-t-xl">

                            {/* ================= Car 1 (FIXED) ================= */}
                            <div className="w-full bg-white rounded-tl-xl overflow-hidden dark:bg-[#171717]">
                                <div className="relative">
                                    <img
                                        src={`${IMAGE_URL}/media/model-imgs/${car1.imageUrl}`}
                                        alt={car1.image?.alt || 'car'}
                                        className="w-full h-full"
                                    />
                                    <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="line-clamp-1">{car1.brand.name}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between m-2 gap-2 text-center">
                                    <p className="font-semibold text-xl line-clamp-1">{car1.name}</p>

                                    <div className="border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2 space-y-2">
                                        <p className="text-xs">Ex-showroom</p>
                                        <p className="font-semibold">
                                            ₹{(car1.priceRange.min / 100000).toFixed(1)}L - ₹{(car1.priceRange.max / 100000).toFixed(1)}L
                                        </p>
                                        <p className="text-xs text-blue-500 underline">
                                            Check On Road Price in Delhi
                                        </p>
                                    </div>

                                    <div className="flex justify-between text-center gap-4 text-xs">
                                        <div className="flex flex-col items-center gap-1">
                                            <FaBolt />
                                            {car1.quickSpecs.powerPS} PS
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaRoad />
                                            {car1.quickSpecs.torqueNM} Nm
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaTachometerAlt />
                                            {car1.quickSpecs.mileageKMPL} km/l
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ================= VS Circle ================= */}
                            <div className="absolute left-1/2 top-[16%] md:top-[20%] -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="w-14 md:w-16 h-14 md:h-16 bg-black text-primary font-bold md:text-lg rounded-full flex items-center justify-center border-2 border-primary shadow-md">
                                    VS
                                </div>
                            </div>

                            {/* ================= Car 2 (DYNAMIC) ================= */}
                            <div className="w-full overflow-hidden bg-white rounded-tr-xl dark:bg-[#171717]">
                                <div className="relative">
                                    <img
                                        src={`${IMAGE_URL}/media/model-imgs/${car2.imageUrl}`}
                                        alt={car2.image?.alt || 'car'}
                                        className="w-full h-full"
                                    />
                                    <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="line-clamp-1">{car2.brand.name}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between m-2 gap-2 text-center">
                                    <p className="font-semibold text-xl line-clamp-1">{car2.name}</p>

                                    <div className="border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2 space-y-2">
                                        <p className="text-xs">Ex-showroom</p>
                                        <p className="font-semibold">
                                            ₹{(car2.priceRange.min / 100000).toFixed(1)}L - ₹{(car2.priceRange.max / 100000).toFixed(1)}L
                                        </p>
                                        <p className="text-xs text-blue-500 underline">
                                            Check On Road Price in Delhi
                                        </p>
                                    </div>

                                    <div className="flex justify-between text-center text-xs gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <FaBolt />
                                            {car2.quickSpecs.powerPS} PS
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaRoad />
                                            {car2.quickSpecs.torqueNM} Nm
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaTachometerAlt />
                                            {car2.quickSpecs.mileageKMPL} km/l
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="bg-primary hover:bg-primary-hover w-full py-3 rounded-b-xl text-black font-semibold text-sm"
                            onClick={() =>
                                router.push(`/compare/${car1.brand.slug}--${car1.slug}-vs-${car2.brand.slug}--${car2.slug}`)
                            }
                        >
                            {car2.ctaText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SegmentCarCompareCard;
