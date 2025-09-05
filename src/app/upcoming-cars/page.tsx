import NewCarsLaunched from "@/components/responsive/upcoming-cars/NewCarsLaunched";
import NewUpcomingCars from "@/components/responsive/upcoming-cars/NewUpcomingCars";
import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";
import BottomAd from "@/components/common/BottomAd";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingTopBrands from "@/components/common/UpcomingCarByTopBrands";
import Upcoming from "@/components/common/UpcomingCars";

export const metadata: Metadata = {
    title: "Upcoming Cars in India 2024-2025 | Latest Launches, Prices, Images",
    description:
        "Explore all upcoming cars in India in 2024-2025 with expected prices, launch dates, images, and detailed specs. Stay updated on SUVs, hatchbacks, sedans, and electric cars from top brands like Maruti, Hyundai, Tata, Mahindra, and Kia.",
    keywords: [
        "upcoming cars India",
        "new car launches 2024",
        "upcoming SUV launches",
        "new cars in India 2025",
        "car launch dates",
        "expected car prices",
        "Maruti Suzuki upcoming cars",
        "Hyundai new cars",
        "Tata upcoming launches",
        "Mahindra car launch",
        "Kia India new cars",
        "electric cars India",
        "V3Cars"
    ]
};


function UpcomingCars() {
    return (
        <>
            <TopSection
                title={"Upcoming Cars In India (2024-2025)"}
                description={`Gear up for exciting new car launches in India (2024-2025)! We’ve compiled a 
                    comprehensive list featuring over 164 upcoming cars across various segments like SUVs,
                     hatchbacks, sedans, and more. Top brands like Maruti Suzuki, Hyundai, Tata, Mahindra, Kia 
                     and others are all set to unveil their latest offerings. Explore expected prices, model image and launch dates for each car. 
                     `}
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <NewUpcomingCars />
                            <NewCarsLaunched />
                        </div>
                        <div className="w-auto lg:max-w-[24%] mt-6 lg:mt-12 space-y-10">
                            <SideBarAdSmall />
                            <UpcomingTopBrands />
                            <SideBarAdSmall />
                            <Upcoming />
                        </div>
                    </div>

                </div>
            </div>

            <BottomAd />

        </>
    );
}

export default UpcomingCars;