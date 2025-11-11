'use client';

import { IMAGE_URL } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBolt, FaRoad, FaTachometerAlt } from 'react-icons/fa';

interface CarData {
    urlId: number;
    url: string;
    totalViews: number;
    modelIds: number[];
    models: Model[];
}

interface Model {
    modelId: number;
    modelName: string | null;
    modelSlug: string | null;
    brand: Brand | null;
    priceRange: PriceRange;
    powertrain: Powertrain;
    imageUrl: string;
    imageAlt: string | null;
}

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string;
}

interface PriceRange {
    min: number | null;
    max: number | null;
}

interface Powertrain {
    powerPS: number | null;
    torqueNM: number | null;
    mileageKMPL: number | null;
    powerTrain: string | null;
}

interface MostPopularCarComparisonProps {
    data: CarData[];
}

const CommonComparisonModelCard = ({ data }: MostPopularCarComparisonProps) => {

    const router = useRouter()

    return (
        <div>
            <h2 className="text-lg font-semibold mb-6">Most Popular Car Comparison by Tool</h2>

            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[32.70%] gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {data.map((comparison, idx) => {
                    const [car1, car2] = comparison.models;

                    return (
                        <div key={idx}>
                            <div className="relative h-auto snap-start flex gap-2 items-start justify-center border dark:border-[#2E2E2E] rounded-t-xl">
                                {/* Car 1 */}
                                <div className="w-full bg-white rounded-tl-xl overflow-hidden dark:bg-[#171717]">
                                    <div className="relative max-w-[253px] h-[143px]">
                                        <img
                                            src={`${IMAGE_URL}/media/model-imgs/${car1.imageUrl}`}
                                            alt={car1.imageAlt || 'car'}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                            <h3 className="line-clamp-1">{car1.brand?.name || 'N/A'}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4 m-4 text-center">
                                        <p className="font-semibold text-xl line-clamp-1">{car1.modelName || 'N/A'}</p>

                                        <div className='border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2 space-y-2'>
                                            <p className="text-xs">
                                                Ex-showroom
                                            </p>
                                            <p className="font-semibold">
                                                {car1.priceRange.min && car1.priceRange.max
                                                    ? `₹${(car1.priceRange.min / 100000).toFixed(1)}L - ₹${(car1.priceRange.max / 100000).toFixed(1)}L`
                                                    : 'N/A'}
                                            </p>
                                            <p className="text-xs text-blue-500 underline">
                                                Check On Road Price in Delhi
                                            </p>
                                        </div>
                                        <div className="flex justify-between text-center text-xs">
                                            <div className="flex flex-col items-center gap-1">
                                                <FaBolt />
                                                {car1.powertrain.powerPS ? `${car1.powertrain.powerPS} PS` : 'N/A'}
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <FaRoad />
                                                {car1.powertrain.torqueNM ? `${car1.powertrain.torqueNM} Nm` : 'N/A'}
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <FaTachometerAlt />
                                                {car1.powertrain.mileageKMPL ? `${car1.powertrain.mileageKMPL} km/l` : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* VS Circle */}
                                <div className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-16 h-16 bg-black text-yellow-400 font-bold text-lg rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                                        VS
                                    </div>
                                </div>

                                {/* Car 2 */}
                                <div className="w-full overflow-hidden bg-white rounded-tr-xl dark:bg-[#171717]">
                                    <div className="relative max-w-[253px] h-[143px]">
                                        <img
                                            src={`${IMAGE_URL}/media/model-imgs/${car2.imageUrl}`}
                                            alt={car2.imageAlt || 'car'}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                            <h3 className="line-clamp-1">{car2.brand?.name || 'N/A'}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4 m-4 text-center">
                                        <p className="font-semibold text-xl line-clamp-1">{car2.modelName || 'N/A'}</p>

                                        <div className='border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2 space-y-2'>
                                            <p className="text-xs">
                                                Ex-showroom
                                            </p>
                                            <p className="font-semibold">
                                                {car2.priceRange.min && car2.priceRange.max
                                                    ? `₹${(car2.priceRange.min / 100000).toFixed(1)}L - ₹${(car2.priceRange.max / 100000).toFixed(1)}L`
                                                    : 'N/A'}
                                            </p>
                                            <p className="text-xs text-blue-500 underline">
                                                Check On Road Price in Delhi
                                            </p>
                                        </div>
                                        <div className="flex justify-between text-center text-xs">
                                            <div className="flex flex-col items-center gap-1">
                                                <FaBolt />
                                                {car2.powertrain.powerPS ? `${car2.powertrain.powerPS} PS` : 'N/A'}
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <FaRoad />
                                                {car2.powertrain.torqueNM ? `${car2.powertrain.torqueNM} Nm` : 'N/A'}
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <FaTachometerAlt />
                                                {car2.powertrain.mileageKMPL ? `${car2.powertrain.mileageKMPL} km/l` : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="bg-yellow-400 hover:bg-yellow-500 w-full py-3 rounded-b-xl text-black font-semibold text-sm"
                                onClick={() => { router.push(`/compare/${comparison.url}`) }}
                            >
                                Compare Now
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommonComparisonModelCard;
