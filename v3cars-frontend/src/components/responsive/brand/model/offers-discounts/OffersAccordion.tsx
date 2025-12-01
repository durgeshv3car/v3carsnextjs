"use client";

import { useGetModelOfferDiscountQuery } from "@/redux/api/carModuleApi";
import { useEffect, useState } from "react";

export interface FAQItem {
    id: number;
    quesText: string;
    hasAnswer: boolean;
    ansHtml: string | null; // HTML
    sequence: number;
    addedDate: string; // ISO date string
}

interface OffersAccordionProps {
    slug: string
}

export default function OffersAccordion({ slug }: OffersAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [offerId, setOfferId] = useState<number | null>(null);
    const { data: modelOfferDiscountData } = useGetModelOfferDiscountQuery({ model_slug: slug, expandQID: offerId ?? undefined }, { skip: !slug })

    const modelOfferDiscount: FAQItem[] = modelOfferDiscountData?.rows ?? []

    useEffect(() => {
        if (modelOfferDiscount.length > 0 && openIndex === 0) {
            setOfferId(modelOfferDiscount[0].id)
        }
    }, [modelOfferDiscount])

    return (
        <div className="border bg-white dark:bg-[#171717] dark:border-[#2e2e2e] rounded-xl overflow-hidden">
            {modelOfferDiscount && modelOfferDiscount.map((section, index) => (
                <div
                    key={index}
                    className="border-b dark:border-[#2e2e2e] overflow-hidden"
                >
                    <button
                        onClick={() => {
                            setOpenIndex(openIndex === index ? null : index);
                            setOfferId(section.id);
                        }}
                        className="w-full flex justify-between items-center p-5 transition-all"
                    >
                        <span className="text-sm">{section.quesText}</span>
                        <span className="text-xl">
                            {
                                openIndex === index ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                            }
                        </span>
                    </button>

                    {openIndex === index && (
                        <div className="offer-html-wrapper px-4 py-2 bg-white dark:bg-[#171717] border-t w-full dark:border-[#2e2e2e] overflow-x-auto scrollbar-hide">
                            {modelOfferDiscount?.map((offer, i) => (
                                <div
                                    key={i}
                                    className="w-full"
                                    dangerouslySetInnerHTML={{ __html: offer.ansHtml ?? "" }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
