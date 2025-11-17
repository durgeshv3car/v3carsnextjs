'use client'

import TopSection from "@/components/common/TopSection";
import { useGetPopularCarQuery } from "@/redux/api/carModuleApi";
import { useGetExpertCarReviewsQuery, useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";
import PopularCar from "./PopularCar";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdLong from "@/components/common/SideBarAdLong";
import BottomAd from "@/components/common/BottomAd";

function MainPopularCarComponent() {
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
    const { data: popularCarData } = useGetPopularCarQuery();
    const { data: expertCarReviewsData } = useGetExpertCarReviewsQuery();
    const { data: latestVideosData } = useGetLatestVideosQuery()

    const latestVideos = latestVideosData?.rows ?? []
    const latestCarNews = latestCarNewsData?.rows ?? [];
    const popularCar = popularCarData?.rows ?? []
    const expertCarReviews = expertCarReviewsData?.rows ?? [];

    return (
        <>
            <TopSection
                title={"Popular Cars In India 2024"}
                description={"Looking for the best-selling cars in India? Look no further! This section reveals the top 20 cars dominating the Indian market based on monthly sales figures. Some of the most popular cars in the month of July 2024 are Maruti Suzuki Grand Vitara, Maruti Suzuki Fronx, Maruti Suzuki Brezza, Tata Nexon, Tata Punch and many more. Explore detailed information on each car, including segment, body"}
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">


                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-6">
                            <PopularCar />

                            <div className="mb-4">
                                <h2 className="text-lg font-medium my-6">
                                    Hottest Cars In India 2024
                                </h2>

                                <div className="p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                    <p className="mb-2">
                                        Discover India&apos;s Most-Loved Cars! This section dives into user
                                        interest on the V3Cars platform, showcasing the top 30 cars capturing
                                        hearts and minds. Go beyond just sales figures and explore the
                                        vehicles generating the most buzz! We provide detailed information on
                                        each car, including price, specifications, and mileage. Find the car
                                        that ignites your passion and explore your options with confidence.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <CurrentOffersCard data={popularCar} />
                                    </div>
                                </div>
                            </div>

                            <CommonNewsUpdate
                                title="Cars News Updates"
                                view="Cars News"
                                newsList={latestCarNews}
                                link={"/news"}
                            />

                            <CommonNewsUpdate
                                title="Car Expert Reviews"
                                view="Reviews"
                                newsList={expertCarReviews}
                                link={"/news"}
                            />

                            <CommonVideos
                                title="Car Videos"
                                view="Car Videos"
                                videoList={latestVideos}
                            />
                        </div>

                        {/* sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-10 sticky top-20 self-start">
                            <SideBarAdSmall />
                            <UpcomingCarByTopBrands />
                            <SideBarAdSmall />
                            <PopularBrands />
                            <SideBarAdLong />
                        </div>
                    </div>

                </div>
            </div>

            <BottomAd />
        </>
    );
}

export default MainPopularCarComponent;