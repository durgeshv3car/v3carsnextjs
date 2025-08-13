'use client'

import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface CommonFaqAccordionProps {
    faqData: FaqItem[];
}

type FaqItem = {
    question: string
    answer: string
}

const CommonFaqAccordion: React.FC<CommonFaqAccordionProps> = ({ faqData }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-6">
                Frequently Asked <span className="font-bold">Questions</span>
            </h2>
            <div className="space-y-3">
                {faqData.map((item, index) => (
                    <div key={index}>
                        {/* Question Block */}
                        <div
                            className={`border dark:border-[#2E2E2E] transition-colors px-4 py-3 cursor-pointer flex items-center justify-between ${openIndex === index ? "rounded-t-2xl" : "rounded-2xl"}`}
                            onClick={() => toggle(index)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-yellow-400 text-black font-bold w-7 h-7 flex items-center justify-center rounded-full text-sm">
                                    Q
                                </div>
                                <p className="text-sm sm:text-base">{item.question}</p>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`size-4 transition-transform duration-500 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Smooth Answer Block */}
                        <div
                            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            <div className="border dark:border-[#2E2E2E] rounded-b-2xl p-4 border-t-0 text-sm">
                                {item.answer}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}


export default CommonFaqAccordion;