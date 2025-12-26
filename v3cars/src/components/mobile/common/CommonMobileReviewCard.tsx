'use client'

import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import React from 'react'
import { FaUser, FaCalendarAlt } from 'react-icons/fa'

interface CommonMobileReviewCardProps {
    data: Article[]
}

interface ArticleThumbnail {
    url: string
    alt: string
}

interface ArticleAuthor {
    id: number
    name: string
    slug: string
}

interface Article {
    id: number
    title: string
    pageUrl: string
    publishDateandTime: string // ISO Date string
    shortDescription: string // HTML string
    thumbnail: ArticleThumbnail
    author: ArticleAuthor
    commentsCount: number
}

const CommonMobileReviewCard: React.FC<CommonMobileReviewCardProps> = ({ data }) => {
    return (
        <div>
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
                {data.map((car) => {
                    // ✅ Sanitize inline color styles (but keep <a> colors)
                    const sanitizedDescription = car.shortDescription.replace(
                        /<(?!a\b)([^>]+?)\sstyle="([^"]*?)color:[^;"]+;?([^"]*?)"/gi,
                        '<$1 style="$2$3"'
                    )

                    return (
                        <div
                            key={car.id}
                            className="border rounded-lg overflow-hidden min-h-[221px] shadow-sm dark:border-[#2E2E2E] bg-white dark:bg-[#171717]"
                        >
                            {/* Image */}
                            <div className="">
                                <Image
                                    src={`${IMAGE_URL}${car.thumbnail.url}`}
                                    alt={car.thumbnail.alt}
                                    width={300}
                                    height={116}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-3 space-y-2 flex flex-col justify-between h-auto">
                                <h2 className="text-sm font-semibold line-clamp-2 text-gray-800 dark:text-white">
                                    {car.title}
                                </h2>

                                {/* ✅ Sanitized HTML Description */}
                                <div
                                    className="line-clamp-3 text-sm/6 sm:text-sm/8 prose prose-invert max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                                />

                                {/* Author + Date */}
                                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-[10px]">
                                    <span className="flex items-center gap-1">
                                        <FaUser className="text-[10px]" /> {car.author.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-[10px]" />
                                        {new Date(car.publishDateandTime).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommonMobileReviewCard
