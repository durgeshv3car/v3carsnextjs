'use client';

import { useGetPopularCitiesQuery } from "@/redux/api/locationModuleApi";
import Image from "next/image";
import { useState } from "react";

interface City {
    cityId: number;
    cityName: string;
    stateId: number;
    countryId: number;
    status: number;
    isPopularCity: number;
    isTopCity: number;
    ismajorCityPetrol: number;
    ismajorCityDiesel: number;
    ismajorCityCNG: number;
    isImage: string;
}

type FuelType = "Petrol" | "Diesel" | "CNG";

export default function CommonPriceInMajorCitiesCard() {
    const { data: popularCitiesData } = useGetPopularCitiesQuery();
    const popularCities: City[] = popularCitiesData?.rows ?? [];
    const [activeTab, setActiveTab] = useState<FuelType>(
        "Petrol"
    );

    return (
        <div className="w-full border rounded-xl overflow-hidden dark:border-[#2e2e2e]">
            {/* Header */}
            <div className="text-center font-semibold py-4 bg-[#DEE2E6] dark:bg-[#232323]">
                {activeTab} Price In Major Cities
            </div>

            <div className="flex border-b dark:border-[#2e2e2e]">
                {["Petrol", "Diesel", "CNG"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as FuelType)}
                        className={`flex-1 text-center py-3 text-sm font-medium transition
                ${activeTab === tab
                                ? "border-primary border-b-4"
                                : "text-gray-400 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Scrollable List */}
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin-yellow bg-white dark:bg-[#171717]">
                {popularCities && popularCities.map((city, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-3 p-4 border-b last:border-none hover:text-primary dark:border-[#2e2e2e] cursor-pointer"
                    >
                        <Image
                            src="/common/v3icon.svg"
                            alt="icon"
                            width={16}
                            height={16}
                            className=" dark:invert group-hover:hidden"
                        />

                        <Image
                            src="/common/v3.png"
                            alt="v3-icon-yellow"
                            width={16}
                            height={16}
                            className="hidden group-hover:block"
                        />

                        <p className="text-[15px]">
                            {activeTab} Price In {city.cityName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
