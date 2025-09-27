'use client'

import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

interface CommonMobileReviewCardProps {
    data: Article[];
}

interface ArticleThumbnail {
    url: string;
    alt: string;
}

interface ArticleAuthor {
    id: number;
    name: string;
    slug: string;
}

interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO Date string
    shortDescription: string;   // HTML string
    thumbnail: ArticleThumbnail;
    author: ArticleAuthor;
    commentsCount: number;
}

const CommonMobileReviewCard: React.FC<CommonMobileReviewCardProps> = ({ data }) => {
    return (
        <div>
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
                {data.map((car) => (
                    <div
                        key={car.id}
                        className="border rounded-lg overflow-hidden min-h-[221px] shadow-sm dark:border-[#2E2E2E]"
                    >
                        <div className="max-h-[116px]">
                            <Image
                                src={`${IMAGE_URL}${car.thumbnail.url}`}
                                alt={car.thumbnail.alt}
                                width={300}
                                height={116}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="p-3 space-y-2">
                            <h2 className="text-sm font-semibold line-clamp-2">
                                {car.title}
                            </h2>
                            <p
                                className="text-xs text-gray-500 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: car.shortDescription }}
                            />
                            <div className="flex items-center justify-between text-gray-500 text-[10px]">
                                <span className="flex items-center gap-1">
                                    <FaUser className="text-[10px]" /> {car.author.name}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-[10px]" />{' '}
                                    {new Date(car.publishDateandTime).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonMobileReviewCard;
