'use client'

import React from "react";

interface LatestUpdatesProps {
    title: string
}

const LatestUpdates: React.FC<LatestUpdatesProps> = ({ title }) => {
    const updates = [
        {
            date: "22 Sep 2025",
            description:
                "Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.",
        },
        {
            date: "22 Sep 2025",
            description:
                "Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.",
        },
        {
            date: "22 Sep 2025",
            description:
                "Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.Tata Nexon Gets A Limited Time GST Benefit Of Up To Rs. 1.55 Lakh. The New Ex-Showroom Starting Price Is Rs. 7.31 Lakh, Applicable Till 30 September.",
        },
    ];

    return (
        <div className="bg-white dark:bg-[#171717] rounded-xl shadow-sm border dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-[#2E2E2E]">
                <h2 className="text-lg">
                    {title} <span className="font-semibold">Latest Updates</span>
                </h2>
                <button className="flex items-center hover:underline text-sm font-medium gap-1">
                    View All <span className="hidden md:block">News & Updates</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Timeline */}
            <div className="py-4">
            <div className="relative border-l-2 border-gray-300 mx-4 space-y-6">
                {updates.map((update, index) => (
                    <div key={index} className="relative pl-6">
                        {/* Dot */}
                        <span className="absolute left-[-0.45rem] top-0 w-3 h-3 bg-gray-800 dark:bg-white rounded-full"></span>

                        {/* Date */}
                        <h3 className="text-sm font-semibold">
                            {update.date}
                        </h3>

                        {/* Description */}
                        <p className="text-sm mt-1 leading-relaxed text-justify">
                            {update.description}
                        </p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default LatestUpdates;
