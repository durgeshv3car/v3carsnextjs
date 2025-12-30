'use client'

import React from "react";

const OnRoadPriceInfo: React.FC = () => {
    return (
        <div className="bg-white p-4 md:p-8 rounded-xl dark:bg-[#171717]">
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4">
                What’s Included in On-Road Price?
            </h2>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-4">
                The car’s on-road price in India is the total amount you pay to drive it legally on public roads.
                It’s higher than the ex-showroom price quoted by the manufacturer because it includes taxes,
                registration and insurance costs. Here’s how the on-road price is calculated:
            </p>

            {/* Sections */}
            <div className="space-y-6 text-gray-400">
                <p>
                    <strong>Start with the Ex-Showroom Price:</strong> The base price set by the manufacturer,
                    available on the brochure, brand website, or at dealerships.
                </p>

                <p>
                    <strong>Add Road Tax:</strong> A mandatory charge by the state government where the car is
                    registered. It usually ranges between 4% and 15% of the ex-showroom price, depending on the
                    state and vehicle type.
                </p>

                <p>
                    <strong>Add Registration Fee:</strong> Paid to the Regional Transport Office (RTO) to
                    register the car and issue a license plate. The amount depends on engine size and category
                    but typically averages around ₹10,000.
                </p>

                <p>
                    <strong>Include Insurance:</strong> Insurance is compulsory for every car in India.
                </p>

                {/* Bullet points */}
                <ul className="list-disc pl-6 space-y-1">
                    <li>Third-party insurance covers damage to other vehicles or property.</li>
                    <li>
                        Comprehensive insurance includes your own car’s protection against theft, accidents, or
                        natural calamities.
                    </li>
                </ul>

                <p>
                    The premium usually falls between 2–3% of the ex-showroom price, based on coverage, IDV,
                    and location.
                </p>

                <p>
                    <strong>Add Other Charges (if any):</strong> Dealers may add handling, logistic, or accessory
                    fees, which can often be negotiated.
                </p>
            </div>

            {/* Formula block */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border space-y-6 dark:bg-[#232323] dark:border-[#2e2e2e]">
                <p className="font-semibold mb-2">Formula:</p>

                <p className="mb-2">
                    <strong>On-Road Price = Ex-Showroom Price + Road Tax + Registration Fee + Insurance Premium + Other Charges (if any)</strong>
                </p>

                <p className="mt-4">
                    <strong>Live Example – Brand Model Variant in City</strong>
                </p>

                <p>Ex-Showroom Price: ₹ExShowroomPrice</p>
                <p>Road Tax: ₹RoadTax</p>
                <p>Registration Fee: ₹RegistrationFee</p>
                <p>Insurance: ₹InsurancePremium</p>
                <p>Other Charges: ₹OtherCharges</p>

                <p className="mt-4 font-semibold">
                    ➤ Estimated On-Road Price: ₹OnRoadPrice
                </p>
            </div>

            {/* Note */}
            <p className="text-gray-400 text-sm mt-4">
                <strong>Note:</strong> The above figures are indicative and may vary slightly depending on the
                dealer, insurance package, and optional accessories.
            </p>

            {/* Tips section */}
            <div className="mt-6">
                <p className="font-semibold">Tips:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-400 mt-2">
                    <li>Use an on-road price calculator for the most accurate, city-specific estimate that includes the latest RTO and insurance data.</li>
                    <li>Negotiate with dealers on optional fees or packages to reduce your total on-road cost.</li>
                </ul>
            </div>
        </div>
    );
};

export default OnRoadPriceInfo;
