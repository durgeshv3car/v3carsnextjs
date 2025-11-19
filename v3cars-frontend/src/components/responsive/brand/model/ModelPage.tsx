'use client';

import Link from "next/link";
import BannerSection from "./BannerSection";
import LatestUpdates from "./overview/LatestUpdates";
import CommonModelCard from "@/components/common/ModelCards/CommonModelCard";
import CommonList from "./overview/CommonList";
import SpecsListTable from "./overview/SpecsListTable";
import ModelExpertReview from "./overview/ModelExpertReview";
import ModelProsCons from "./overview/ModelProsCons";
import ModelComparisonSimilarCars from "./overview/ModelComparisonSimilarCars";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import useIsMobile from "@/hooks/useIsMobile";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import { useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
import CommonVideos from "@/components/common/CommonVideos";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";
import BrochureCard from "./sidebar/BrochureCard";
import CSDPriceList from "./sidebar/CSDPriceList";
import LatestOffersDiscounts from "./sidebar/LatestOffersDiscounts";
import MonthlySales from "./sidebar/MonthlySales";
import OnRoadPriceinTopCities from "./sidebar/OnRoadPriceinTopCities";
import OtherCars from "./sidebar/OtherCars";
import CarColours from "./sidebar/CarColours";
import VariantExplained from "./sidebar/VariantExplained";
import EMICalculator from "./sidebar/EMICalculator";
import CostOfOwnership from "./sidebar/CostOfOwnership";
import Marquee from "@/components/ui/Marquee";
import { useGetBestVariantToBuyQuery, useGetDimensionsCapacityQuery, useGetModelDetailByFuelTypeQuery, useGetModelDetailsQuery } from "@/redux/api/carModuleApi";
import { CarData } from "./overview/Overview";
import { useState } from "react";
import { BootSpace, Dimensions, TyreSize } from "./overview/DimensionsTable";

const data = [
    {
        id: 1,
        src: "/model/tata.png",
        name: "It has a modern design with a rugged stance.It has a modern design with a rugged stance."
    },
    {
        id: 2,
        src: "/model/tata.png",
        name: "Flat ride quality and tall ground clearance.It has a modern design with a rugged stance."
    },
    {
        id: 3,
        src: "/model/tata.png",
        name: "Large instrument cluster and responsive infotainment."
    },
]

interface ModelPageProps {
    type: string;
    slug: string;
}

interface finalSpecsArray {
    title: string;
    data: Dimensions | BootSpace | TyreSize;
}

export default function ModelPage({ type, slug }: ModelPageProps) {
    const [fuelType, setFuelType] = useState<string>("petrol")
    const [transmissionType, setTransmissionType] = useState<string>("")
    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelDetailByFuelTypeData } = useGetModelDetailByFuelTypeQuery({ model_slug: slug, fuelType: fuelType, transmissionType: transmissionType ?? undefined }, { skip: !slug });
    const { data: bestVariantToBuyData } = useGetBestVariantToBuyQuery({ model_slug: slug }, { skip: !slug });
    const { data: dimensionsCapacityData } = useGetDimensionsCapacityQuery({ model_slug: slug }, { skip: !slug });
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: latestVideosData } = useGetLatestVideosQuery()

    console.log(transmissionType);
    

    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const modelDetailByFuelType = modelDetailByFuelTypeData?.rows ?? [];
    const bestVariantToBuy = bestVariantToBuyData?.rows ?? [];
    const dimensionsCapacity = dimensionsCapacityData
        ? [dimensionsCapacityData]
        : null;
    const latestCarNews = latestCarNewsData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const latestVideos = latestVideosData?.rows ?? []
    const isMobile = useIsMobile()

    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <Link href={`/${type}`} className="hover:underline">
                            {type}
                        </Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            {slug}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center my-4">
                <img
                    src={'/model/bannerads.png'}
                    alt="bannerads"
                    width={970}
                    height={90}
                    className="rounded-lg"
                />
            </div>

            <div className="relative mt-10">
                {/* Background Image */}
                {/* <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
                    style={{ backgroundImage: "url('/model/bg.png')" }}
                /> */}
                <div className="absolute flex justify-center md:justify-normal inset-0 z-0 w-full lg:app-container overflow-hidden">
                    <h1
                        className="text-[10vw] md:text-[6vw] font-extrabold text-gray-200 dark:text-gray-500/20 uppercase select-none tracking-widest"
                        style={{
                            wordBreak: "break-word",
                        }}
                    >
                        <Marquee text={slug} speed="25s" />
                    </h1>
                </div>

                <div className="lg:px-8 px-4 shadow-md">
                    {/* Banner content on top */}
                    <div className="relative w-full lg:app-container mx-auto z-10">
                        <BannerSection type={type} slug={slug} modelDetails={modelDetails} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <LatestUpdates
                                title="Tata Nexon"
                            />

                            <CommonModelCard
                                title="Tata Nexon"
                                data={data}
                            />

                            <CommonList
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                title="Price List"
                                desc={
                                    modelDetails
                                        ? `The ${modelDetails.model.brand.name} ${modelDetails.model.name} ${modelDetails.model.bodyType} is available with multiple engine and transmission combinations. The ex-showroom prices of the ${modelDetails.model.name} start from ₹${(
                                            (modelDetails.priceRange.exShowroom.min ?? 0) / 100000
                                        ).toFixed(2)} lakh. The top-end variant is priced at ₹${(
                                            (modelDetails.priceRange.exShowroom.max ?? 0) / 100000
                                        ).toFixed(2)} lakh (ex-showroom).`
                                        : ""
                                }
                                fuelTypes={modelDetails?.availableWith.fuels}
                                data={modelDetailByFuelType}
                                fuelType={fuelType}
                                setFuelType={setFuelType}
                                transmissionType={transmissionType}
                                setTransmissionType={setTransmissionType}
                            />

                            <CommonList
                                model={`Best ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                title="Variant To Buy"
                                desc="See our recommended Tata Nexon variant for each powertrain with the highest value score. Visit the Which Variant To Buy page for a complete breakdown and alternatives"
                                data={bestVariantToBuy}
                            />

                            <CommonList
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                title="Dimensions & Capacity"
                                desc="The 2025 Nexon is 3995mm long, 1804mm wide and 1620mm tall. Bigger exterior dimensions give a car a stronger road presence. The Nexon has a 2498mm long wheelbase. A long wheelbase makes the car more stable at high speeds and gives better legroom in the back"
                                data={dimensionsCapacity as [] | null}
                            />

                            <SpecsListTable
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            <ModelExpertReview
                                model="Tata Nexon"
                            />

                            <ModelProsCons
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            {/* <ModelComparisonSimilarCars
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            /> */}

                            <CommonViewOfferCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                desc={`The ${modelDetails?.model?.name} competes with popular models including`}
                                slug={slug}
                            />

                            {isMobile ? <MobileLatestCarNews
                                title="Tata Nexon Latest News"
                                view="Latest News"
                                data={latestCarNews}
                                link="/news"
                            />
                                :
                                <CommonNewsUpdate
                                    title="Tata Nexon Latest News"
                                    view="Nexon News Update"
                                    newsList={latestCarNews}
                                    link={"/news"}
                                />
                            }

                            <CommonVideos
                                title="Tata Nexon Latest Videos"
                                view="Nexon Videos"
                                videoList={latestVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonModelFAQ title="Tata Nexon" faqs={faqs} viewAllLink="#" />

                        </div>


                        {/* sidebar */}
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

                            <BrochureCard
                                title="Tata Nexon"
                            />

                            <CSDPriceList
                                title="Toyota Urban Cruiser Hyryder"
                            />

                            <LatestOffersDiscounts
                                title="Toyota Urban Cruiser Hyryder"
                            />

                            <CostOfOwnership
                                title="Tata Nexon"
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
                                title="Tata Nexon"
                            />

                            <OnRoadPriceinTopCities
                                title="Tata Nexon"
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
                                title="Other Tata Nexon"
                            />

                            <OtherCars
                                title="Upcoming Tata Nexon"
                            />

                            <CarColours
                                title="Tata Nexon"
                            />

                            <VariantExplained
                                title="Tata Nexon"
                            />

                            <EMICalculator
                                title="Tata Nexon"
                            />

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}



const faqs = [
    {
        question: "What is the exact on-road price of Tata Nexon?",
        answer:
            "The on-road price of Nexon in Delhi starts at ₹8,22,812. The on-road price is inclusive of RTO charges and insurance.",
    },
    { question: "What are the latest October offers available on Tata Nexon?" },
    { question: "Which car is better Nexon or Punch?" },
    { question: "What will the EMI or down payment for Tata Nexon?" },
    { question: "Is Tata Nexon a 5 or 7 seater SUV?" },
    { question: "What is the mileage of Tata Nexon?" },
    { question: "What are the colour options available for Tata Nexon?" },
];