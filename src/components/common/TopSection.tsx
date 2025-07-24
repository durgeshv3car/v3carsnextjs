'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const months = [
    { month: 'August', year: 2024 },
    { month: 'September', year: 2024 },
    { month: 'October', year: 2024 },
    { month: 'November', year: 2024 },
    { month: 'December', year: 2024 },
    { month: 'January', year: 2025 },
    { month: 'February', year: 2025 },
    { month: 'March', year: 2024 },
    { month: 'April', year: 2025 },
    { month: 'May', year: 2025 },
    { month: 'June', year: 2025 },
    { month: 'July', year: 2025 },
]

export default function TopSection() {
    const [selected, setSelected] = useState('August 2024')
    const path = usePathname()

    return (
        <section>
            {/* Breadcrumb */}
            <div className='bg-[#18181b] text-white'>
                <div className='px-6 lg:px-10'>
                    <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            {
                                path === "/latest-launched-cars"
                                    ? "Latest Cars"
                                    : path === "/popular-cars"
                                        ? "Popular Cars"
                                        : path === "/electric-cars"
                                            ? "Electric Cars"
                                            : "Upcoming Cars"
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className='w-full min-h-[186px] py-[30px] '>
                <div className='px-6 lg:px-10'>
                    <div className="w-full lg:max-w-[1600px] mx-auto space-y-5">
                        {/* Title */}
                        <h1 className="text-2xl font-semibold">
                            {
                                path === "/latest-launched-cars"
                                    ? "Explore Latest Car Launches In India"
                                    : path === "/popular-cars"
                                        ? "Popular Cars In India 2024"
                                        : path === "/electric-cars"
                                            ? "Electric Cars in India"
                                            : "Upcoming Cars In India (2024-2025)"
                            }
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-wrap line-clamp-2">
                            {
                                path === "/latest-launched-cars"
                                    ? "Discover the hottest new cars in India! Explore our comprehensive list of the latest car launches, featuring detailed information on prices and specs to help you find your perfect match. We've compiled a list of 46 exciting new models across various car segments, including cars like Mahindra Thar Roxx, Citroen Basalt Coupe, Mercedes-Benz AMG GLC, Mercedes-Benz CLE Cabriolet, and Tata Curvv EV"
                                    : path === "/popular-cars"
                                        ? "Looking for the best-selling cars in India? Look no further! This section reveals the top 20 cars dominating the Indian market based on monthly sales figures. Some of the most popular cars in the month of July 2024 are Maruti Suzuki Grand Vitara, Maruti Suzuki Fronx, Maruti Suzuki Brezza, Tata Nexon, Tata Punch and many more. Explore detailed information on each car, including segment, body"
                                        : path === "/electric-cars"
                                            ? "Here is the list of the most popular electric cars in India 2024. Some of the most popular EV cars in India are Tata Punch EV, MG Comet EV, Mahindra XUV400 EV, Tata Tiago EV, MG ZS EV and many more. These best electric cars were identified based on user interest in the V3Cars platform. Explore the list of 2024 popular electric cars in India and check which car suits your requirements. Check "
                                            : `Gear up for exciting new car launches in India (2024-2025)! We’ve compiled a comprehensive list featuring over 164 upcoming cars across various segments like SUVs, hatchbacks, sedans, and more. Top brands like Maruti Suzuki, Hyundai, Tata, Mahindra, Kia and others are all set to unveil their latest offerings. Explore expected prices, model image and launch dates for each car.`
                            }
                        </p>

                        {/* Read More */}
                        <button className="text-sm text-[#FFCC00] font-medium hover:underline flex items-center gap-1">
                            Read More
                            <span className="transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {
                path === "/upcoming-cars" && (
                    <div className='w-full bg-gradient-to-l bg-[#F1EFF4] to-[#E7E4DF] dark:from-[#27272a] dark:to-[#18181b] min-h-[246px] py-[30px]'>
                        <div className='px-6 lg:px-10'>
                        <div className="w-full lg:max-w-[1600px] mx-auto space-y-5">
                            <h2 className="text-xl font-semibold border-b border-[#CED4DA] dark:border-[#2E2E2E] pb-2">Upcoming Cars By Month</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                                {months.map(({ month, year }) => {
                                    const key = `${month} ${year}`
                                    const isSelected = key === selected

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelected(key)}
                                            className={`w-full sm:max-w-[250px] h-[57px] grid grid-cols-2 justify-between items-center rounded-md shadow-sm text-left text-sm transition-all duration-200
                                    ${isSelected ? 'bg-black text-white border border-orange-400' : 'bg-white dark:bg-transparent border dark:border-[#2E2E2E] hover:border-orange-300'}
                                    `}
                                        >
                                            <div className='border-r border-[#CED4DA] text-center'>
                                                <div className={`font-semibold text-lg`}>
                                                    {month}
                                                </div>
                                                <div className="text-xs text-orange-500">{year}</div>
                                            </div>
                                            <div className={`text-center font-semibold text-lg`}>
                                                50 Cars{" "}
                                                <p className='text-xs font-normal text-orange-500'>Upcoming</p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
}
