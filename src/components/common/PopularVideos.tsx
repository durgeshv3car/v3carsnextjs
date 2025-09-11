'use client'

import React from 'react';
import Image from 'next/image';

interface Video {
    id: number;
    thumbnail: string;
    title?: string;
}

const videos: Video[] = [
    { id: 1, thumbnail: '/popular-video/video1.png' },
    { id: 2, thumbnail: '/popular-video/video2.png' },
    { id: 3, thumbnail: '/popular-video/video3.png' },
    { id: 4, thumbnail: '/popular-video/video4.png' },
    { id: 5, thumbnail: '/popular-video/video5.png' },
    { id: 6, thumbnail: '/popular-video/video6.png' },
    { id: 7, thumbnail: '/popular-video/video7.png' },
    { id: 8, thumbnail: '/popular-video/video8.png' },
];

const PopularVideos = () => {
    return (
        <div className="border border-gray-300 dark:border-[#262626] rounded-xl shadow-sm w-full">
            {/* Header */}
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] text-lg font-semibold p-4 rounded-t-xl">
                Popular Videos
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 p-2">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="relative aspect-video rounded-md overflow-hidden hover:opacity-90 transition"
                    >
                        {/* Video thumbnail */}
                        <Image
                            src={video.thumbnail}
                            alt={`Video ${video.id}`}
                            fill
                            priority={false}
                            className="object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 rounded" />

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src="/latest-video/youtube.png"
                                alt="Play"
                                width={30}
                                height={30}
                                className="drop-shadow-md"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularVideos;
