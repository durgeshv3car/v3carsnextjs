'use client';

import useIsMobile from "@/hooks/useIsMobile";
import {
    useGetPopularComparisonsQuery,
} from "@/redux/api/contentModuleApi";
import MostPopularCarComparison from "./MostPopularCarComparison";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import CommonHowItWorkCard from "@/components/common/CommonHowItWorkCard";
import BottomAd from "@/components/common/BottomAd";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import CommonUsefulToolComponent from "@/components/common/CommonUsefulToolComponent";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import WhyCompareCars from "./WhyCompareCars";
import SmartBuyersGuide from "./SmartBuyersGuide";
import CarComparison from "./CarComparison";
import SelectCarComparison from "./SelectCarComparison";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetCompareVariantsQuery } from "@/redux/api/carModuleApi";
import { CompareVariant } from "./CompareInterface";
import PriceComparison from "./PriceComparison";
import PerformanceComparison from "./PerformanceComparison";
import DimensionsTable from "./DimensionsTable";
import ColoursComparison from "./ColoursComparison";
import OwnershipComparison from "./OwnershipComparison";
import ProsConsComparison from "./ProsConsComparison";
import ExpertVerdict from "./ExpertVerdict";
import FeaturesComparison from "./FeaturesComparison";
import { convertToName } from "@/utils/helperFunction";
import { useState } from "react";
import CommonSelectInput from "@/components/common/CommonSelectInput";
import { useGetSearchCityQuery } from "@/redux/api/locationModuleApi";
import { City } from "@/components/web/header/LocationDropdown";
import { setSelectedCity } from "@/redux/slices/commonSlice";

interface ComparePageProps {
    slug: string[]
}

function ComparePage({ slug }: ComparePageProps) {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const dispatch = useDispatch();
    const [cityId, setCityId] = useState<number | null>(null)
    const [query, setQuery] = useState("");
    const { data: searchCityData, isFetching: isSearching } = useGetSearchCityQuery({ query: query! }, { skip: !query });
    const [selectedVariantIds, setSelectedVariantIds] = useState<(number | null)[]>([])

    const finalVariantIds = selectedVariantIds
        .filter((id): id is number => Boolean(id))
        .join(",");

    const { data: compareVariantsData } = useGetCompareVariantsQuery({ variantIds: finalVariantIds, cityId: Number(selectedCity?.cityId) });
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });
    const cities = searchCityData?.rows ?? []

    const compareVariants: CompareVariant[] = compareVariantsData?.items ?? [];
    const faqByModule = faqByModuleData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];

    const isMobile = useIsMobile();

    const priceData = compareVariants.map(
        (variant) => variant.price
    );

    const variantData = compareVariants.map(
        (variant) => ({
            variantId: variant.variantId,
            variantName: variant.variantName,
            modelId: variant.modelId,
            modelName: variant.modelName,
            image: variant.image,
            imageUrl: variant.imageUrl,
            enginePerformance: variant.enginePerformance,
            price: variant.price
        })
    );

    const enginePerformanceData = compareVariants.map(
        (variant) => variant.enginePerformance
    );

    const dimensionsSpaceData = compareVariants.map(
        (variant) => variant.dimensionsSpace
    );

    const coloursData = compareVariants.map(
        (variant) => variant.colours
    );

    const ownershipData = compareVariants.map(
        (variant) => variant.ownership
    );

    const prosConsData = compareVariants.map(
        (variant) => variant.prosCons
    );

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <Link href="/compare-cars" className="hover:underline">Compare Cars</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary">
                                {convertToName(slug[1])}
                            </span>
                        </div>

                        <span className="font-medium text-primary">
                            How It Works
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-6"
                style={{ backgroundImage: `url('/car-on-road-price/top-bg.png')` }}
            >
                <div
                    className="absolute top-6 right-4 w-[200px] h-[200px] bg-cover bg-no-repeat z-20 pointer-events-none opacity-30"
                    style={{ backgroundImage: `url('/car-on-road-price/Wave.png')` }}
                />

                <div className="absolute inset-0 dark:bg-black/85"></div>

                <div className="relative z-10">
                    <div className="flex justify-center items-center my-4">
                        <img
                            src="/model/bannerads.png"
                            alt="bannerads"
                            width={970}
                            height={90}
                            className="rounded-lg"
                        />
                    </div>

                    <ToolsCommonSection
                        title={
                            <span>
                                Car <span className="text-yellow-500">Comparison</span>
                            </span>
                        }
                        desc={`Compare up to four cars side by side and evaluate every detail that matters before buying. This car comparison tool lets you compare price, engine specs, mileage, safety rating, dimensions, features, maintenance cost, warranty, colours and variant-wi`}
                    />

                    <div className="px-4 xl:px-10">
                        <div className="w-full lg:app-container mx-auto">
                            <div className="w-full flex items-center justify-center gap-3">
                                <div className="w-[200px] border rounded-lg text-sm py-1 dark:border-[#2e2e2e]">
                                    <CommonSelectInput
                                        query={query}
                                        setQuery={setQuery}
                                        options={cities}
                                        defaultValue={selectedCity.cityName}
                                        labelKey="cityName"
                                        valueKey="cityId"
                                        value={cityId ?? undefined}
                                        onSelect={(item: City) => {
                                            setCityId(item.cityId);
                                            dispatch(setSelectedCity({
                                                cityId: item.cityId,
                                                cityName: item.cityName
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <CarComparison slug={slug[1]} setSelectedVariantIds={setSelectedVariantIds} />

                    <SelectCarComparison variantData={variantData} />

                    <PriceComparison priceData={priceData} />

                    <PerformanceComparison data={enginePerformanceData} />

                    <DimensionsTable data={dimensionsSpaceData} />
                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <FeaturesComparison />
                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <ColoursComparison data={coloursData} />

                    <OwnershipComparison data={ownershipData} />

                    <ProsConsComparison data={prosConsData} />

                    <ExpertVerdict
                        priceAndValue="{{CarA}} is more affordable to buy."
                        performanceAndMileage="{{CarA}} delivers better performance with more power and torque, whereas {{CarB}} focuses on efficiency and lower running costs."
                        spaceAndComfort="{{LongestCar}} is the longest and widest of the group, which should translate to better cabin space, while {{BestGroundClearanceCar}} offers the highest ground clearance—useful for poor roads and speed breakers. Boot space is largest in {{BestBootCar}}, making it more practical for luggage."
                        featuresAndSafety="Feature-wise, {{MostLoadedCar}} offers the richest equipment list. {{LeastEquippedCar}} misses out on some basic safety, functional or convenience features that rivals provide."
                        finalVerdict="Choose {{CarA}} if you prioritise {{CarAPriorities}}. Go for {{CarB}} if you want {{CarBPriorities}}. Overall, {{BestAllRounder}} emerges as the most balanced choice for most buyers, while {{Alt1}} suits those who want {{Alt1Focus}}, and {{Alt2}} is better for {{Alt2Focus}}."
                    />

                    <MostPopularCarComparison
                        title="Hyundai Venue – Compare with Other B2-segment SUV"
                        data={popularComparisons}
                    />

                    <MostPopularCarComparison
                        title="Hyundai Creta E – Compare with Other B2-segment SUV"
                        data={popularComparisons}
                    />

                    <MostPopularCarComparison
                        title="Popular Car Comparison"
                        data={popularComparisons}
                    />

                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">

                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <div className="mt-7">
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-3">
                            Compare to Choose the Right Car!
                        </h2>

                        {/* First paragraph */}
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Choosing a new car can feel overwhelming, especially when several
                            models fit your budget and preferences. This comparison section
                            helps you simplify that decision by letting you line up multiple
                            cars and instantly see how they differ where it truly matters to
                            you.
                        </p>

                        {/* Second paragraph */}
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Just pick the cars you want to evaluate, select the relevant variants,
                            and the tool highlights meaningful differences—helping you understand
                            which option aligns better with your priorities, whether that’s
                            performance, comfort, practicality or long-term ownership experience.
                        </p>
                    </div>

                    <CommonHowItWorkCard
                        title="Car Comparison Tool - How it works"
                        data={howItWorkData}
                    />

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">

                            <CommonSellUsedCarComponent />

                            <WhyCompareCars />

                            <SmartBuyersGuide />

                            <CommonQuickLinkComponent data={links} />

                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>

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

                            <CommonUsefulToolComponent />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ComparePage;


const howItWorkData = [
    {
        title: "Select Cars",
        desc: "Choose up to four cars you want to compare & start building your shortlist.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/car.png" className="w-16 h-12" />
            </div>
        ),
        bg: "#cbe7f4", // Blue
    },
    {
        title: "Choose Variants",
        desc: "Pick fuel type, transmission & variant for each car.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/variant.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#fcd9d7", // Light red
    },
    {
        title: "View Detailed Comparison",
        desc: "Get detailed specs, features, prices & differences.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/compare.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#ffecbe", // Light yellow
    },
    {
        title: "Check Expert Verdict",
        desc: "Get smart insights & a clear verdict to understand which car suits you best.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/compare-car/verdict.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#d8e7ca", // Light green
    },
];

const links = [
    {
        title: "Mileage Calculator",
        desc: "Estimate Your Vehicle's Fuel Efficiency",
        img: "/emicalculator/mileage.png",
        bg: "bg-[#E4F3FE]",
    },
    {
        title: "Fuel Price in India",
        desc: "Check Latest Fuel Prices Across India",
        img: "/emicalculator/fuel.png",
        bg: "bg-[#FCEFFE]",
    },
    {
        title: "Car Loan EMI Calculator",
        desc: "Calculate Your Monthly Car Loan EMI",
        img: "/emicalculator/emi.png",
        bg: "bg-[#FFF8C9]",
    },
    {
        title: "Compare Cars",
        desc: "Compare Specs, Features & Prices",
        img: "/emicalculator/compare.png",
        bg: "bg-[#E0F8E8]",
    },
];