import MobileFooter from "@/components/mobile/common/Footer";
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import Footer from "@/components/web/common/Footer";
import HeroSection from "@/components/web/home/HeroSection";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <main className="bg-[#F8F9FA]">

        <div className="hidden sm:block">
          <HeroSection />
        </div>

        <div className="block sm:hidden">
          <MobileHeroSection />
        </div>

      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>

      <div className="block lg:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}
