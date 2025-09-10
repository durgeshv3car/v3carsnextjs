'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdStarOutline } from 'react-icons/io'

type CarProps = {
    image: string
    name: string
    brand: string
    confidence: number
    expectedLaunch: string
}

const upcomingCars: CarProps[] = [
    {
        image: "/upcoming-car/tata-curvv.png",
        name: "Curvv",
        brand: "Tata",
        confidence: 100,
        expectedLaunch: "August 2024",
    },
    {
        image: "/upcoming-car/tata-curvv-EV.png",
        name: "Curvv EV",
        brand: "Tata",
        confidence: 75,
        expectedLaunch: "August 2024",
    },
    {
        image: "/upcoming-car/thar.png",
        name: "Thar Roxx",
        brand: "Maruti Suzuki",
        confidence: 35,
        expectedLaunch: "August 2024",
    },
    {
        image: "/upcoming-car/urban.png",
        name: "Urban Cruiser Hyryder",
        brand: "Maruti Suzuki",
        confidence: 95,
        expectedLaunch: "September 2024",
    },
]

const confidenceColor = (confidence: number): string => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
}

interface UpcomingCarInIndiaProps {
    title: string
}

const UpcomingCarInIndia: React.FC<UpcomingCarInIndiaProps> = ({ title }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const path = usePathname()

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

    return (
        <>
            {/* Upcoming Car Section */}
            <div className="py-6 px-4 lg:px-10">
                <div className="w-full lg:max-w-[1600px] mx-auto space-y-6">
                    <div className="flex items-center justify-between border-b pb-4 border-[#495057] dark:border-[#2E2E2E]">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-medium">
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

                    <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide">
                        {upcomingCars.map((car, idx) => (
                            <div
                                key={idx}
                                className={`rounded-xl shadow-lg overflow-hidden w-[293px] xl:w-[384px] h-[275px] xl:h-[336px] flex-shrink-0 flex flex-col border-b-[6px] ${car.confidence >= 90 ? "border-[#3D923A]" : car.confidence >= 70 ? "border-[#F08200]" : "border-[#D40808]"}`}
                            >
                                {/* Image Section */}
                                <div className="relative h-[184px] xl:h-[240px] w-full">
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        width={400}          // estimated width
                                        height={240}         // estimated height
                                        className="h-full w-full object-cover shadow-md rounded-md"
                                        priority={false}     // true only if above-the-fold
                                    />

                                    {/* Confidence Badge */}
                                    <div className="absolute top-2 left-2 flex items-center bg-[#E7E7E7] dark:bg-[#171717] px-2 py-1 rounded-full space-x-2">
                                        <span
                                            className={`w-3 h-3 rounded-full ${confidenceColor(car.confidence)}`}
                                        />
                                        <p className="text-xs">Confidence {car.confidence}%</p>
                                    </div>

                                    {/* Favorite Button */}
                                    <button className="absolute top-2 right-2 bg-[#E7E7E7] dark:bg-[#171717] rounded-full p-1 shadow">
                                        <IoMdStarOutline />
                                    </button>
                                </div>


                                {/* Remaining Space for Content */}
                                <div className={`grid grid-cols-2 justify-between text-sm xl:text-base items-center flex-grow bg-white dark:bg-[#171717]`}>
                                    <div className='border-r border-[#0000004D] text-center mx-4'>
                                        <p className="text-gray-500 font-medium truncate">{car.brand}</p>
                                        <p className="font-semibold truncate">{car.name}</p>
                                    </div>

                                    <div className="text-center mx-4">
                                        <p className="text-gray-500">Expected Launch</p>
                                        <p className="font-semibold">{car.expectedLaunch}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default UpcomingCarInIndia