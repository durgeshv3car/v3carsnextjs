import CarExpertReviews from "@/components/LatestCars/CarExpertReviews";
import CarVideos from "@/components/LatestCars/CarVideos";
import CarNewsUpdates from "@/components/LatestCars/CarsNewsUpdates";
import LaunchedCar from "@/components/LatestCars/LaunchedCar";
import SideBar from "@/components/LatestCars/SideBar";
import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest Car Launches in India 2024 | New Car Prices, Images & Specs",
    description:
        "Discover the latest car launches in India in 2024. Get updated prices, specs, images, and features of newly launched cars from top brands like Maruti, Hyundai, Tata, Mahindra, Kia and more.",
    keywords: [
        "latest car launches India",
        "new cars 2024",
        "recently launched cars",
        "new car prices India",
        "new SUV launch",
        "car images and specs",
        "Maruti new cars",
        "Hyundai latest cars",
        "Tata recent launches",
        "Mahindra new models",
        "Kia India latest cars",
        "electric car launches",
        "V3Cars"
    ],
};


function LatestCars() {
    return (
        <>
            <TopSection />
            <div className="w-full lg:max-w-[1600px] py-6 px-4 lg:px-0 mx-auto space-y-7">

                {/* Latest Cars */}
                <div className="flex flex-col xl:flex-row justify-between gap-5 w-full">
                    <div className="w-auto xl:min-w-[1190px]">
                        <LaunchedCar />
                        <CarNewsUpdates />
                        <CarExpertReviews />
                        <CarVideos />
                    </div>
                    <div className="w-auto xl:min-w-[390px]">
                        <SideBar />
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] p-8 flex justify-center items-center mb-6'>

                <div className="hidden sm:block w-full lg:w-[1600px] xl:h-[346px] sm:h-[200px] mx-auto">
                    <img
                        src={'/ads/ad1.png'}
                        alt='ad1'
                        className='h-full w-full'
                    />
                </div>

                <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

                </div>
            </div>
        </>
    );
}

export default LatestCars;