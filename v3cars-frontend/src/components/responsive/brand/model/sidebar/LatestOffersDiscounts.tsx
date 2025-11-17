'use client'

import React from "react";

interface LatestOffersDiscountsProps {
    title: string
}

const LatestOffersDiscounts: React.FC<LatestOffersDiscountsProps> = ({ title }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-4 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-bold">Latest Offers & Discounts</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center px-4 py-4">
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm/relaxed text-justify">
                        Discover Toyota Urban Cruiser Hyryder offers and discounts in Delhi including cash discount, exchange bonus, corporate discount, loyalty bonus and low-EMI finance offers. Updated regularly with amounts, eligibility and expiry.
                    </p>

                    <img
                        src={'/model/discount.png'}
                        alt="discount"
                        width={86}
                        height={86}
                        className="dark:invert"
                    />
                </div>

                {/* Button */}
                <button
                    className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition mt-4 dark:bg-[#171717] dark:border-[#2E2E2E]"
                    onClick={() => alert('Downloading Nexon Brochure...')}
                >
                    View Offer Details | Book a Test Drive
                </button>
            </div>
        </div>
    );
};

export default LatestOffersDiscounts;
