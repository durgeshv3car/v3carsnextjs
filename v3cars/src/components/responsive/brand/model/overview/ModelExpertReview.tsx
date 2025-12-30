'use client'

import React from "react";

interface ModelExpertReviewProps {
    model: string
}

const ModelExpertReview: React.FC<ModelExpertReviewProps> = ({ model }) => {
    const reviews = [
        {
            title: "Exterior Review",
            content:
                "The Tata Nexon has evolved every year since its debut in 2017. One would expect a brand new generation in six years, however, Tata Motors has chosen to update the same model comprehensively. The updated Nexon debuted in 2023 (read our detailed report) where Tata managed to infuse a sense of modernity in terms of design, quality and technology while retaining the old strengths...",
        },
        {
            title: "Interior Review",
            content:
                "The Tata Nexon has evolved every year since its debut in 2017. One would expect a brand new generation in six years, however, Tata Motors has chosen to update the same model comprehensively. The updated Nexon debuted in 2023 (read our detailed report) where Tata managed to infuse a sense of modernity in terms of design, quality and technology while retaining the old strengths...",
        },
        {
            title: "Performance Review",
            content:
                "The Tata Nexon has evolved every year since its debut in 2017. One would expect a brand new generation in six years, however, Tata Motors has chosen to update the same model comprehensively. The updated Nexon debuted in 2023 (read our detailed report) where Tata managed to infuse a sense of modernity in terms of design, quality and technology while retaining the old strengths...",
        },
        {
            title: "Verdict",
            content:
                "The Tata Nexon has evolved every year since its debut in 2017. One would expect a brand new generation in six years, however, Tata Motors has chosen to update the same model comprehensively. The updated Nexon debuted in 2023 (read our detailed report) where Tata managed to infuse a sense of modernity in terms of design, quality and technology while retaining the old strengths...",
        },
    ];

    return (
        <div>
            {/* Header */}
            <h2 className="text-lg mb-3">
                {model} <span className="font-semibold">Expert Review</span>
            </h2>

            {/* Highlighted Quote */}
            <div className="bg-white rounded-xl border border-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E] overflow-hidden">
                <blockquote className="leading-relaxed border-b p-4 bg-[#F1F1F1] dark:bg-[#171717] dark:border-[#2E2E2E]">
                    “With its chic looks and modern features, the Tata Nexon is a very
                    likable car with potential to be the segment leader. Only if Tata sorts
                    out the reliability issues of its tech package, then the Nexon wouldn’t
                    have any major flaw.”
                </blockquote>

                {/* Reviews */}
                <div className="divide-y divide-gray-200 dark:divide-[#2E2E2E] ">
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4">
                            <h3 className="font-medium mb-2">
                                {review.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {review.content}
                                <a
                                    href="#"
                                    className="text-blue-600 font-medium hover:underline ml-1"
                                >
                                    Read More
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModelExpertReview;
