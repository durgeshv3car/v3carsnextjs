'use client'

import { useGetModelCompetitorsQuery } from '@/redux/api/carModuleApi'
import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'

interface CommonViewOfferCardProps {
    title: string;
    desc: string;
    slug: string;
}

export interface CarImage {
    name: string;
    alt: string;
    url: string;
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface CarOverviewShort {
    modelId: number;
    name: string;
    slug: string;
    image: CarImage;
    priceRange: PriceRange;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
}

const CommonViewOfferCard: React.FC<CommonViewOfferCardProps> = ({ title, desc, slug }) => {
    const { data: modelComparisonSimilarData } = useGetModelCompetitorsQuery({ model_slug: slug });

    const similarCars: CarOverviewShort[] = modelComparisonSimilarData?.items ?? [];

    const carList = similarCars.map(car => ({
        modelId: car.modelId,
        modelName: car.name,
        modelSlug: car.slug,
        imageUrl: car.image.url,

        // Engine & Mileage
        powerPS: car.powerPS,
        torqueNM: car.torqueNM,
        mileageKMPL: car.mileageKMPL,

        // Price
        priceMin: car.priceRange.min,
        priceMax: car.priceRange.max,

        // Brand
        brand: {
            name: car.slug.split("-")[0],
            slug: car.slug.split("-")[0]
        },

        image: car.image
    }));

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
                    <h2 className="text-xl font-semibold mb-1"><span className='font-normal'>{title}</span> Competitors</h2>
                    <p className='text-sm'>{desc}</p>
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
                {carList.map((car) => (
                    <div
                        key={car.modelId}
                        className="rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative h-[225px] w-full rounded-md overflow-hidden">
                            <Image
                                src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                                alt={car.image.alt || car.brand.name}
                                fill
                                sizes="(max-width: 1280px) 100vw, 400px"
                                priority={false}
                                className="object-cover shadow-md rounded-md"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-white font-semibold">{car.brand.name}</p>
                            </div>

                            {/* Favorite Button */}
                            <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                <IoMdStarOutline />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-2 py-4 flex-grow text-center flex flex-col justify-between gap-4">
                            <p className="font-semibold text-xl">{car.modelName}</p>
                            <div className='border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2'>
                                <p className="text-xs">
                                    Ex-showroom
                                </p>
                                <p className="font-semibold">
                                    ₹{(car.priceMin / 100000).toFixed(2)} - {(car.priceMax / 100000).toFixed(2)} Lakh*
                                </p>
                                <p className="text-xs text-blue-500 underline">
                                    Check On Road Price in Delhi
                                </p>
                            </div>
                            <div className="flex gap-2 items-center justify-around">
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
                            <button
                                className="p-3 text-sm w-full flex justify-between items-center text-black cursor-pointer rounded-lg bg-primary"
                                onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}`) }}
                            >
                                View {car.modelName} Offers
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonViewOfferCard;