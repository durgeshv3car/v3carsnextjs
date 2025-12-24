'use client'

import { useGetCarByPriceQuery } from '@/redux/api/homeModuleApi'
import { setPriceBucket } from '@/redux/slices/advanceSearchSlice'
import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'
import { useDispatch } from 'react-redux'

export type CarPriceTab =
    | 'UNDER_5L'
    | 'BETWEEN_5_10L'
    | 'BETWEEN_10_20L'
    | 'BETWEEN_20_40L'
    | 'ABOVE_40L';

const PRICE_TABS: { key: CarPriceTab; value: string }[] = [
    { key: 'UNDER_5L', value: 'Under ₹5 Lakh' },
    { key: 'BETWEEN_5_10L', value: '₹5 - ₹10 Lakh' },
    { key: 'BETWEEN_10_20L', value: '₹10 - ₹20 Lakh' },
    { key: 'BETWEEN_20_40L', value: '₹20 - ₹40 Lakh' },
    { key: 'ABOVE_40L', value: 'Above ₹40 Lakh' },
];

export interface CarProps {
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
        alt: string | null;
        url: string;
    };
    imageUrl: string;
}

const CarByPrice: React.FC = () => {
    const [carPriceTab, setCarPriceTab] = useState<{ id: string, label: string }>();
    const { data: carByPriceData } = useGetCarByPriceQuery({ budget: carPriceTab?.id ?? "UNDER_5L", limit: 8, page: 1 });
    const carByPrice: CarProps[] = carByPriceData?.rows ?? [];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();

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
        requestAnimationFrame(() => {
            handleScroll();
        });
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [carByPrice]);

    function handleCarPrice() {
        if (!carPriceTab) {
            return alert("Something Went Wrong. Please Try Again")
        }
        dispatch(
            setPriceBucket({
                id: carPriceTab.id,
                label: carPriceTab.label,
            })
        );

        router.push("/search/new-cars");
    }

    return (
        <section className="px-6 lg:px-10">
            <div className="w-full lg:app-container mx-auto space-y-3 py-6">
                <div className="flex items-center w-full lg:w-auto gap-4">
                    <h2 className="text-lg font-semibold lg:font-medium">Search Car By Price</h2>
                    <button
                        className="text-primary font-medium text-xs lg:text-sm hover:underline flex gap-2 items-center cursor-pointer"
                        onClick={handleCarPrice}
                    >
                        View All Cars {carPriceTab?.label}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                <div className="border dark:border-[#2E2E2E] border-[#DEE2E6] rounded-lg bg-white dark:bg-[#171717]">
                    <div className="flex justify-between items-center px-4 pt-4 border-b border-[#DEE2E6] dark:border-[#2E2E2E]">
                        {/* Tabs */}
                        <div className="flex overflow-x-auto scroll-smooth scrollbar-hide">
                            {PRICE_TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setCarPriceTab({
                                        id: tab.key,
                                        label: tab.value
                                    })}
                                    className={`pb-4 px-6 font-semibold cursor-pointer text-nowrap capitalize transition-colors ${carPriceTab?.id === tab.key ? 'border-b-4 border-primary' : 'text-gray-400'
                                        }`}
                                >
                                    {tab.value}
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={isAtEnd}
                                className={`p-2 rounded-full hover:bg-gray-100 hover:dark:bg-[#2E2E2E] transition ${isAtEnd ? 'cursor-not-allowed' : ''
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cars Grid */}
                    <div
                        ref={scrollRef}
                        className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[48.90%] lg:auto-cols-[24.10%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide m-3"
                    >
                        {carByPrice.map((car) => (
                            <div
                                key={car.modelId}
                                className="rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden snap-start h-auto flex-shrink-0 flex flex-col cursor-pointer"
                                onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}`) }}
                            >
                                {/* Image Section */}
                                <div className="relative h-[225px] w-full rounded-md overflow-hidden">
                                    <Image
                                        src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                                        alt={car.image.alt ?? car.modelName}
                                        fill
                                        sizes="(max-width: 1280px) 100vw, 400px"
                                        priority={false}
                                        className="object-cover shadow-md rounded-md"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-semibold">{car.brand.name}</p>
                                    </div>

                                    {/* Action Button */}
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
                                            {car.mileageKMPL} km/l
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        ₹{(car.priceMin / 100000).toFixed(1)} - ₹{(car.priceMax / 100000).toFixed(1)} Lakh
                                    </p>
                                    <button
                                        className="p-3 font-semibold text-sm w-full flex justify-between items-center text-black cursor-pointer rounded-lg bg-primary"
                                        onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}`) }}
                                    >
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
    )
}

export default CarByPrice
