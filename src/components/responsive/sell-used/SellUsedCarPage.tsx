"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setStep, prevStep } from "@/redux/slices/sellUsedSlice";

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

const faqData = [{ question: 'What is the Smartest Way to Finance a Car?', answer: 'The smartest way is to compare interest rates, check your credit score, and choose the most affordable loan option that fits your budget.' }, { question: 'What is the Difference Between EMI in Arrears and EMI in Advance?', answer: 'EMI in arrears is paid at the end of the period, while EMI in advance is paid at the start of the period.' }, { question: 'Is the Car Loan EMI Fixed or Can it Change in the Future?', answer: 'Most car loan EMIs are fixed, but floating rate loans may vary based on interest rate changes.' }, { question: 'What are the Different Ways by Which the Car Loan EMI Can be Paid?', answer: 'You can pay via auto-debit, post-dated cheques, UPI, or direct bank transfer.' }, { question: 'Who Can Avail of a Car Loan?', answer: 'Any salaried, self-employed individual, or business entity with a valid income source and documentation can apply.' }, { question: 'What is a Car Loan Repayment Table?', answer: 'It shows the breakup of your loan repayment schedule including principal and interest components over time.' }, { question: 'What are the Benefits of Using an Online Car Loan EMI Calculator?', answer: 'You can estimate your monthly EMI, total interest, and overall repayment schedule quickly and easily.' }, { question: 'What are the Documents Required to Apply for a Car Loan?', answer: 'You need identity proof, address proof, income proof, and bank statements.' }, { question: 'What are the Best Interest Rates for a Car Loan?', answer: 'Interest rates vary by bank, your credit profile, and loan amount. Always compare lenders before applying.' },];

export default function SellUsedCarPage() {
  const dispatch = useDispatch();
  const step = useSelector((s: RootState) => s.sellUsed.step);

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
          <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-yellow-500">›</span>
            <span className="font-medium text-yellow-500">Sell Used Car</span>
          </div>
        </div>
      </div>

      <TopBanner />
      <BrandSection />

      <div className="px-4 lg:px-10 py-6">
        <div className="w-full lg:max-w-[1600px] mx-auto space-y-10">
          <HowItWorks />
          <CommonFaqAccordion faqData={faqData} />
        </div>
      </div>
    </>
  );
}
