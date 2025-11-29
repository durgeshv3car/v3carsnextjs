'use client'

import CommonVideos from "@/components/common/CommonVideos";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
import CommonUsedCarCard from "@/components/common/ModelCards/CommonUsedCarCard";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import BannerSection from "@/components/responsive/brand/model/BannerSection";
import BrochureCard from "@/components/responsive/brand/model/sidebar/BrochureCard";
import CarColours from "@/components/responsive/brand/model/sidebar/CarColours";
import CSDPriceList from "@/components/responsive/brand/model/sidebar/CSDPriceList";
import EMICalculator from "@/components/responsive/brand/model/sidebar/EMICalculator";
import LatestOffersDiscounts from "@/components/responsive/brand/model/sidebar/LatestOffersDiscounts";
import MonthlySales from "@/components/responsive/brand/model/sidebar/MonthlySales";
import OnRoadPriceinTopCities from "@/components/responsive/brand/model/sidebar/OnRoadPriceinTopCities";
import VariantExplained from "@/components/responsive/brand/model/sidebar/VariantExplained";
import Marquee from "@/components/ui/Marquee";
import { useGetModelLatestNewsQuery, useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import { useGetModelReviewsVideosQuery } from "@/redux/api/videosModuleApi";
import { useGetModelDetailsQuery } from "@/redux/api/carModuleApi";
import { CarData } from "../overview/Overview";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import useIsMobile from "@/hooks/useIsMobile";
import SpecsTechnicalDetails from "./SpecsTechnicalDetails";
import SpecsFeatures from "./SpecsFeatures";
import CostOfOwnership from "../sidebar/CostOfOwnership";

interface MileagePageProps {
    type: string;
    slug: string;
    childSlug: string;
}

function EngineSpecificationsPage({ type, slug, childSlug }: MileagePageProps) {
    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: modelReviewsVideosData } = useGetModelReviewsVideosQuery({ model_slug: slug }, { skip: !slug })
    const { data: modelLatestNewsData } = useGetModelLatestNewsQuery({ model_slug: slug }, { skip: !slug });

    const popularComparisons = popularComparisonsData?.rows ?? [];
    const modelReviewsVideos = modelReviewsVideosData?.rows ?? []
    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const modelLatestNews = modelLatestNewsData?.rows ?? []

    const isMobile = useIsMobile()

    console.log(childSlug);

    return (
        <>
            <div className="relative">
                {/* Background Image */}
                {/* <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
                    style={{ backgroundImage: "url('/model/bg.png')" }}
                /> */}

                <div className="absolute flex justify-center md:justify-normal inset-0 z-0 w-full lg:app-container overflow-hidden">
                    <h1
                        className="text-[10vw] md:text-[6vw] font-extrabold text-gray-200 dark:text-gray-500/20 uppercase select-none tracking-widest"
                        style={{
                            wordBreak: "break-word",
                        }}
                    >
                        <Marquee text={slug} speed="25s" />
                    </h1>
                </div>

                {/* Banner content on top */}
                <div className="lg:px-8 px-4 shadow-md">
                    <div className="relative w-full lg:app-container mx-auto z-10">
                        <BannerSection type={type} slug={slug} modelDetails={modelDetails} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">

                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold">{modelDetails?.model?.brand?.name} {modelDetails?.model?.name} <span className="font-medium">Engine Specs & Performance</span></h2>
                                <p className="text-gray-400 text-sm">
                                    {`Explore the engine specifications and performance details of the ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}, including engine type, displacement, power, torque, gearbox, and drivetrain. Use the dropdown above to select your preferred powertrain`}
                                </p>

                                <SpecsTechnicalDetails
                                    title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    slug={slug}
                                    childSlug={childSlug}
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    {modelDetails?.model?.brand?.name} {modelDetails?.model?.name}
                                    <span className="font-medium"> Features</span>
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Discover all the key features of the Tata Nexon, including safety, comfort, convenience, infotainment, interior and exterior style highlights. Explore variant-wise features to understand what each trim level offers and find the version that best suits your needs
                                </p>
                            </div>

                            <SpecsFeatures
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <CommonSellUsedCarComponent />

                            <CommonViewOfferCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                desc={`The ${modelDetails?.model?.name} competes with popular models including`}
                                slug={slug}
                            />

                            <CommonUsedCarCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[160px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/ads.png'}
                                    alt="ads"
                                    width={970}
                                    height={90}
                                    className="rounded-lg"
                                />
                            </div>

                            {isMobile ? <MobileLatestCarNews
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest News`}
                                view="Latest News"
                                data={modelLatestNews}
                                link="/news"
                            />
                                :
                                <CommonNewsUpdate
                                    title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest News`}
                                    view={`${modelDetails?.model?.name} News Update`}
                                    newsList={modelLatestNews}
                                    link={"/news"}
                                />
                            }

                            <CommonVideos
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name} Latest Videos`}
                                view={`${modelDetails?.model?.name} Videos`}
                                videoList={modelReviewsVideos}
                            />

                            <CommonComparisonModelCard data={popularComparisons} />

                            <CommonModelFAQ
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                faqs={faqs}
                                viewAllLink="#"
                            />

                        </div>

                        {/* sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-6">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <BrochureCard
                                brand={`${modelDetails?.model?.brand?.name}`}
                                model={`${modelDetails?.model?.name}`}
                                url={undefined}
                            />

                            <CSDPriceList
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <LatestOffersDiscounts
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <CostOfOwnership
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <MonthlySales
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <OnRoadPriceinTopCities
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                type={type}
                                slug={slug}
                            />

                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CarColours
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelDetails?.media.colors ?? []}
                                type={type}
                                slug={slug}
                            />

                            <VariantExplained
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            />

                            <EMICalculator
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EngineSpecificationsPage;

const faqs = [
    {
        question: "What is the exact on-road price of Tata Nexon?",
        answer:
            "The on-road price of Nexon in Delhi starts at ₹8,22,812. The on-road price is inclusive of RTO charges and insurance.",
    },
    { question: "What are the latest October offers available on Tata Nexon?" },
    { question: "Which car is better Nexon or Punch?" },
    { question: "What will the EMI or down payment for Tata Nexon?" },
    { question: "Is Tata Nexon a 5 or 7 seater SUV?" },
    { question: "What is the mileage of Tata Nexon?" },
    { question: "What are the colour options available for Tata Nexon?" },
];