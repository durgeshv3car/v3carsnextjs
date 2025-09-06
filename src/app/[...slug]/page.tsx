import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import PopularBrands from "@/components/common/PopularBrands";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";
import FuelPrices from "@/components/responsive/pages/FuelPrices";
import SearchSection from "@/components/responsive/pages/SearchSection";
import StateWiseFuelChart from "@/components/responsive/pages/StateWiseFuelChart";
import StateWiseFuelList from "@/components/responsive/pages/StateWiseFuelList";
import TopSection from "@/components/responsive/pages/TopSection";
import { redirect } from "next/navigation";

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

interface SlugPageProps {
    params: Promise<{ slug?: string[] }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Slug({ params }: SlugPageProps) {
    const { slug } = await params;

    const allowedSlugs: Record<string, string> = {
        "fuel-price-in-india": "Fuel",
        "petrol-price-in-india": "Petrol",
        "diesel-price-in-india": "Diesel",
        "cng-price-in-india": "CNG",
    };

    const currentSlug = slug?.[0] || "";
    const type = allowedSlugs[currentSlug] || null;

    if (!type) {
        redirect("/fuel-price-in-india");
    }

    return (
        <>
            <TopSection type={type} />
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
