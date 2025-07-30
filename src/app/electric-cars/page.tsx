import ElectricCar from "@/components/responsive/electric-cars/ElectricCar";
import ElectricExpertReviews from "@/components/responsive/electric-cars/ElectricExpertReviews";
import ElectricSideBar from "@/components/responsive/electric-cars/ElectricSidebar";
import ElectricVehicleNews from "@/components/responsive/electric-cars/ElectricVehicleNews";
import ElectricVehicleVideos from "@/components/responsive/electric-cars/ElectricVehicleVideos";
import TopSection from "@/components/common/TopSection";
import { Metadata } from "next";

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
            <div className="px-4 lg:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">

                    {/* Latest Cars */}
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <ElectricCar />
                            <ElectricVehicleNews />
                            <ElectricExpertReviews />
                            <ElectricVehicleVideos />
                        </div>
                        <div className="w-auto lg:max-w-[24%]">
                            <ElectricSideBar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-10 flex justify-center items-center mb-6'>

                <div className="hidden sm:block w-full lg:max-w-[1600px] lg:h-[346px] sm:h-[200px] mx-auto">
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

export default ElectricCars;