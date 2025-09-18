'use client'

import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCars from "@/components/common/UpcomingCars";
import UpcomingTopBrands from "@/components/common/UpcomingCarByTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import BottomAd from "@/components/common/BottomAd";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonExpertReviews from "@/components/common/CommonExpertReviews";
import CommonVideos from "@/components/common/CommonVideos";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeApi";
import { useGetLatestLaunchedCarsQuery } from "@/redux/api/latestcarApi";

// export const metadata: Metadata = {
//     title: "Latest Car Launches in India 2024 | New Car Prices, Images & Specs",
//     description:
//         "Discover the latest car launches in India in 2024. Get updated prices, specs, images, and features of newly launched cars from top brands like Maruti, Hyundai, Tata, Mahindra, Kia and more.",
//     keywords: [
//         "latest car launches India",
//         "new cars 2024",
//         "recently launched cars",
//         "new car prices India",
//         "new SUV launch",
//         "car images and specs",
//         "Maruti new cars",
//         "Hyundai latest cars",
//         "Tata recent launches",
//         "Mahindra new models",
//         "Kia India latest cars",
//         "electric car launches",
//         "V3Cars"
//     ],
// };

const newsList = [
    {
        id: "1",
        image: "/latest-news/image1.png",
        tag: "June 2024",
        heading:
            "Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...",
        description:
            "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
        author: "Mahesh Yadav",
        date: "July 31 2024",
    },
    {
        id: "2",
        image: "/latest-news/image2.png",
        tag: "Mahindra Thar Roxx",
        heading:
            "Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...",
        description:
            "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
        author: "Mahesh Yadav",
        date: "July 31 2024",
    },
    {
        id: "3",
        image: "/latest-news/image3.png",
        tag: "Upcoming Cars",
        heading:
            "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
        description:
            "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
        author: "Mahesh Yadav",
        date: "July 31 2024",
    },
    {
        id: "4",
        image: "/latest-news/image3.png",
        tag: "Upcoming Cars",
        heading:
            "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
        description:
            "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
        author: "Mahesh Yadav",
        date: "July 31 2024",
    },
    {
        id: "5",
        image: "/latest-news/image3.png",
        tag: "Upcoming Cars",
        heading:
            "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
        description:
            "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
        author: "Mahesh Yadav",
        date: "July 31 2024",
    },
];

const reviewList = [
    {
        id: 1,
        image: '/car-review/image1.png',
        tag: 'June 2024',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 2,
        image: '/car-review/image2.png',
        tag: 'Mahindra Thar Roxx',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 3,
        image: '/car-review/image3.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 4,
        image: '/car-review/image1.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 5,
        image: '/car-review/image2.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
]

const videoList = new Array(8).fill({
    thumbnail: '/latest-video/image2.png',
    playIcon: '/latest-video/youtube.png',
    date: 'July 30 2024',
    title:
        'Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...',
    description:
        'The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety, safety and performance...',
})


function LatestCars() {
    const { data: latestCarNewsData, error: latestCarNewsError, isLoading: latestCarNewsLoading } = useGetLatestCarNewsQuery();
    const { data: latestCarData, error, isLoading } = useGetLatestLaunchedCarsQuery();
    const latestCarNews = latestCarNewsData?.rows ?? [];
    const latestCars = latestCarData?.rows ?? [];

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
                            />

                            <CommonExpertReviews
                                title="Car Expert Reviews"
                                view="Car Expert Reviews"
                                reviewList={reviewList}
                            />

                            <CommonVideos
                                title="Car Videos"
                                view="Car Videos"
                                videoList={videoList}
                            />

                        </div>
                        <div className="w-auto lg:max-w-[24%] space-y-10">
                            <SideBarAdSmall />
                            <UpcomingCars />
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

export default LatestCars;