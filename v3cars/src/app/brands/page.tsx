'use client'

import { useGetBrandsQuery } from "@/redux/api/carModuleApi";
import { IMAGE_URL2 } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function AllBrandsGrid() {
    const { data: brandsData } = useGetBrandsQuery();

    const brands: CarBrand[] = brandsData?.rows ?? [];
    const router = useRouter()

    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">Brands</span>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-0 py-6 space-y-6">

                <div className="app-container mx-auto">
                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-[20px] md:text-[24px] font-semibold">All Brands</h2>
                        <p className="text-base mt-2 ">
                            Regardless of whether you are salaried or self-employed, you can purchase your dream car
                            without the need to be wealthy or save up a significant amount of money, unlike a few
                            decades ago. Simply apply for a new car loan and drive your dream car sooner.
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 app-container mx-auto">
                    {brands.map((src, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#171717] p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center border dark:border-[#2E2E2E] cursor-pointer"
                            onClick={() => { router.push(`/${src.brandSlug}`) }}
                        >
                            <Image
                                src={`${IMAGE_URL2}/ad-min/uploads/${src.logoPath}`}
                                alt={`Brand ${index + 1}`}
                                width={150}
                                height={150}
                                className="object-contain w-full h-[100px]"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </>

    );
}
