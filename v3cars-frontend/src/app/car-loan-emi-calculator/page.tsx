'use client'


import React, { useState } from "react";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import TopSection from "@/components/common/TopSection";
import CarLoanCalculator from "@/components/responsive/car-loan-emi-calculator/CarLoanCalculator";
import CarLoanDetails from "@/components/responsive/car-loan-emi-calculator/CarLoanDetails";
import LoanInfoCard from "@/components/responsive/car-loan-emi-calculator/LoanInfoCard";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";

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

function CarLoanEMICalculator() {
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
                    <CarLoanDetails
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

export default CarLoanEMICalculator;
