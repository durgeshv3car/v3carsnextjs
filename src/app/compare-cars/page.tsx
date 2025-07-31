import TopSection from "@/components/common/TopSection";
import CarComparisonLatestVideos from "@/components/responsive/compare-cars/CarComparisonLatestVideos";
import CompareNow from "@/components/responsive/compare-cars/CompareNow";
import ComparisonNews from "@/components/responsive/compare-cars/ComparisonNews";
import Information from "@/components/responsive/compare-cars/Information";
import MostPopularCarComparison from "@/components/responsive/compare-cars/MostPopularCarComparison";
import { Metadata } from "next";

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



function CompareCars() {
    return (
        <>
            <TopSection />
            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">
                    <CompareNow />
                    <Information />
                    <div className="hidden lg:block">
                        <ComparisonNews />
                    </div>
                    <MostPopularCarComparison />
                    <CarComparisonLatestVideos />
                </div>
            </div>
        </>
    );
}

export default CompareCars;