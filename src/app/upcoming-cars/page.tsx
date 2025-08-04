import NewCarsLaunched from "@/components/responsive/upcoming-cars/NewCarsLaunched";
import NewUpcomingCars from "@/components/responsive/upcoming-cars/NewUpcomingCars";
import TopSection from "@/components/common/TopSection";
import UpcomingSideBar from "@/components/responsive/upcoming-cars/UpcomingSidebar";
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
            <TopSection />
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