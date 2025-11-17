'use client'

import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
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
import { useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";
import EngineSpecs from "./EngineSpecs";
import EngineMileageSpecsTable from "./EngineMileageSpecsTable";

interface MileagePageProps {
    type: string;
    slug: string;
    childSlug: string;
}

function EngineSpecificationsPage({ type, slug, childSlug }: MileagePageProps) {

    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: latestVideosData } = useGetLatestVideosQuery()

    const latestCarNews = latestCarNewsData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const latestVideos = latestVideosData?.rows ?? []

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
                        <BannerSection type={type} slug={slug} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <EngineSpecs />

                            <div className="p-6 bg-white dark:bg-[#171717] dark:border-[#2e2e2e] rounded-2xl shadow-sm border">
                                <h2 className="text-xl font-semibold mb-2">Tata Nexon Features</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Sell used car from the comfort of your home. Get free car assessment, quick payment disbursal and free RC transfer.
                                    Book car inspection right now to find out how much payment you can get for selling it today.
                                </p>
                            </div>

                            <EngineMileageSpecsTable />

                            <div className="border rounded-xl h-[332px]" />

                            <CommonViewOfferCard
                                title="Tata Nexon"
                                desc="The Nexon competes with popular models including"
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
                                videoList={latestVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonModelFAQ title="Tata Nexon" faqs={faqs} viewAllLink="#" />

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
                                title="Tata Nexon"
                            />

                            <CSDPriceList
                                title="Toyota Urban Cruiser Hyryder"
                            />

                            <LatestOffersDiscounts
                                title="Toyota Urban Cruiser Hyryder"
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