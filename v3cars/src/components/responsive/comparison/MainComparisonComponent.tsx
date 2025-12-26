'use client'

import Link from "next/link";
import { useState } from "react";
import { useGetLatestComparisonReviewsQuery, useGetPopularReviewsQuery, useGetTopComparisonReviewsQuery, useGetTrendingComparisonReviewsQuery } from "@/redux/api/contentModuleApi";
import CommonReviewCard from "@/components/common/CommonReviewCard";
import LeaderboardAd from "@/components/common/LeaderboardAd";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CommonPopularCard from "@/components/common/CommonPopularCard";
import CommonMobileReviewCard from "@/components/mobile/common/CommonMobileReviewCard";

const buttons = ['Latest Comparison Reviews', 'Trending Comparison Reviews', 'Top Comparison Reviews'];

function MainComparisonComponent() {
    const { data: latestComparisonReviewsData } = useGetLatestComparisonReviewsQuery();
    const { data: trendingComparisonReviewsData } = useGetTrendingComparisonReviewsQuery();
    const { data: topComparisonReviewsData } = useGetTopComparisonReviewsQuery();
    const { data: popularReviewsData } = useGetPopularReviewsQuery();

    const latestComparisonReviews = latestComparisonReviewsData?.rows ?? [];
    const trendingComparisonReviews = trendingComparisonReviewsData?.rows ?? [];
    const topComparisonReviews = topComparisonReviewsData?.rows ?? [];
    const popularReviews = popularReviewsData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestComparisonReviews,
        trendingComparisonReviews,
        topComparisonReviews,
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
                            Comparison Reviews
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
                                    title="Latest Comparison Reviews"
                                    data={latestComparisonReviews}
                                    viewAllLink="/latest-comparison-review"
                                    viewAllText="View All Latest Reviews"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Trending Comparison Reviews"
                                    data={trendingComparisonReviews}
                                    viewAllLink="/trending-comparison-review"
                                    viewAllText="View All Trending Reviews"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Top Comparison Reviews"
                                    data={topComparisonReviews}
                                    viewAllLink="/top-comparison-review"
                                    viewAllText="View All Top Reviews"
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
                                title="Popular Comparison Review"
                                data={popularReviews}
                            />
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainComparisonComponent;
