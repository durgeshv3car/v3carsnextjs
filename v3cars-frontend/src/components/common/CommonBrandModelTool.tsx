'use client'

import { useGetAllBrandsQuery, useGetModelsQuery } from "@/redux/api/carModuleApi"
import { RootState } from "@/redux/store"
import { IMAGE_URL, IMAGE_URL2 } from "@/utils/constant"
import { convertToSlug } from "@/utils/helperFunction"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

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

interface CarModel {
    modelId: number
    modelName: string
    modelSlug: string
    brandId: number
    modelBodyTypeId: number
    isUpcoming: boolean
    launchDate: string // ISO date string
    totalViews: number
    expectedBasePrice: number
    expectedTopPrice: number
    brand: {
        id: number
        name: string
        slug: string
        logo: string
    }
    priceMin: number
    priceMax: number
    powerPS: number
    torqueNM: number
    mileageKMPL: number
    image: CarImage
    imageUrl: string
}

interface CarImage {
    name: string
    alt: string
    url: string
}

interface CommonBrandModelToolProps {
    url?: string;
    searchQuery: string;
    modelId: number | null;
    setModelId: React.Dispatch<React.SetStateAction<number | null>>;
}

function CommonBrandModelTool({ searchQuery, modelId, setModelId, url }: CommonBrandModelToolProps) {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const [selectBrand, setSelectBrand] = useState<number | null>(null);
    const { data: brandsData } = useGetAllBrandsQuery();
    const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand });
    const router = useRouter()

    const brands: CarBrand[] = brandsData?.rows ?? [];
    const models: CarModel[] = modelsData?.rows ?? [];

    const filteredBrands = useMemo(() => {
        if (!searchQuery) return brands;
        const q = searchQuery.toLowerCase().trim();
        return brands.filter(b =>
            b.brandName.toLowerCase().includes(q)
        );
    }, [brands, searchQuery]);

    // Optional: if searchQuery changes, clear selected brand (and model)
    useEffect(() => {
        setSelectBrand(null);
        setModelId(null);
    }, [searchQuery, setModelId]);

    return (
        <div>
            <div className="flex overflow-x-auto gap-4 scrollbar-hide py-3">
                {filteredBrands && filteredBrands.map((brand) => (
                    <div
                        key={brand.brandId}
                        onClick={() => setSelectBrand(brand.brandId)}
                        className={`
                            text-center cursor-pointer rounded-md p-3 min-w-[180px] flex-shrink-0 bg-white dark:bg-[#232323] shadow-md
                            ${brand.brandId === selectBrand ? "border-2 border-primary" : "border border-[#DBDBDB] dark:border-[#2e2e2e]"}
                        `}>
                        <Image
                            src={`${IMAGE_URL2}/ad-min/uploads/${brand.logoPath}`}
                            width={300}
                            height={20}
                            className="w-full h-20 object-contain mx-auto"
                            alt={brand.brandName}
                        />
                        <p className="font-semibold mt-2">{brand.brandName}</p>
                    </div>
                ))}
            </div>

            {
                models.length > 0 && (
                    <div className='shadow-lg overflow-hidden rounded-b-xl'>
                        <p className="font-medium p-4 rounded-t-xl text-lg bg-[#E9E9E9] dark:bg-[#232323] shadow-md">Select <span className='font-semibold'>Model</span></p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 p-4 border rounded-b-xl overflow-hidden dark:border-[#2e2e2e]">
                            {models.length > 0 ? models.map((m, i) => (
                                <div
                                    key={i}
                                    className={`
                                            flex flex-col items-center overflow-hidden rounded-lg cursor-pointer 
                                            ${m.modelId === modelId ? "border-2 border-primary" : "border border-[#DBDBDB] dark:border-[#2e2e2e]"} 
                                        `}
                                    onClick={() => {
                                        if (url === "/car-loan-emi-calculator") {
                                            setModelId(m.modelId);
                                        } else {
                                            router.push(
                                                `/${m.brand.slug}/${m.modelSlug}/on-road-price-in-${convertToSlug(selectedCity.cityName)}`
                                            );
                                        }
                                    }}
                                >
                                    <Image
                                        src={`${IMAGE_URL}/media/model-imgs/${m.image.url}`}
                                        alt={m.modelName}
                                        width={300}
                                        height={100}
                                        className="object-cover"
                                    />
                                    <p className="text-sm font-semibold my-2 text-center">{m.modelName}</p>
                                </div>
                            ))
                                : (
                                    Array.from({ length: 10 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="
                                                    h-[110px] w-full rounded-md 
                                                    bg-gray-300 dark:bg-[#2e2e2e] 
                                                    animate-pulse
                                                ">
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CommonBrandModelTool;