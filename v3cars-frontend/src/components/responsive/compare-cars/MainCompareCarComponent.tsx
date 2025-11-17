'use client';

import TopSection from "@/components/common/TopSection";
import {
    useGetBrandsQuery,
    useGetModelsQuery,
    useGetVariantsQuery,
} from "@/redux/api/carModuleApi";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import LatestVideos from "@/components/responsive/home/LatestVideos";
import {
    useGetLatestComparisonReviewsQuery,
    useGetPopularComparisonsQuery,
} from "@/redux/api/contentModuleApi";
import { useGetLatestCompareVideosQuery } from "@/redux/api/videosModuleApi";
import CompareNow from "./CompareNow";
import Information from "./Information";
import MostPopularCarComparison from "./MostPopularCarComparison";

function MainCompareCarComponent() {
    const [selectedBrands, setSelectedBrands] = useState<(number | null)[]>(Array(4).fill(null));
    const [selectedModels, setSelectedModels] = useState<(number | null)[]>(Array(4).fill(null));
    const [selectedVariants, setSelectedVariants] = useState<(number | null)[]>(Array(4).fill(null));

    const { data: brandsData } = useGetBrandsQuery();
    const { data: latestComparisonReviewsData } = useGetLatestComparisonReviewsQuery();
    const { data: latestCompareVideosData } = useGetLatestCompareVideosQuery();
    const { data: popularComparisonsData } = useGetPopularComparisonsQuery();

    const brands = brandsData?.rows ?? [];
    const latestComparisonReviews = latestComparisonReviewsData?.rows ?? [];
    const latestCompareVideos = latestCompareVideosData?.rows ?? [];
    const popularComparisons = popularComparisonsData?.rows ?? [];

    // ✅ Fixed number of hooks (no map)
    const modelQuery1 = useGetModelsQuery({ brandId: selectedBrands[0]! }, { skip: !selectedBrands[0] });
    const modelQuery2 = useGetModelsQuery({ brandId: selectedBrands[1]! }, { skip: !selectedBrands[1] });
    const modelQuery3 = useGetModelsQuery({ brandId: selectedBrands[2]! }, { skip: !selectedBrands[2] });
    const modelQuery4 = useGetModelsQuery({ brandId: selectedBrands[3]! }, { skip: !selectedBrands[3] });

    const variantQuery1 = useGetVariantsQuery({ modelId: selectedModels[0]! }, { skip: !selectedModels[0] });
    const variantQuery2 = useGetVariantsQuery({ modelId: selectedModels[1]! }, { skip: !selectedModels[1] });
    const variantQuery3 = useGetVariantsQuery({ modelId: selectedModels[2]! }, { skip: !selectedModels[2] });
    const variantQuery4 = useGetVariantsQuery({ modelId: selectedModels[3]! }, { skip: !selectedModels[3] });

    const modelsData = [
        modelQuery1.data?.rows ?? [],
        modelQuery2.data?.rows ?? [],
        modelQuery3.data?.rows ?? [],
        modelQuery4.data?.rows ?? [],
    ];

    const variantsData = [
        variantQuery1.data?.rows ?? [],
        variantQuery2.data?.rows ?? [],
        variantQuery3.data?.rows ?? [],
        variantQuery4.data?.rows ?? [],
    ];

    const isMobile = useIsMobile();

    return (
        <>
            <TopSection
                title="Compare to choose the right car!"
                description="Want to buy a Car but confused how to select the best car as per your requirements? V3Cars compare car tool can help you to finalize your car..."
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

                    {isMobile ? (
                        <MobileLatestCarNews
                            title="Comparison Car Review"
                            view="Comparison Review"
                            data={latestComparisonReviews}
                            link="/comparison"
                        />
                    ) : (
                        <CommonNewsUpdate
                            title="Comparison Car Review"
                            view="Comparison Review"
                            newsList={latestComparisonReviews}
                            link="/comparison"
                        />
                    )}

                    <MostPopularCarComparison data={popularComparisons} />

                    <LatestVideos
                        title="Car Comparison Latest Videos"
                        data={latestCompareVideos}
                        link="/car-comparison-videos"
                    />
                </div>
            </div>
        </>
    );
}

export default MainCompareCarComponent;
