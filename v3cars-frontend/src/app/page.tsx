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
import VariantsExplained from "@/components/web/home/VariantsExplained";
import MobileVariantsExplained from "@/components/mobile/home/VariantsExplained";
import ExpertCarReviews from "@/components/web/home/ExpertCarReviews";
import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
import LatestVideos from "@/components/responsive/home/LatestVideos";
import CarWebStories from "@/components/responsive/home/CarWebStories";
import BottomAd from "@/components/common/BottomAd";
import CommonLatestCarNews from "@/components/web/common/CommonLatestCarNews";

export default function Home() {

  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? <MobileHeroSection /> : <HeroSection />}
      <CategorySection />
      <BottomAd />
      <div className="bg-gradient-to-l from-[#495057] to-[#343A40] dark:from-[#27272a] dark:to-[#18181b] ">
        <div className="py-6 px-4 lg:px-10">
          <div className="w-full lg:app-container mx-auto space-y-6">
            <UpcomingCarInIndia
              title={"158+ Upcoming Cars In India"}
            />
          </div>
        </div>
      </div>
      {isMobile ? <MobileLatestCarNews /> :
        <div className="py-6 px-4 lg:px-10">
          <div className="w-full lg:app-container mx-auto space-y-6">
            <CommonLatestCarNews />
          </div>
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
      {isMobile ? <MobileVariantsExplained /> : <VariantsExplained />}
      <div className="block lg:hidden">
        <BottomAd />
      </div>
      {isMobile ? <MobileExpertCarReviews /> : <ExpertCarReviews />}
      <BottomAd />
      <TopCarBrands />
    </>
  );
}
