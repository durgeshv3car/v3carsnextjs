"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import TopBanner from "./landing/TopBanner";
import HowItWorks from "./landing/HowItWorks";
import BrandSection from "./landing/BrandSection";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import BrandStep from "./steps/BrandStep";
import PeriodStep from "./steps/PeriodStep";
import ModelStep from "./steps/ModelStep";
import VariantStep from "./steps/VariantStep";
import OwnershipStep from "./steps/OwnershipStep";
import OdometerStep from "./steps/OdometerStep";
import LocationStep from "./steps/LocationStep";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";

export default function SellUsedCarPage() {
  const step = useSelector((s: RootState) => s.sellUsed.step);
  const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 1 });

  const faqByModule = faqByModuleData?.rows ?? [];

  if (step !== "landing") {
    // STEP VIEWS (same URL)
    switch (step) {

      case "brand":
        return <BrandStep />;  // Step-1 (already styled with StepHeader)
      case "period":
        return <PeriodStep />;

      case "model":
        return <ModelStep />; // 👈

      case "variant":
        return <VariantStep />;

      case "ownership":

        return <OwnershipStep />

      case "odometer":
        return <OdometerStep />;

      case "location": return <LocationStep />;
      // ...add others as we build them
      default:
        return <BrandStep />;
    }
  }

  // LANDING VIEW
  return (
    <>
      <div className="bg-[#18181b] text-white">
        <div className="px-4 xl:px-10">
          <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-yellow-500">›</span>
            <span className="font-medium text-yellow-500">Sell Used Car</span>
          </div>
        </div>
      </div>

      <TopBanner />
      <BrandSection />

      <div className="px-4 lg:px-10 py-6">
        <div className="w-full lg:app-container mx-auto space-y-10">
          <HowItWorks />
          <CommonFaqAccordion faqData={faqByModule} />
        </div>
      </div>
    </>
  );
}
