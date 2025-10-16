'use client'

import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import FuelPrices from "@/components/responsive/pages/FuelPrices";
import SearchSection from "@/components/responsive/pages/SearchSection";
import StateWiseFuelChart from "@/components/responsive/pages/StateWiseFuelChart";
import StateWiseFuelList from "@/components/responsive/pages/StateWiseFuelList";
import TopSection from "@/components/responsive/pages/TopSection";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useGetFuelPriceStateQuery } from "@/redux/api/fuelModuleApi";
import { redirect, useParams } from "next/navigation";

export default function Slug() {
    const { slug } = useParams();
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData, isLoading } = useGetFuelPriceStateQuery();

    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    const allowedSlugs: Record<string, string> = {
        "fuel-price-in-india": "Fuel",
        "petrol-price-in-india": "Petrol",
        "diesel-price-in-india": "Diesel",
        "cng-price-in-india": "CNG",
    };

    const currentSlug = slug?.[0] || "";
    const type = allowedSlugs[currentSlug] || null;

    if (!type) {
        redirect("/fuel-price-in-india");
    }

    return (
        <>
            <TopSection type={type} />
            <SearchSection />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <FuelPrices />
                            <StateWiseFuelList data={fuelPriceState} />
                            <StateWiseFuelChart />
                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>
                        <div className="w-auto lg:min-w-[24%] space-y-10">
                            <SideBarAdSmall />
                            <PopularBrands />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
