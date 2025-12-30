'use client'

import Link from "next/link";
import React from "react";

interface EMICalculatorProps {
    title: string
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ title }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-4 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-bold">Monthly EMI</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center px-4 py-4">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm/relaxed text-justify">
                        Your Monthly EMI 18,718{" "}
                        <Link href={"#"}>Edit EMI</Link>{" "}
                        interest calculated at 9.8% for 48 months
                    </p>

                    <img
                        src={'/model/calculator.png'}
                        alt="calculator"
                        width={86}
                        height={86}
                        className="dark:invert"
                    />
                </div>

                {/* Button */}
                <button
                    className="w-full border border-black rounded-lg py-3 bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition mt-4 dark:bg-[#171717] dark:border-[#2E2E2E]"
                    onClick={() => alert('Downloading Nexon Brochure...')}
                >
                    EMI Calculator
                </button>
            </div>
        </div>
    );
};

export default EMICalculator;
