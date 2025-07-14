import ElectricCar from "@/components/ElectricCars/ElectricCar";
import ElectricExpertReviews from "@/components/ElectricCars/ElectricExpertReviews";
import ElectricSideBar from "@/components/ElectricCars/ElectricSidebar";
import ElectricVehicleNews from "@/components/ElectricCars/ElectricVehicleNews";
import ElectricVehicleVideos from "@/components/ElectricCars/ElectricVehicleVideos";
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
            <div className="w-full lg:max-w-[1600px] py-6 px-4 lg:px-0 mx-auto space-y-7">

                {/* Latest Cars */}
                <div className="flex flex-col xl:flex-row justify-between gap-5 w-full">
                    <div className="w-auto xl:min-w-[1190px]">
                        <ElectricCar />
                        <ElectricVehicleNews />
                        <ElectricExpertReviews />
                        <ElectricVehicleVideos />
                    </div>
                    <div className="w-auto xl:min-w-[390px]">
                        <ElectricSideBar />
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

export default ElectricCars;