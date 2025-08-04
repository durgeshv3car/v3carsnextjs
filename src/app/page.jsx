'use client'
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import CategorySection from "@/components/responsive/home/CategorySection";
import HeroSection from "@/components/web/home/HeroSection";
import useIsMobile from "@/hooks/useIsMobile";
import TopCarBrands from "@/components/responsive/home/TopCarBrands";
import UpcomingCars from "@/components/responsive/home/UpcomingCar";
import LatestCarNews from "@/components/web/home/LatestCarNews";
import MobileLatestCarNews from "@/components/mobile/home/LatestCarNews";
import QuickLook from "@/components/responsive/home/QuickLook";
import CarByType from "@/components/responsive/home/CarByType";
import CarByPrice from "@/components/responsive/home/CarByPrice";
import VariantsExplained from "@/components/web/home/VariantsExplained";
import MobileVariantsExplained from "@/components/mobile/home/VariantsExplained";
import ExpertCarReviews from "@/components/web/home/ExpertCarReviews";
import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
import LatestVideos from "@/components/responsive/home/LatestVideos";
import CarWebStories from "@/components/responsive/home/CarWebStories";

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

