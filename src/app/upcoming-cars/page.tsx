import NewCarsLaunched from "@/components/responsive/upcoming-cars/NewCarsLaunched";
import NewUpcomingCars from "@/components/responsive/upcoming-cars/NewUpcomingCars";
import TopSection from "@/components/common/TopSection";
import UpcomingSideBar from "@/components/responsive/upcoming-cars/UpcomingSidebar";
import { Metadata } from "next";

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
            <div className="px-4 lg:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">
                            <NewUpcomingCars />
                            <NewCarsLaunched />
                        </div>
                        <div className="w-auto lg:max-w-[24%] mt-6 lg:mt-12">
                            <UpcomingSideBar />
                        </div>
                    </div>

                </div>
            </div>

            {/* Banner Section */}
            <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-10 flex justify-center items-center mb-6'>

                <div className="hidden sm:block w-full lg:w-[1600px] lg:h-[346px] sm:h-[200px] mx-auto">
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

export default UpcomingCars;