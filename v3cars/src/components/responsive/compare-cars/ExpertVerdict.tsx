'use client';

import Image from "next/image";
import React from "react";

interface ExpertVerdictProps {
    priceAndValue: string;
    performanceAndMileage: string;
    spaceAndComfort: string;
    featuresAndSafety: string;
    finalVerdict: string;
}

export default function ExpertVerdict({
    priceAndValue,
    performanceAndMileage,
    spaceAndComfort,
    featuresAndSafety,
    finalVerdict,
}: ExpertVerdictProps) {
    return (
        <div className="rounded-lg border bg-white dark:bg-[#171717] overflow-hidden shadow-md dark:border-[#2e2e2e]">

            {/* Header */}
            <div className="flex items-center gap-3 bg-[#DEE2E6] dark:bg-[#232323] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white rounded">
                    <Image
                        src={`/compare-car/expert.png`}
                        alt="rs"
                        width={32}
                        height={32}
                    />
                </span>
                <h2 className="font-semibold text-sm">Expert Verdict</h2>
            </div>

            <div className="px-4 py-4 text-sm space-y-3">

                <p>
                    <strong>Price & Value:</strong>{" "}
                    <span>{priceAndValue}</span>
                </p>

                <p>
                    <strong>Performance & Mileage:</strong>{" "}
                    <span>{performanceAndMileage}</span>
                </p>

                <p>
                    <strong>Space & Comfort:</strong>{" "}
                    <span>{spaceAndComfort}</span>
                </p>

                <p>
                    <strong>Features & Safety:</strong>{" "}
                    <span>{featuresAndSafety}</span>
                </p>

                {/* Highlighted Final Verdict */}
                <div className="mt-3 p-3 bg-[#F3F3F3] dark:bg-[#292929] rounded-md">
                    <strong>Which one should you buy?</strong>{" "}
                    <span>{finalVerdict}</span>
                </div>

            </div>
        </div>
    );
}
