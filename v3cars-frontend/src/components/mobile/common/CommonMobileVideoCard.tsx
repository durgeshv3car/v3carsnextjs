'use client'

import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import React from 'react';

interface CommonMobileVideoCardProps {
    data: ReviewVideo[];
}

interface ReviewVideo {
    id: number
    title: string
    pageUrl: string
    publishDateandTime: string // ISO string (e.g. "2025-06-03T18:00:00.000Z")
    thumbnail: {
        url: string
        alt: string
    }
    videoYId: string
    author: {
        id: number
        name: string
        slug: string
    }
}


const CommonMobileVideoCard: React.FC<CommonMobileVideoCardProps> = ({ data }) => {
    return (
        <div>
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
                {data.map((car) => (
                    <div
                        key={car.id}
                        className="border rounded-lg overflow-hidden shadow-sm dark:border-[#2E2E2E]"
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

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                By {car.author.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonMobileVideoCard;
