'use client'
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/web/home/HeroSection";
import useIsMobile from "@/hooks/useIsMobile";
import TopCarBrands from "@/components/TopCarBrands";
import UpcomingCars from "@/components/UpcomingCar";
import LatestCarNews from "@/components/web/home/LatestCarNews";
import MobileLatestCarNews from "@/components/mobile/home/LatestCarNews";
import QuickLook from "@/components/QuickLook";
import CarByType from "@/components/CarByType";
import CarByPrice from "@/components/CarByPrice";
import VariantsExplained from "@/components/web/home/VariantsExplained";
import MobileVariantsExplained from "@/components/mobile/home/VariantsExplained";
import ExpertCarReviews from "@/components/web/home/ExpertCarReviews";
import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
import LatestVideos from "@/components/LatestVideos";
import CarWebStories from "@/components/CarWebStories";

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? <MobileHeroSection /> : <HeroSection />}
      <CategorySection />
      <UpcomingCars />
      {isMobile ? <MobileLatestCarNews /> : <LatestCarNews />}
      <QuickLook />
      <CarByType /> 
      <CarByPrice />
      <CarWebStories />
      <LatestVideos />
      {isMobile ? <MobileVariantsExplained /> : <VariantsExplained />}
      {isMobile ? <MobileExpertCarReviews /> : <ExpertCarReviews />}
      <TopCarBrands />
    </>
  );  
}
                                                                                                        