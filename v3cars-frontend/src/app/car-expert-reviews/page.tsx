'use client'

import LeaderboardAd from "@/components/common/LeaderboardAd";
import CommonPopularCard from "@/components/common/CommonPopularCard";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CommonMobileReviewCard from "@/components/mobile/common/CommonMobileReviewCard";
import { useGetLatestReviewsQuery, useGetPopularReviewQuery, useGetTopReviewsQuery, useGetTrendingReviewsQuery } from "@/redux/api/expertReviewApi";
import Link from "next/link";
import CommonReviewCard from "@/components/common/CommonReviewCard";
import { useState } from "react";

// export const metadata: Metadata = {
//     title: "Compare Cars in India | Specs, Features, Prices - V3Cars",
//     description:
//         "Compare cars in India by price, features, mileage, specifications & more. Use V3Cars' car comparison tool to find the best car for you.",
//     keywords: [
//         "compare cars India",
//         "car comparison tool",
//         "car specs comparison",
//         "price comparison cars",
//         "V3Cars compare",
//         "car features comparison",
//     ],
// };

const buttons = ['Latest Expert Reviews', 'Trending Comparison Reviews', 'Top Comparison Reviews'];

function CarExpertReviews() {
    const { data: latestReviewsData } = useGetLatestReviewsQuery();
    const { data: trendingReviewsData } = useGetTrendingReviewsQuery();
    const { data: topReviewsData } = useGetTopReviewsQuery();
    const { data: popularReviewsData } = useGetPopularReviewQuery();

    const latestReviews = latestReviewsData?.rows ?? [];
    const trendingReviews = trendingReviewsData?.rows ?? [];
    const topReviews = topReviewsData?.rows ?? [];
    const popularReviews = popularReviewsData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestReviews,
        trendingReviews,
        topReviews,
    ];

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Car Expert Reviews
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="lg:px-10 px-4">
                <div className="w-full lg:app-container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-5 my-8">

                        {/* Left Content */}
                        <div className="w-auto lg:max-w-[74%]">
                            <div className="hidden lg:block space-y-6">
                                <CommonReviewCard
                                    title="Latest Expert Reviews"
                                    data={latestReviews}
                                    viewAllLink="/latest-car-news"
                                    viewAllText="View All Latest Reviews"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Trending Comparison Reviews"
                                    data={trendingReviews}
                                    viewAllLink="/trending-car-news"
                                    viewAllText="View All Trending Reviews"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Top Comparison Reviews"
                                    data={topReviews}
                                    viewAllLink="/top-car-news"
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
                                                ? "bg-yellow-400 text-black"
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
                                title="Popular Expert Review"
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

export default CarExpertReviews;
