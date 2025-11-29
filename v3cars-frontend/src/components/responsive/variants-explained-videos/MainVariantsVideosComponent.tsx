'use client'

import LeaderboardAd from "@/components/common/LeaderboardAd";
import Link from "next/link";
import { useState } from "react";
import CommonVideoCard from "@/components/common/CommonVideoCard";
import CommonRecentVideo from "@/components/common/CommonRecentVideo";
import CommonPopularVideo from "@/components/common/CommonPopularVideos";
import CommonMobileVideoCard from "@/components/mobile/common/CommonMobileVideoCard";
import { useGetLatestCarVideosQuery, useGetLatestVariantExplainedVideosQuery, useGetPopularCarVideosQuery, useGetTopVariantExplainedVideosQuery, useGetTrendingVariantExplainedVideosQuery } from "@/redux/api/videosModuleApi";

const buttons = ['Latest Variants Explained Videos', 'Trending Variants Explained Videos', 'Top Variants Explained Videos'];

function MainVariantsVideosComponent() {
    const { data: latestVariantExplainedVideosData } = useGetLatestVariantExplainedVideosQuery();
    const { data: trendingVariantExplainedVideosData } = useGetTrendingVariantExplainedVideosQuery();
    const { data: topVariantExplainedVideosData } = useGetTopVariantExplainedVideosQuery();
    const { data: latestCarVideosData } = useGetLatestCarVideosQuery();
    const { data: popularCarVideosData } = useGetPopularCarVideosQuery();


    const latestCarVideos = latestCarVideosData?.rows ?? [];
    const popularCarVideos = popularCarVideosData?.rows ?? [];
    const latestVariantExplainedVideos = latestVariantExplainedVideosData?.rows ?? [];
    const trendingVariantExplainedVideos = trendingVariantExplainedVideosData?.rows ?? [];
    const topVariantExplainedVideos = topVariantExplainedVideosData?.rows ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewData = [
        latestVariantExplainedVideos,
        trendingVariantExplainedVideos,
        topVariantExplainedVideos,
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
                            Car Variants Explained Videos
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
                                    title="Latest Variants Explained Videos"
                                    data={latestVariantExplainedVideos}
                                    viewAllLink="/latest-variants-explained-videos"
                                    viewAllText="View All Latest Videos"
                                />

                                <LeaderboardAd />

                                <CommonVideoCard
                                    title="Trending Variants Explained Videos"
                                    data={trendingVariantExplainedVideos}
                                    viewAllLink="/trending-variants-explained-videos"
                                    viewAllText="View All Trending Videos"
                                />

                                <LeaderboardAd />

                                <CommonVideoCard
                                    title="Top Variants Explained Videos"
                                    data={topVariantExplainedVideos}
                                    viewAllLink="/top-variants-explained-videos"
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
                                                ? "bg-primary text-black"
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

export default MainVariantsVideosComponent;
