'use client'

import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdStarOutline } from 'react-icons/io'

/* ------------------------------
   Confidence Color Helper
-------------------------------- */
const confidenceColor = (confidence: number): string => {
  if (confidence >= 90) return "bg-green-500"
  if (confidence >= 70) return "bg-yellow-500"
  return "bg-red-500"
}

/* ------------------------------
   Interfaces from API
-------------------------------- */
interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

interface ImageType {
  name: string;
  alt: string;
  url: string;
}

interface CarProps {
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
  image: ImageType;
  imageUrl: string;
}

/* ------------------------------
   UI Shape
-------------------------------- */
interface CarUIProps {
  id: number;
  name: string;
  brand: string;
  image: string;
  expectedLaunch: string;
  confidence: number;
}

interface UpcomingCarInIndiaProps {
  title: string;
  data: CarProps[];
}

/* ------------------------------
   Mapper: API → UI
-------------------------------- */
const mapToUIData = (cars: CarProps[]): CarUIProps[] => {
  return cars.map((car) => {
    let confidence = 15000; // default
    if (car.totalViews >= 50000) confidence = 95;
    else if (car.totalViews >= 10000) confidence = 80;
    else confidence = 100;

    return {
      id: car.modelId,
      name: car.modelName,
      brand: car.brand.name,
      image: car.imageUrl || car.image?.url,
      expectedLaunch: new Date(car.launchDate).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
      confidence,
    }
  })
}

/* ------------------------------
   Component
-------------------------------- */
const UpcomingCarInIndia: React.FC<UpcomingCarInIndiaProps> = ({ title, data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const path = usePathname();

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 384;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // API data → UI-friendly data
  const uiData = mapToUIData(data);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between pb-4 ">
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <h2 className={`${path === '/' ? "text-white" : ""} text-xl font-medium`}>
            {title}
          </h2>
          <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
            View All {title}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => scroll('left')}
            disabled={isAtStart}
            className={`p-2 rounded-full ${path === '/' ? "text-white hover:text-black" : ""} hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtStart ? 'cursor-not-allowed' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={isAtEnd}
            className={`p-2 rounded-full ${path === '/' ? "text-white hover:text-black" : ""} hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtEnd ? 'cursor-not-allowed' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[24%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
        {uiData.map((car) => (
          <div
            key={car.id}
            className={`rounded-xl shadow-lg overflow-hidden snap-start h-auto lg:h-[290px] flex-shrink-0 flex flex-col border-b-[6px] ${car.confidence >= 90 ? "border-[#3D923A]" : car.confidence >= 70 ? "border-[#F08200]" : "border-[#D40808]"}`}
          >
            {/* Image Section */}
            <div className="relative w-full">
              <Image
                src={
                  car.image
                    ? `${IMAGE_URL}/media/model-imgs/${car.image}`
                    : "/coming-soon-car.jpg"
                }
                alt={car.name}
                width={400}
                height={184}
                className="h-full w-full shadow-md rounded-md"
              />
              {/* Confidence Badge */}
              <div className="absolute top-2 left-2 flex items-center bg-[#E7E7E7] dark:bg-[#171717] px-2 py-1 rounded-full space-x-2">
                <span className={`w-3 h-3 rounded-full ${confidenceColor(car.confidence)}`} />
                <p className="text-xs">Confidence {car.confidence}%</p>
              </div>
              {/* Favorite Button */}
              <button className="absolute top-2 right-2 bg-[#E7E7E7] dark:bg-[#171717] rounded-full p-1 shadow">
                <IoMdStarOutline />
              </button>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-2 items-center flex-grow bg-white dark:bg-[#171717] py-6 lg:py-0">
              <div className="border-r dark:border-[#2E2E2E]  text-center mx-4 text-sm">
                <p className="text-gray-500 font-medium truncate">{car.brand}</p>
                <p className="font-semibold truncate">{car.name}</p>
              </div>
              <div className="text-center mx-4 text-sm">
                <p className="text-gray-500">Expected Launch</p>
                <p className="font-semibold">{car.expectedLaunch}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingCarInIndia
