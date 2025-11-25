'use client'

import { useGetCarByBodyTypeQuery } from '@/redux/api/homeModuleApi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

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

interface CommonSellingCarCardProps {
    title: string;
}

const CommonSellingCarCard: React.FC<CommonSellingCarCardProps> = ({ title }) => {
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
                <h2 className="text-xl mb-1">{title}</h2>

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
                {carByBodyType.map((car, index) => (
                    <div
                        key={car.modelId}
                        className="bg-white  rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col p-2 space-y-4 dark:bg-[#171717]"
                    >
                        <div className='flex items-center gap-2'>
                            <div className='bg-primary rounded-lg px-2 py-1 font-semibold text-black'>
                                #{index + 1}
                            </div>
                            <h2 className='text-lg'>Hyundai <span className='font-semibold'>Creta</span></h2>
                        </div>

                        {/* Image Section */}
                        <div className="relative h-[224px] w-full rounded-md overflow-hidden">
                            <Image
                                src={'/model/honda.png'}
                                alt={car.image.alt || car.brand.name}
                                fill
                                sizes="(max-width: 1280px) 100vw, 400px"
                                priority={false}
                                className="object-cover shadow-md rounded-lg"
                            />
                        </div>

                        <div className='text-center w-full'>
                            <p className='text-lg'><span className='text-xl font-semibold'>17,231</span> units</p>
                            <p className='text-xs text-gray-400'>▲ 9% MoM</p>
                        </div>

                        <button
                            className="p-3 text-sm w-full flex justify-center items-center text-black cursor-pointer rounded-lg bg-primary"
                            onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}`) }}
                        >
                            View Sales Trend
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonSellingCarCard;