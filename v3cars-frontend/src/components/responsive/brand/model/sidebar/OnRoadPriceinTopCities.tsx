'use client'

import { useGetAllBrandsQuery } from "@/redux/api/carModuleApi";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

interface CarBrand {
    brandId: number
    brandName: string
    brandSlug: string
    logoPath: string
    popularity: string
    unquieViews: number | null
    brandStatus: number
    serviceNetwork: boolean
    brandType: number
}

interface OnRoadPriceinTopCitiesProps{
    title: string
}

function OnRoadPriceinTopCities({ title }: OnRoadPriceinTopCitiesProps) {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const { data: brandData } = useGetAllBrandsQuery();
    const brands: CarBrand[] = brandData?.rows ?? [];

    return (
        <div className="rounded-xl border border-gray-300 dark:border-[#2E2E2E] overflow-hidden h-fit w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] px-4 py-3 font-bold text-lg">
                {title} On Road Price in Top Cities
            </div>

            {/* List */}
            <ul className="divide-y divide-gray-200 dark:divide-[#2E2E2E] bg-white dark:bg-[#171717] overflow-y-auto scrollbar-thin-yellow">
                {brands.slice(0, 20).map((item, index) => (
                    <li key={index}>
                        <Link href={item.brandSlug} className="px-4 py-3 cursor-pointer flex items-center gap-2 text-sm hover:underline">
                            <Image
                                src="/logo/v3.svg"
                                alt="v3car"
                                width={16}
                                height={16}
                            />
                            Check {title} On-Road Price In {selectedCity?.cityName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OnRoadPriceinTopCities;