'use client'
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import HeroSection from "@/components/web/home/HeroSection";
import useIsMobile from "@/hooks/useIsMobile";
import UpcomingCarInIndia from "@/components/common/UpcomingCarInIndia";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
import BottomAd from "@/components/common/BottomAd";
import { useGetExpertCarReviewsQuery, useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useState } from "react";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import { useGetBrandsQuery, useGetModelsQuery } from "@/redux/api/carModuleApi";
import { useGetVariantsExplainedQuery } from "@/redux/api/contentModuleApi";
import { useGetLatestVideosQuery } from "@/redux/api/videosModuleApi";
import CategorySection from "./CategorySection";
import QuickLook from "./QuickLook";
import CarByType from "./CarByType";
import CarByPrice from "./CarByPrice";
import CarWebStories from "./CarWebStories";
import LatestVideos from "./LatestVideos";
import TopCarBrands from "./TopCarBrands";

export type CarPriceTab =
  | 'UNDER_5L'
  | 'BETWEEN_5_10L'
  | 'BETWEEN_10_20L'
  | 'BETWEEN_20_40L'
  | 'ABOVE_40L';


export default function MainComponent() {
  const [upcomingCount, setUpcomingCount] = useState<number | null>(null);
  const [selectBrand, setSelectBrand] = useState<number | null>(null)
  const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
  const { data: expertCarReviewsData } = useGetExpertCarReviewsQuery();
  const { data: variantsExplainedData } = useGetVariantsExplainedQuery();
  const { data: latestVideosData } = useGetLatestVideosQuery()

  const latestVideos = latestVideosData?.rows ?? []
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
              title={`${upcomingCount}+ Upcoming Cars In India`}
              setUpcomingCount={setUpcomingCount}
            />
          </div>
        </div>
      </div>
      {isMobile ? <MobileLatestCarNews
        title="Latest Car News"
        view="Latest News"
        data={latestCarNews}
        link="/news"
      />
        :
        <div className="w-full lg:app-container mx-auto py-6">
          <CommonNewsUpdate
            title="Latest Car News"
            view="Latest News"
            newsList={latestCarNews}
            link={"/news"}
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

      <div className="bg-[#E2E2E2] dark:bg-[#262629] py-10 px-6 lg:px-10">
        <div className="w-full lg:app-container mx-auto">
          <LatestVideos
            title="Latest Videos"
            data={latestVideos}
            link="/car-review-videos"
          />
        </div>
      </div>

      {isMobile ?
        <MobileLatestCarNews
          title="Variants Explained"
          view="Variants Explained"
          data={variantsExplained}
          link="/variant-explained"
        />
        :
        // <VariantsExplained />
        <div className="w-full lg:app-container mx-auto mt-6">
          <CommonNewsUpdate
            title="Variants Explained"
            view="Variants Explained"
            newsList={variantsExplained}
            link={"/variant-explained"}
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
            link={"/car-expert-reviews"}
          />
        </div>
      }
      <BottomAd />
      <TopCarBrands />
    </>
  );
}
