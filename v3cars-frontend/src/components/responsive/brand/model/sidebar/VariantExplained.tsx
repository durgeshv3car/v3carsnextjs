'use client'

import React from "react";

interface VariantExplainedProps {
    title: string
}

const VariantExplained: React.FC<VariantExplainedProps> = ({ title }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-semibold">Variant Explained</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center p-4">
                <div
                    className="flex flex-col items-center gap-4 w-full border rounded-xl shadow-md dark:border-[#2E2E2E]"
                >
                    <img
                        src={"/model/tata.png"}
                        alt={'/tata'}
                        width={283}
                        height={162}
                        className="object-contain rounded-xl"
                    />

                    <div className="p-4">
                        <h2 className="line-clamp-2 text-lg font-semibold">Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv,Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, ...</h2>
                        <p className="line-clamp-4 text-justify">In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car In this June 2...</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VariantExplained;
