'use client'

import React from "react";

import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import TopSection from "@/components/common/TopSection";
import FuelPrices from "@/components/responsive/pages/FuelPrices";
import SearchSection from "@/components/responsive/pages/SearchSection";
import StateWiseFuelChart from "@/components/responsive/pages/StateWiseFuelChart";
import StateWiseFuelList from "@/components/responsive/pages/StateWiseFuelList";
import { useParams } from "next/navigation";

// ----------------- Types -----------------
type SlugParams = {
    slug?: string[];
};

type ParsedSlug = {
    fuelType: string;
    state: string | null;
    city: string | null;
};

// ----------------- Helper Functions -----------------
function parseSlug(slug?: string[]): ParsedSlug {
    let fuelType = "Petrol";
    let state: string | null = null;
    let city: string | null = null;

    if (!slug || slug.length === 0 || slug[0] === "fuel-price-in-india") {
        // Default
    } else if (slug.length === 1 && slug[0].endsWith("-price-in-india")) {
        fuelType = slug[0].replace("-price-in-india", "").replace(/-/g, " ");
    } else if (slug.length === 2 && slug[1].endsWith("-price")) {
        state = slug[0];
        fuelType = slug[1].replace("-price", "").replace(/-/g, " ");
    } else if (slug.length === 2 && slug[1].includes("-price-in-")) {
        state = slug[0];
        const [ft, ct] = slug[1].split("-price-in-");
        fuelType = ft.replace(/-/g, " ");
        city = ct.replace(/-/g, " ");
    }

    return {
        fuelType: capitalize(fuelType),
        state: state ? capitalize(state) : null,
        city: city ? capitalize(city) : null,
    };
}

function capitalize(str: string): string {
    return str
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}

// ----------------- FAQ Data -----------------
type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        question: "What is the Smartest Way to Finance a Car?",
        answer:
            "The smartest way is to compare interest rates, check your credit score, and choose the most affordable loan option that fits your budget.",
    },
    {
        question: "What is the Difference Between EMI in Arrears and EMI in Advance?",
        answer:
            "EMI in arrears is paid at the end of the period, while EMI in advance is paid at the start of the period.",
    },
    {
        question: "Is the Car Loan EMI Fixed or Can it Change in the Future?",
        answer:
            "Most car loan EMIs are fixed, but floating rate loans may vary based on interest rate changes.",
    },
    {
        question: "What are the Different Ways by Which the Car Loan EMI Can be Paid?",
        answer:
            "You can pay via auto-debit, post-dated cheques, UPI, or direct bank transfer.",
    },
    {
        question: "Who Can Avail of a Car Loan?",
        answer:
            "Any salaried, self-employed individual, or business entity with a valid income source and documentation can apply.",
    },
    {
        question: "What is a Car Loan Repayment Table?",
        answer:
            "It shows the breakup of your loan repayment schedule including principal and interest components over time.",
    },
    {
        question: "What are the Benefits of Using an Online Car Loan EMI Calculator?",
        answer:
            "You can estimate your monthly EMI, total interest, and overall repayment schedule quickly and easily.",
    },
    {
        question: "What are the Documents Required to Apply for a Car Loan?",
        answer:
            "You need identity proof, address proof, income proof, and bank statements.",
    },
    {
        question: "What are the Best Interest Rates for a Car Loan?",
        answer:
            "Interest rates vary by bank, your credit profile, and loan amount. Always compare lenders before applying.",
    },
];

// ----------------- Main Page -----------------
export default function Slug() {
    const { slug } = useParams<SlugParams>();
    const { fuelType, state, city } = parseSlug(slug);

    return (
        <>
            <TopSection />

            <SearchSection />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <FuelPrices />
                            <StateWiseFuelList />
                            <StateWiseFuelChart />
                            <CommonFaqAccordion faqData={faqData} />
                        </div>
                        <div className="w-auto lg:min-w-[24%] space-y-10">
                            <SideBarAdSmall />
                            <PopularBrands />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
