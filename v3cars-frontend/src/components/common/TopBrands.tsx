'use client'

import { useGetAllBrandsQuery } from "@/redux/api/carModuleApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";

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


function TopBrands() {
    const { data: brandData } = useGetAllBrandsQuery();
    const brands: CarBrand[] = brandData?.rows ?? [];

    return (
        <div className="rounded-xl bg-white dark:bg-[#171717] border border-gray-300 dark:border-[#262626] overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
            <div className="font-bold text-lg">Top Brands</div>

            <div className="grid grid-cols-2 gap-2 flex-grow">
                {brands.slice(0, 10).map((brand, i) => (
                    <div
                        key={i}
                        className="h-[96px] bg-white flex items-center justify-center shadow border border-[#D9D9D9] rounded-2xl"
                    >
                        <Image
                            src={`${IMAGE_URL}/media/brand-imgs/${brand.logoPath}`}
                            alt={brand.brandName}
                            width={120}   // max width for logo
                            height={60}   // max height
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopBrands;