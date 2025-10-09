'use client'

import LeaderboardAd from "@/components/common/LeaderboardAd";
import Link from "next/link";
import { useState } from "react";
import CommonVideoCard from "@/components/common/CommonVideoCard";
import CommonRecentVideo from "@/components/common/CommonRecentVideo";
import CommonPopularVideo from "@/components/common/CommonPopularVideos";
import CommonMobileVideoCard from "@/components/mobile/common/CommonMobileVideoCard";
import { useGetLatestCarVideosQuery, useGetLatestCompareVideosQuery, useGetPopularCarVideosQuery, useGetTopCompareVideosQuery, useGetTrendingCompareVideosQuery } from "@/redux/api/videosModuleApi";

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

const buttons = ['Latest Comparison Videos', 'Trending Comparison Videos', 'Top Comparison Videos'];

function CarComparisonVideos() {
    const { data: latestCompareVideosData } = useGetLatestCompareVideosQuery();
    const { data: trendingCompareVideosData } = useGetTrendingCompareVideosQuery();
    const { data: topCompareVideosData } = useGetTopCompareVideosQuery();
    const { data: latestCarVideosData } = useGetLatestCarVideosQuery();
    const { data: popularCarVideosData } = useGetPopularCarVideosQuery();


    const latestCarVideos = latestCarVideosData?.rows ?? [];
    const popularCarVideos = popularCarVideosData?.rows ?? [];
    const latestCompareVideos = latestCompareVideosData?.rows ?? [];
    const trendingCompareVideos = trendingCompareVideosData?.rows ?? [];
    const topCompareVideos = topCompareVideosData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestCompareVideos,
        trendingCompareVideos,
        topCompareVideos,
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
                            Car Comparison Videos
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="lg:px-10 px-4">
                <div className="w-full lg:app-container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-5 my-0 lg:my-8">

                        {/* Left Content */}
                        <div className="w-auto lg:max-w-[74%]">
                            <div className="hidden lg:block space-y-6">
                                <CommonVideoCard
                                    title="Latest Comparison Videos"
                                    data={latestCompareVideos}
                                    viewAllLink="/latest-comparison-videos"
                                    viewAllText="View All Latest Videos"
                                />

                                <LeaderboardAd />

                                <CommonVideoCard
                                    title="Trending Comparison Videos"
                                    data={trendingCompareVideos}
                                    viewAllLink="/trending-comparison-videos"
                                    viewAllText="View All Trending Videos"
                                />

                                <LeaderboardAd />

                                <CommonVideoCard
                                    title="Top Comparison Videos"
                                    data={topCompareVideos}
                                    viewAllLink="/top-comparison-videos"
                                    viewAllText="View All Top Videos"
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

                                <CommonMobileVideoCard data={reviewData[activeIndex]} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-6 flex flex-col mt-0 lg:mt-10 items-center">
                            <CommonRecentVideo
                                title="Recent Videos"
                                data={latestCarVideos}
                            />
                            <CommonPopularVideo
                                title="Popular Videos"
                                data={popularCarVideos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarComparisonVideos;
