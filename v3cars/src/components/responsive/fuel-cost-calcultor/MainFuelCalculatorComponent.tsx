'use client'

import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import { RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ToolsCommonSection from '@/components/common/ToolsCommonSection'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import CommonUsefulToolComponent from '@/components/common/CommonUsefulToolComponent'
import CommonQuickLinkComponent from '@/components/common/CommonQuickLinkComponent'
import CommonHowItWorkCard from '@/components/common/CommonHowItWorkCard'
import CommonSellUsedCarComponent from '@/components/common/ModelCards/CommonSellUsedCarComponent'
import FuelCostCalculation from './FuelCostCalculation'
import FuelCostIndia from './FuelCostIndia'
import FuelCostGraph from './FuelCostGraph'
import FuelInputSection from './FuelInputSection'
import FuelCardSection from './FuelCardSection'

type FuelCostInputs = {
    drivingDistance?: number;
    country?: string;
    currencySymbol?: string;
    exchangeCurrencyRate?: number;
};

export default function MainFuelCalculatorComponent() {
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 2 });
    const faqByModule = faqByModuleData?.rows ?? [];
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

    const [inputs, setInputs] = useState<FuelCostInputs>({});

    const handleInputChange = (updatedValues: FuelCostInputs) => {
        setInputs((prev) => ({ ...prev, ...updatedValues }));
    };

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary">
                                Fuel Cost Calculator India
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
                                Fuel Cost <span className="text-yellow-500">Calculator</span> India
                            </span>
                        }
                        desc={`Estimate your car’s daily, monthly or yearly fuel expenses for petrol, diesel or CNG vehicles. Enter your car’s fuel efficiency, local fuel price and driving distance to get accurate running cost results.`}
                    />
                </div>
            </div>


            <div className="relative mb-[470px] sm:mb-[300px] lg:mb-36">
                <div className="absolute -top-12 left-0 w-full px-4 lg:px-10">
                    <div className="w-auto lg:app-container mx-auto">
                        <FuelInputSection onInputChange={handleInputChange} />
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-10">
                <div className="w-full lg:app-container mx-auto">
                    <FuelCardSection
                        inputs={inputs}
                        selectedCity={{
                            ...selectedCity,
                            cityId: selectedCity.cityId ?? 0
                        }}
                    />
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-10"
                style={{ backgroundImage: `url('/fuel-cost-calculator/fuel-cost-india.png')` }}
            >
                <div className="absolute inset-0 dark:bg-black/85"></div>

                <div className=' relative px-4 lg:px-10 z-10'>
                    <div className='w-full lg:app-container mx-auto space-y-16'>
                        <CommonHowItWorkCard
                            title="Fuel Cost Calculator – How It Works"
                            data={howItWorkData}
                        />

                        <FuelCostIndia />
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-[#f6f7f8] dark:bg-black">
                <div className='px-4 lg:px-10'>
                    <div className='w-full lg:app-container mx-auto py-8 space-y-8'>
                        <FuelCostGraph
                            districtId={145}
                            selectedCity={{
                                ...selectedCity,
                                cityId: selectedCity.cityId ?? 0
                            }}
                        />

                        <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                            <div className="w-auto lg:min-w-[74%] space-y-6">

                                <CommonSellUsedCarComponent />

                                <FuelCostCalculation />

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
        </>
    )
}


const howItWorkData = [
    {
        title: "Driving Distance",
        desc: "Enter how much you drive",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/fuel-cost-calculator/driving.png" className="w-32 h-24" />
            </div>
        ),
        bg: "#cbe7f4", // Blue
    },
    {
        title: "Select Units",
        desc: "Choose km/miles & litre/gallon.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/fuel-cost-calculator/units.png" className="w-24 h-24" />
            </div>
        ),
        bg: "#fcd9d7", // Light red
    },
    {
        title: "Mileage & Fuel Price",
        desc: "Add fuel efficiency & local fuel rates.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/fuel-cost-calculator/fuel-price.png" className="w-40 h-24" />
            </div>
        ),
        bg: "#ffecbe", // Light yellow
    },
    {
        title: "Fuel Cost Breakdown",
        desc: "Daily, monthly & yearly running cost.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/fuel-cost-calculator/break-down.png" className="w-40 h-24" />
            </div>
        ),
        bg: "#d8e7ca", // Light green
    },
];

 const links = [
    {
        title: "Mileage Calculator",
        desc: "Estimate Your Vehicle's Fuel Efficiency",
        img: "/emicalculator/mileage.png",
        bg: "bg-[#E4F3FE]",
        url: "/mileage-calculator"
    },
    {
        title: "Fuel Price in India",
        desc: "Check Latest Fuel Prices Across India",
        img: "/emicalculator/fuel.png",
        bg: "bg-[#FCEFFE]",
        url: "/fuel-price-in-india"
    },
    {
        title: "Car Loan EMI Calculator",
        desc: "Calculate Your Monthly Car Loan EMI",
        img: "/emicalculator/emi.png",
        bg: "bg-[#FFF8C9]",
        url: "/car-loan-emi-calculator"
    },
    {
        title: "Compare Cars",
        desc: "Compare Specs, Features & Prices",
        img: "/emicalculator/compare.png",
        bg: "bg-[#E0F8E8]",
        url: "/compare-cars"
    },
];