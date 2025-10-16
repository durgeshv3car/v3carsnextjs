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
import { useGetExpertCarReviewsQuery, useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";
import { useState } from "react";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import { useGetBrandsQuery, useGetModelsQuery } from "@/redux/api/carModuleApi";
import { useGetVariantsExplainedQuery } from "@/redux/api/contentModuleApi";

export type CarPriceTab =
  | 'UNDER_5L'
  | 'BETWEEN_5_10L'
  | 'BETWEEN_10_20L'
  | 'BETWEEN_20_40L'
  | 'ABOVE_40L';


interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

interface ImageType {
  name: string;
  alt: string;
  url: string;
}

interface CarProps {
  modelId: number;
  modelName: string;
  modelSlug: string;
  brandId: number;
  modelBodyTypeId: number;
  isUpcoming: boolean;
  launchDate: string;
  totalViews: number;
  expectedBasePrice: number;
  expectedTopPrice: number;
  brand: Brand;
  priceMin: number;
  priceMax: number;
  powerPS: number;
  torqueNM: number;
  mileageKMPL: number;
  image: ImageType;
  imageUrl: string;
}

export default function Home() {
  const [upcomingCount, setUpcomingCount] = useState<number | null>(null);
  const [selectBrand, setSelectBrand] = useState<number | null>(null)
  const { data: latestCarNewsData } = useGetLatestCarNewsQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
  const { data: expertCarReviewsData } = useGetExpertCarReviewsQuery();
  const { data: variantsExplainedData } = useGetVariantsExplainedQuery();

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
          <LatestVideos />
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
