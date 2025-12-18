'use client';

import {
    useGetPopularComparisonsQuery,
} from "@/redux/api/contentModuleApi";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import CommonHowItWorkCard from "@/components/common/CommonHowItWorkCard";
import BottomAd from "@/components/common/BottomAd";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import CommonUsefulToolComponent from "@/components/common/CommonUsefulToolComponent";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CarComparison from "../compare-cars/CarComparison";
import MostPopularCarComparison from "../compare-cars/MostPopularCarComparison";
import HowToEvaluate from "./HowToEvaluate";
import WhatIncluded from "./WhatIncluded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useGetSearchCityQuery } from "@/redux/api/locationModuleApi";
import CommonSelectInput from "@/components/common/CommonSelectInput";
import { City } from "@/components/web/header/LocationDropdown";
import { setSelectedCity } from "@/redux/slices/commonSlice";

function MainOwnerShipPageComponent() {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const dispatch = useDispatch();
    const [cityId, setCityId] = useState<number | null>(null)
    const [query, setQuery] = useState("");
    const { data: searchCityData } = useGetSearchCityQuery({ query: query! }, { skip: !query });
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });

    const faqByModule = faqByModuleData?.rows ?? [];
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const cities = searchCityData?.rows ?? []

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
                                Cost of Ownership
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
                                Cost of Ownership <span className="text-yellow-500">Calculator</span>
                            </span>
                        }
                        desc={`Understanding how much a car costs to own is just as important as checking its price or features. This Cost of Ownership Calculator gives you a clear estimate of the total expense you’re likely to incur over your ownership period, including on-road`}
                    />

                    <div className="px-4 xl:px-10">
                        <div className="w-full lg:app-container mx-auto">
                            <div className="w-full flex items-center justify-center gap-3">
                                <div className="w-[200px] border rounded-lg text-sm py-1 dark:border-[#2e2e2e]">
                                    <CommonSelectInput
                                        query={query}
                                        setQuery={setQuery}
                                        options={cities}
                                        defaultValue={selectedCity.cityName}
                                        labelKey="cityName"
                                        valueKey="cityId"
                                        value={cityId ?? undefined}
                                        onSelect={(item: City) => {
                                            setCityId(item.cityId);
                                            dispatch(setSelectedCity({
                                                cityId: item.cityId,
                                                cityName: item.cityName
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <CarComparison />

                    <div>
                        <h1 className="text-2xl font-semibold mb-4">
                            Understand Your Car’s True Ownership Cost
                        </h1>

                        <p className="mb-6 leading-relaxed text-gray-400">
                            Most buyers focus on the ex-showroom price, but the real cost of owning
                            a car becomes clear only when you add fuel or charging expenses,
                            scheduled service bills, insurance, taxes and routine wear-and-tear
                            over time. This tool brings all those numbers together so you can see
                            what you’ll actually spend during ownership.
                        </p>

                        <p className="leading-relaxed text-gray-400">
                            Whether you’re choosing between petrol, diesel, CNG or electric
                            models, or comparing multiple cars for long-term costs, the breakdown
                            here helps you make an informed decision. Adjust your city, running
                            distance or finance preference to see how the numbers change and which
                            car fits your budget in the long run.
                        </p>
                    </div>

                    <CommonHowItWorkCard
                        title="Cost of Ownership Tool – How It Works"
                        data={howItWorkData}
                    />

                    <MostPopularCarComparison
                        title="Popular Ownership Comparisons"
                        data={popularComparisons}
                    />

                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">

                <div className="w-full lg:app-container pb-6 mx-auto space-y-7 mt-7">
                    <HowToEvaluate />

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <CommonSellUsedCarComponent />

                            <WhatIncluded />

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
        </>
    );
}

export default MainOwnerShipPageComponent;


const howItWorkData = [
    {
        title: "Select Car & City",
        desc: "Choose your car along with the city where you’ll register it.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/car.png" className="w-16 h-12" />
            </div>
        ),
        bg: "#cbe7f4", // Blue
    },
    {
        title: "Set Ownership Period & Usage",
        desc: "Choose your ownership duration & enter how much you plan to drive.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/cost-of-ownership/ownership-period.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#fcd9d7", // Light red
    },
    {
        title: "View Ownership Breakdown",
        desc: "See a detailed split of taxes, fuel/charging, insurance & service costs.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/cost-of-ownership/breakdown.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#ffecbe", // Light yellow
    },
    {
        title: "Compare & Decide",
        desc: "Compare up to four cars & see which one costs less to own long-term.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/verdict.png" className="w-14 h-14" />
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