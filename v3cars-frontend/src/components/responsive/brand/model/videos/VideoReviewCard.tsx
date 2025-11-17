'use client'

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import React from "react";

interface VideoReviewCardProps {
    title: string;
    videoList: VideoItem[]
}

interface VideoItem {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO date string
    thumbnail: {
        url: string;
        alt: string;
    };
    videoYId: string;
    author: {
        id: number;
        name: string;
        slug: string;
    };
}

export default function VideoReviewCard({ title, videoList }: VideoReviewCardProps) {

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className='grid grid-cols-3 gap-2'>
                {videoList.slice(0,6).map((video, index) => (
                    <div
                        key={index}
                        className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                    >
                        {/* Thumbnail with Play Icon */}
                        <div className="relative h-[225px] w-full rounded overflow-hidden group cursor-pointer">
                            <Image
                                src={`${IMAGE_URL}${video.thumbnail.url}`}
                                alt={video.thumbnail.alt || video.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                className="object-cover rounded"
                                priority={false}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 group-hover:bg-black/30 rounded" />

                            {/* Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src={'/latest-video/youtube.png'}
                                    alt="Play"
                                    width={50}
                                    height={50}
                                    className="drop-shadow-md"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-2">
                            <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
