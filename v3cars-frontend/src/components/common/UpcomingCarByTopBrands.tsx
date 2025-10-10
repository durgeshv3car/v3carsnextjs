'use client'

import { useGetAllBrandsQuery } from "@/redux/api/carModuleApi";
import Image from "next/image";
import Link from "next/link";

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

function UpcomingCarByTopBrands() {
    const { data: brandData } = useGetAllBrandsQuery();
    const brands: CarBrand[] = brandData?.rows ?? [];

    return (
        <div className="rounded-xl border border-gray-300 dark:border-[#2E2E2E] overflow-hidden h-fit w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] px-4 py-3 font-bold text-lg">
                Top 20 Brands In India
            </div>

            {/* List */}
            <ul className="divide-y divide-gray-200 dark:divide-[#2E2E2E] bg-white dark:bg-[#171717] overflow-y-auto scrollbar-thin-yellow">
                {brands.slice(0, 20).map((item, index) => (
                    <li key={index}>
                        <Link href={item.brandSlug} className="px-4 py-3 cursor-pointer flex items-center gap-2">
                            <Image
                                src="/logo/v3.svg"
                                alt="v3car"
                                width={16}
                                height={16}
                            />
                            {item.brandName} Cars In India
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UpcomingCarByTopBrands;