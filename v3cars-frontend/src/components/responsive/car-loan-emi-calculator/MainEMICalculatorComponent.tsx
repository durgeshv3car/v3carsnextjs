'use client'


import React, { useState } from "react";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import CarLoanCalculator from "./CarLoanCalculator";
import CarLoanRepaymentDetails from "./CarLoanDetails";
import LoanInfoCard from "./LoanInfoCard";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import TopSection from "@/components/common/TopSection";

function MainEMICalculatorComponent() {
    const [loanData, setLoanData] = useState({
        principal: 0,
        annualInterestRate: 7,
        tenureYears: 5,
        emi: 0
    });

    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 1 });

    const faqByModule = faqByModuleData?.rows ?? [];

    return (
        <>
            <TopSection
                title={"CAR LOAN EMI CALCULATOR"}
                description={"Regardless of whether you are salaried or self-employed, you can purchase your dream car without the need to be wealthy or save up a significant amount of money, unlike a few decades ago. Simply apply for a new car loan and drive your dream car sooner."}
            />

            <div className="px-4 xl:px-10 bg-[#F9F8FA] dark:bg-[#171720] border-t dark:border-[#2E2E2E]">
                <div className="w-full lg:app-container py-6 mx-auto space-y-14">
                    <CarLoanCalculator onLoanDataChange={setLoanData} />
                    <CarLoanRepaymentDetails
                        principal={loanData.principal}
                        annualInterestRate={loanData.annualInterestRate}
                        tenureYears={loanData.tenureYears}
                        emi={loanData.emi}
                    />
                    <LoanInfoCard />
                    <CommonFaqAccordion faqData={faqByModule} />
                </div>
            </div>
        </>
    );
}

export default MainEMICalculatorComponent;
