import TopSection from "@/components/ui/TopSection";
import CarReviews from "@/components/responsive/popular-cars/CarReviews";
import HottestCarInIndia from "@/components/responsive/popular-cars/CarsInIndia";
import CarsNews from "@/components/responsive/popular-cars/CarsNews";
import PopularCar from "@/components/responsive/popular-cars/PopularCar";
import PopularCarsVideos from "@/components/responsive/popular-cars/PopularCarsVideos";
import PopularSideBar from "@/components/responsive/popular-cars/PopularSidebar";
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

function PopularCars() {
    return (
        <>
            <TopSection />
            <div className="px-6 lg:px-10">
            <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">

                
                <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                    <div className="w-auto lg:max-w-[74%]">
                        <PopularCar />
                        <HottestCarInIndia />
                        <CarsNews />
                        <CarReviews />
                        <PopularCarsVideos />
                    </div>
                    <div className="w-auto lg:max-w-[24%]">
                        <PopularSideBar />
                    </div>
                </div>
            </div>
            </div>

            {/* Banner Section */}
            <div className='hidden h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-10 lg:flex justify-center items-center mb-6'>

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

export default PopularCars;