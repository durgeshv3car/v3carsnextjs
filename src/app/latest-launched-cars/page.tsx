import CarExpertReviews from "@/components/responsive/latest-cars/CarExpertReviews";
import CarVideos from "@/components/responsive/latest-cars/CarVideos";
import CarNewsUpdates from "@/components/responsive/latest-cars/CarsNewsUpdates";
import LaunchedCar from "@/components/responsive/latest-cars/LaunchedCar";
import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCars from "@/components/common/UpcomingCars";
import UpcomingTopBrands from "@/components/common/UpcomingTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import BottomAd from "@/components/common/BottomAd";

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
            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">

                    {/* Latest Cars */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <LaunchedCar />
                            <CarNewsUpdates />
                            <CarExpertReviews />
                            <CarVideos />
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