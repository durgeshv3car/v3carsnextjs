'use client';

import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useGetFuelPriceStateQuery, useGetList10DaysMetrosQuery, useGetMetroCityFuelQuery } from "@/redux/api/fuelModuleApi";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import TopSection from "./TopSection";
import FuelPrices from "./FuelPrices";
import StateWiseFuelList from "./StateWiseFuelList";
import PriceInIndiaChart from "./PriceInIndiaChart";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import PopularBrands from "@/components/common/PopularBrands";
import SearchSection from "./SearchSection";

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

interface PageProps {
    fuelType: string;
}

const capitalize = (str: string) =>
    str === "cng" ?
        str.toUpperCase()
        :
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function FuelTypePriceInIndiaPage({ fuelType }: PageProps) {
    const [cityId, setCityId] = useState<number | null>(null)
    const [selectState, setSelectState] = useState<number | null>(null)
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData } = useGetFuelPriceStateQuery();
    const { data: metroCityPetrolData } = useGetMetroCityFuelQuery({ fuelType: 1 });
    const { data: metroCityDieselData } = useGetMetroCityFuelQuery({ fuelType: 2 });
    const { data: metroCityCNGData } = useGetMetroCityFuelQuery({ fuelType: 3 });
    const { data: list10DaysMetrosData } = useGetList10DaysMetrosQuery();

    const list10DaysMetros = list10DaysMetrosData?.rows ?? [];
    const metroCityPetrol = metroCityPetrolData?.rows ?? [];
    const metroCityDiesel = metroCityDieselData?.rows ?? [];
    const metroCityCNG = metroCityCNGData?.rows ?? [];
    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    const router = useRouter()

    if (!fuelType) {
        notFound();
    }

    const showAll = fuelType === "fuel";

    function handleFuelType(tab: Tab) {
        if (tab.fuel === "Petrol") {
            router.push(`/petrol-price-in-india`);
        }
        if (tab.fuel === "Diesel") {
            router.push(`/diesel-price-in-india`);
        }
        if (tab.fuel === "CNG") {
            router.push(`/cng-price-in-india`);
        }
    }

    console.log(cityId);
    console.log(selectState);

    return (
        <>
            <TopSection type={capitalize(fuelType) ?? "Fuel"} />

            <SearchSection type={capitalize(fuelType)} city={null} state={null} setCityId={setCityId} cityId={null} selectState={null} setSelectState={setSelectState} />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl capitalize">
                                        {fuelType}{" "} Prices In Metro Cities
                                    </h1>

                                    {/* ✅ Dynamic Date */}
                                    <div className="flex items-center gap-1 mt-2 text-black">
                                        <span className="bg-primary text-xs px-2 py-0.5 rounded font-bold">{dayName}</span>
                                        <span className="bg-primary text-xs px-2 py-0.5 rounded font-bold">{day}</span>
                                        <span className="bg-primary text-xs px-2 py-0.5 rounded font-bold">{monthName}</span>
                                        <span className="bg-primary text-xs px-2 py-0.5 rounded font-bold">{year}</span>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E] overflow-hidden">
                                    {tab.map((tab, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { handleFuelType(tab) }}
                                            className={`font-semibold px-6 py-2 transition-colors duration-200
                                                ${capitalize(fuelType) === tab.fuel
                                                    ? "bg-primary text-white dark:bg-primary"
                                                    : "bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
                                                }`}
                                        >
                                            {tab.fuel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {
                                (showAll || fuelType === "petrol") && (
                                    <FuelPrices fuelData={metroCityPetrol} type={"Petrol"} />
                                )
                            }

                            {
                                (showAll || fuelType === "diesel") && (
                                    <FuelPrices fuelData={metroCityDiesel} type={"Diesel"} />
                                )
                            }

                            {
                                (showAll || fuelType === "cng") && (
                                    <FuelPrices fuelData={metroCityCNG} type={"CNG"} />
                                )
                            }

                            <StateWiseFuelList type={capitalize(fuelType)} data={fuelPriceState} />

                            <PriceInIndiaChart data={list10DaysMetros} type={capitalize(fuelType)} />

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