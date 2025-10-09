'use client'

import { useGetAllBrandsQuery } from "@/redux/api/carModuleApi";
import { IMAGE_URL } from "@/utils/constant";
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

function PopularBrands() {
    const { data: brandData } = useGetAllBrandsQuery();
    const brands: CarBrand[] = brandData?.rows ?? [];

    return (
        <div className="rounded-xl bg-white dark:bg-[#171717] border border-gray-300 dark:border-[#262626] overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
            <div className="font-bold text-lg">Popular Brands</div>

            <div className="grid grid-cols-2 gap-2 flex-grow">
                {brands.slice(0, 10).map((brand, i) => (
                    <div
                        key={i}
                        className="h-[96px] bg-white flex items-center justify-center shadow border border-[#D9D9D9] rounded-2xl"
                    >
                        <Image
                            src={`${IMAGE_URL}/media/brand-imgs/${brand.logoPath}`}
                            alt={brand.brandName}
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                ))}

                <Link href={"/brands"} className='col-span-2 text-lg text-blue-500 hover:underline font-semibold p-3 flex items-center gap-2 w-full justify-center'>
                    View All Brands
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default PopularBrands;