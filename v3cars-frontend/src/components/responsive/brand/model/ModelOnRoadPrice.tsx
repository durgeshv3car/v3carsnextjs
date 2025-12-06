'use client'


import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import Link from "next/link";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import CommonBrandModelTool from "@/components/common/CommonBrandModelTool";
import CommonHowItWorkCard from "@/components/common/CommonHowItWorkCard";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import OnRoadPriceInfo from "../../car-on-road-price/OnRoadPriceInfo";
import CommonPriceInMajorCitiesCard from "@/components/common/CommonPriceInMajorCitiesCard";
import { IoSearchSharp } from "react-icons/io5";
import BrochureCard from "./sidebar/BrochureCard";
import CSDPriceList from "./sidebar/CSDPriceList";
import LatestOffersDiscounts from "./sidebar/LatestOffersDiscounts";
import CostOfOwnership from "./sidebar/CostOfOwnership";
import MonthlySales from "./sidebar/MonthlySales";
import OnRoadPriceinTopCities from "./sidebar/OnRoadPriceinTopCities";
import OtherCars from "./sidebar/OtherCars";
import CarColours from "./sidebar/CarColours";
import VariantExplained from "./sidebar/VariantExplained";
import EMICalculator from "./sidebar/EMICalculator";
import { CarData } from "./overview/Overview";
import { useGetModelCompetitorsQuery, useGetModelDetailsQuery, useGetModelOthersCarsQuery, useGetModelUpcomingCarsQuery } from "@/redux/api/carModuleApi";
import CarInIndia from "../../car-on-road-price/CarsInIndia";
import CommonModelCard from "@/components/common/CommonCards/CommonModelCard";
import ModelOnRoadPriceDetails from "../../car-on-road-price/ModelOnRoadPriceDetails";
import EmiComponent from "../../car-on-road-price/EmiComponent";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import CommonCompetitorCard from "@/components/common/CommonCards/CommonCompetitorCard";

interface ModelOnRoadPriceProps {
    type: string
    slug: string
    cityName: string
}


function ModelOnRoadPrice({ type, slug, cityName }: ModelOnRoadPriceProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [modelId, setModelId] = useState<number | null>(null);
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });
    const { data: modelDetailsData, isLoading } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelUpcomingCarsData } = useGetModelUpcomingCarsQuery({ model_slug: slug }, { skip: !slug })
    const { data: modelOthersCarsData } = useGetModelOthersCarsQuery({ model_slug: slug })
    const { data: modelComparisonSimilarData } = useGetModelCompetitorsQuery({ model_slug: slug });

    const modelComparisonSimilar = modelComparisonSimilarData?.items ?? [];
    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const faqByModule = faqByModuleData?.rows ?? [];
    const modelUpcomingCars = modelUpcomingCarsData?.rows ?? [];
    const modelOthersCars = modelOthersCarsData?.items ?? [];

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
                            <Link href="/car-on-road-price-in-india" className="hover:underline">On-Road Price</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <Link href={`/${type}`} className="hover:underline capitalize">{type}</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary capitalize">
                                {slug}
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
                            <span className=" capitalize">
                                Calculate Car <span className="text-yellow-500">On-Road Price</span> In {cityName}
                            </span>
                        }
                        desc={`Get accurate, city-wise on-road prices for every car sold in India — including RTO tax, insurance, registration, and other mandatory charges. Our tool lets you instantly calculate the total cost of ownership for your selected...`}
                    />

                    <div className="w-full lg:app-container mx-auto">
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-1 text-2xl">
                                <h2>Select</h2>
                                <span className="font-bold">Brand</span>
                            </div>

                            <div className="flex items-center bg-transparent border border-gray-300 rounded-full px-4 py-2 w-[300px] dark:border-[#2e2e2e]">
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

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <CommonBrandModelTool searchQuery={searchQuery} modelId={modelId} setModelId={setModelId} />
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-6 mb-10"
                style={{ backgroundImage: `url('/car-on-road-price/model-bg.png')` }}
            >
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                        <ModelOnRoadPriceDetails
                            modelId={Number(modelDetails?.model.id)}
                            data={modelDetails}
                        />
                    </div>
                </div>
            </div>


            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <EmiComponent />

                            <CommonCompetitorCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            <CarInIndia />

                            <CommonHowItWorkCard
                                title="Car Loan EMI Calculator – How It Works"
                                data={howItWorkData}
                            />

                            <CommonSellUsedCarComponent />

                            <OnRoadPriceInfo />

                            <CommonQuickLinkComponent />

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

                            <CommonPriceInMajorCitiesCard />

                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <BrochureCard
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                url={`${modelDetails?.brochure.url}`}
                            />

                            <CSDPriceList
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <LatestOffersDiscounts
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <CostOfOwnership
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <MonthlySales
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <OnRoadPriceinTopCities
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <OtherCars
                                title={`Other ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelOthersCars}
                            />

                            <OtherCars
                                title={`Upcoming ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelUpcomingCars}
                            />

                            <CarColours
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelDetails?.media.colors ?? []}
                                type={type}
                                slug={slug}
                            />

                            <VariantExplained
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            <EMICalculator
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default ModelOnRoadPrice;


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