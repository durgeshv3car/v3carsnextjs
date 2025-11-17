'use client'

import BottomAd from "@/components/common/BottomAd";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import TopBrands from "@/components/common/TopBrands";
import TopSection from "@/components/common/TopSection";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import { useGetLatestLaunchedCarsQuery } from "@/redux/api/carModuleApi";
import { useGetExpertCarReviewsQuery, useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";


function MainLatestCarComponent() {
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
    const { data: latestCarData } = useGetLatestLaunchedCarsQuery();
    const { data: latestVideosData } = useGetLatestVideosQuery()
    const { data: expertCarReviewsData } = useGetExpertCarReviewsQuery();

    const latestCarNews = latestCarNewsData?.rows ?? [];
    const latestCars = latestCarData?.rows ?? [];
    const latestVideos = latestVideosData?.rows ?? []
    const expertCarReviews = expertCarReviewsData?.rows ?? [];

    return (
        <>
            <TopSection
                title={"Explore Latest Car Launches In India"}
                description={"Discover the hottest new cars in India! Explore our comprehensive list of the latest car launches, featuring detailed information on prices and specs to help you find your perfect match. We've compiled a list of 46 exciting new models across various car segments, including cars like Mahindra Thar Roxx, Citroen Basalt Coupe, Mercedes-Benz AMG GLC, Mercedes-Benz CLE Cabriolet, and Tata Curvv EV"}
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    {/* Latest Cars */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                <CurrentOffersCard data={latestCars} />
                            </div>

                            <CommonNewsUpdate
                                title="Cars News & Updates"
                                view="Cars Update News"
                                newsList={latestCarNews}
                                link={"/news"}
                            />

                            <CommonNewsUpdate
                                title="Car Expert Reviews"
                                view="Cars Expert Reviews"
                                newsList={expertCarReviews}
                                link={"/news"}
                            />

                            <CommonVideos
                                title="Car Videos"
                                view="Car Videos"
                                videoList={latestVideos}
                            />

                        </div>
                        <div className="w-auto lg:min-w-[24%] space-y-10">
                            <SideBarAdSmall />
                            <TopBrands />
                            <UpcomingCarByTopBrands />
                            <PopularBrands />
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>

            <BottomAd />
        </>
    );
}

export default MainLatestCarComponent;