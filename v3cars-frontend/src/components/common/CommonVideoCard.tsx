'use client'

import Link from 'next/link'
import { IMAGE_URL } from '@/utils/constant'

interface CommonVideoCardProps {
    title: string
    viewAllLink: string;
    viewAllText: string;
    data: ReviewVideo[]
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

const CommonVideoCard: React.FC<CommonVideoCardProps> = ({ title, viewAllLink, viewAllText, data }) => {
    return (
        <section>
            <h2 className="text-xl font-semibold lg:font-medium mb-4">{title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 border p-2 rounded-lg dark:border-[#2E2E2E]" >
                {data.map((video) => (
                    <div
                        key={video.id}
                        className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg max-h-[142px] lg:max-h-[303px] shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative max-h-[100px] lg:max-h-[200px] group">
                            <img
                                src={`${IMAGE_URL}${video.thumbnail.url}`}
                                alt={video.thumbnail.alt}
                                className="object-cover w-full h-full rounded"
                            />
                            <div className="absolute inset-0 group-hover:bg-black/30 rounded" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Play Icon */}
                                <img
                                    src={"/latest-video/youtube.png"}
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
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                By {video.author.name}
                            </p>
                        </div>
                    </div>
                ))}


                <Link
                    href={viewAllLink}
                    className="my-1 font-semibold text-blue-500 flex items-center hover:underline gap-2"
                >
                    {viewAllText}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </section>
    )
}

export default CommonVideoCard
