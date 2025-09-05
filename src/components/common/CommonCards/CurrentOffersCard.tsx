'use client'

import Image from "next/image";
import { BiTachometer } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { PiEngine } from "react-icons/pi";

interface CommonCurrentOffersCardProps {
    carsData: CarData[];
}

type CarData = {
    image: string
    name: string
    engine: string
    nitro: string
    mileage: string
    price: string
}

const CurrentOffersCard: React.FC<CommonCurrentOffersCardProps> = ({ carsData }) => {
    return (
        <>
            {Array(15).fill(null).flatMap(() => carsData).map((car, idx) => (
                <div
                    key={idx}
                    className="w-full h-auto lg:h-[454px] border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl overflow-hidden flex flex-col"
                >
                    {/* Image Section */}
                    <div className="relative h-[200px] lg:h-[240px] w-full rounded-lg overflow-hidden">
                        {/* Optimized Image */}
                        <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover"
                            priority={false} // true agar above-the-fold ho
                        />

                        {/* Gradient + Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-white font-semibold">FORD</p>
                        </div>

                        {/* Action Button */}
                        <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                            <IoMdStarOutline />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 flex-grow flex flex-col justify-between text-center gap-2">
                        <p className="font-semibold text-lg sm:text-xl">{car.name}</p>

                        <div className="flex justify-between items-center text-sm border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] py-2">
                            <p className="flex items-center gap-1">
                                <PiEngine size={18} />
                                {car.engine}
                            </p>
                            <p className="flex items-center gap-1">
                                <PiEngine size={18} />
                                {car.nitro}
                            </p>
                            <p className="flex items-center gap-1">
                                <BiTachometer size={18} />
                                {car.mileage}
                            </p>
                        </div>

                        <p className="font-semibold">{car.price}</p>

                        <button className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
                            View Current Offers
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CurrentOffersCard;