'use client'


import { useGetLatestVideosQuery } from '@/redux/api/videosModuleApi';
import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

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

interface LatestVideosProps {
    title: string;
    data: VideoItem[];
    link: string
}

const LatestVideos: React.FC<LatestVideosProps> = ({ title, data, link }) => {
    const router = useRouter()

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <Link href={link} className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                        View All {title}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div
                className="grid grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible lg:snap-none">
                {data.map((video) => (
                    <div
                        key={video.id}
                        className="snap-start lg:snap-none h-auto rounded shadow-md overflow-hidden bg-white dark:bg-[#171717] border border-[#DEE2E6] dark:border-[#2E2E2E] p-1 flex flex-col"
                        onClick={() => { router.push(`/car-review-videos/${video.pageUrl}`) }}
                    >
                        {/* Thumbnail */}
                        <div className="relative max-h-[225px] cursor-pointer group">
                            <Image
                                src={`${IMAGE_URL}${video.thumbnail.url}`}
                                alt={video.thumbnail.alt}
                                width={200}
                                height={200}
                                className="object-cover w-full h-full rounded"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 rounded group-hover:bg-black/30 transition" />

                            {/* Play Icon (static) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/latest-video/youtube.png"
                                    alt="Play"
                                    width={50}
                                    height={50}
                                    className="drop-shadow-md"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-2 flex flex-col justify-between py-4 gap-2">
                            <p className="text-sm text-gray-400">
                                {new Date(video.publishDateandTime).toLocaleDateString()}
                            </p>
                            <h3 className="text-lg font-semibold line-clamp-3">{video.title}</h3>
                            {/* <p className="text-sm text-gray-600">By {video.author.name}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestVideos
