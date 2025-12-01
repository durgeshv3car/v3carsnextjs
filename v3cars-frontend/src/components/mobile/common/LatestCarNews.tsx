'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { IMAGE_URL } from '@/utils/constant'

// Helper function to chunk array
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    )
}

// NewsItem interface
interface NewsItem {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO date string
    shortDescription: string;   // HTML content
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

// Props interface
interface MobileLatestCarNewsProps {
    title: string;
    view: string;
    data: NewsItem[];
    link: string
}

// Component
const MobileLatestCarNews: React.FC<MobileLatestCarNewsProps> = ({ title, view, data, link }) => {
    const chunkedNews = chunkArray(data, 5)
    
    return (
        <section >
            <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <Link
                        href={link}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-2"
                    >
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </Link>
                </div>

                {/* News List */}
                <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[32.25%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                    {chunkedNews.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="snap-start min-h-[475px] border dark:border-[#262629] rounded-lg p-4 space-y-3 shadow"
                        >
                            {group.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b pb-1 border-[#C8C8C8] dark:border-[#262629]"
                                >
                                    {/* Text Content */}
                                    <div className="flex flex-col space-y-1 w-3/5">
                                        <span className="text-xs text-gray-500 font-medium">
                                            {new Date(item.publishDateandTime).toLocaleDateString()}
                                        </span>
                                        <p className="text-sm font-medium line-clamp-3">
                                            {item.title}
                                        </p>
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="w-[104px] h-[65px] relative rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                            src={`${IMAGE_URL}${item.thumbnail.url}`}
                                            alt={item.thumbnail.alt || item.title}
                                            width={104}
                                            height={65}
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MobileLatestCarNews
