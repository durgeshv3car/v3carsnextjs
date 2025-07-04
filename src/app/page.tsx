import MobileFooter from "@/components/mobile/common/Footer";
import Footer from "@/components/web/common/Footer";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <main>
        Section 1
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
