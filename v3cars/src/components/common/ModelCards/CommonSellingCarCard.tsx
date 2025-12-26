'use client'

import { useGetModelSegmentSellingQuery } from '@/redux/api/carModuleApi'
import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

export interface ModelData {
    model: {
        id: number;
        name: string;
        slug: string;
        brand: {
            id: number;
            name: string;
            slug: string;
        };
        isUpcoming: boolean;
    };
    priceRange: {
        exShowroom: {
            min: number;
            max: number;
        };
    };
    media: {
        primaryImage: {
            url: string;
            alt: string;
        };
    };
    sales: {
        year: number;
        month: number;
        current: number;
        previous: number;
        momDeltaPct: number;
    };
}

export interface SegmentResponse {
    success: boolean;
    segmentId: number;
    segmentName: string;
    year: number;
    month: number;
    rows: ModelData[];
}

interface CommonSellingCarCardProps {
    title: string;
    segments: string;
    setSellingDate: (date: string) => void;
}

export function ConvertDate(month: number): string {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // month is 1–12, convert to previous month
    const prevMonth = month

    const monthName = months[prevMonth - 1];
    return `${monthName}`;
}

const currentYear = new Date().getFullYear();

const CommonSellingCarCard: React.FC<CommonSellingCarCardProps> = ({ title, segments, setSellingDate }) => {
    const { data: carByBodyTypeData } = useGetModelSegmentSellingQuery({ segments: segments, currentYear: currentYear });
    const carByBodyType: ModelData[] = carByBodyTypeData?.rows ?? [];
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

    useEffect(() => {
        if (carByBodyTypeData) {
            setSellingDate(`${ConvertDate(Number(carByBodyTypeData?.month))}, ${carByBodyTypeData?.year}`);
        }
    }, [carByBodyTypeData])

    return (
        <div className="space-y-3">
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
                        key={car.model.id}
                        className="bg-white rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-fit p-2 space-y-4 dark:bg-[#171717]"
                    >
                        <div className='flex items-center gap-2'>
                            <div className='bg-primary rounded-lg px-2 py-1 font-semibold text-black'>
                                #{index + 1}
                            </div>
                            <h2 className='text-lg'>
                                {car.model.brand.name} <span className='font-semibold'>{car.model.name}</span>
                            </h2>
                        </div>

                        {/* Image Section */}
                        <div className="w-full rounded-md overflow-hidden">
                            <Image
                                src={`${IMAGE_URL}/media/model-imgs/${car.media.primaryImage.url}`}
                                alt={car.media.primaryImage.alt || car.model.name}
                                width={300}
                                height={300}
                                priority={false}
                                className="w-full h-full rounded-xl"
                            />
                        </div>

                        <div className='text-center w-full'>
                            <p className='text-lg'>
                                <span className='text-xl font-semibold'>
                                    {car.sales.current.toLocaleString()}
                                </span> units
                            </p>

                            <p className='text-xs text-gray-400'>
                                {car.sales.momDeltaPct >= 0
                                    ? <span className='text-primary'>▲</span>
                                    : <span className='text-red-500'>▼</span>
                                }
                                {car.sales.momDeltaPct} % MoM
                            </p>
                        </div>

                        <button
                            className="p-3 text-sm w-full flex justify-center items-center text-black cursor-pointer rounded-lg bg-primary"
                            onClick={() => {
                                router.push(`/${car.model.brand.slug}/${car.model.slug}`);
                            }}
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