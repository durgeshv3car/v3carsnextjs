'use client'

import { IMAGE_URL2 } from "@/utils/constant";
import React from "react";
import { GiGasPump } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { PiEngine } from "react-icons/pi";

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
    seats: number;
    brand: {
        id: number;
        name: string;
        slug: string;
        logo: string;
    };
    priceMin: number;
    priceMax: number;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
    powerTrain: string;
    image: {
        name: string;
        alt: string;
        url: string;
    };
    imageUrl: string;
}

interface CarListCardProps {
    car: CarModel;
}

const CarListCard: React.FC<CarListCardProps> = ({ car }) => {
    const {
        modelName,
        priceMin,
        priceMax,
        mileageKMPL,
        powerPS,
        powerTrain,
        seats,
        image,
    } = car;

    return (
        <div className="border dark:border-[#2E2E2E] rounded-xl min-h-[232px] shadow-sm flex flex-col lg:flex-row gap-4 p-2">
            <div className="w-auto h-auto lg:min-w-[344px] lg:h-[215px]">
                <img src={`${IMAGE_URL2}/ad-min/uploads/images/${image.url}`} alt={image.alt} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="w-full flex flex-col flex-shrink">
                <div className="space-y-3 text-center lg:text-left">
                    <h3 className="text-2xl font-semibold">{modelName}</h3>
                    <p className="">₹{(priceMin / 100000).toFixed(2)} - ₹{(priceMax / 100000).toFixed(2)} Lakh*</p>
                    <p className="text-xs text-primary">*Ex-Showroom Price</p>
                </div>
                <div className="mt-2 flex flex-col lg:flex-row gap-4 justify-between border-t dark:border-[#2E2E2E] h-full flex-grow py-3 lg:py-0">
                    <div className="flex items-center justify-evenly lg:justify-normal gap-8 text-xs">
                        <span className="flex flex-col items-center justify-center gap-2">
                            <IoSpeedometerOutline size={20} />
                            <span className="flex gap-1">
                                {mileageKMPL}
                                <span>km/l</span>
                            </span>
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <PiEngine size={20} />
                            <span className="flex gap-1">
                                {powerPS}
                                <span>PS</span>
                            </span>
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <GiGasPump size={20} />
                            {powerTrain}
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <MdOutlineAirlineSeatReclineExtra size={20} />
                            <span className="flex gap-1">
                                {seats}
                                <span>Seats</span>
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-primary text-black text-sm font-medium w-full lg:w-[150px] h-10 rounded-md">
                            View Details
                        </button>
                        <button className="bg-primary text-black text-sm font-medium w-full lg:w-[150px] h-10 rounded-md">
                            Get On Road Price
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListCard;
