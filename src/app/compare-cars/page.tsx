import CommonVideos from "@/components/common/CommonVideos";
import TopSection from "@/components/common/TopSection";
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

const videoList = new Array(8).fill({
    thumbnail: '/latest-video/image2.png',
    playIcon: '/latest-video/youtube.png',
    date: 'July 30 2024',
    title:
        'Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...',
    description:
        'The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety, safety and performance...',
})

function CompareCars() {
    return (
        <>
            <TopSection
                title={"Compare to choose the right car!"}
                description={"Want to buy a Car but confused how to select the best car as per your requirements? V3Cars compare car tool can help you to finalize your car. To compare cars you just need to select two or more cars of your choice as per your requirements and get the comparison instantly. You can compare Car price, engine specifications, dimensions & interior exterior features. So now compare your favourite"}
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <CompareNow />
                    <Information />

                    <div className="hidden lg:block">
                        <ComparisonNews />
                    </div>

                    <MostPopularCarComparison />

                    <CommonVideos
                        title="Car Comparison Latest Videos"
                        view="Videos"
                        videoList={videoList}
                    />

                </div>
            </div>
        </>
    );
}

export default CompareCars;