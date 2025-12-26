'use client'

import { useGetModelLatestVariantExplainedQuery } from "@/redux/api/contentModuleApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import React, { useRef } from "react";
import DOMPurify from "dompurify";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface VariantExplainedProps {
    title: string;
    slug: string;
}

export interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string;
    shortDescription: string;
    thumbnail: {
        url: string;
        alt: string;
    };
    author: {
        id: number;
        name: string;
        slug: string;
    };
    commentsCount: number;
}

const VariantExplained: React.FC<VariantExplainedProps> = ({ title, slug }) => {
    const { data: modelLatestVariantExplainedData } =
        useGetModelLatestVariantExplainedQuery(
            { model_slug: slug },
            { skip: !slug }
        );

    const modelLatestVariantExplained: Article[] =
        modelLatestVariantExplainedData?.rows || [];

    const scrollRef = useRef<HTMLDivElement>(null);

    // === Scroll One Card Per Arrow Click ===
    const scrollByCard = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const cardWidth = container.firstElementChild?.clientWidth || 300;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (

        <div>
            <div className="flex items-center justify-between p-4 bg-[#F3F3F3] dark:bg-[#232323] rounded-t-xl">
                <div className="flex items-center justify-between w-full gap-4">
                    <h2 className="text-lg font-semibold lg:font-medium">
                        {title} <span className="font-semibold">Variant Explained</span>
                    </h2>

                    {/* Arrow Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scrollByCard("left")}
                        >
                            <IoIosArrowBack size={20} />
                        </button>

                        <button
                            onClick={() => scrollByCard("right")}
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Card Slider */}
            <div
                ref={scrollRef}
                className="grid grid-flow-col auto-cols-[100%] snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
            >
                {modelLatestVariantExplained.map((item) => {
                    const cleanDescription = DOMPurify.sanitize(
                        item.shortDescription,
                        {
                            FORBID_ATTR: ["style"],
                        }
                    );

                    return (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-[#171717] rounded-b-xl snap-start h-auto overflow-hidden transition p-4 flex flex-col"
                        >
                            {/* Image */}
                            <div className="border rounded-xl dark:border-[#2e2e2e]">
                                <Image
                                    src={`${IMAGE_URL}${item.thumbnail.url}`}
                                    alt={item.thumbnail.alt}
                                    width={300}
                                    height={300}
                                    className="w-full rounded-xl"
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                />

                                {/* Info */}
                                <div className="flex flex-col flex-grow justify-center space-y-2 p-2">
                                    <h3 className="text-lg font-semibold line-clamp-3">
                                        {item.title}
                                    </h3>

                                    <p
                                        className="text-gray-500 line-clamp-3 text-sm"
                                        dangerouslySetInnerHTML={{ __html: cleanDescription }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VariantExplained;
