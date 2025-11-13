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

interface CarGridCardProps {
  car: CarModel;
}

const CarGridCard: React.FC<CarGridCardProps> = ({ car }) => {
  const {
    modelName,
    mileageKMPL,
    powerPS,
    seats,
    image,
    priceMin,
    priceMax
  } = car;

  return (
    <div className="rounded-xl border min-h-[460px] dark:border-[#2E2E2E] overflow-hidden w-full flex flex-col flex-shrink">
      <div className="min-w-[344px] h-[215px]">
        <img src={`${IMAGE_URL2}/ad-min/uploads/images/${image.url}`} alt={image.alt} className="w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="flex flex-col justify-between items-center h-full flex-grow p-2">
        <h3 className="text-2xl font-semibold">{modelName}</h3>
        <p className="">₹{(priceMin / 100000).toFixed(2)} - ₹{(priceMax / 100000).toFixed(2)} Lakh*</p>
        <p className="text-xs text-yellow-500">*Ex-Showroom Price</p>
        <div className="flex items-center justify-between gap-8 text-xs border-t dark:border-[#2E2E2E] w-full pt-3 px-3">
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
            Petrol/Diesel {/* you can map fuel type if available */}
          </span>
          <span className="flex flex-col items-center justify-center gap-2">
            <MdOutlineAirlineSeatReclineExtra size={20} />
            <span className="flex gap-1">
              {seats}
              <span>Seats</span>
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 w-full justify-between">
          <button className="bg-yellow-400 text-black text-sm w-full font-medium h-10 rounded-md">View Details</button>
          <button className="bg-yellow-400 text-black text-sm w-full font-medium h-10 rounded-md">Get On Road Price</button>
        </div>
      </div>
    </div>
  );
};

export default CarGridCard;
