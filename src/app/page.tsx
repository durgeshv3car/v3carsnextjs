'use client'

import MobileHeroSection from "@/components/mobile/home/HeroSection";
import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/web/home/HeroSection";
import useIsMobile from "@/hooks/useIsMobile";
import TopCarBrands from "@/components/TopCarBrands";
import UpcomingCars from "@/components/UpcomingCar";
import LatestCarNews from "@/components/web/home/LatestCarNews";
import MobileLatestCarNews from "@/components/mobile/home/LatestCarNews";

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? <MobileHeroSection /> : <HeroSection />}
      <CategorySection />
      <UpcomingCars />
      {isMobile ? <MobileLatestCarNews /> : <LatestCarNews />}
      <TopCarBrands />
    </>
  );
}
