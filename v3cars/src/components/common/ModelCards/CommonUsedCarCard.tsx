'use client'

import { useGetCarByBodyTypeQuery } from '@/redux/api/homeModuleApi'
import { RootState } from '@/redux/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

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

interface CommonUsedCarCardProps {
    title: string;
}

const CommonUsedCarCard: React.FC<CommonUsedCarCardProps> = ({ title }) => {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const { data: carByBodyTypeData } = useGetCarByBodyTypeQuery({ id: 3, limit: 15, page: 1 });
    const carByBodyType: CarProps[] = carByBodyTypeData?.rows ?? [];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const router = useRouter()

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
        <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl mb-1">Used {title} Cars In <span className='font-semibold'>{selectedCity?.cityName}</span></h2>
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
            <div ref={scrollRef} className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[32%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {carByBodyType.map((car) => (
                    <div
                        key={car.modelId}
                        className="bg-white  rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col dark:bg-[#171717]"
                    >
                        {/* Image Section */}
                        <div className="relative h-[190px] w-full rounded-md overflow-hidden">
                            <Image
                                src={'/model/car.png'}
                                alt={car.image.alt || car.brand.name}
                                fill
                                sizes="(max-width: 1280px) 100vw, 400px"
                                priority={false}
                                className="object-cover shadow-md rounded-md z-10"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute top-0 right-0">
                                <img
                                    src={'/model/used-car.png'}
                                    alt='used-car'
                                />
                            </div>

                        </div>

                        <div className='text-center w-full'>
                            <p className=''>2020 Tata Nexon XZ Diesel</p>
                            <p className='text-xs text-gray-400'>53,063 KM | Diesel | Manual</p>
                            <p className='text-primary text-xl font-semibold mt-2'>₹7,31,000</p>
                            <p className='text-xs text-gray-400'>EMI starts at ₹11,997</p>
                        </div>

                        <button
                            className="p-3 text-sm w-full flex justify-between items-center cursor-pointer border-t rounded-lg rounded-t-none bg-[#F2F2F2] mt-4 dark:bg-[#171717] dark:border-[#2E2E2E]"
                            onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}`) }}
                        >
                            <div className='space-y-1'>
                                <p className='text-xs text-gray-400'>Number of Owners</p>
                                <span className='flex items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    1
                                </span>
                            </div>

                            <div className='space-y-1 text-end'>
                                <p className='text-xs text-gray-400'>Delhi</p>
                                <p>Gurgaon</p>
                            </div>

                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonUsedCarCard;