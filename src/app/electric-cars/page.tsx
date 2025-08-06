import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCars from "@/components/common/UpcomingCars";
import UpcomingTopBrands from "@/components/common/UpcomingTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import BottomAd from "@/components/common/BottomAd";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonExpertReviews from "@/components/common/CommonExpertReviews";
import CommonVideos from "@/components/common/CommonVideos";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";

export const metadata: Metadata = {
    title: "Electric Cars in India 2024 | Prices, Range, Images & More - V3Cars",
    description:
        "Explore the top electric cars in India in 2024. Compare EV prices, battery range, charging time, images, and features from brands like Tata, MG, Hyundai, Mahindra, and more.",
    keywords: [
        "electric cars India 2024",
        "EV cars India",
        "electric car price",
        "electric SUV",
        "electric vehicle range",
        "Tata electric cars",
        "MG EV models",
        "Hyundai electric car",
        "Mahindra electric SUV",
        "affordable electric cars",
        "best electric cars India",
        "V3Cars EV comparison",
    ],
};

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

const carsData = [
    {
        image: "/ford.jpg",
        name: "S-Presso",
        engine: "83PS",
        nitro: "113Nm",
        mileage: "21.11kmpl",
        price: "₹90.99 - 200.93 lakh*",
    },
]

function ElectricCars() {
    return (
        <>
            <TopSection />
            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">
                    {/* Main Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                <CurrentOffersCard carsData={carsData} />
                            </div>

                            <CommonNewsUpdate
                                title="Electric Vehicle (EV) News Update"
                                view="EV News Update"
                                newsList={newsList}
                            />

                            <CommonExpertReviews
                                title="Electric Vehicle (EV) Expert Reviews"
                                view="EV Expert Reviews"
                                reviewList={reviewList}
                            />

                            <CommonVideos
                                title="Electric Vehicle (EV) Videos"
                                view="EV Videos"
                                videoList={videoList}
                            />

                        </div>

                        {/* Sidebar */}
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

export default ElectricCars;
