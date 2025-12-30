'use client'

import CommonVideos from "@/components/common/CommonVideos";
import CommonUsedCarCard from "@/components/common/ModelCards/CommonUsedCarCard";
import BannerSection from "@/components/responsive/brand/model/BannerSection";
import CarColours from "@/components/responsive/brand/model/sidebar/CarColours";
import EMICalculator from "@/components/responsive/brand/model/sidebar/EMICalculator";
import MonthlySales from "@/components/responsive/brand/model/sidebar/MonthlySales";
import OnRoadPriceinTopCities from "@/components/responsive/brand/model/sidebar/OnRoadPriceinTopCities";
import VariantExplained from "@/components/responsive/brand/model/sidebar/VariantExplained";
import Marquee from "@/components/ui/Marquee";
import { useGetModelReviewsVideosQuery } from "@/redux/api/videosModuleApi";
import ImageDisplay from "./ImageDisplay";
import CarGallery from "./CarGallery";
import { useGetModelDetailsQuery, useGetModelImagesQuery } from "@/redux/api/carModuleApi";
import { CarData } from "../overview/Overview";
import BrochureCard from "../sidebar/BrochureCard";
import CSDPriceList from "../sidebar/CSDPriceList";
import LatestOffersDiscounts from "../sidebar/LatestOffersDiscounts";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import CommonSellingCarCard from "@/components/common/ModelCards/CommonSellingCarCard";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import useIsMobile from "@/hooks/useIsMobile";
import { useGetModelLatestNewsQuery, useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import { useState } from "react";
import CostOfOwnership from "../sidebar/CostOfOwnership";

interface MileagePageProps {
    type: string;
    slug: string;
    childSlug: string;
}

function ImagesPage({ type, slug, childSlug }: MileagePageProps) {
    const [imageType, setImageType] = useState("")
    const [sellingDate, setSellingDate] = useState("")
    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelLatestNewsData } = useGetModelLatestNewsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelReviewsVideosData } = useGetModelReviewsVideosQuery({ model_slug: slug }, { skip: !slug })
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: modelImagesData } = useGetModelImagesQuery({ model_slug: slug, type: imageType }, { skip: !slug });

    const modelLatestNews = modelLatestNewsData?.rows ?? [];
    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const modelReviewsVideos = modelReviewsVideosData?.rows ?? []
    const popularComparisons = popularComparisonsData?.rows ?? [];

    const isMobile = useIsMobile()

    console.log(childSlug);

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
                            <ImageDisplay
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                data={modelImagesData}
                            />

                            <CarGallery
                                imageType={imageType}
                                setImageType={setImageType}
                                data={modelImagesData}
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
                                link={`/${type}/${slug}/news`}
                            />
                                :
                                <CommonNewsUpdate
                                    title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest News`}
                                    view={`${modelDetails?.model?.name} News Update`}
                                    newsList={modelLatestNews}
                                    link={`/${type}/${slug}/news`}
                                />
                            }

                          <CommonVideos
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest Videos`}
                                view={`/${type}/${slug}/videos`}
                                videoList={modelReviewsVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonSellingCarCard
                                title={`Best Selling ${modelDetails?.model?.segment}-segment ${modelDetails?.model?.bodyType} in India - ${sellingDate}`}
                                segments={`${modelDetails?.model?.segment}`}
                                setSellingDate={setSellingDate}
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

export default ImagesPage;