'use client'
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import CategorySection from "@/components/responsive/home/CategorySection";
import HeroSection from "@/components/web/home/HeroSection";
import useIsMobile from "@/hooks/useIsMobile";
import TopCarBrands from "@/components/responsive/home/TopCarBrands";
import UpcomingCarInIndia from "@/components/common/UpcomingCarInIndia";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import QuickLook from "@/components/responsive/home/QuickLook";
import CarByType from "@/components/responsive/home/CarByType";
import CarByPrice from "@/components/responsive/home/CarByPrice";
import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
import LatestVideos from "@/components/responsive/home/LatestVideos";
import CarWebStories from "@/components/responsive/home/CarWebStories";
import BottomAd from "@/components/common/BottomAd";
import { useGetExpertCarReviewsQuery, useGetLatestCarNewsQuery, useGetVariantsExplainedQuery, useUpcomingCarsQuery } from "@/redux/api/homeApi";
import { useGetBrandsQuery, useGetModelsQuery } from "@/redux/api/commonApi";
import { useState } from "react";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";

export type CarPriceTab =
  | 'UNDER_5L'
  | 'BETWEEN_5_10L'
  | 'BETWEEN_10_20L'
  | 'BETWEEN_20_40L'
  | 'ABOVE_40L';

export default function Home() {
  const [selectBrand, setSelectBrand] = useState<number | null>(null)
  const { data: upcomingData, error, isLoading } = useUpcomingCarsQuery();
  const { data: latestCarNewsData, error: latestCarNewsError, isLoading: latestCarNewsLoading } = useGetLatestCarNewsQuery();
  const { data: brandsData, error: brandsError, isLoading: brandsLoading } = useGetBrandsQuery();
  const { data: modelsData, error: modelsError, isLoading: modelsLoading } = useGetModelsQuery({ brandId: selectBrand ?? 0 });
  const { data: expertCarReviewsData, error: expertCarReviewsError, isLoading: expertCarReviewsLoading } = useGetExpertCarReviewsQuery();
  const { data: variantsExplainedData, error: variantsExplainedError, isLoading: variantsExplainedLoading } = useGetVariantsExplainedQuery();
  
  const upcomingCars = upcomingData?.rows ?? [];
  const latestCarNews = latestCarNewsData?.rows ?? [];
  const brands = brandsData?.rows ?? [];
  const models = modelsData?.rows ?? [];
  const expertCarReviews = expertCarReviewsData?.rows ?? [];
  const variantsExplained = variantsExplainedData?.rows ?? [];

  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? <MobileHeroSection selectBrand={selectBrand} setSelectBrand={setSelectBrand} data={brands} models={models} /> : <HeroSection selectBrand={selectBrand} setSelectBrand={setSelectBrand} data={brands} models={models} />}
      <CategorySection />
      <BottomAd />
      <div className="bg-gradient-to-l from-[#495057] to-[#343A40] dark:from-[#27272a] dark:to-[#18181b] ">
        <div className="py-6 px-4 lg:px-10">
          <div className="w-full lg:app-container mx-auto space-y-6">
            <UpcomingCarInIndia
              title={"158+ Upcoming Cars In India"}
              data={upcomingCars ?? []}
            />
          </div>
        </div>
      </div>
      {isMobile ? <MobileLatestCarNews
        title="Latest Car News"
        view="Latest News"
        data={latestCarNews}
      />
        :
        <div className="w-full lg:app-container mx-auto py-6">
          <CommonNewsUpdate
            title="Latest Car News"
            view="Latest News"
            newsList={latestCarNews}
          />
        </div>

      }
      <QuickLook />
      <CarByType />
      <div className="block lg:hidden">
        <BottomAd />
      </div>
      <CarByPrice />
      <BottomAd />
      <CarWebStories />
      <LatestVideos />
      {isMobile ?
        <MobileLatestCarNews
          title="Variants Explained"
          view="Variants Explained"
          data={variantsExplained}
        />
        :
        // <VariantsExplained />
        <div className="w-full lg:app-container mx-auto mt-6">
          <CommonNewsUpdate
            title="Variants Explained"
            view="Variants Explained"
            newsList={variantsExplained}
          />
        </div>
      }
      <div className="block lg:hidden">
        <BottomAd />
      </div>
      {isMobile ?
        <MobileExpertCarReviews newsList={expertCarReviews} />
        :
        <div className="w-full lg:app-container mx-auto my-6">
          <CommonNewsUpdate
            title="Expert Car Reviews"
            view="Car Reviews"
            newsList={expertCarReviews}
          />
        </div>
      }
      <BottomAd />
      <TopCarBrands />
    </>
  );
}
