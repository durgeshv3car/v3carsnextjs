import BottomAd from "@/components/common/BottomAd";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import CommonExpertReviews from "@/components/common/CommonExpertReviews";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonVideos from "@/components/common/CommonVideos";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdLong from "@/components/common/SideBarAdLong";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import TopSection from "@/components/common/TopSection";
import UpcomingTopBrands from "@/components/common/UpcomingTopBrands";
import PopularCar from "@/components/responsive/popular-cars/PopularCar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Most Popular Cars in India 2024 | Top Selling Models & Prices",
    description:
        "Explore the most popular cars in India for 2024, including top-selling models, latest prices, mileage, specs, and user ratings. Find best-selling SUVs, hatchbacks, and sedans from brands like Maruti, Hyundai, Tata, Mahindra, Kia, and more.",
    keywords: [
        "popular cars India 2024",
        "best selling cars",
        "top cars in India",
        "top SUVs 2024",
        "most sold cars",
        "best cars under 10 lakhs",
        "Maruti bestsellers",
        "Hyundai popular cars",
        "Tata top models",
        "Kia popular cars",
        "Mahindra best SUVs",
        "top hatchbacks India",
        "popular sedans India",
        "V3Cars"
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
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
]

function PopularCars() {
    return (
        <>
            <TopSection />
            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">


                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <PopularCar />

                            <div className='mb-4'>
                                <h2 className="text-lg font-medium my-6">Hottest Cars In India 2024</h2>

                                <div className='p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl'>
                                    <p className='mb-2'>Discover India's Most-Loved Cars! This section dives into user interest on the V3Cars platform, showcasing the top 30 cars capturing hearts and minds. Go beyond just sales figures and explore the vehicles generating the most buzz! We provide detailed information on each car, including price, specifications, and mileage. Find the car that ignites your passion and explore your options with confidence.</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <CurrentOffersCard carsData={carsData} />
                                    </div>
                                </div>
                            </div>

                            <CommonNewsUpdate
                                title="Cars News Updates"
                                view="Cars News"
                                newsList={newsList}
                            />

                            <CommonExpertReviews
                                title="Car Expert Reviews"
                                view="Reviews"
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
                            <UpcomingTopBrands />
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

export default PopularCars;