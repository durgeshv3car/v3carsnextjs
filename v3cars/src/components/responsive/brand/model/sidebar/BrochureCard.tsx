'use client'

import { IMAGE_URL2 } from "@/utils/constant";
import Link from "next/link";
import React from "react";

interface BrochureCardProps {
    brand: string;
    model: string;
    url: string | undefined;
}

const BrochureCard: React.FC<BrochureCardProps> = ({ brand, model, url }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-4 dark:bg-[#171717]">
                <h3 className="">
                    {brand} {model} <span className="font-bold">Brochure</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center px-4 py-4">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm/relaxed text-justify">
                        Download brochure for detailed information on specs, features & prices.
                    </p>

                    <img
                        src={'/model/brochure.png'}
                        alt="brochure"
                        width={86}
                        height={86}
                        className="dark:invert"
                    />
                </div>

                {/* Button */}
                <Link
                    href={`${IMAGE_URL2}/ad-min/uploads/${url}`}
                    className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition mt-4 dark:bg-[#171717] dark:border-[#2E2E2E]"
                >
                    Download <span className="font-semibold">{model}</span> Brochure
                </Link>
            </div>
        </div>
    );
};

export default BrochureCard;
