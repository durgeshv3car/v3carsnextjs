'use client'

import LeaderboardAd from "@/components/common/LeaderboardAd";
import CommonPopularCard from "@/components/common/CommonPopularCard";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CommonMobileReviewCard from "@/components/mobile/common/CommonMobileReviewCard";
import Link from "next/link";
import CommonReviewCard from "@/components/common/CommonReviewCard";
import { useState } from "react";
import { useGetLatestFeaturesExplainedQuery, useGetPopularFeaturesExplainedQuery, useGetTopFeaturesExplainedQuery, useGetTrendingFeaturesExplainedQuery } from "@/redux/api/contentModuleApi";

const buttons = ['Latest Features Explained', 'Trending Features Explained', 'Top Features Explained'];

function MainFeaturesComponent() {
    const { data: latestFeaturesExplainedData } = useGetLatestFeaturesExplainedQuery();
    const { data: trendingFeaturesExplainedData } = useGetTrendingFeaturesExplainedQuery();
    const { data: topFeaturesExplainedData } = useGetTopFeaturesExplainedQuery();
    const { data: popularFeaturesExplainedData } = useGetPopularFeaturesExplainedQuery();

    const latestFeaturesExplained = latestFeaturesExplainedData?.rows ?? [];
    const trendingFeaturesExplained = trendingFeaturesExplainedData?.rows ?? [];
    const topFeaturesExplained = topFeaturesExplainedData?.rows ?? [];
    const popularFeaturesExplained = popularFeaturesExplainedData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestFeaturesExplained,
        trendingFeaturesExplained,
        topFeaturesExplained,
    ];

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">
                            Features Explained
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="lg:px-10 px-4">
                <div className="w-full lg:app-container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-5 lg:my-8">

                        {/* Left Content */}
                        <div className="w-auto lg:max-w-[74%]">
                            <div className="hidden lg:block space-y-6">
                                <CommonReviewCard
                                    title="Latest Features Explained"
                                    data={latestFeaturesExplained}
                                    viewAllLink="/latest-features-explained"
                                    viewAllText="View All Latest Features"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Trending Features Explained"
                                    data={trendingFeaturesExplained}
                                    viewAllLink="/trending-features-explained"
                                    viewAllText="View All Trending Features"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Top Features Explained"
                                    data={topFeaturesExplained}
                                    viewAllLink="/top-features-explained"
                                    viewAllText="View All Top Features"
                                />

                            </div>

                            <div className="lg:hidden">
                                {/* Toggle Buttons */}
                                <div className="flex gap-2 my-4 overflow-x-auto scrollbar-hide scroll-smooth">
                                    {buttons.map((btn, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`px-4 py-2 text-xs rounded-full font-semibold text-nowrap ${activeIndex === idx
                                                ? "bg-primary text-black"
                                                : "border dark:border-[#2E2E2E]"
                                                }`}
                                        >
                                            {btn}
                                        </button>
                                    ))}
                                </div>

                                <CommonMobileReviewCard data={reviewData[activeIndex]} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-6 flex flex-col items-center">
                            <SideBarAdSmall />
                            <UpcomingCarByTopBrands />
                            <CommonPopularCard
                                title="Popular Features Explained"
                                data={popularFeaturesExplained}
                            />
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainFeaturesComponent;
