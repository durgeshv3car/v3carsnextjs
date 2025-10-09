'use client';

import { useGetTopSellingCarQuery } from '@/redux/api/carModuleApi';
import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import React from 'react';

interface CarModel {
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

const PopularCar = () => {
  const { data: topSellingCarData, error, isLoading } = useGetTopSellingCarQuery();

  const topSellingCars: CarModel[] = topSellingCarData?.rows ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-col gap-4">
      {topSellingCars.slice(0, 2).map((car) => (
        <div
          key={car.rank}
          className="border border-gray-300 dark:border-[#2E2E2E] rounded-lg overflow-hidden bg-white dark:bg-transparent shadow-sm p-4 space-y-2"
        >
          {/* Title */}
          <h2 className="text-lg font-medium">
            {car.brandName} <span className="font-semibold">{car.modelName}</span>
          </h2>

          {/* Image + Rank + Info Grid */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Rank + Image */}
            <div className="flex items-center gap-2">
              {/* Rank */}
              <div className="bg-black dark:bg-[#171717] text-yellow-400 w-[120px] sm:w-[80px] lg:min-w-[144px] rounded-md h-[192px] flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-6xl lg:text-8xl font-bold">
                  {car.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-base sm:text-xl lg:text-3xl">Rank</span>
              </div>

              {/* Car Image */}
              <div className="relative w-full sm:w-[300px] h-[192px]">
                <Image
                  src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                  alt={car.image.alt || car.modelName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between text-sm w-full">
              <div className="grid grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="divide-y divide-gray-200 lg:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      Body Style:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.bodyStyle}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      Segment:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.segment}-Segment
                      </span>
                    </p>
                  </div>

                  <div className="gap-2 py-2">
                    <p className="text-gray-500 font-medium w-full">
                      ESP(Price):{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        ₹{(car.priceRange.min / 100000).toFixed(1)} -{' '}
                        ₹{(car.priceRange.max / 100000).toFixed(2)} L
                      </span>
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-gray-200 lg:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      {car.month} Sales:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.monthSales.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      {car.prevMonth} Sales:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.prevSales.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      % Change:
                      <span
                        className={`text-black font-bold float-end ${car.percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        {car.percentChange >= 0 ? '▲' : '▼'}{' '}
                        {Math.abs(car.percentChange).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button className="bg-yellow-400 text-black font-semibold py-2 rounded w-full hover:bg-yellow-500 transition">
                  Check Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Ads block */}
      <div className="h-[331px] md:h-[240px] bg-[#B3B3B3] dark:bg-[#262626] p-8 flex justify-center items-center">
        <div className="hidden sm:block w-full lg:w-[970px] lg:h-[180px] sm:h-[200px] mx-auto">
          <img src={'/ads/ad1.png'} alt="ad1" className="h-full w-full" />
        </div>

        <div className="block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl"></div>
      </div>

      {topSellingCars.slice(2).map((car) => (
        <div
          key={car.rank}
          className="border border-gray-300 dark:border-[#2E2E2E] rounded-lg overflow-hidden bg-white dark:bg-transparent shadow-sm p-4 space-y-2"
        >
          {/* Title */}
          <h2 className="text-lg font-medium">
            {car.brandName} <span className="font-semibold">{car.modelName}</span>
          </h2>

          {/* Image + Rank + Info Grid */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Rank + Image */}
            <div className="flex items-center gap-2">
              {/* Rank */}
              <div className="bg-black dark:bg-[#171717] text-yellow-400 w-[120px] sm:w-[80px] lg:min-w-[144px] rounded-md h-[192px] flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-6xl lg:text-8xl font-bold">
                  {car.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-base sm:text-xl lg:text-3xl">Rank</span>
              </div>

              {/* Car Image */}
              <div className="relative w-full sm:w-[300px] h-[192px]">
                <Image
                  src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                  alt={car.image.alt || car.modelName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between text-sm w-full">
              <div className="grid grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="divide-y divide-gray-200 lg:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      Body Style:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.bodyStyle}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      Segment:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.segment}-Segment
                      </span>
                    </p>
                  </div>

                  <div className="gap-2 py-2">
                    <p className="text-gray-500 font-medium w-full">
                      ESP(Price):{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        ₹{(car.priceRange.min / 100000).toFixed(1)} -{' '}
                        ₹{(car.priceRange.max / 100000).toFixed(1)} L
                      </span>
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-gray-200 lg:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      {car.month} Sales:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.monthSales.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      {car.prevMonth} Sales:{' '}
                      <span className="text-black dark:text-white font-bold float-end">
                        {car.prevSales.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-500 font-medium w-full">
                      % Change:
                      <span
                        className={`text-black font-bold float-end ${car.percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        {car.percentChange >= 0 ? '▲' : '▼'}{' '}
                        {Math.abs(car.percentChange).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button className="bg-yellow-400 text-black font-semibold py-2 rounded w-full hover:bg-yellow-500 transition">
                  Check Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCar;
