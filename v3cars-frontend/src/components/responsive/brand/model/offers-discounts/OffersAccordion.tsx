"use client";
import { useState } from "react";

interface Offer {
    type: string;
    discount: string;
    notes?: string;
}

interface Section {
    title: string;
    offers: Offer[];
    total: string;
    note?: string;
}

const sections: Section[] = [
    {
        title: "NEXON (Excluding Smart Plus & Smart Plus S)",
        offers: [
            { type: "Cash Discount", discount: "₹25,000" },
            { type: "Exchange/ Scrappage Bonus", discount: "₹15,000" },
            { type: "Corporate Discount (Power of 1.2)", discount: "₹7,000", notes: "You can only select one, if more criteria apply." },
            { type: "Corporate Discount (EMP&A/ CPC)", discount: "₹10,000" },
        ],
        total: "₹50,000",
        note: "Max possible discounts"
    },
    {
        title: "NEXON CNG (Excluding Smart Plus & Smart Plus S)",
        offers: [
            { type: "Cash Discount", discount: "₹25,000" },
            { type: "Exchange/ Scrappage Bonus", discount: "₹15,000" },
            { type: "Corporate Discount (Power of 1.2)", discount: "₹7,000", notes: "You can only select one, if more criteria apply." },
            { type: "Corporate Discount (EMP&A/ CPC)", discount: "₹10,000" },
        ],
        total: "₹50,000",
        note: "Max possible discounts"
    },
    {
        title: "NEXON EV (Excluding Smart Plus & Smart Plus S)",
        offers: [
            { type: "Cash Discount", discount: "₹25,000" },
            { type: "Exchange/ Scrappage Bonus", discount: "₹15,000" },
            { type: "Corporate Discount (Power of 1.2)", discount: "₹7,000", notes: "You can only select one, if more criteria apply." },
            { type: "Corporate Discount (EMP&A/ CPC)", discount: "₹10,000" },
        ],
        total: "₹50,000",
        note: "Max possible discounts"
    },
];

export default function OffersAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="border bg-white dark:bg-[#171717] dark:border-[#2e2e2e] rounded-xl overflow-hidden">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className="border-b dark:border-[#2e2e2e] overflow-hidden"
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center px-4 py-3 transition-all"
                    >
                        <span className="text-sm">{section.title}</span>
                        <span className="text-xl">
                            {openIndex === index ? "−" : "+"}
                        </span>
                    </button>

                    {openIndex === index && (
                        <div className="px-4 py-2 bg-white dark:bg-[#171717] animate-fadeIn">
                            <div className="overflow-x-auto border dark:border-[#2e2e2e] rounded-xl">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-[#292929]">
                                            <th className="border-b border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2 text-left">
                                                Discount Type
                                            </th>
                                            <th className="border-b border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2 text-left">
                                                Discount
                                            </th>
                                            <th className="border-b border-gray-300 dark:border-[#2e2e2e] px-3 py-2 text-left">
                                                Notes (if applicable)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.offers.map((offer, i) => (
                                            <tr key={i}>
                                                <td className="border-b border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2">
                                                    {offer.type}
                                                </td>
                                                <td className="border-b border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2">
                                                    {offer.discount}
                                                </td>
                                                <td className="border-b border-gray-300 dark:border-[#2e2e2e] px-3 py-2 text-xs">
                                                    {offer.notes || "-"}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50 dark:bg-[#292929] font-semibold">
                                            <td className="border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2">Total</td>
                                            <td className="border-r border-gray-300 dark:border-[#2e2e2e] px-3 py-2">
                                                {section.total}
                                            </td>
                                            <td className="px-3 py-2 text-xs">
                                                {section.note || ""}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
