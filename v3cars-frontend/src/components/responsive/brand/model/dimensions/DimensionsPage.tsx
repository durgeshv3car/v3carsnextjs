'use client'

import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
import CommonSellingCarCard from "@/components/common/ModelCards/CommonSellingCarCard";
import CommonUsedCarCard from "@/components/common/ModelCards/CommonUsedCarCard";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import BannerSection from "@/components/responsive/brand/model/BannerSection";
import BrochureCard from "@/components/responsive/brand/model/sidebar/BrochureCard";
import CarColours from "@/components/responsive/brand/model/sidebar/CarColours";
import CSDPriceList from "@/components/responsive/brand/model/sidebar/CSDPriceList";
import EMICalculator from "@/components/responsive/brand/model/sidebar/EMICalculator";
import LatestOffersDiscounts from "@/components/responsive/brand/model/sidebar/LatestOffersDiscounts";
import MonthlySales from "@/components/responsive/brand/model/sidebar/MonthlySales";
import OnRoadPriceinTopCities from "@/components/responsive/brand/model/sidebar/OnRoadPriceinTopCities";
import OtherCars from "@/components/responsive/brand/model/sidebar/OtherCars";
import VariantExplained from "@/components/responsive/brand/model/sidebar/VariantExplained";
import Marquee from "@/components/ui/Marquee";
import useIsMobile from "@/hooks/useIsMobile";
import { useGetModelLatestNewsQuery, useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import { useGetModelReviewsVideosQuery } from "@/redux/api/videosModuleApi";
import DimensionsTable from "./DimensionsTable";
import DimensionsTyreSizeTable from "./DimensionsTyreSizeTable";
import { useGetDimensionsCapacityQuery, useGetModelDetailsQuery } from "@/redux/api/carModuleApi";
import { CarData } from "../overview/Overview";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import { useState } from "react";

interface DimensionsPageProps {
    type: string;
    slug: string;
    childSlug: string;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    groundClearance: number;
}

export interface BootSpace {
    normal: number;
    cng: number;
    hybrid: number;
}

export interface TyreSize {
    base: string;
    top: string;
}

export interface UnitConversion {
    mm: number;
    cm: number;
    inches: number;
    feet: number;
}

export interface Conversions {
    length: UnitConversion;
    width: UnitConversion;
    height: UnitConversion;
    wheelbase: UnitConversion;
    groundClearance: UnitConversion;
}

export interface Capacity {
    bootSpace: {
        Petrol: number;
        Diesel: number;
        CNG: number;
        Hybrid: number | null;
    };
    fuelTankCapacity: {
        Petrol: number;
        Diesel: number;
        CNG: number;
        Hybrid: number | null;
    };
    seatingCapacity: number;
}

export interface TyreByVariantItem {
    variantId: number;
    variantName: string;
    tyreSize: string | null;
    base: string;
    top: string;
}

export interface ModelDimensionsResponse {
    dimensions: Dimensions;
    bootSpace: BootSpace;
    tyreSize: TyreSize;
    conversions: Conversions;
    capacity: Capacity;
    tyreByVariant: TyreByVariantItem[];
}


function DimensionsPage({ type, slug, childSlug }: DimensionsPageProps) {
    const [fuelType, setFuelType] = useState("petrol");
    const [transmission, setTransmission] = useState("");
    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelLatestNewsData } = useGetModelLatestNewsQuery({ model_slug: slug }, { skip: !slug });
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: modelReviewsVideosData } = useGetModelReviewsVideosQuery({ model_slug: slug }, { skip: !slug })
    const { data: dimensionsCapacityData } =
        useGetDimensionsCapacityQuery(
            { model_slug: slug, fuelType: fuelType || undefined, transmissionType: transmission || undefined },
            { skip: !slug }
        )
    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const modelLatestNews = modelLatestNewsData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const modelReviewsVideos = modelReviewsVideosData?.rows ?? []

    const isMobile = useIsMobile()

    return (
        <>
            <div className="relative">
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

                {/* Banner content on top */}
                <div className="lg:px-8 px-4 shadow-md">
                    <div className="relative w-full lg:app-container mx-auto z-10">
                        <BannerSection type={type} slug={slug} modelDetails={modelDetails} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <DimensionsTable
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                conversionsData={dimensionsCapacityData?.conversions ?? null}
                                capacityData={dimensionsCapacityData?.capacity ?? null}
                            />

                            <DimensionsTyreSizeTable
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                tyreSize={dimensionsCapacityData?.tyreSize ?? null}
                                tyreByVariantData={dimensionsCapacityData?.tyreByVariant ?? []}
                                fuelType={fuelType}
                                setFuelType={setFuelType}
                                transmission={transmission}
                                setTransmission={setTransmission}
                            />

                            <CommonSellUsedCarComponent />

                            <CommonViewOfferCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                desc={`The ${modelDetails?.model?.name} competes with popular models including`}
                                slug={slug}
                            />

                            <CommonUsedCarCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[160px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/ads.png'}
                                    alt="ads"
                                    width={970}
                                    height={90}
                                    className="rounded-lg"
                                />
                            </div>

                            {isMobile ? <MobileLatestCarNews
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest News`}
                                view="Latest News"
                                data={modelLatestNews}
                                link="/news"
                            />
                                :
                                <CommonNewsUpdate
                                    title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest News`}
                                    view={`${modelDetails?.model?.name} News Update`}
                                    newsList={modelLatestNews}
                                    link={"/news"}
                                />
                            }

                            <CommonVideos
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest Videos`}
                                view={`${modelDetails?.model?.name} Videos`}
                                videoList={modelReviewsVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonModelFAQ
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                faqs={faqs} viewAllLink="#"
                            />

                            <CommonSellingCarCard
                                title="Best Selling B2-segment SUVs in India - Sep 2025"
                            />

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
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                url={undefined}
                            />

                            <CSDPriceList
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <LatestOffersDiscounts
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

                            <MonthlySales
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <OnRoadPriceinTopCities
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

                            <OtherCars
                                title={`Other ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <OtherCars
                                title={`Upcoming ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <CarColours
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <VariantExplained
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
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

export default DimensionsPage;

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