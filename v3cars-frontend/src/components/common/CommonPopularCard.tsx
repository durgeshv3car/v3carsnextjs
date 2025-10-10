'use client'

import React from 'react';
import Image from 'next/image';
import { IMAGE_URL } from '@/utils/constant';

interface CommonPopularCardProps {
    title: string
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

const CommonPopularCard: React.FC<CommonPopularCardProps> = ({ title, data }) => {
    return (
        <div className="border border-gray-300 dark:border-[#262626] rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] text-lg font-semibold p-4 rounded-t-xl">
                {title}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 p-2">
                {data.map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <Image
                            src={`${IMAGE_URL}${item.thumbnail.url}`}
                            alt={`Popular news ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonPopularCard;
