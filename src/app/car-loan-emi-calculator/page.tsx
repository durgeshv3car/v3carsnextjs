import BottomAd from "@/components/common/BottomAd";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdLong from "@/components/common/SideBarAdLong";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import TopSection from "@/components/common/TopSection";
import UpcomingTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CarLoanCalculator from "@/components/responsive/car-loan-emi-calculator/CarLoanCalculator";
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

function CarLoanEMICalculator() {
    return (
        <>
            <TopSection />
            <div className="px-4 xl:px-10 bg-[#F9F8FA] border-t dark:border-[#2E2E2E]">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">
                    <CarLoanCalculator />

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%]">

                        </div>
                        <div className="w-auto lg:max-w-[24%] space-y-10">
                            {/* <SideBarAdSmall /> */}
                            {/* <UpcomingTopBrands /> */}
                            {/* <SideBarAdSmall /> */}
                            {/* <PopularBrands /> */}
                            {/* <SideBarAdLong /> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <BottomAd /> */}
        </>
    );
}

export default CarLoanEMICalculator;