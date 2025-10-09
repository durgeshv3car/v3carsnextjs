'use client'

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { BiTachometer } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { PiEngine } from "react-icons/pi";

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string;
}

interface CarImage {
    name: string;
    alt: string;
    url: string;
}

interface CarModel {
    modelId: number;
    modelName: string;
    modelSlug: string;
    brandId: number;
    modelBodyTypeId: number;
    isUpcoming: boolean;
    launchDate: string;
    totalViews: number;
    expectedBasePrice: number;
    expectedTopPrice: number;
    brand: Brand;
    priceMin: number;
    priceMax: number;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
    image: CarImage;
    imageUrl: string;
}

interface CurrentOffersCardProps {
    data: CarModel[]
}

const CurrentOffersCard: React.FC<CurrentOffersCardProps> = ({ data }) => {

    return (
        <>
            {data.map((car) => (
                <div
                    key={car.modelId}
                    className="w-full h-auto border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl overflow-hidden flex flex-col"
                >
                    {/* Image Section */}
                    <div className="relative h-[225px] w-full rounded-lg overflow-hidden">
                        <Image
                            src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                            alt={car.image?.alt || car.modelName}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover"
                            priority={false}
                        />

                        {/* Gradient + Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-white font-semibold">{car.brand.name}</p>
                        </div>

                        {/* Action Button */}
                        <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                            <IoMdStarOutline />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 flex-grow flex flex-col justify-between text-center gap-6">
                        <p className="font-semibold text-lg sm:text-xl">{car.modelName}</p>

                        <div className="flex justify-between items-center text-sm border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] py-2">
                            <p className="flex items-center gap-1">
                                <PiEngine size={18} />
                                {car.powerPS} PS
                            </p>
                            <p className="flex items-center gap-1">
                                <PiEngine size={18} />
                                {car.torqueNM} Nm
                            </p>
                            <p className="flex items-center gap-1">
                                <BiTachometer size={18} />
                                {car.mileageKMPL} km/l
                            </p>
                        </div>

                        <p className="font-semibold">
                            ₹{(car.priceMin / 100000).toFixed(2)} - {(car.priceMax / 100000).toFixed(2)} Lakh*
                        </p>

                        <button className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
                            View Current Offers
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CurrentOffersCard;
