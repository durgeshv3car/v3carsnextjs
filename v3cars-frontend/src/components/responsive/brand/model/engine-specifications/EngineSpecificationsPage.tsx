'use client'

import CommonVideos from "@/components/common/CommonVideos";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
import CommonUsedCarCard from "@/components/common/ModelCards/CommonUsedCarCard";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
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
import { useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import { useGetModelReviewsVideosQuery } from "@/redux/api/videosModuleApi";
import { useGetModelDetailsQuery } from "@/redux/api/carModuleApi";
import { CarData } from "../overview/Overview";
import SpecsListTable from "../overview/SpecsListTable";
import FuelEfficiencyTable from "../mileage/FuelEfficiencyTable";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";

interface MileagePageProps {
    type: string;
    slug: string;
    childSlug: string;
}

function EngineSpecificationsPage({ type, slug, childSlug }: MileagePageProps) {

    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    // const { data: modelLatestNewsData } = useGetModelLatestNewsQuery({ model_slug: slug }, { skip: !slug });
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: modelReviewsVideosData } = useGetModelReviewsVideosQuery({ model_slug: slug }, { skip: !slug })

    // const modelLatestNews = modelLatestNewsData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const modelReviewsVideos = modelReviewsVideosData?.rows ?? []
    const modelDetails: CarData | null = modelDetailsData?.data ?? null;

    // const isMobile = useIsMobile()

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

                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold">{modelDetails?.model?.brand?.name} {modelDetails?.model?.name} Engine Specs & Performance</h2>
                                <p className="text-gray-400 text-sm">In September 2025, the total sales figure of Nexon was 22,573 units, which is a 37.96 percent MoM growth. In September 2025, the total sales figure of Tata cars was 22,573 units. Want to compare monthly sales figures for all Tata models? Click here to compare all Tata car sales.</p>
                                <SpecsListTable
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    slug={slug}
                                    childSlug={childSlug}
                                />
                            </div>

                            <div className="p-6 bg-white dark:bg-[#171717] dark:border-[#2e2e2e] rounded-2xl shadow-sm border">
                                <h2 className="text-xl font-semibold mb-2">{modelDetails?.model?.brand?.name} {modelDetails?.model?.name} Features</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Sell used car from the comfort of your home. Get free car assessment, quick payment disbursal and free RC transfer.
                                    Book car inspection right now to find out how much payment you can get for selling it today.
                                </p>
                            </div>

                            <FuelEfficiencyTable
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            <CommonSellUsedCarComponent />

                            <CommonViewOfferCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                desc={`The ${modelDetails?.model?.name} competes with popular models including`}
                                slug={slug}
                            />

                            <CommonUsedCarCard
                                title="Tata Nexon"
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

                            <CommonVideos
                                title="Tata Nexon Latest Videos"
                                view="Nexon Videos"
                                videoList={modelReviewsVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonModelFAQ
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                faqs={faqs}
                                viewAllLink="#"
                            />

                            {/* {isMobile ? <MobileLatestCarNews
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
                            } */}

                            {/* <CommonSellingCarCard
                                title="Best Selling B2-segment SUVs in India - Sep 2025"
                            /> */}

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

export default EngineSpecificationsPage;

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