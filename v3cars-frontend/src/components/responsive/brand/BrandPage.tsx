'use client'

import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import UpcomingCarInIndia from "@/components/common/UpcomingCarInIndia";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import BrandOverview from "@/components/responsive/brand/BrandAboutBlock";
import BrandInfoTable from "@/components/responsive/brand/BrandInfoTable";
import BrandPriceTable from "@/components/responsive/brand/BrandPriceTable";
import BrandSelector from '@/components/responsive/brand/BrandSelector';
import DiscontinuedCarList from "@/components/responsive/brand/DiscontinuedCarList";
import SimilarBrands from "@/components/responsive/brand/SimilarBrands";
import LatestVideos from "@/components/responsive/home/LatestVideos";
import useIsMobile from "@/hooks/useIsMobile";
import { useGetBrandsByIdQuery, useGetBrandsQuery, useGetDiscontinuedModelQuery, useGetModelsQuery } from "@/redux/api/carModuleApi";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";
import { useState } from "react";

interface CarBrandDetail {
    brandId: number;
    brandName: string;
    logoPath: string;
    unquieViews: number | null;
    popularity: string;
    brandSlug: string;
    brandDescription: string;
    bannerImage: string;
    bannerImageAltTag: string;
    isFasttag: number;
    brandType: number;
    displayName: string;
    roadsideAssistance: number;
    emailAddress: string;
    stateId: number;
    cityId: number;
    parentOrganization: string;
    products: string;
    founderName: string;
    customerService: string;
    serviceNetwork: boolean;
    websiteUrl: string;
    brandKeyPeople: string; // JSON string (needs parsing to use as array)
    introContent: string; // HTML content as string
    brandOrganizationName: string;
    websiteName: string;
    brandTitle: string;
    iconPath: string;
    brandStatus: number;
    similarBrand: string; // comma-separated brand IDs
}

interface PageProps {
    type: string;
}

export default function BrandPage({ type }: PageProps) {
    const [selectBrand, setSelectBrand] = useState<number | null>(null)
    const [upcomingCount, setUpcomingCount] = useState<number | null>(null);
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
    const { data: brandsData } = useGetBrandsQuery();
    const { data: brandsByIdData } = useGetBrandsByIdQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
    const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
    const { data: discontinuedModelData } = useGetDiscontinuedModelQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
    const { data: latestVideosData } = useGetLatestVideosQuery()

    const latestVideos = latestVideosData?.rows ?? []
    const latestCarNews = latestCarNewsData?.rows ?? [];
    const brands = brandsData?.rows ?? [];
    const brandsById: CarBrandDetail | null = brandsByIdData?.data ?? null;
    const models = modelsData?.rows ?? [];
    const discontinuedModel = discontinuedModelData?.rows ?? [];
    const isMobile = useIsMobile()

    console.log(upcomingCount);
    console.log(type);
    

    return (
        <div className="lg:p-8 p-4">
            <div className="flex gap-5 flex-col lg:flex-row  overflow-hidden w-full lg:app-container mx-auto">
                <div className="flex flex-col lg:flex-row gap-5 w-full">
                    {/* Sidebar */}
                    <div className="w-auto lg:w-[25%] bg-black border dark:border-[#2E2E2E] p-5 rounded-xl">

                        <BrandSelector data={brands} setSelectBrand={setSelectBrand} selectBrand={selectBrand} />

                        <BrandInfoTable
                            brandName={brandsById ? brandsById?.brandName : "Cars"}
                            data={brandsById}
                        />

                        <SimilarBrands brands={brands} />

                        <DiscontinuedCarList title={`Discontinued ${brandsById ? brandsById?.brandName : "Cars"} Cars`} cars={discontinuedModel} />

                    </div>

                    <div className="w-auto lg:max-w-[75%] space-y-10">

                        <BrandOverview description={brandsById?.introContent ?? "Descripation"} />

                        <BrandPriceTable title={`${brandsById ? brandsById?.brandName : "Cars"} Cars price list`} cars={models} />

                        <div>
                            <p className="text-3xl font-bold mb-5">{brandsById ? brandsById?.brandName : "Cars"} Cars In India</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                <CurrentOffersCard data={models} />
                            </div>
                        </div>

                        <LatestVideos
                            title="Latest Videos"
                            data={latestVideos}
                            link="/car-review-videos"
                        />

                        {isMobile ? <MobileLatestCarNews
                            title="Latest Car News"
                            view="Latest News"
                            data={latestCarNews}
                            link="/news"
                        />
                            :
                            <div className="w-full">
                                <CommonNewsUpdate
                                    title="Latest Car News"
                                    view="Latest News"
                                    newsList={latestCarNews}
                                    link={"/news"}
                                />
                            </div>
                        }

                        <UpcomingCarInIndia
                            title={`Upcoming Cars In India`}
                            setUpcomingCount={setUpcomingCount}
                        />

                    </div>

                </div>
            </div>
        </div>

    );
}
