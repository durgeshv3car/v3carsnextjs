'use client';

import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import CityPriceTrend from "@/components/responsive/pages/CityPriceTrend";
import CityWiseFuelList from "@/components/responsive/pages/CityWiseFuelList";
import FuelPrices from "@/components/responsive/pages/FuelPrices";
import Listof10DaysPrice from "@/components/responsive/pages/Listof10DaysPrice";
import SearchSection from "@/components/responsive/pages/SearchSection";
import StateWiseFuelList from "@/components/responsive/pages/StateWiseFuelList";
import TopSection from "@/components/responsive/pages/TopSection";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useGetCityWiseFuelPriceQuery, useGetFuelPriceStateQuery, useGetList10DaysStatePriceQuery, useGetStateByMetroCityQuery } from "@/redux/api/fuelModuleApi";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

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
    type: string;
    fuelType: string;
}

const capitalize = (str: string) =>
    str === "cng" ?
        str.toUpperCase()
        :
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function StatePage({ type, fuelType }: PageProps) {
    const [cityId, setCityId] = useState<number | null>(null)
    const [selectState, setSelectState] = useState<number | null>(null)
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData } = useGetFuelPriceStateQuery();

    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    const router = useRouter()

    if (!type || !fuelType) {
        notFound();
    }

    const fuelTypeId = getFuelTypeId(fuelType);

    const { data: cityWiseFuelPriceData } = useGetCityWiseFuelPriceQuery({ fuelType: fuelTypeId, stateId: Number(selectState)! }, { skip: !selectState || !fuelTypeId });
    const { data: stateByMetroCityData } = useGetStateByMetroCityQuery({ fuelType: fuelTypeId, stateId: Number(selectState)! }, { skip: !selectState || !fuelTypeId });
    const { data: list10DaysStatePriceData } = useGetList10DaysStatePriceQuery({ fuelType: fuelTypeId, stateId: Number(selectState)! }, { skip: !selectState || !fuelTypeId });

    const list10DaysStatePrice = list10DaysStatePriceData?.rows ?? [];
    const stateByMetroCity = stateByMetroCityData?.rows ?? [];
    const cityWiseFuelPrice = cityWiseFuelPriceData?.rows ?? [];

    function handleFuelType(tab: Tab) {
        if (tab.fuel === "Petrol") {
            router.push(`/${type}/${tab?.fuel?.toLowerCase()}-price`);
        }

        if (tab.fuel === "Diesel") {
            router.push(`/${type}/${tab?.fuel?.toLowerCase()}-price`);
        }

        if (tab.fuel === "CNG") {
            router.push(`/${type}/${tab?.fuel?.toLowerCase()}-price`);
        }
    }    

    console.log(cityId);

    return (
        <>
            <TopSection type={capitalize(fuelType) ?? "Fuel"} />

            <SearchSection type={capitalize(fuelType)} city={null} state={type} setCityId={setCityId} cityId={null} selectState={selectState} setSelectState={setSelectState} />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl capitalize">
                                        {capitalize(fuelType)}{" "} Prices In Top City Of {type}
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

                            <FuelPrices fuelData={stateByMetroCity} type={capitalize(fuelType)} />

                            {["Petrol", "Diesel", "CNG"].includes(capitalize(fuelType)) && (
                                <CityWiseFuelList type={capitalize(fuelType)} data={cityWiseFuelPrice} slug={type} />
                            )}

                            {["Petrol", "Diesel", "CNG"].includes(capitalize(fuelType)) && (
                                <Listof10DaysPrice type={capitalize(fuelType)} data={list10DaysStatePrice} city={type} />
                            )}

                            <CityPriceTrend type={capitalize(fuelType)} data={list10DaysStatePrice} city={type} />

                            <StateWiseFuelList type={capitalize(fuelType)} data={fuelPriceState} />

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