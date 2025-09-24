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
        <div className="p-6 bg-white rounded-xl">
            {/* Header */}
            <h1 className="text-lg font-semibold">List of article by Jagdev Kalsi</h1>
            <p className="text-sm text-gray-500 mb-4">2,220 Articles</p>

            {/* Articles List */}
            <div className="space-y-4">
                {articles.map((article, idx) => (
                    <div
                        key={idx}
                        className="flex w-full border rounded-lg overflow-hidden shadow-sm"
                    >
                        {/* Left Thumbnail Section */}
                        <div className="relative w-44 bg-black flex items-center justify-center">
                            <img
                                src="/latest-video/image.png"
                                alt="thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 rounded-full p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 24 24"
                                        stroke="none"
                                        className="w-6 h-6"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Right Content Section */}
                        <div className="p-3 flex flex-col justify-start">
                            <p className="text-xs text-gray-500">{article.date}</p>
                            <h2 className="text-sm font-semibold leading-snug mt-1">
                                {article.title}
                            </h2>
                            <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                                {article.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
