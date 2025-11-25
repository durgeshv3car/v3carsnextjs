import React, { useState } from "react";

interface FAQItem {
    question: string;
    answer?: string;
}

interface CommonModelFAQProps {
    title: string;
    faqs: FAQItem[];
    viewAllLink?: string;
}

const CommonModelFAQ: React.FC<CommonModelFAQProps> = ({ title, faqs, viewAllLink }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4"><span className="font-normal">{title}</span> Frequently Asked Questions</h2>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
                <div className="flex border-b px-4 gap-6 dark:border-[#2E2E2E]">
                    <button className="py-3 text-sm font-semibold border-b-[3px] border-primary">
                        FAQs
                    </button>
                    <button className="py-3 text-sm">
                        Latest Queries
                    </button>
                </div>

                <div className="divide-y dark:divide-[#2E2E2E]">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 dark:bg-[#171717]"
                            >
                                <span className="text-sm font-semibold">
                                    Q. {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                )}
                            </button>
                            {openIndex === index && faq.answer && (
                                <div className="px-4 pb-3 text-sm">
                                    A. {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {viewAllLink && (
                    <div className="px-4 py-3">
                        <a
                            href={viewAllLink}
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            View All Questions About Tata Nexon
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommonModelFAQ;
