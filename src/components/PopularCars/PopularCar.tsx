'use client';

import Image from 'next/image';
import React from 'react';

interface CarData {
  rank: number;
  name: string;
  brand: string;
  imageUrl: string;
  bodyStyle: string;
  segment: string;
  priceRange: string;
  aprilSales: number;
  maySales: number;
  percentChange: number;
  ctaLabel: string;
}

const popularCarsData: CarData[] = [
  {
    rank: 1,
    name: 'Creta',
    brand: 'Hyundai',
    imageUrl: '/popular.png',
    bodyStyle: 'SUV',
    segment: 'C-Segment',
    priceRange: '₹10.80 - ₹19.93 lakh',
    aprilSales: 12899,
    maySales: 12485,
    percentChange: 2.4,
    ctaLabel: 'Check Grand Vitara On-Road Price',
  },
  {
    rank: 2,
    name: 'Punch',
    brand: 'Tata',
    imageUrl: '/popular.png',
    bodyStyle: 'SUV',
    segment: 'B2-Segment',
    priceRange: '₹6.13 - ₹10.20 lakh',
    aprilSales: 11894,
    maySales: 11900,
    percentChange: 0.1,
    ctaLabel: 'Check Punch On-Road Price',
  },
  {
    rank: 3,
    name: 'Swift',
    brand: 'Maruti',
    imageUrl: '/popular.png',
    bodyStyle: 'Hatchback',
    segment: 'B1-Segment',
    priceRange: '₹6.49 - ₹9.64 lakh',
    aprilSales: 12000,
    maySales: 11500,
    percentChange: -4.2,
    ctaLabel: 'Check Swift On-Road Price',
  },
  {
    rank: 4,
    name: 'Creta',
    brand: 'Hyundai',
    imageUrl: '/popular.png',
    bodyStyle: 'SUV',
    segment: 'C-Segment',
    priceRange: '₹10.80 - ₹19.93 lakh',
    aprilSales: 12899,
    maySales: 12485,
    percentChange: 2.4,
    ctaLabel: 'Check Grand Vitara On-Road Price',
  },
  {
    rank: 5,
    name: 'Punch',
    brand: 'Tata',
    imageUrl: '/popular.png',
    bodyStyle: 'SUV',
    segment: 'B2-Segment',
    priceRange: '₹6.13 - ₹10.20 lakh',
    aprilSales: 11894,
    maySales: 11900,
    percentChange: 0.1,
    ctaLabel: 'Check Punch On-Road Price',
  },
  {
    rank: 6,
    name: 'Swift',
    brand: 'Maruti',
    imageUrl: '/popular.png',
    bodyStyle: 'Hatchback',
    segment: 'B1-Segment',
    priceRange: '₹6.49 - ₹9.64 lakh',
    aprilSales: 12000,
    maySales: 11500,
    percentChange: -4.2,
    ctaLabel: 'Check Swift On-Road Price',
  },
];

const PopularCar = () => {
  return (
    <div className="flex flex-col gap-4">
      {popularCarsData.slice(0, 2).map((car) => (
        <div
          key={car.rank}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm p-4 space-y-2"
        >
          {/* Title */}
          <h2 className="text-lg font-medium">
            {car.brand} <span className="font-semibold">{car.name}</span>
          </h2>

          {/* Image + Rank + Info Grid */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Rank + Image */}
            <div className="flex items-center gap-2">
              {/* Rank */}
              <div className="bg-black text-yellow-400 w-[120px] sm:w-[80px] xl:min-w-[144px] rounded-md h-[192px] flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-6xl xl:text-8xl font-bold">
                  {car.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-base sm:text-xl xl:text-3xl">Rank</span>
              </div>

              {/* Car Image */}
              <div className="relative w-full sm:w-[300px] h-[192px]">
                <Image
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.name}`}
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
                <div className="divide-y divide-gray-200 xl:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">Body Style: <span className="text-black font-bold float-end">{car.bodyStyle}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">Segment: <span className="text-black font-bold float-end">{car.segment}</span></p>
                  </div>

                  <div className="gap-2 py-2">
                    <p className="text-gray-600 font-medium w-full">ESP(Price): <span className="text-black font-bold float-end">{car.priceRange}</span></p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-gray-200 xl:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">May Sales: <span className="text-black font-bold float-end">{car.maySales.toLocaleString()}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">April Sales: <span className="text-black font-bold float-end">{car.aprilSales.toLocaleString()}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">% Change:
                      <span className={`text-black font-bold float-end ${car.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {car.percentChange >= 0 ? '▲' : '▼'} {Math.abs(car.percentChange).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button className="bg-yellow-400 text-black font-semibold py-2 rounded w-full hover:bg-yellow-500 transition">
                  {car.ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ads block */}

      <div className='h-[331px] md:h-[240px] bg-[#B3B3B3] p-8 flex justify-center items-center'>

        <div className="hidden sm:block w-full xl:w-[970px] xl:h-[180px] sm:h-[200px] mx-auto">
          <img
            src={'/ads/ad1.png'}
            alt='ad1'
            className='h-full w-full'
          />
        </div>

        <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

        </div>
      </div>

      {popularCarsData.slice(2).map((car) => (
        <div
          key={car.rank}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm p-4 space-y-2"
        >
          {/* Title */}
          <h2 className="text-lg font-medium">
            {car.brand} <span className="font-semibold">{car.name}</span>
          </h2>

          {/* Image + Rank + Info Grid */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Rank + Image */}
            <div className="flex items-center gap-2">
              {/* Rank */}
              <div className="bg-black text-yellow-400 w-[120px] sm:w-[80px] xl:min-w-[144px] rounded-md h-[192px] flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-6xl xl:text-8xl font-bold">
                  {car.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-base sm:text-xl xl:text-3xl">Rank</span>
              </div>

              {/* Car Image */}
              <div className="relative w-full sm:w-[300px] h-[192px]">
                <Image
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.name}`}
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
                <div className="divide-y divide-gray-200 xl:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">Body Style: <span className="text-black font-bold float-end">{car.bodyStyle}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">Segment: <span className="text-black font-bold float-end">{car.segment}</span></p>
                  </div>

                  <div className="gap-2 py-2">
                    <p className="text-gray-600 font-medium w-full">ESP(Price): <span className="text-black font-bold float-end">{car.priceRange}</span></p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-gray-200 xl:space-y-3">
                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">May Sales: <span className="text-black font-bold float-end">{car.maySales.toLocaleString()}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">April Sales: <span className="text-black font-bold float-end">{car.aprilSales.toLocaleString()}</span></p>
                  </div>

                  <div className="py-2">
                    <p className="text-gray-600 font-medium w-full">% Change:
                      <span className={`text-black font-bold float-end ${car.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {car.percentChange >= 0 ? '▲' : '▼'} {Math.abs(car.percentChange).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button className="bg-yellow-400 text-black font-semibold py-2 rounded w-full hover:bg-yellow-500 transition">
                  {car.ctaLabel}
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
