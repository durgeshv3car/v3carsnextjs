'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'

type CarProps = {
    image: string
    name: string
    engine: string,
    nitro: string,
    mileage: string,
    price: string,
}

const upcomingCars: CarProps[] = [
    {
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/fronx.png",
        name: "Fronx",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/brezza.png",
        name: "Brezza",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/nexon.png",
        name: "Nexon",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
]

const QuickLook: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [activeTab, setActiveTab] = useState<'popular' | 'latest'>('popular')

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
        <>
            {/* Upcoming Car Section */}
            <section className="px-6 lg:px-10">
                <div className="w-full lg:app-container mx-auto space-y-3">
                    <div className="flex items-center w-full lg:w-auto gap-4">
                        <h2 className="text-lg font-semibold lg:font-medium">For Your Quick Look</h2>
                        <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                            View All Popular Cars
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>

                    <div className="border dark:border-[#2E2E2E] border-[#DEE2E6] rounded-lg">
                        <div className="flex justify-between items-center px-4 pt-4 border-b border-[#DEE2E6] dark:border-[#2E2E2E]">
                            {/* Tabs */}
                            <div className="flex space-x-8">
                                {['popular', 'latest'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as 'popular' | 'latest')}
                                        className={`pb-3 px-6 font-semibold cursor-pointer capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-yellow-400' : 'text-gray-400'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Scroll buttons */}
                            <div className="hidden lg:flex items-center gap-2">
                                <button
                                    onClick={() => scroll('left')}
                                    disabled={isAtStart}
                                    className={`p-1 rounded-full transition ${isAtStart ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300'
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
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
                                    className={`p-1 rounded-full transition ${isAtEnd ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300'
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
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


                        <div ref={scrollRef} className='flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2'>
                            {upcomingCars.map((car, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden w-[265px] xl:w-[384px] h-[400px] xl:h-[454px] flex-shrink-0 flex flex-col`}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-[166px] xl:h-[241px] w-full rounded-md overflow-hidden">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            sizes="(max-width: 1280px) 100vw, 400px"
                                            priority={false}
                                            className="object-cover shadow-md rounded-md"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                            <p className="text-white font-semibold">Maruti Suzuki</p>
                                        </div>

                                        {/* Favorite Button */}
                                        <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                            <IoMdStarOutline />
                                        </button>
                                    </div>

                                    {/* Remaining Space for Content */}
                                    <div className={`px-2 py-4 flex-grow text-center flex flex-col justify-between`}>
                                        <p className="font-semibold text-xl">{car.name}</p>
                                        <div className='flex gap-2 items-center justify-around border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2'>
                                            <p className='flex items-center gap-1 text-sm'>
                                                <PiEngine size={18} />
                                                {car.engine}
                                            </p>
                                            <p className='flex items-center gap-1 text-sm'>
                                                <PiEngine size={18} />
                                                {car.nitro}
                                            </p>
                                            <p className='flex items-center gap-1 text-sm '>
                                                <BiTachometer size={18} />
                                                {car.mileage}
                                            </p>
                                        </div>
                                        <p className="font-semibold">{car.price}</p>
                                        <button className='p-3 font-semibold text-sm w-full text-black flex justify-between items-center cursor-pointer rounded-lg bg-yellow-400'>
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
        </>
    )
}

export default QuickLook;