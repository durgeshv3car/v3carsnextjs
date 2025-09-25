'use client'

import { IMAGE_URL } from "@/utils/constant"

interface LatestVideosProps {
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

const LatestVideos: React.FC<LatestVideosProps> = ({ data }) => {
    return (
        <section>
            <h2 className="text-xl font-semibold my-3">Latest Videos</h2>

            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
                {data.map((video) => (
                    <div
                        key={video.id}
                        className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-h-[142px] lg:min-h-[303px] shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative min-h-[100px] lg:min-h-[200px] group">
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
            </div>
        </section>
    )
}

export default LatestVideos
