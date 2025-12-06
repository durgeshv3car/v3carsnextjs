'use client'

import { useState } from "react";
import CarLoanCalculator from "./CarLoanCalculator";
import SelectCarCalculate from "./SelectCarCalculate";
import { IoSearchSharp } from "react-icons/io5";

interface CarLoanEMITabProps {
    onLoanDataChange: (data: {
        principal: number;
        annualInterestRate: number;
        tenureYears: number;
        emi: number;
    }) => void;
}

export default function CarLoanEMITab({ onLoanDataChange }: CarLoanEMITabProps) {
    const [activeTab, setActiveTab] = useState<"amount" | "car">("amount");
    const [selectedVariantPrice, setSelectedVariantPrice] = useState<number>(500000);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className=" relative">
            <div className={`absolute -top-16 md:-top-14 w-full flex flex-col md:flex-row items-center gap-3 ${activeTab === "car" ? "justify-between" : "justify-center"} p-3 bg-[#F2F4F7] dark:bg-[#232323] rounded-t-xl z-30 shadow-md border dark:border-[#2e2e2e]`}>
                {
                    activeTab === "car" && (
                        <div className="flex items-center gap-1 text-xl">
                            <h2>Select</h2>
                            <span className="font-bold">Brand</span>
                        </div>
                    )
                }
                <div className="flex items-center w-fit bg-white dark:bg-[#171717] p-1 rounded-lg gap-4">
                    <button
                        onClick={() => setActiveTab("amount")}
                        className={`p-3 rounded-md text-sm ${activeTab === "amount"
                            ? "bg-primary text-black"
                            : "bg-transparent"
                            }`}
                    >
                        Enter Loan Amount
                    </button>

                    <button
                        onClick={() => setActiveTab("car")}
                        className={`p-3 rounded-md text-sm ${activeTab === "car"
                            ? "bg-primary text-black"
                            : "bg-transparent"
                            }`}
                    >
                        Select a Car
                    </button>
                </div>

                {
                    activeTab === "car" && (
                        <div className="flex items-center bg-transparent border border-gray-300 rounded-full px-4 py-2 w-[300px] dark:border-[#2e2e2e]">
                            <input
                                type="text"
                                placeholder="Search Brand Name"
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value) }}
                            />
                            <IoSearchSharp size={18} className="text-gray-500" />
                        </div>
                    )
                }
            </div>

            {/* ---------------- TAB CONTENT ---------------- */}
            <div className="p-4 bg-white dark:bg-[#171717] border dark:border-[#2e2e2e] rounded-xl">
                {activeTab === "amount" && (
                    <div className="mt-4 md:mt-6">
                        <CarLoanCalculator selectedVariantPrice={selectedVariantPrice} onLoanDataChange={onLoanDataChange} />
                    </div>
                )}

                {activeTab === "car" && (
                    <div className="mt-[100px] md:mt-4">
                        <SelectCarCalculate searchQuery={searchQuery} onLoanDataChange={onLoanDataChange} />
                    </div>
                )}
            </div>
        </div>
    );
}
