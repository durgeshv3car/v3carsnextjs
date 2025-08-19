'use client'

import Link from "next/link";
import TopBanner from "./TopBanner";
import HowItWorks from "./HowItWorks";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import { useState } from "react";
import { BrandSection } from "./BrandSection";
import SellUsedCarModel from "./SellUsedCarModel";

const faqData = [
    {
        question: 'What is the Smartest Way to Finance a Car?',
        answer: 'The smartest way is to compare interest rates, check your credit score, and choose the most affordable loan option that fits your budget.'
    },
    {
        question: 'What is the Difference Between EMI in Arrears and EMI in Advance?',
        answer: 'EMI in arrears is paid at the end of the period, while EMI in advance is paid at the start of the period.'
    },
    {
        question: 'Is the Car Loan EMI Fixed or Can it Change in the Future?',
        answer: 'Most car loan EMIs are fixed, but floating rate loans may vary based on interest rate changes.'
    },
    {
        question: 'What are the Different Ways by Which the Car Loan EMI Can be Paid?',
        answer: 'You can pay via auto-debit, post-dated cheques, UPI, or direct bank transfer.'
    },
    {
        question: 'Who Can Avail of a Car Loan?',
        answer: 'Any salaried, self-employed individual, or business entity with a valid income source and documentation can apply.'
    },
    {
        question: 'What is a Car Loan Repayment Table?',
        answer: 'It shows the breakup of your loan repayment schedule including principal and interest components over time.'
    },
    {
        question: 'What are the Benefits of Using an Online Car Loan EMI Calculator?',
        answer: 'You can estimate your monthly EMI, total interest, and overall repayment schedule quickly and easily.'
    },
    {
        question: 'What are the Documents Required to Apply for a Car Loan?',
        answer: 'You need identity proof, address proof, income proof, and bank statements.'
    },
    {
        question: 'What are the Best Interest Rates for a Car Loan?',
        answer: 'Interest rates vary by bank, your credit profile, and loan amount. Always compare lenders before applying.'
    },
];

function SellUsedCarPage() {
    const [openModel, setOpenModel] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Sell Used Car
                        </span>
                    </div>
                </div>
            </div>

            {
                !openModel && (
                    <>
                        <TopBanner />

                        <BrandSection openModel={openModel} setOpenModel={setOpenModel} setSelectedBrand={setSelectedBrand} />

                        <div className="px-4 lg:px-10 py-6">
                            <div className="w-full lg:max-w-[1600px] mx-auto space-y-10">
                                <HowItWorks />
                                <CommonFaqAccordion faqData={faqData} />
                            </div>
                        </div>
                    </>
                )
            }

            {
                openModel && (
                    <SellUsedCarModel openModel={openModel} setOpenModel={setOpenModel} selectedBrand={selectedBrand} />
                )
            }
        </>
    );
}

export default SellUsedCarPage;