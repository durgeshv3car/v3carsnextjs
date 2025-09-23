'use client'

import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdStarOutline } from 'react-icons/io'


const confidenceColor = (confidence: number): string => {
  if (confidence >= 90) return "bg-[#3D923A]"
  if (confidence >= 70) return "bg-[#F08200]"
  return "bg-[#D40808]"
}

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


const mapToUIData = (cars: CarProps[]): CarUIProps[] => {
  return cars.map((car) => {
    let confidence = 100;
    if (car.totalViews >= 50000) confidence = 95;
    else if (car.totalViews >= 10000) confidence = 80;

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


const UpcomingCarInIndia: React.FC<UpcomingCarInIndiaProps> = ({ title, data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCars, setVisibleCars] = useState<CarUIProps[]>([]);
  const [page, setPage] = useState(1);

  const path = usePathname();

  const uiData = mapToUIData(data);

  // Initial 10 load
  useEffect(() => {
    setVisibleCars(uiData.slice(0, 10));
  }, [data]);

  useEffect(() => {
    if (uiData.length <= 10) {
      setIsAtEnd(true);
    }
  }, [uiData]);

  // Intersection observer to load more cards
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerCardRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          const start = nextPage * 10 - 10;
          const end = start + 10;
          const nextBatch = uiData.slice(start, end);

          if (nextBatch.length > 0) {
            setVisibleCars((prev) => [...prev, ...nextBatch]);
            setPage(nextPage);
          }
        }
      },
      { threshold: 1 }
    );

    observerRef.current.observe(triggerCardRef.current);

    return () => {
      if (observerRef.current && triggerCardRef.current) {
        observerRef.current.unobserve(triggerCardRef.current);
      }
    };
  }, [page, uiData]);

  // Handle arrows
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth; // slide by full viewport width
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // wait till DOM paints
    requestAnimationFrame(() => {
      handleScroll();
    });

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [visibleCars]);

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <h2 className={`${path === '/' ? "text-white" : ""} text-xl font-medium`}>
            {title}
          </h2>
          <Link
            href="#"
            className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
          >
            View All {title}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Arrows */}
        <div className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => scroll('left')}
            disabled={isAtStart}
            className={`p-2 rounded-full ${path === '/' ? "text-white hover:text-black" : ""} hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtStart ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={isAtEnd}
            className={`p-2 rounded-full ${path === '/' ? "text-white hover:text-black" : ""} hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtEnd ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Slider */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[24%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {visibleCars.map((car, index) => {
          const isTriggerCard = index === 6; // 👈 trigger at 6th card
          return (
            <div
              key={car.id}
              ref={isTriggerCard ? triggerCardRef : null}
              className={`rounded-xl shadow-lg overflow-hidden h-auto lg:h-[290px] flex-shrink-0 flex flex-col border-b-[6px] ${car.confidence >= 90
                ? "border-[#3D923A]"
                : car.confidence >= 70
                  ? "border-[#F08200]"
                  : "border-[#D40808]"
                }`}
              style={{ scrollSnapAlign: index % 4 === 0 ? "start" : "none" }}
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
                <div className="absolute top-2 left-2 flex items-center bg-[#E7E7E7] dark:bg-[#171717] px-2 py-1 rounded-full space-x-2">
                  <span className={`w-3 h-3 rounded-full ${confidenceColor(car.confidence)}`} />
                  <p className="text-xs">Confidence {car.confidence}%</p>
                </div>
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
          )
        })}
      </div>
    </div>
  )
}

export default UpcomingCarInIndia
