'use client'


import React, { useState } from "react";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import TopSection from "@/components/common/TopSection";
import CarLoanCalculator from "@/components/responsive/car-loan-emi-calculator/CarLoanCalculator";
import CarLoanDetails from "@/components/responsive/car-loan-emi-calculator/CarLoanDetails";
import LoanInfoCard from "@/components/responsive/car-loan-emi-calculator/LoanInfoCard";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Most Popular Cars in India 2024 | Top Selling Models & Prices",
//     description:
//         "Explore the most popular cars in India for 2024, including top-selling models, latest prices, mileage, specs, and user ratings. Find best-selling SUVs, hatchbacks, and sedans from brands like Maruti, Hyundai, Tata, Mahindra, Kia, and more.",
//     keywords: [
//         "popular cars India 2024",
//         "best selling cars",
//         "top cars in India",
//         "top SUVs 2024",
//         "most sold cars",
//         "best cars under 10 lakhs",
//         "Maruti bestsellers",
//         "Hyundai popular cars",
//         "Tata top models",
//         "Kia popular cars",
//         "Mahindra best SUVs",
//         "top hatchbacks India",
//         "popular sedans India",
//         "V3Cars"
//     ],
// };

const faqData = [
    { question: 'What is the Smartest Way to Finance a Car?', answer: 'The smartest way is to compare interest rates, check your credit score, and choose the most affordable loan option that fits your budget.' },
    { question: 'What is the Difference Between EMI in Arrears and EMI in Advance?', answer: 'EMI in arrears is paid at the end of the period, while EMI in advance is paid at the start of the period.' },
    { question: 'Is the Car Loan EMI Fixed or Can it Change in the Future?', answer: 'Most car loan EMIs are fixed, but floating rate loans may vary based on interest rate changes.' },
    { question: 'What are the Different Ways by Which the Car Loan EMI Can be Paid?', answer: 'You can pay via auto-debit, post-dated cheques, UPI, or direct bank transfer.' },
    { question: 'Who Can Avail of a Car Loan?', answer: 'Any salaried, self-employed individual, or business entity with a valid income source and documentation can apply.' },
    { question: 'What is a Car Loan Repayment Table?', answer: 'It shows the breakup of your loan repayment schedule including principal and interest components over time.' },
    { question: 'What are the Benefits of Using an Online Car Loan EMI Calculator?', answer: 'You can estimate your monthly EMI, total interest, and overall repayment schedule quickly and easily.' },
    { question: 'What are the Documents Required to Apply for a Car Loan?', answer: 'You need identity proof, address proof, income proof, and bank statements.' },
    { question: 'What are the Best Interest Rates for a Car Loan?', answer: 'Interest rates vary by bank, your credit profile, and loan amount. Always compare lenders before applying.' },
];

function CarLoanEMICalculator() {
    const [loanData, setLoanData] = useState({
        principal: 0,
        annualInterestRate: 7,
        tenureYears: 5,
        emi: 0
    });

    return (
        <>
            <TopSection
                title={"CAR LOAN EMI CALCULATOR"}
                description={"Regardless of whether you are salaried or self-employed, you can purchase your dream car without the need to be wealthy or save up a significant amount of money, unlike a few decades ago. Simply apply for a new car loan and drive your dream car sooner."}
            />

            <div className="px-4 xl:px-10 bg-[#F9F8FA] dark:bg-[#171720] border-t dark:border-[#2E2E2E]">
                <div className="w-full lg:app-container py-6 mx-auto space-y-14">
                    <CarLoanCalculator onLoanDataChange={setLoanData} />
                    <CarLoanDetails
                        principal={loanData.principal}
                        annualInterestRate={loanData.annualInterestRate}
                        tenureYears={loanData.tenureYears}
                        emi={loanData.emi}
                    />
                    <LoanInfoCard />
                    <CommonFaqAccordion faqData={faqData} />
                </div>
            </div>
        </>
    );
}

export default CarLoanEMICalculator;
