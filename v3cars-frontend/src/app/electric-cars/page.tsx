'use client'

import TopSection from "@/components/common/TopSection";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingTopBrands from "@/components/common/UpcomingCarByTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import BottomAd from "@/components/common/BottomAd";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import TopBrands from "@/components/common/TopBrands";
import { useGetElectricCarQuery } from "@/redux/api/carModuleApi";
import { useGetElectricCarNewsQuery, useGetElectricCarReviewsQuery } from "@/redux/api/contentModuleApi";
import { useGetElectricCarVideosQuery } from "@/redux/api/videosModuleApi";

// export const metadata: Metadata = {
//     title: "Electric Cars in India 2024 | Prices, Range, Images & More - V3Cars",
//     description:
//         "Explore the top electric cars in India in 2024. Compare EV prices, battery range, charging time, images, and features from brands like Tata, MG, Hyundai, Mahindra, and more.",
//     keywords: [
//         "electric cars India 2024",
//         "EV cars India",
//         "electric car price",
//         "electric SUV",
//         "electric vehicle range",
//         "Tata electric cars",
//         "MG EV models",
//         "Hyundai electric car",
//         "Mahindra electric SUV",
//         "affordable electric cars",
//         "best electric cars India",
//         "V3Cars EV comparison",
//     ],
// };

function ElectricCars() {
    const { data: electricCarData } = useGetElectricCarQuery();
    const { data: electricCarNewsData } = useGetElectricCarNewsQuery();
    const { data: electricCarReviewsData } = useGetElectricCarReviewsQuery();
    const { data: electricCarVideosData } = useGetElectricCarVideosQuery();

    const electricCar = electricCarData?.rows ?? [];
    const electricCarNews = electricCarNewsData?.rows ?? [];
    const electricCarReviews = electricCarReviewsData?.rows ?? [];
    const electricCarVideos = electricCarVideosData?.rows ?? [];

    return (
        <>
            <TopSection
                title={"Electric Cars in India"}
                description={"Here is the list of the most popular electric cars in India 2024. Some of the most popular EV cars in India are Tata Punch EV, MG Comet EV, Mahindra XUV400 EV, Tata Tiago EV, MG ZS EV and many more. These best electric cars were identified based on user interest in the V3Cars platform. Explore the list of 2024 popular electric cars in India and check which car suits your requirements. Check "}
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    {/* Main Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                <CurrentOffersCard data={electricCar} />
                            </div>

                            <CommonNewsUpdate
                                title="Electric Vehicle (EV) News Update"
                                view="EV News Update"
                                newsList={electricCarNews}
                                link={"/news"}
                            />

                            <CommonNewsUpdate
                                title="Electric Vehicle (EV) Expert Reviews"
                                view="EV Expert Reviews"
                                newsList={electricCarReviews}
                                link={"/news"}
                            />

                            <CommonVideos
                                title="Electric Vehicle (EV) Videos"
                                view="EV Videos"
                                videoList={electricCarVideos}
                            />

                        </div>

                        {/* Sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-10">
                            <SideBarAdSmall />
                            <TopBrands />
                            <UpcomingTopBrands />
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

export default ElectricCars;
