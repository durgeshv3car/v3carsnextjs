'use client'

import React from 'react';
import Image from 'next/image';
import { IMAGE_URL } from '@/utils/constant';

interface CommonPopularVideoProps {
    title: string
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

const CommonPopularVideo: React.FC<CommonPopularVideoProps> = ({ title, data }) => {
    return (
        <div className="border border-gray-300 dark:border-[#262626] rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] text-lg font-semibold p-4 rounded-t-xl">
                {title}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 p-2">
                {data.map((item, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg group cursor-pointer">
                        {/* Thumbnail */}
                        <Image
                            src={`${IMAGE_URL}${item.thumbnail.url}`}
                            alt={`Popular news ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover rounded-lg"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 group-hover:bg-black/30 rounded-lg transition" />

                        {/* Play Icon (centered) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src="/latest-video/youtube.png"
                                alt="Play"
                                width={40}
                                height={40}
                                className="drop-shadow-md"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonPopularVideo;
