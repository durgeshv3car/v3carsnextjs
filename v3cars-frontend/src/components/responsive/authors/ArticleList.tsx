'use client'

import React from "react";

export default function ArticleList() {
    const articles = Array(5).fill({
        date: "July 30 2024",
        title:
            "Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...",
        description:
            "The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety, safety, safety the brand’s commitment to quality, safety, safety the brand’s commitment to quality, safety, safety and ...",
    });

    return (
        <div className="p-4 sm:p-6 bg-white dark:bg-[#171717] rounded-xl">
            {/* Header */}
            <h1 className="text-lg sm:text-xl font-semibold">List of article by Jagdev Kalsi</h1>
            <p className="text-sm text-gray-500 mb-4">2,220 Articles</p>

            {/* Articles List */}
            <div className="space-y-4">
                {articles.map((article, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col sm:flex-row w-full border dark:border-[#2E2E2E] rounded-lg overflow-hidden shadow-sm gap-3 p-3"
                    >
                        {/* Left Thumbnail Section */}
                        <div className="relative w-full sm:w-1/3 flex items-center justify-center">
                            <img
                                src="/latest-video/image.png"
                                alt="thumbnail"
                                className="w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src="/latest-video/youtube.png"
                                    alt="play icon"
                                    width={50}
                                    height={50}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Content Section */}
                        <div className="flex flex-col justify-start w-full sm:w-2/3">
                            <p className="text-xs sm:text-sm text-gray-400">{article.date}</p>
                            <h2 className="text-sm sm:text-base font-semibold leading-snug mt-1">
                                {article.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-4">
                                {article.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
