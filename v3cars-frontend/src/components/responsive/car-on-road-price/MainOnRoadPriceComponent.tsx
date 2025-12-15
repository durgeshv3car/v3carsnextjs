'use client'


import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import Link from "next/link";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useState } from "react";
import CarInIndia from "./CarsInIndia";
import { IoIosArrowForward } from "react-icons/io";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import CommonBrandModelTool from "@/components/common/CommonBrandModelTool";
import CommonHowItWorkCard from "@/components/common/CommonHowItWorkCard";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import CommonUsefulToolComponent from "@/components/common/CommonUsefulToolComponent";
import OnRoadPriceInfo from "./OnRoadPriceInfo";
import CommonPriceInMajorCitiesCard from "@/components/common/CommonPriceInMajorCitiesCard";
import { IoSearchSharp } from "react-icons/io5";


function MainOnRoadPriceComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [modelId, setModelId] = useState<number | null>(null);
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });

    const faqByModule = faqByModuleData?.rows ?? [];

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
                                On-Road Price
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
                                Calculate Car <span className="text-yellow-500">On-Road Price</span> In India
                            </span>
                        }
                        desc={`Get accurate, city-wise on-road prices for every car sold in India — including RTO tax, insurance, registration, and other mandatory charges. Our tool lets you instantly calculate the total cost of ownership for your selected...`}
                    />

                    <div className="px-4 xl:px-10">
                        <div className="w-full lg:app-container mx-auto">
                            <div className="w-full flex items-center justify-between gap-3">
                                <div className="flex items-center gap-1 text-xl lg:text-2xl">
                                    <h2>Select</h2>
                                    <span className="font-bold">Brand</span>
                                </div>

                                <div className="flex items-center bg-transparent border border-gray-300 rounded-full px-4 py-2 w-[200px] lg:w-[300px] dark:border-[#2e2e2e]">
                                    <input
                                        type="text"
                                        placeholder="Search Brand Name"
                                        className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <IoSearchSharp size={18} className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="px-4 xl:px-10">

                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <CommonBrandModelTool searchQuery={searchQuery} modelId={modelId} setModelId={setModelId} />

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <CarInIndia />

                            <CommonHowItWorkCard
                                title="Car Loan EMI Calculator – How It Works"
                                data={howItWorkData}
                            />

                            <CommonSellUsedCarComponent />

                            <OnRoadPriceInfo />

                            <CommonQuickLinkComponent data={links} />

                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>

                        <div className="w-auto lg:min-w-[24%] space-y-6 lg:mt-12">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CommonPriceInMajorCitiesCard />

                            <CommonUsefulToolComponent />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default MainOnRoadPriceComponent;


const howItWorkData = [
    {
        title: "Select Brand",
        desc: "Choose your preferred car manufacturer.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/car-on-road-price/brands.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#cbe7f4", // Blue
    },
    {
        title: "Select Model",
        desc: "Pick the exact car model you want to price.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/bxs_car.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#fcd9d7", // Light red
    },
    {
        title: "Select Powertrain & Variant",
        desc: "Choose fuel type, transmission & variant ",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/car-on-road-price/fuel.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#ffecbe", // Light yellow
    },
    {
        title: "View On-Road Price Breakdown",
        desc: "Get full on-road price breakup.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/calculator.png" className="w-14 h-14" />
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