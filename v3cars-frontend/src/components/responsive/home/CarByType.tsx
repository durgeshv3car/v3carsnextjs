'use client'

import { useGetCarByBodyTypeQuery } from '@/redux/api/homeApi'
import { IMAGE_URL } from '@/utils/constant'
import { useGetCarByBodyTypeQuery } from '@/redux/api/homeApi'
import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'

type CarBodyTab = 1 | 3 | 4 | 7;

interface CarProps {
    modelId: number;
    modelName: string;
    modelSlug: string;
    brandId: number;
    modelBodyTypeId: number;
    isUpcoming: boolean;
    launchDate: string; // ISO date string
    totalViews: number;
    expectedBasePrice: number;
    expectedTopPrice: number;
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
    image: {
        name: string;
        alt: string;
        url: string;
    };
    imageUrl: string;
}

const tabNames: Record<CarBodyTab, string> = {
  1: "Hatchback",
  3: "SUV",
  4: "Sedan",
  7: "MUV",
};
type CarBodyTab = 1 | 3 | 4 | 7;

interface CarProps {
    modelId: number;
    modelName: string;
    modelSlug: string;
    brandId: number;
    modelBodyTypeId: number;
    isUpcoming: boolean;
    launchDate: string; // ISO date string
    totalViews: number;
    expectedBasePrice: number;
    expectedTopPrice: number;
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
    image: {
        name: string;
        alt: string;
        url: string;
    };
    imageUrl: string;
}

const tabNames: Record<CarBodyTab, string> = {
  1: "Hatchback",
  3: "SUV",
  4: "Sedan",
  7: "MUV",
};

const CarByType: React.FC = () => {
    const [carBodyTab, setCarBodyTab] = useState<CarBodyTab>(3);
    const { data: carByBodyTypeData, error: carByBodyTypeError, isLoading: carByBodyTypeLoading } = useGetCarByBodyTypeQuery({ id: carBodyTab, limit: 15, page: 1 });
    const carByBodyType: CarProps[] = carByBodyTypeData?.rows ?? [];
    const scrollRef = useRef<HTMLDivElement>(null);
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
            const amount = 454;
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

    return (
        <section className="px-6 lg:px-10">
            <div className="w-full lg:app-container mx-auto space-y-3 mt-4">
                <div className="flex items-center w-full lg:w-auto gap-4">
                    <h2 className="text-lg font-semibold lg:font-medium">Search Car By Body Type</h2>
                    <Link
                        href="#"
                        className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
                    >
                        View All {tabNames[carBodyTab]}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>
        <section className="px-6 lg:px-10">
            <div className="w-full lg:app-container mx-auto space-y-3 mt-4">
                <div className="flex items-center w-full lg:w-auto gap-4">
                    <h2 className="text-lg font-semibold lg:font-medium">Search Car By Body Type</h2>
                    <Link
                        href="#"
                        className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
                    >
                        View All {tabNames[carBodyTab]}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>

                <div className="border dark:border-[#2E2E2E] border-[#DEE2E6] rounded-lg">
                    <div className="flex justify-between items-center px-4 pt-4 border-b border-[#DEE2E6] dark:border-[#2E2E2E]">
                        {/* Tabs */}
                        <div className="flex overflow-x-auto scroll-smooth scrollbar-hide">
                            {[
                                { id: 3, tab: 'SUV' },
                                { id: 1, tab: 'Hatchback' },
                                { id: 4, tab: 'Sedan' },
                                { id: 7, tab: 'MUV' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setCarBodyTab(tab.id as CarBodyTab)}
                                    className={`pb-3 px-6 font-semibold cursor-pointer capitalize transition-colors ${carBodyTab === tab.id ? 'border-b-2 border-yellow-400' : 'text-gray-400'
                                        }`}
                                >
                                    {tab.tab}
                                </button>
                            ))}
                        </div>
                <div className="border dark:border-[#2E2E2E] border-[#DEE2E6] rounded-lg">
                    <div className="flex justify-between items-center px-4 pt-4 border-b border-[#DEE2E6] dark:border-[#2E2E2E]">
                        {/* Tabs */}
                        <div className="flex overflow-x-auto scroll-smooth scrollbar-hide">
                            {[
                                { id: 3, tab: 'SUV' },
                                { id: 1, tab: 'Hatchback' },
                                { id: 4, tab: 'Sedan' },
                                { id: 7, tab: 'MUV' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setCarBodyTab(tab.id as CarBodyTab)}
                                    className={`pb-3 px-6 font-semibold cursor-pointer capitalize transition-colors ${carBodyTab === tab.id ? 'border-b-2 border-yellow-400' : 'text-gray-400'
                                        }`}
                                >
                                    {tab.tab}
                                </button>
                            ))}
                        </div>

                        {/* Scroll buttons */}
                        <div className="hidden lg:flex items-center space-x-1 pb-3">
                            <button
                                onClick={() => scroll('left')}
                                disabled={isAtStart}
                                className={`p-2 rounded-full hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtStart ? 'cursor-not-allowed' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className=" size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={isAtEnd}
                                className={`p-2 rounded-full hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtEnd ? 'cursor-not-allowed' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                        {/* Scroll buttons */}
                        <div className="hidden lg:flex items-center space-x-1 pb-3">
                            <button
                                onClick={() => scroll('left')}
                                disabled={isAtStart}
                                className={`p-2 rounded-full hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtStart ? 'cursor-not-allowed' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className=" size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={isAtEnd}
                                className={`p-2 rounded-full hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtEnd ? 'cursor-not-allowed' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cars */}
                    <div ref={scrollRef} className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[24.10%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide m-3">
                        {carByBodyType.map((car) => (
                            <div
                                key={car.modelId}
                                className="rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="relative h-[225px] w-full rounded-md overflow-hidden">
                                    <Image
                                        src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                                        alt={car.image.alt}
                                        fill
                                        sizes="(max-width: 1280px) 100vw, 400px"
                                        priority={false}
                                        className="object-cover shadow-md rounded-md"
                                    />
                    {/* Cars */}
                    <div ref={scrollRef} className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[24.10%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide m-3">
                        {carByBodyType.map((car) => (
                            <div
                                key={car.modelId}
                                className="rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="relative h-[225px] w-full rounded-md overflow-hidden">
                                    <Image
                                        src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                                        alt={car.image.alt}
                                        fill
                                        sizes="(max-width: 1280px) 100vw, 400px"
                                        priority={false}
                                        className="object-cover shadow-md rounded-md"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-semibold">{car.brand.name}</p>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-semibold">{car.brand.name}</p>
                                    </div>

                                    {/* Favorite Button */}
                                    <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                        <IoMdStarOutline />
                                    </button>
                                </div>
                                    {/* Favorite Button */}
                                    <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                        <IoMdStarOutline />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="px-2 py-4 flex-grow text-center flex flex-col justify-between gap-4">
                                    <p className="font-semibold text-xl">{car.modelName}</p>
                                    <div className="flex gap-2 items-center justify-around border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2">
                                        <p className="flex items-center gap-1 text-sm">
                                            <PiEngine size={18} />
                                            {car.powerPS} PS
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <PiEngine size={18} />
                                            {car.torqueNM} Nm
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <BiTachometer size={18} />
                                            {car.mileageKMPL} kmpl
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        ₹{(car.priceMin / 100000).toFixed(2)} - {(car.priceMax / 100000).toFixed(2)} Lakh*
                                    </p>
                                    <button className="p-3 font-semibold text-sm w-full flex justify-between items-center text-black cursor-pointer rounded-lg bg-yellow-400">
                                        View Current Offers
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
                                {/* Content */}
                                <div className="px-2 py-4 flex-grow text-center flex flex-col justify-between gap-4">
                                    <p className="font-semibold text-xl">{car.modelName}</p>
                                    <div className="flex gap-2 items-center justify-around border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2">
                                        <p className="flex items-center gap-1 text-sm">
                                            <PiEngine size={18} />
                                            {car.powerPS} PS
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <PiEngine size={18} />
                                            {car.torqueNM} Nm
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <BiTachometer size={18} />
                                            {car.mileageKMPL} kmpl
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        ₹{(car.priceMin / 100000).toFixed(2)} - {(car.priceMax / 100000).toFixed(2)} Lakh*
                                    </p>
                                    <button className="p-3 font-semibold text-sm w-full flex justify-between items-center text-black cursor-pointer rounded-lg bg-yellow-400">
                                        View Current Offers
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarByType;

