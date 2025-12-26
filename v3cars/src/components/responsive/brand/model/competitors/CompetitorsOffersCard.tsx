'use client'

import { CarOverviewShort } from "@/components/common/ModelCards/CommonViewOfferCard";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { BiTachometer } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { PiEngine } from "react-icons/pi";

interface CompetitorsOffersCardProps {
    title: string;
    data: CarOverviewShort[]
}

const CompetitorsOffersCard: React.FC<CompetitorsOffersCardProps> = ({ title, data }) => {    

    return (
        <>
            <div className="space-y-3">
                <h2 className="text-2xl">{title} <span className="font-semibold">Competitors</span></h2>
                <p className="text-gray-400 text-sm">The {title} competes with several cars in its segment that offer similar pricing, features, and performance. Check out these popular alternatives to compare their on-road prices and see which one suits your needs best.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((car) => (
                        <div
                            key={car.modelId}
                            className="w-full h-auto border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl overflow-hidden flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-[225px] w-full rounded-lg overflow-hidden">
                                <Image
                                    src={`${IMAGE_URL}/media/model-imgs/${car?.image?.url}`}
                                    alt={car.image?.alt || car.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    className="object-cover"
                                    priority={false}
                                />

                                {/* Gradient + Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white font-semibold">{title}</p>
                                </div>

                                {/* Action Button */}
                                <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                    <IoMdStarOutline />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-3 flex-grow flex flex-col justify-between text-center gap-2 bg-white dark:bg-[#232323]">
                                <p className="font-semibold text-lg sm:text-xl">{car?.name}</p>

                                <p className="font-semibold text-2xl border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] py-3">
                                    <span className="text-xs font-medium mb-1">Starting On-Road Price</span> <br/>
                                    <span>₹{(car.priceRange?.min / 100000).toFixed(2)} - {(car.priceRange?.max / 100000).toFixed(2)} Lakh*</span>
                                </p>

                                <div className="flex justify-between items-center text-sm py-2">
                                    <p className="flex items-center gap-1">
                                        <PiEngine size={18} />
                                        {car?.powerPS} PS
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <PiEngine size={18} />
                                        {car?.torqueNM} Nm
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <BiTachometer size={18} />
                                        {car?.mileageKMPL} km/l
                                    </p>
                                </div>

                                <button className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold bg-primary text-black rounded-lg hover:bg-primary-hover transition">
                                    Check {car?.name} On-road Price
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CompetitorsOffersCard;
