'use client'

import { useState } from 'react';
import UpcomingCarByTopBrands from '@/components/common/UpcomingCarByTopBrands';
import CarNewsCard from '@/components/responsive/car-news/CarNewsCard';
import CarNewsSection from '@/components/responsive/car-news/CarNewsSection';
import PopularNews from '@/components/common/PopularNews';
import LeaderboardAd from '@/components/common/LeaderboardAd';
import SideBarAdSmall from '@/components/common/SideBarAdSmall';
import Link from 'next/link';
import { useGetLatestAutoExpoQuery, useGetTodayAutoExpoQuery, useGetTopAutoExpoQuery, useGetTrendingAutoExpoQuery } from '@/redux/api/autoExpoApi';

const tabs = [
    { key: 'latest', label: 'Latest Auto Expo' },
    { key: 'top', label: 'Top Auto Expo' },
    { key: 'trending', label: 'Trending Auto Expo' },
];

interface ArticleThumbnail {
    url: string;
    alt: string;
}

interface ArticleAuthor {
    id: number;
    name: string;
    slug: string;
}

export interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO Date string
    shortDescription: string;   // HTML string
    thumbnail: ArticleThumbnail;
    author: ArticleAuthor;
    commentsCount: number;
}

export default function Page() {
    const [activeTab, setActiveTab] = useState('latest');
    const { data: latestAutoExpoData, error, isLoading } = useGetLatestAutoExpoQuery();
    const { data: trendingAutoExpoData, error: trendingAutoExpoError, isLoading: trendingAutoExpoLoading } = useGetTrendingAutoExpoQuery();
    const { data: topAutoExpoData, error: topAutoExpoError, isLoading: topAutoExpoLoading } = useGetTopAutoExpoQuery();
    const { data: todayAutoExpoData } = useGetTodayAutoExpoQuery();

    const todayAutoExpo: Article | null = todayAutoExpoData?.data ?? null;
    const latestAutoExpo = latestAutoExpoData?.rows ?? [];
    const trendingAutoExpo = trendingAutoExpoData?.rows ?? [];
    const topAutoExpo = topAutoExpoData?.rows ?? [];

    return (
        <div>

            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Auto Expo
                        </span>
                    </div>
                </div>
            </div>

            {todayAutoExpo && <CarNewsCard data={todayAutoExpo} />}

            <div className="lg:px-10 px-4">
                <div className="flex gap-5 flex-col lg:flex-row rounded-lg overflow-hidden shadow-sm w-full lg:app-container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-5 mb-6">

                        <div className="w-auto lg:max-w-[74%]">

                            {/* Mobile Tab Switcher */}
                            <div className="block lg:hidden overflow-x-auto scrollbar-hide mb-4 -mx-4 px-4">
                                <div className="flex gap-3 w-max">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${activeTab === tab.key ? 'bg-yellow-400 text-black font-medium' : 'bg-slate-100 dark:bg-[#171717] border dark:border-[#2E2E2E]'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Tab Content */}
                            <div className="block lg:hidden">
                                {activeTab === 'latest' && (
                                    <CarNewsSection
                                        title="Latest Auto Expo"
                                        viewAllLink="/upcoming-cars"
                                        viewAllText="View All Upcoming Cars"
                                        data={latestAutoExpo}
                                    />
                                )}
                                {activeTab === 'top' && (
                                    <CarNewsSection
                                        title="Top Auto Expo"
                                        viewAllLink="/top-car-news"
                                        viewAllText="View All Top Cars"
                                        data={topAutoExpo}
                                    />
                                )}
                                {activeTab === 'trending' && (
                                    <CarNewsSection
                                        title="Trending Car News"
                                        viewAllLink="/trending-car-news"
                                        viewAllText="View All Trending Cars"
                                        data={trendingAutoExpo}
                                    />
                                )}
                            </div>

                            {/* Desktop View */}
                            <div className="hidden lg:block space-y-6">
                                <CarNewsSection
                                    title="Latest Auto Expo"
                                    viewAllLink="/upcoming-cars"
                                    viewAllText="View All Upcoming Cars"
                                    data={latestAutoExpo}
                                />

                                <LeaderboardAd />

                                <CarNewsSection
                                    title="Trending Auto Expo"
                                    viewAllLink="/trending-car-news"
                                    viewAllText="View All Trending Cars"
                                    data={trendingAutoExpo}
                                />

                                <LeaderboardAd />

                                <CarNewsSection
                                    title="Top Auto Expo"
                                    viewAllLink="/top-car-news"
                                    viewAllText="View All Top Cars"
                                    data={topAutoExpo}
                                />
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-6 flex flex-col items-center">
                            <SideBarAdSmall />
                            <UpcomingCarByTopBrands />
                            {/* <PopularNews /> */}
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}