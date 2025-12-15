'use client'

import { useGetTopCitiesQuery } from "@/redux/api/locationModuleApi";
import { convertToSlug } from "@/utils/helperFunction";
import Image from "next/image";
import Link from "next/link";

export interface City {
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

interface OnRoadPriceinTopCitiesProps {
    title: string;
    type: string;
    slug: string
}

function OnRoadPriceinTopCities({ title, type, slug }: OnRoadPriceinTopCitiesProps) {
    const { data: topCitiesData } = useGetTopCitiesQuery();
    const topCities: City[] = topCitiesData?.rows ?? [];    

    return (
        <div className="rounded-xl border border-gray-300 dark:border-[#2E2E2E] overflow-hidden h-fit w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] px-4 py-3 font-bold text-lg">
                <span className="font-medium">{title}</span> On Road Price in Top Cities
            </div>

            {/* List */}
            <ul className="divide-y divide-gray-200 dark:divide-[#2E2E2E] bg-white dark:bg-[#171717] h-[400px] overflow-y-auto scrollbar-thin-yellow">
                {topCities && topCities.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${type}/${slug}/on-road-price-in-${convertToSlug(item.cityName)}`} className="p-4 cursor-pointer flex items-start gap-2 text-[14px] hover:underline">
                            <Image
                                src="/logo/v3.svg"
                                alt="v3car"
                                width={16}
                                height={16}
                                className="mt-[3px]"
                            />
                            Check {title} On-Road Price In {item.cityName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OnRoadPriceinTopCities;