import TopSection from "@/components/common/TopSection";
import CarComparisonLatestVideos from "@/components/CompareCars/CarComparisonLatestVideos";
import CompareNow from "@/components/CompareCars/CompareNow";
import ComparisonNews from "@/components/CompareCars/ComparisonNews";
import Information from "@/components/CompareCars/Information";
import MostPopularCarComparison from "@/components/CompareCars/MostPopularCarComparison";
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

            {/* Banner Section */}
            {/* <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-4 flex justify-center items-center mb-6'>

                <div className="hidden sm:block w-full lg:max-w-[1600px] lg:h-[346px] sm:h-[200px] mx-auto">
                    <img
                        src={'/ads/ad1.png'}
                        alt='ad1'
                        className='h-full w-full'
                    />
                </div>

                <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

                </div>
            </div> */}
        </>
    );
}

export default CompareCars;