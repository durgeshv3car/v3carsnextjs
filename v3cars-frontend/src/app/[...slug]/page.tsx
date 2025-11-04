'use client';

import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import CityWiseFuelList from "@/components/responsive/pages/CityWiseFuelList";
import FuelPrices from "@/components/responsive/pages/FuelPrices";
import Listof10DaysPrice from "@/components/responsive/pages/Listof10DaysPrice";
import SearchSection from "@/components/responsive/pages/SearchSection";
import StateWiseFuelChart from "@/components/responsive/pages/StateWiseFuelChart";
import StateWiseFuelList from "@/components/responsive/pages/StateWiseFuelList";
import TopSection from "@/components/responsive/pages/TopSection";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useGetFuelPriceStateQuery } from "@/redux/api/fuelModuleApi";
import { notFound, useParams } from "next/navigation";

export default function Slug() {
    const { slug } = useParams<{ slug?: string[] }>();

    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData } = useGetFuelPriceStateQuery();

    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    // ✅ Allowed fuel slugs (base routes)
    const allowedSlugs: Record<string, string> = {
        "fuel-price-in-india": "Fuel",
        "petrol-price-in-india": "Petrol",
        "diesel-price-in-india": "Diesel",
        "cng-price-in-india": "CNG",
    };

    if (!slug || slug.length === 0) {
        notFound();
    }

    // 🧠 Detect route pattern
    let type: string | null = null;
    let state: string | null = null;
    let city: string | null = null;

    if (slug.length === 1) {
        // ✅ Example: /petrol-price-in-india
        const currentSlug = slug[0].toLowerCase();
        type = allowedSlugs[currentSlug] || null;
    } else if (slug.length === 2) {
        // ✅ Example: /delhi/petrol-price-in-new-delhi
        state = slug[0].toLowerCase();
        const fuelSlug = slug[1].toLowerCase();

        const matchedFuelKey = Object.keys(allowedSlugs).find((key) =>
            fuelSlug.includes(key.replace("-in-india", ""))
        );

        if (matchedFuelKey) {
            type = allowedSlugs[matchedFuelKey];
            city = fuelSlug
                .replace(/(petrol|diesel|cng|fuel)-price-in-/, "")
                .replace(/-/g, " ")
                .trim();
        }
    }

    if (!type) {
        notFound();
    }

    // 🧩 Page Title text
    // const titleText =
    //     slug.length === 1
    //         ? `${type} Price in India`
    //         : `${type} Price in ${city ? city : state}`;

    return (
        <>
            {/* Optional: Top Section */}
            <TopSection type={type ?? "Fuel"} />

            <SearchSection type={type} city={city} state={state} />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <FuelPrices />

                            {["Petrol", "Diesel", "CNG"].includes(type) && (
                                <Listof10DaysPrice type={type} data={fuelPriceState} city={city} />
                            )}

                            {["Petrol", "Diesel", "CNG"].includes(type) && (
                                <CityWiseFuelList type={type} data={fuelPriceState} />
                            )}

                            <StateWiseFuelList type={type} data={fuelPriceState} />
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
