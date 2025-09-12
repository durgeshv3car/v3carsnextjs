'use client'

import { useState } from 'react';
import UpcomingCarByTopBrands from '@/components/common/UpcomingCarByTopBrands';
import CarNewsCard from '@/components/responsive/car-news/CarNewsCard';
import CarNewsSection from '@/components/responsive/car-news/CarNewsSection';
import PopularNews from '@/components/common/PopularNews';

const tabs = [
  { key: 'latest', label: 'Latest Car News' },
  { key: 'top', label: 'Top Car News' },
  { key: 'trending', label: 'Trending Car News' },
];

export default function Page() {

  const [activeTab, setActiveTab] = useState('latest');

  const dummyData = [
    {
      image: '/car-news/car.png',
      title: 'Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...',
      desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
      author: 'Mahesh Yadav',
      date: 'July 31 2024',
    },
    {
      image: '/car-news/car.png',
      title: 'Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...',
      desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
      author: 'Mahesh Yadav',
      date: 'July 31 2024',
    },
    {
      image: '/car-news/car.png',
      title: 'Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...',
      desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
      author: 'Mahesh Yadav',
      date: 'July 31 2024',
    },
  ];

  return (
    <div>

      <CarNewsCard />

      <div className="lg:p-8 p-4">
        <div className="flex gap-5 flex-col lg:flex-row rounded-lg overflow-hidden shadow-sm w-full lg:app-container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between w-full">

            <div className="w-auto lg:max-w-[75%]">

              {/* Mobile Tab Switcher */}
              <div className="block lg:hidden overflow-x-auto scrollbar-hide mb-4 -mx-4 px-4">
                <div className="flex gap-3 w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                        activeTab === tab.key ? 'bg-yellow-400 text-black font-medium' : 'bg-slate-100 dark:bg-[#171717] border dark:border-[#2E2E2E]'
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
                    title="Latest Car News"
                    viewAllLink="/upcoming-cars"
                    viewAllText="View All Upcoming Cars"
                    data={dummyData}
                  />
                )}
                {activeTab === 'top' && (
                  <CarNewsSection
                    title="Top Car News"
                    viewAllLink="/top-car-news"
                    viewAllText="View All Top Cars"
                    data={dummyData}
                  />
                )}
                {activeTab === 'trending' && (
                  <CarNewsSection
                    title="Trending Car News"
                    viewAllLink="/trending-car-news"
                    viewAllText="View All Trending Cars"
                    data={dummyData}
                  />
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block space-y-6">
                <CarNewsSection
                  title="Latest Car News"
                  viewAllLink="/upcoming-cars"
                  viewAllText="View All Upcoming Cars"
                  data={dummyData}
                />
                <CarNewsSection
                  title="Top Car News"
                  viewAllLink="/top-car-news"
                  viewAllText="View All Top Cars"
                  data={dummyData}
                />
                <CarNewsSection
                  title="Trending Car News"
                  viewAllLink="/trending-car-news"
                  viewAllText="View All Trending Cars"
                  data={dummyData}
                />
              </div>

            </div>

            {/* Sidebar */}
            <div className="w-auto lg:max-w-[22%]">
              <UpcomingCarByTopBrands />

              <PopularNews/>
              
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}







