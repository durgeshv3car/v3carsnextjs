'use client'

import React, { useState } from 'react'

import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import ToolsCommonSection from '@/components/common/ToolsCommonSection'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import MileageInputSection from './MileageInputSection'
import CommonHowItWorkCard from '@/components/common/CommonHowItWorkCard'
import CommonUsefulToolComponent from '@/components/common/CommonUsefulToolComponent'
import CommonQuickLinkComponent from '@/components/common/CommonQuickLinkComponent'
import CommonSellUsedCarComponent from '@/components/common/ModelCards/CommonSellUsedCarComponent'
import MileageGuide from './MileageGuide'
import BottomAd from '@/components/common/BottomAd'
import MileageCalculatorComponent from './MileageCalculatorComponent'

export type FuelCostInputs = {
    vehicle?: string;
    fuel?: string;
    distance?: string;
    volume?: string;
};

export default function MainMileageComponent() {
    const [inputs, setInputs] = useState<FuelCostInputs>({});

    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 11 });
    const faqByModule = faqByModuleData?.rows ?? [];

    const handleInputChange = (updatedValues: FuelCostInputs) => {
        setInputs((prev) => ({ ...prev, ...updatedValues }));
    };

    return (
        <div>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary">
                                Mileage Calculator
                            </span>
                        </div>

                        <span className="font-medium text-primary">
                            How It Works
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-6"
                style={{ backgroundImage: `url('/car-on-road-price/top-bg.png')` }}
            >
                <div
                    className="absolute top-6 right-4 w-[200px] h-[200px] bg-cover bg-no-repeat z-20 pointer-events-none opacity-30"
                    style={{ backgroundImage: `url('/car-on-road-price/Wave.png')` }}
                />

                <div className="absolute inset-0 dark:bg-black/85"></div>

                <div className="relative z-10">
                    <div className="flex justify-center items-center my-4">
                        <img
                            src="/model/bannerads.png"
                            alt="bannerads"
                            width={970}
                            height={90}
                            className="rounded-lg"
                        />
                    </div>

                    <ToolsCommonSection
                        title={
                            <span>
                                Mileage <span className="text-yellow-500">Calculator</span>
                            </span>
                        }
                        desc={`Track your car or bike’s fuel efficiency with ease. This mileage calculator helps you determine mileage for any vehicle by entering distance travelled, fuel used and fuel price. Get results in units like km/l, km/kg or miles per gallon (mpg)`}
                    />
                </div>
            </div>

            <div className="relative mb-[170px] lg:mb-12">
                <div className="absolute -top-12 left-0 w-full px-4 lg:px-10">
                    <div className="w-full lg:app-container mx-auto">
                        <MileageInputSection onInputChange={handleInputChange} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-10">
                    <MileageCalculatorComponent inputs={inputs} />

                    <BottomAd />

                    <CommonHowItWorkCard
                        title="Car Loan EMI Calculator – How It Works"
                        data={howItWorkData}
                    />

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Car/Bike Average Calculator
                        </h2>

                        <div className="space-y-4 text-[15px] leading-relaxed text-gray-400">
                            <p>
                                Save money and optimize performance by monitoring your vehicle&apos;s mileage. This mileage calculator is perfect for tracking mileage using the tankful-to-tankful method. Wondering why monitoring mileage is important? Our FAQ section dives deeper into the benefits, applicable to all vehicles (cars, bikes, SUVs, trucks, taxis). There, you&apos;ll also find a detailed explanation of the tank-to-tank method itself. Check Your Car / Bike Average Running Cost With V3Cars Fuel Cost Calculator
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <CommonSellUsedCarComponent />

                            <MileageGuide />

                            <CommonQuickLinkComponent data={links} />

                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>

                        <div className="w-auto lg:min-w-[24%] space-y-6">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CommonUsefulToolComponent />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}


const howItWorkData = [
    {
        title: "Vehicle & Fuel Type",
        desc: "Select your vehicle & fuel type.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/mileage-calculator/fuel-type.png" className="w-32 h-14" />
            </div>
        ),
        bg: "#CBE7F4", // Blue
    },
    {
        title: "Units & Quantity",
        desc: "Choose distance units & fuel units",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/mileage-calculator/qty.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#FCD9D7", // Light red
    },
    {
        title: "Enter Details",
        desc: "Input Distance, Fuel Consumed & Fuel Price.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/mileage-calculator/fuel.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#FFECBE", // Light yellow
    },
    {
        title: "Calculated Results",
        desc: "Instantly see Mileage & Total Fuel Cost.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/mileage-calculator/result.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#D8E7CA", // Light green
    },
];


const links = [
    {
        title: "On-Road Price Calculator",
        desc: "Get the full on-road price with all taxes & fees.",
        img: "/mileage-calculator/on-road.png",
        bg: "bg-[#E4F3FE]",
    },
    {
        title: "Fuel Price in India",
        desc: "Check Latest Fuel Prices Across India",
        img: "/emicalculator/fuel.png",
        bg: "bg-[#FCEFFE]",
    },
    {
        title: "Car Loan EMI Calculator",
        desc: "Calculate Your Monthly Car Loan EMI",
        img: "/emicalculator/emi.png",
        bg: "bg-[#FFF8C9]",
    },
    {
        title: "Compare Cars",
        desc: "Compare Specs, Features & Prices",
        img: "/emicalculator/compare.png",
        bg: "bg-[#E0F8E8]",
    },
];