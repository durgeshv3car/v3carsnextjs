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
import { useGetFuelPriceStateQuery, useGetMetroCityFuelByCityQuery, useGetMetroCityFuelQuery } from "@/redux/api/fuelModuleApi";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Tab {
    fuelType: number,
    fuel: string
}

const tab: Tab[] = [
    {
        fuelType: 1,
        fuel: "Petrol"
    },
    {
        fuelType: 2,
        fuel: "Diesel"
    },
    {
        fuelType: 3,
        fuel: "CNG"
    },
]

// ✅ Get Current Date
const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
const day = today.getDate().toString().padStart(2, "0");
const monthName = today.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
const year = today.getFullYear();

export const getFuelTypeId = (fuel: string): number => {
  const tab = [
    { fuelType: 1, fuel: "Petrol" },
    { fuelType: 2, fuel: "Diesel" },
    { fuelType: 3, fuel: "CNG" },
  ];
  return tab.find(t => t.fuel.toLowerCase() === fuel.toLowerCase())?.fuelType ?? 1;
};

export default function Slug() {
    const { slug } = useParams<{ slug?: string[] }>();
    const [cityId, setCityId] = useState<number | null>(null)
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData } = useGetFuelPriceStateQuery();
    const { data: metroCityPetrolData } = useGetMetroCityFuelQuery({ fuelType: 1 });
    const { data: metroCityDieselData } = useGetMetroCityFuelQuery({ fuelType: 2 });
    const { data: metroCityCNGData } = useGetMetroCityFuelQuery({ fuelType: 3 });

    const metroCityPetrol = metroCityPetrolData?.rows ?? [];
    const metroCityDiesel = metroCityDieselData?.rows ?? [];
    const metroCityCNG = metroCityCNGData?.rows ?? [];
    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    const router = useRouter()

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

    const fuelTypeId = getFuelTypeId(type);

    const { data: metroCityFuelByCityData } = useGetMetroCityFuelByCityQuery({ fuelType: fuelTypeId, cityId: Number(cityId) }, { skip: !cityId || !fuelTypeId });
    const metroCityFuelByCity =
        metroCityFuelByCityData?.data
            ? [metroCityFuelByCityData.data]
            : [];

    const showAll = type === "Fuel";

    function handleFuelType(tab: Tab) {
        if (tab.fuel === "Petrol") {
            router.push('/petrol-price-in-india')
        }

        if (tab.fuel === "Diesel") {
            router.push('/diesel-price-in-india')
        }

        if (tab.fuel === "CNG") {
            router.push('/cng-price-in-india')
        }
    }

    return (
        <>
            <TopSection type={type ?? "Fuel"} />

            <SearchSection type={type} city={city} state={state} setCityId={setCityId} />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl">Fuel Prices In Metro Cities</h1>

                                    {/* ✅ Dynamic Date */}
                                    <div className="flex items-center gap-1 mt-2 text-black">
                                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">{dayName}</span>
                                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">{day}</span>
                                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">{monthName}</span>
                                        <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold">{year}</span>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E] overflow-hidden">
                                    {tab.map((tab, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { handleFuelType(tab) }}
                                            className={`font-semibold px-6 py-2 transition-colors duration-200
                                                ${type === tab.fuel
                                                    ? "bg-yellow-400 text-white dark:bg-yellow-500"
                                                    : "bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
                                                }`}
                                        >
                                            {tab.fuel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {
                                (showAll || type === "Petrol" && city === null) && (
                                    <FuelPrices fuelData={metroCityPetrol} type={"Petrol"} />
                                )
                            }

                            {
                                (showAll || type === "Diesel" && city === null) && (
                                    <FuelPrices fuelData={metroCityDiesel} type={"Diesel"} />
                                )
                            }

                            {
                                (showAll || type === "CNG" && city === null) && (
                                    <FuelPrices fuelData={metroCityCNG} type={"CNG"} />
                                )
                            }

                            {
                                (city !== null) && (
                                    <FuelPrices fuelData={metroCityFuelByCity} type={type} />
                                )
                            }

                            {
                                city !== null && (
                                    <>
                                        {["Petrol", "Diesel", "CNG"].includes(type) && (
                                            <Listof10DaysPrice type={type} data={fuelPriceState} city={city} />
                                        )}

                                        {["Petrol", "Diesel", "CNG"].includes(type) && (
                                            <CityWiseFuelList type={type} data={fuelPriceState} />
                                        )}
                                    </>
                                )
                            }


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