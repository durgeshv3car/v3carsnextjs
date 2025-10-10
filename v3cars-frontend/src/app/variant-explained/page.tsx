'use client'

import LeaderboardAd from "@/components/common/LeaderboardAd";
import CommonPopularCard from "@/components/common/CommonPopularCard";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CommonMobileReviewCard from "@/components/mobile/common/CommonMobileReviewCard";
import Link from "next/link";
import CommonReviewCard from "@/components/common/CommonReviewCard";
import { useState } from "react";
import { useGetLatestVariantExplainedQuery, useGetPopularVariantExplainedQuery, useGetTopVariantExplainedQuery, useGetTrendingVariantExplainedQuery } from "@/redux/api/contentModuleApi";

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

const buttons = ['Latest Variant Explained', 'Trending Variant Explained', 'Top Variant Explained'];

function VariantExplained() {
    const { data: latestVariantExplainedData } = useGetLatestVariantExplainedQuery();
    const { data: trendingVariantExplainedData } = useGetTrendingVariantExplainedQuery();
    const { data: topVariantExplainedData } = useGetTopVariantExplainedQuery();
    const { data: popularVariantExplainedData } = useGetPopularVariantExplainedQuery();

    const latestVariantExplained = latestVariantExplainedData?.rows ?? [];
    const trendingVariantExplained = trendingVariantExplainedData?.rows ?? [];
    const topVariantExplained = topVariantExplainedData?.rows ?? [];
    const popularVariantExplained = popularVariantExplainedData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestVariantExplained,
        trendingVariantExplained,
        topVariantExplained,
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
                            Variant Explained
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
                                    title="Latest Variant Explained"
                                    data={latestVariantExplained}
                                    viewAllLink="/latest-variant-explained"
                                    viewAllText="View All Latest Variant Explained"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Trending Variant Explained"
                                    data={trendingVariantExplained}
                                    viewAllLink="/trending-variant-explained"
                                    viewAllText="View All Trending Variant Explained"
                                />

                                <LeaderboardAd />

                                <CommonReviewCard
                                    title="Top Variant Explained"
                                    data={topVariantExplained}
                                    viewAllLink="/top-variant-explained"
                                    viewAllText="View All Top Variant Explained"
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
                                title="Popular Variant Explained"
                                data={popularVariantExplained}
                            />
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VariantExplained;
