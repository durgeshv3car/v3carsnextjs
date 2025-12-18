'use client'


import React, { useState } from "react";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import CarLoanRepaymentDetails from "./CarLoanDetails";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import CarLoanEMITab from "./CarLoanEMITab";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import ExploreUsefulCarTools from "./ExploreUsefulCarTools";
import CommonHowItWorkCard from "@/components/common/CommonHowItWorkCard";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import CommonUsefulToolComponent from "@/components/common/CommonUsefulToolComponent";
import { usePathname } from "next/navigation";

const howItWorkData = [
    {
        title: "Choose Mode",
        desc: "Enter a loan amount or select a car to auto-fill ex-showroom price.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/dollar.png" className="w-14 h-14" />
                <img src="/emicalculator/bxs_car.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#CBE7F4", // Blue
    },
    {
        title: "Adjust Loan Details",
        desc: "Set tenure and interest rate using sliders or input boxes.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/setting.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#FCD9D7", // Light red
    },
    {
        title: "View EMI & Totals",
        desc: "See your EMI, total interest and total amount payable instantly.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/calculator.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#FFECBE", // Light yellow
    },
    {
        title: "Check Payment Schedule",
        desc: "Scroll through the month-wise amortization schedule.",
        icon: (
            <div className="flex items-center gap-4">
                <img src="/emicalculator/file.png" className="w-14 h-14" />
            </div>
        ),
        bg: "#D8E7CA", // Light green
    },
];

function MainEMICalculatorComponent() {
    const path = usePathname()
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
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary">
                                Car Loan EMI Calculator
                            </span>
                        </div>

                        <span className="font-medium text-primary">
                            How It Works
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-6"
                style={{ backgroundImage: `url('/car-on-road-price/top-bg.png')` }}
            >
                <div className="absolute inset-0 dark:bg-black/85"></div>

                <div className="relative z-10">
                    <div className="flex justify-center items-center my-4">
                        <img
                            src={'/model/bannerads.png'}
                            alt="bannerads"
                            width={970}
                            height={90}
                            className="rounded-lg"
                        />
                    </div>

                    <ToolsCommonSection
                        title={
                            <span>
                                Car Loan <span className="text-yellow-500">EMI Calculator</span>
                            </span>
                        }
                        desc={`Regardless of whether you are salaried or self‑employed, financing your dream car has never been easier.
                        With our Car Loan EMI Calculator, you can instantly estimate your monthly EMIs, total interest payable and overall
                        loan cost...`}
                        url={path}
                    />
                </div>
            </div>

            <div className="px-4 xl:px-10 bg-[#F9F8FA] dark:bg-[#171720]">
                <div className="w-full lg:app-container py-6 mx-auto space-y-14">

                    <CarLoanEMITab onLoanDataChange={setLoanData} />

                    <CarLoanRepaymentDetails
                        principal={loanData.principal}
                        annualInterestRate={loanData.annualInterestRate}
                        tenureYears={loanData.tenureYears}
                        emi={loanData.emi}
                    />

                    <CommonHowItWorkCard
                        title="Car Loan EMI Calculator – How It Works"
                        data={howItWorkData}
                    />

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Understanding Car Loan EMIs
                        </h2>

                        <div className="space-y-4 text-[15px] leading-relaxed text-gray-400">
                            <p>
                                You have the option of repaying your car loan through monthly instalments (EMI).
                                Before applying for a car loan, it is advisable to determine the expected monthly instalment.
                            </p>

                            <p>
                                Utilize V3Cars&apos; interactive auto loan EMI calculator to estimate your monthly car loan payments.
                                Simply enter the required loan amount, the interest rate and the desired tenure period to obtain the car loan EMI.
                                The instalment in the EMI calculator is computed on a reducing balance.
                            </p>

                            <p>
                                Keep in mind that, as per the rules of financing institutions, processing fees or additional charges may be applicable,
                                which are not reflected in the calculated EMI. You might be eligible for a pre-approved car loan depending on your
                                income and credit score. However, the loan amount and maximum tenure are subject to change.
                            </p>

                            <p>
                                Presently, banks in India offer car loans at an attractive interest rate, accompanied by a low processing fee and
                                a repayment tenure of up to 7 years. Car loans are accessible to various entities, including sole proprietorship firms,
                                partnership firms, companies, consultancy firms, consultants, trusts and societies.
                            </p>

                            <p className="text-gray-400">
                                <span className="font-semibold">Note:</span> The calculator&apos;s rate is only indicative and the actual rate may vary.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <CommonSellUsedCarComponent />

                            <ExploreUsefulCarTools />

                            <CommonQuickLinkComponent data={links} />

                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>

                        <div className="w-auto lg:min-w-[24%] space-y-6">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CommonUsefulToolComponent />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MainEMICalculatorComponent;


 const links = [
        {
            title: "Mileage Calculator",
            desc: "Estimate Your Vehicle's Fuel Efficiency",
            img: "/emicalculator/mileage.png",
            bg: "bg-[#E4F3FE]",
        },
        {
            title: "Fuel Price in India",
            desc: "Check Latest Fuel Prices Across India",
            img: "/emicalculator/fuel.png",
            bg: "bg-[#FCEFFE]",
        },
        {
            title: "Car Loan EMI Calculator",
            desc: "Calculate Your Monthly Car Loan EMI",
            img: "/emicalculator/emi.png",
            bg: "bg-[#FFF8C9]",
        },
        {
            title: "Compare Cars",
            desc: "Compare Specs, Features & Prices",
            img: "/emicalculator/compare.png",
            bg: "bg-[#E0F8E8]",
        },
    ];