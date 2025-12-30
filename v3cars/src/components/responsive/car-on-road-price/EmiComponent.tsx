'use client'

import React from "react";
import { CarData } from "../brand/model/overview/Overview";

interface EmiComponentProps {
    data: CarData | null
    cityName: string
}

export default function EmiComponent({ data, cityName }: EmiComponentProps) {

    return (
        <div className="w-full">
            <div className="bg-[#f0f1f1] border border-[#DFDFDF] rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm dark:bg-[#232323] dark:border-[#2e2e2e]">

                {/* LEFT SECTION */}
                <div className="flex-1 w-full md:w-[75%]">
                    <h2 className="text-lg">
                        {data?.model.brand.name} {data?.model.name} EMI in <span className="font-bold">{cityName}</span>
                    </h2>

                    <p className="text-sm text-gray-400 mt-2 leading-relaxed text-justify">
                        For a 5-year loan tenure with a ₹2,65,566 down payment and an interest rate of 9%, the
                        estimated monthly EMI for the Maruti Suzuki Dzire Lxi in Gurugram will be approximately
                        ₹20,585 per month. You can use the EMI Calculator to modify loan amount, tenure, or
                        interest rate and see how your monthly payments change accordingly.
                    </p>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex flex-col items-center gap-3 w-full md:w-[25%]">
                    <div className="text-xl font-bold">
                        ₹20,585<span className="text-sm font-medium text-gray-400">/month</span>
                    </div>

                    <button className="w-full px-5 py-3 bg-primary hover:bg-primary-hover transition rounded-lg text-sm font-semibold shadow text-black">
                        EMI Calculator
                    </button>
                </div>

            </div>
        </div>
    );
}
