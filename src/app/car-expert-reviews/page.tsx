import LeaderboardAd from "@/components/common/LeaderboardAd";
import PopularVideos from "@/components/common/PopularVideos";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import UpcomingCarByTopBrands from "@/components/common/UpcomingCarByTopBrands";
import CarExpertReview from "@/components/mobile/car-expert-review/CarExpertReview";
import LatestExpertReview from "@/components/responsive/car-expert-review/LatestExpertReview";
import TopComparisonReviews from "@/components/responsive/car-expert-review/TopComparisonReviews";
import TrendingComparisonReviews from "@/components/responsive/car-expert-review/TrendingComparisonReviews";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Compare Cars in India | Specs, Features, Prices - V3Cars",
    description:
        "Compare cars in India by price, features, mileage, specifications & more. Use V3Cars' car comparison tool to find the best car for you.",
    keywords: [
        "compare cars India",
        "car comparison tool",
        "car specs comparison",
        "price comparison cars",
        "V3Cars compare",
        "car features comparison",
    ],
};

function CarExpertReviews() {
    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Car Expert Reviews
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="lg:px-10 px-4">
                <div className="w-full lg:max-w-[1600px] mx-auto pb-6">
                    <div className="flex flex-col lg:flex-row justify-between w-full">

                        {/* Left Content */}
                        <div className="w-auto lg:max-w-[75%]">
                            <div className="hidden lg:block space-y-6">
                                <LatestExpertReview />

                                <LeaderboardAd />

                                <TrendingComparisonReviews />

                                <LeaderboardAd />

                                <TopComparisonReviews />
                            </div>

                            {/* Mobile View */}
                            <div className="lg:hidden">
                                <CarExpertReview />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-auto lg:max-w-[22%] space-y-6 mt-6 flex flex-col items-center">
                            <SideBarAdSmall />
                            <UpcomingCarByTopBrands />
                            <PopularVideos />
                            <SideBarAdSmall />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarExpertReviews;
