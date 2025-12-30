'use client';

import {
    useGetPopularComparisonsQuery,
} from "@/redux/api/contentModuleApi";
import MostPopularCarComparison from "./MostPopularCarComparison";
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
import WhyCompareCars from "./WhyCompareCars";
import SmartBuyersGuide from "./SmartBuyersGuide";
import CarComparison from "./CarComparison";
import CommonSelectInput from "@/components/common/CommonSelectInput";
import { useState } from "react";
import { useGetSearchCityQuery } from "@/redux/api/locationModuleApi";
import { City } from "@/components/web/header/LocationDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "@/redux/slices/commonSlice";
import { RootState } from "@/redux/store";

function MainCompareCarComponent() {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const dispatch = useDispatch();
    const [cityId, setCityId] = useState<number | null>(null)
    const [query, setQuery] = useState("");
    const { data: searchCityData } = useGetSearchCityQuery({ query: query! }, { skip: !query });
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });

    const faqByModule = faqByModuleData?.rows ?? [];
    const cities = searchCityData?.rows ?? []

    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();

    const popularComparisons = popularComparisonsData?.rows ?? [];

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
                                Compare Cars
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
                                Car <span className="text-yellow-500">Comparison</span>
                            </span>
                        }
                        desc={`Compare up to four cars side by side and evaluate every detail that matters before buying. This car comparison tool lets you compare price, engine specs, mileage, safety rating, dimensions, features, maintenance cost, warranty, colours and variant-wi`}
                    />

                    <div className="px-4 xl:px-10">
                        <div className="w-full lg:app-container mx-auto">
                            <div className="flex items-center justify-center gap-3">
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
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-3">
                            Compare to Choose the Right Car!
                        </h2>

                        {/* First paragraph */}
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            Choosing a new car can feel overwhelming, especially when several
                            models fit your budget and preferences. This comparison section
                            helps you simplify that decision by letting you line up multiple
                            cars and instantly see how they differ where it truly matters to
                            you.
                        </p>

                        {/* Second paragraph */}
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Just pick the cars you want to evaluate, select the relevant variants,
                            and the tool highlights meaningful differences—helping you understand
                            which option aligns better with your priorities, whether that’s
                            performance, comfort, practicality or long-term ownership experience.
                        </p>
                    </div>

                    <CommonHowItWorkCard
                        title="Car Comparison Tool - How it works"
                        data={howItWorkData}
                    />

                    <MostPopularCarComparison
                        title="Popular Car Comparison"
                        data={popularComparisons}
                    />

                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">

                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <WhyCompareCars />

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">

                            <CommonSellUsedCarComponent />

                            <SmartBuyersGuide />

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

export default MainCompareCarComponent;


const howItWorkData = [
    {
        title: "Select Cars",
        desc: "Choose up to four cars you want to compare & start building your shortlist.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/car.png" className="w-16 h-12" />
            </div>
        ),
        bg: "#cbe7f4", // Blue
    },
    {
        title: "Choose Variants",
        desc: "Pick fuel type, transmission & variant for each car.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/variant.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#fcd9d7", // Light red
    },
    {
        title: "View Detailed Comparison",
        desc: "Get detailed specs, features, prices & differences.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/compare.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#ffecbe", // Light yellow
    },
    {
        title: "Check Expert Verdict",
        desc: "Get smart insights & a clear verdict to understand which car suits you best.",
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