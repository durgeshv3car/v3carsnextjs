'use client';

import Link from "next/link";
import BannerSection from "./BannerSection";
import LatestUpdates from "./overview/LatestUpdates";
import CommonModelCard from "@/components/common/ModelCards/CommonModelCard";
import CommonList from "./overview/CommonList";
import SpecsListTable from "./overview/SpecsListTable";
import ModelExpertReview from "./overview/ModelExpertReview";
import ModelProsCons from "./overview/ModelProsCons";
import CommonViewOfferCard from "@/components/common/ModelCards/CommonViewOfferCard";
import useIsMobile from "@/hooks/useIsMobile";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import CommonComparisonModelCard from "@/components/common/ModelCards/CommonComparisonModelCard";
import { useGetModelLatestNewsQuery, useGetPopularComparisonsQuery } from "@/redux/api/contentModuleApi";
import CommonModelFAQ from "@/components/common/ModelCards/CommonModelFAQ";
import CommonVideos from "@/components/common/CommonVideos";
import { useGetModelReviewsVideosQuery } from "@/redux/api/videosModuleApi";
import BrochureCard from "./sidebar/BrochureCard";
import CSDPriceList from "./sidebar/CSDPriceList";
import LatestOffersDiscounts from "./sidebar/LatestOffersDiscounts";
import MonthlySales from "./sidebar/MonthlySales";
import OnRoadPriceinTopCities from "./sidebar/OnRoadPriceinTopCities";
import OtherCars from "./sidebar/OtherCars";
import CarColours from "./sidebar/CarColours";
import VariantExplained from "./sidebar/VariantExplained";
import EMICalculator from "./sidebar/EMICalculator";
import CostOfOwnership from "./sidebar/CostOfOwnership";
import Marquee from "@/components/ui/Marquee";
import { useGetBestVariantToBuyQuery, useGetDimensionsCapacityQuery, useGetModelDetailByFuelTypeQuery, useGetModelDetailsQuery, useGetModelOthersCarsQuery, useGetModelUpcomingCarsQuery } from "@/redux/api/carModuleApi";
import { CarData } from "./overview/Overview";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const data = [
    {
        id: 1,
        src: "/model/tata.png",
        name: "It has a modern design with a rugged stance.It has a modern design with a rugged stance."
    },
    {
        id: 2,
        src: "/model/tata.png",
        name: "Flat ride quality and tall ground clearance.It has a modern design with a rugged stance."
    },
    {
        id: 3,
        src: "/model/tata.png",
        name: "Large instrument cluster and responsive infotainment."
    },
]

interface ModelPageProps {
    type: string;
    slug: string;
}

export default function ModelPage({ type, slug }: ModelPageProps) {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const [fuelType, setFuelType] = useState<string>("petrol")
    const [transmissionType, setTransmissionType] = useState<string>("")
    const { data: modelDetailsData } = useGetModelDetailsQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelDetailByFuelTypeData } =
        useGetModelDetailByFuelTypeQuery(
            { model_slug: slug, cityId: Number(selectedCity.cityId), fuelType: fuelType, transmissionType: transmissionType ?? undefined },
            { skip: !slug }
        );
    const { data: bestVariantToBuyData } = useGetBestVariantToBuyQuery({ model_slug: slug }, { skip: !slug });
    const { data: dimensionsCapacityData } = useGetDimensionsCapacityQuery({ model_slug: slug }, { skip: !slug });
    const { data: modelLatestNewsData } = useGetModelLatestNewsQuery({ model_slug: slug }, { skip: !slug });
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: modelReviewsVideosData } = useGetModelReviewsVideosQuery({ model_slug: slug }, { skip: !slug })
    const { data: modelUpcomingCarsData } = useGetModelUpcomingCarsQuery({ model_slug: slug }, { skip: !slug })
    const { data: modelOthersCarsData } = useGetModelOthersCarsQuery({ model_slug: slug })

    const modelDetails: CarData | null = modelDetailsData?.data ?? null;
    const modelDetailByFuelType = modelDetailByFuelTypeData?.rows ?? [];
    const bestVariantToBuy = bestVariantToBuyData?.rows ?? [];
    const dimensionsCapacity = dimensionsCapacityData
        ? [dimensionsCapacityData]
        : null;
    const modelLatestNews = modelLatestNewsData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];
    const modelReviewsVideos = modelReviewsVideosData?.rows ?? [];
    const modelUpcomingCars = modelUpcomingCarsData?.rows ?? [];
    const modelOthersCars = modelOthersCarsData?.items ?? [];

    console.log(modelOthersCars);


    const isMobile = useIsMobile()

    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <Link href={`/${type}`} className="hover:underline">
                            {type}
                        </Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">
                            {slug}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center my-4">
                <img
                    src={'/model/bannerads.png'}
                    alt="bannerads"
                    width={970}
                    height={90}
                    className="rounded-lg"
                />
            </div>

            <div className="relative mt-10">
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

                <div className="lg:px-8 px-4 shadow-md">
                    {/* Banner content on top */}
                    <div className="relative w-full lg:app-container mx-auto z-10">
                        <BannerSection type={type} slug={slug} modelDetails={modelDetails} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <LatestUpdates
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                            />

                            <CommonModelCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={data}
                            />

                            <div id="Price">
                                <CommonList
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    title="Price List"
                                    desc={
                                        modelDetails
                                            ? `The ${modelDetails.model.brand.name} ${modelDetails.model.name} ${modelDetails.model.bodyType} is available with multiple engine and transmission combinations. The ex-showroom prices of the ${modelDetails.model.name} start from ₹${(
                                                (modelDetails.priceRange.exShowroom.min ?? 0) / 100000
                                            ).toFixed(2)} lakh. The top-end variant is priced at ₹${(
                                                (modelDetails.priceRange.exShowroom.max ?? 0) / 100000
                                            ).toFixed(2)} lakh (ex-showroom).`
                                            : ""
                                    }
                                    fuelTypes={modelDetails?.availableWith.fuels}
                                    data={modelDetailByFuelType}
                                    fuelType={fuelType}
                                    setFuelType={setFuelType}
                                    transmissionType={transmissionType}
                                    setTransmissionType={setTransmissionType}
                                    type={type}
                                    slug={slug}
                                />
                            </div>

                            <div id="Variants">
                                <CommonList
                                    model={`Best ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    title="Variant To Buy"
                                    desc="See our recommended Tata Nexon variant for each powertrain with the highest value score. Visit the Which Variant To Buy page for a complete breakdown and alternatives"
                                    data={bestVariantToBuy}
                                    type={type}
                                    slug={slug}
                                />
                            </div>

                            <div id="Dimensions">
                                <CommonList
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    title="Dimensions & Capacity"
                                    desc="The 2025 Nexon is 3995mm long, 1804mm wide and 1620mm tall. Bigger exterior dimensions give a car a stronger road presence. The Nexon has a 2498mm long wheelbase. A long wheelbase makes the car more stable at high speeds and gives better legroom in the back"
                                    data={dimensionsCapacity as [] | null}
                                    type={type}
                                    slug={slug}
                                />
                            </div>

                            <div id="Mileage">
                                <SpecsListTable
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    slug={slug}
                                />
                            </div>

                            <div id="Reviews">
                                <ModelExpertReview
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                />
                            </div>

                            <div id="Pros Cons">
                                <ModelProsCons
                                    model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                    slug={slug}
                                />
                            </div>

                            {/* <ModelComparisonSimilarCars
                                model={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                slug={slug}
                            /> */}

                            <CommonViewOfferCard
                                title={`${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                desc={`The ${modelDetails?.model?.name} competes with popular models including`}
                                slug={slug}
                            />

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

                            <OtherCars
                                title={`Other ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelOthersCars}
                            />

                            <OtherCars
                                title={`Upcoming ${modelDetails?.model?.brand?.name} ${modelDetails?.model?.name}`}
                                data={modelUpcomingCars}
                            />

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