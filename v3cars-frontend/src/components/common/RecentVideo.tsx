'use client'
import React from 'react';
import Image from 'next/image';

interface Video {
    id: number;
    thumbnail: string;
    title: string;
}

const videos: Video[] = [

    {
        id: 1,
        thumbnail: '/recent-video/video1.png',
        title: 'Mahindra Scorpio-N Petrol Variants Explained | Z2, Z4, Z6, Z8S, Z8, Z8L | The Ultimate Analysis',
    },

    {
        id: 2,
        thumbnail: '/recent-video/video2.png',
        title: 'Curvv Petrol Variants Explained w/ Expected Prices | Which Variant To Book? | The Ultimate Analysis',
    },

    {
        id: 3,
        thumbnail: '/recent-video/video3.png',
        title: 'Thar Roxx Variants Explained | MX1, MX3, MX5, AX3L, AX5L, AX7L | The Ultimate Analysis',
    },

    {
        id: 4,
        thumbnail: '/recent-video/video4.png',
        title: '2024 Citroen Basalt Variants Explained (You, Plus, Max) — Which One To Buy?',
    },

    {
        id: 5,
        thumbnail: '/recent-video/video5.png',
        title: 'Top 15 Best Selling Cars In India in July 2024 | Creta, Swift, WagonR, Punch, Ertiga, Brezza, Nexon',
    },

];

const RecentVideos = () => {
    return (
        <div className="rounded-xl shadow-sm border border-gray-300 dark:border-[#262626] overflow-hidden">

            <div className="bg-[#DEE2E6] dark:bg-[#27272a] text-lg font-semibold p-4 rounded-t-xl">
                Recent Videos
            </div>

            <div className="flex flex-col divide-y divide-gray-200 dark:divide-[#262626]">

                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="flex items-start gap-3 px-4 py-3 transition-all cursor-pointer"
                    >
                        {/* Thumbnail Section */}
                        <div className="w-28 h-16 relative flex-shrink-0">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="112px" // (28 * 4px = 112px) ensures correct responsive loading
                                className="rounded-md object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 rounded" />

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

                        {/* Video Title */}
                        <p className="text-sm leading-snug line-clamp-3">{video.title}</p>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default RecentVideos;
