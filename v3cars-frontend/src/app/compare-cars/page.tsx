'use client'

import TopSection from "@/components/common/TopSection";
import CompareNow from "@/components/responsive/compare-cars/CompareNow";
import Information from "@/components/responsive/compare-cars/Information";
import ComparisonNews from "@/components/responsive/compare-cars/ComparisonNews";
import MostPopularCarComparison from "@/components/responsive/compare-cars/MostPopularCarComparison";
import { useGetBrandsQuery, useGetModelsQuery, useGetVariantsQuery } from "@/redux/api/carModuleApi";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import LatestVideos from "@/components/responsive/home/LatestVideos";

function CompareCars() {
    const [selectedBrands, setSelectedBrands] = useState<(number | null)[]>(Array(4).fill(null));
    const [selectedModels, setSelectedModels] = useState<(number | null)[]>(Array(4).fill(null));
    const [selectedVariants, setSelectedVariants] = useState<(number | null)[]>(Array(4).fill(null));

    const { data: brandsData } = useGetBrandsQuery();
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();

    const brands = brandsData?.rows ?? [];
    const latestCarNews = latestCarNewsData?.rows ?? [];

    const modelsData = selectedBrands.map((brandId) => {
        const { data } = useGetModelsQuery(
            { brandId: brandId! },
            { skip: !brandId }
        );
        return data?.rows ?? [];
    });

    const variantsData = selectedModels.map((modelId) => {
        const { data } = useGetVariantsQuery(
            { modelId: modelId! },
            { skip: !modelId }
        );
        return data?.rows ?? [];
    });

    const isMobile = useIsMobile()

    return (
        <>
            <TopSection
                title={"Compare to choose the right car!"}
                description={
                    "Want to buy a Car but confused how to select the best car as per your requirements? V3Cars compare car tool can help you to finalize your car..."
                }
            />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <CompareNow
                        brands={brands}
                        modelsData={modelsData}
                        variantsData={variantsData}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                        selectedModels={selectedModels}
                        setSelectedModels={setSelectedModels}
                        selectedVariants={selectedVariants}
                        setSelectedVariants={setSelectedVariants}
                    />

                    <Information
                        selectedModels={selectedModels}
                        modelsData={modelsData}
                        variantsData={variantsData}
                        selectedVariants={selectedVariants}
                        setSelectedVariants={setSelectedVariants}
                    />

                    {
                        isMobile ?
                            <MobileLatestCarNews
                                title="Comparison Car News"
                                view="Comparison News"
                                data={latestCarNews}
                                link="/news"
                            />
                            :
                            <CommonNewsUpdate
                                title="Comparison Car News"
                                view="Comparison News"
                                newsList={latestCarNews}
                                link={"/news"}
                            />
                    }

                    <MostPopularCarComparison />

                    <LatestVideos
                        title="Car Comparison Latest Videos"
                    />
                </div>
            </div>
        </>
    );
}

export default CompareCars;
