import ElectricCar from "@/components/responsive/electric-cars/ElectricCar";
import ElectricExpertReviews from "@/components/responsive/electric-cars/ElectricExpertReviews";
import ElectricVehicleNews from "@/components/responsive/electric-cars/ElectricVehicleNews";
import ElectricVehicleVideos from "@/components/responsive/electric-cars/ElectricVehicleVideos";
import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCars from "@/components/common/UpcomingCars";
import UpcomingTopBrands from "@/components/common/UpcomingTopBrands";
import PopularBrands from "@/components/common/PopularBrands";
import BottomAd from "@/components/common/BottomAd";

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
        "V3Cars EV comparison"
    ],
};



function ElectricCars() {
    return (
        <>
            <TopSection />
            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">

                    {/* Latest Cars */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <ElectricCar />
                            <ElectricVehicleNews />
                            <ElectricExpertReviews />
                            <ElectricVehicleVideos />
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

export default ElectricCars;