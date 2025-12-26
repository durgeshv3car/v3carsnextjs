"use client";

import { RootState } from "@/redux/store";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiTachometer } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { PiEngine } from "react-icons/pi";
import { convertToSlug } from "@/utils/helperFunction";

export interface CarModelData {
  rank: number;
  modelId: number;
  modelName: string;
  modelSlug: string;
  brandName: string;
  brandSlug: string;
  bodyStyle: string;
  segment: string;

  priceRange: {
    min: number;
    max: number;
  };

  month: string;
  monthSales: number;
  prevMonth: string;
  prevSales: number;
  percentChange: number;

  image: {
    name: string;
    alt: string;
    url: string;
  };

  imageUrl: string;
}

interface CommonModelCardProps {
  data: CarModelData[];
}

const CommonModelCard: React.FC<CommonModelCardProps> = ({ data }) => {
  const router = useRouter();
  const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

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
              sizes="100vw"
              className="object-cover"
            />

            {/* Gradient + Brand Name */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-white font-semibold">{car.brandName}</p>
            </div>

            {/* Action Button */}
            <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
              <IoMdStarOutline />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-3 flex-grow flex flex-col justify-between text-center gap-3">
            <p className="font-semibold text-lg sm:text-xl">{car.modelName}</p>

            {/* Price Section */}
            <div className="py-2 border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E]">
              <span className="text-xs text-gray-400">Starting On-Road Price</span>
              <p className="font-semibold text-2xl">
                ₹{(car.priceRange.min / 100000).toFixed(2)} -{" "}
                {(car.priceRange.max / 100000).toFixed(2)} Lakh*
              </p>
            </div>

            {/* Specs Section — Interface doesn't include power/tq/mileage */}
            <div className="flex justify-between items-center text-sm">
              <p className="flex items-center gap-1">
                <PiEngine size={18} /> —
              </p>
              <p className="flex items-center gap-1">
                <PiEngine size={18} /> —
              </p>
              <p className="flex items-center gap-1">
                <BiTachometer size={18} /> —
              </p>
            </div>

            {/* Button */}
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-sm bg-primary text-black rounded-lg hover:bg-primary-hover transition"
              onClick={() =>
                router.push(
                  `/${car.brandSlug}/${car.modelSlug}/on-road-price-in-${convertToSlug(
                    selectedCity?.cityName
                  )}`
                )
              }
            >
              Check {car.modelName} On-road Price
              <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommonModelCard;
