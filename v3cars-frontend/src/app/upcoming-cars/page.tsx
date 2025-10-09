'use client'

import NewCarsLaunched from "@/components/responsive/upcoming-cars/NewCarsLaunched";
import NewUpcomingCars from "@/components/responsive/upcoming-cars/NewUpcomingCars";
import TopSection from "@/components/common/TopSection";
import BottomAd from "@/components/common/BottomAd";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingTopBrands from "@/components/common/UpcomingCarByTopBrands";
import Upcoming from "@/components/common/TopBrands";
import { useEffect, useState } from "react";
import { useGetMonthQuery } from "@/redux/api/carModuleApi";

// export const metadata: Metadata = {
//     title: "Upcoming Cars in India 2024-2025 | Latest Launches, Prices, Images",
//     description:
//         "Explore all upcoming cars in India in 2024-2025 with expected prices, launch dates, images, and detailed specs. Stay updated on SUVs, hatchbacks, sedans, and electric cars from top brands like Maruti, Hyundai, Tata, Mahindra, and Kia.",
//     keywords: [
//         "upcoming cars India",
//         "new car launches 2024",
//         "upcoming SUV launches",
//         "new cars in India 2025",
//         "car launch dates",
//         "expected car prices",
//         "Maruti Suzuki upcoming cars",
//         "Hyundai new cars",
//         "Tata upcoming launches",
//         "Mahindra car launch",
//         "Kia India new cars",
//         "electric cars India",
//         "V3Cars"
//     ]
// };

interface Months {
    key: string,
    month: string,
    count: number
}

function UpcomingCars() {
    const { data: monthData } = useGetMonthQuery()
    const months: Months[] = monthData?.rows ?? [];
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        if (months.length > 0 && !selected) {
            setSelected(months[0].key)
        }
    }, [months])

    return (
        <>
            <TopSection
                title={"Upcoming Cars In India (2024-2025)"}
                description={`Gear up for exciting new car launches in India (2024-2025)! We’ve compiled a 
                    comprehensive list featuring over 164 upcoming cars across various segments like SUVs,
                     hatchbacks, sedans, and more. Top brands like Maruti Suzuki, Hyundai, Tata, Mahindra, Kia 
                     and others are all set to unveil their latest offerings. Explore expected prices, model image and launch dates for each car. 
                     `}
            />

            <div className='w-full bg-gradient-to-l bg-[#F1EFF4] to-[#E7E4DF] dark:from-[#27272a] dark:to-[#18181b] min-h-[246px] py-[30px]'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto space-y-5">
                        <h2 className="text-xl font-semibold border-b border-[#CED4DA] dark:border-[#2E2E2E] pb-2">
                            Upcoming Cars By Month
                        </h2>
                        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                            {months.map(({ key, month, count }, index) => {
                                // Extract year from key
                                const year = month.split(" ")[1]; // "2024"
                                const longMonth = month.split(" ")[0]; // "2024"
                                const isSelected = key === selected;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelected(key)}
                                        className={`grid grid-cols-2 justify-between py-2 items-center rounded-md shadow-sm text-left text-sm transition-all duration-200
                                        ${isSelected
                                                ? "bg-black text-white border border-orange-400"
                                                : "bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] hover:border-orange-300"
                                            }`}
                                    >
                                        {/* Left side: Month + Year */}
                                        <div className="border-r border-[#CED4DA] dark:border-[#2E2E2E] text-center">
                                            <div className="font-semibold text-sm lg:text-lg truncate">
                                                {longMonth}
                                            </div>
                                            <div className="text-[10px] lg:text-xs text-orange-500 truncate">
                                                {year}
                                            </div>
                                        </div>

                                        {/* Right side: Count */}
                                        <div className="text-center font-semibold text-sm lg:text-lg truncate">
                                            {count} Cars
                                            <p className="text-[10px] lg:text-xs font-normal text-orange-500 truncate">
                                                Upcoming
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <NewCarsLaunched selected={selected} />
                            <NewUpcomingCars />
                        </div>
                        <div className="w-auto lg:min-w-[24%] mt-6 lg:mt-12 space-y-10">
                            <SideBarAdSmall />
                            <UpcomingTopBrands />
                            <SideBarAdSmall />
                            <Upcoming />
                        </div>
                    </div>

                </div>
            </div>

            <BottomAd />

        </>
    );
}

export default UpcomingCars;