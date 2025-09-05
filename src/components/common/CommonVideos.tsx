'use client'

import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface CommonVideosProps {
    title: string;
    view: string;
    videoList: VideoItem[];
}

type VideoItem = {
    thumbnail: string
    playIcon: string
    date: string
    title: string
    description: string
}

const CommonVideos: React.FC<CommonVideosProps> = ({ title, view, videoList }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isAtStart, setIsAtStart] = useState<boolean>(true)
    const [isAtEnd, setIsAtEnd] = useState<boolean>(false)

    const handleScroll = () => {
        const container = scrollRef.current
        if (!container) return

        const { scrollLeft, scrollWidth, clientWidth } = container
        setIsAtStart(scrollLeft <= 0)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5)
    }

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 396;
            scrollRef.current.scrollBy({
                left: dir === 'left' ? -amount : amount,
                behavior: 'smooth',
            })
        }
    }

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        handleScroll()
        container.addEventListener('scroll', handleScroll)
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-medium">{title}</h2>
                            <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                                View All {view}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>

                        <div className="hidden lg:block space-x-3">
                            <button
                                onClick={() => scroll('left')}
                                disabled={isAtStart}
                                className={`${isAtStart ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={isAtEnd}
                                className={`${isAtEnd ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className='flex space-x-2 overflow-x-auto scroll-smooth scrollbar-hide' ref={scrollRef}>
                        {videoList.map((video, index) => (
                            <div
                                key={index}
                                className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-w-[390px] min-h-[303px] shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                            >
                                {/* Thumbnail with Play Icon */}
                                <div className="relative h-[228px] w-full rounded overflow-hidden">
                                    <Image
                                        src={video.thumbnail}
                                        alt="Video thumbnail"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                        className="object-cover rounded"
                                        priority={false} 
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/10 rounded" />

                                    {/* Play Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                            src={video.playIcon}
                                            alt="Play"
                                            width={50}
                                            height={50}
                                            className="drop-shadow-md"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-2">
                                    <h3 className="font-semibold line-clamp-2">X-Trail Driven | Nissan’s Plan For India | Upcoming Creta-Alcazar Rival, Mini EV, Magnite FL</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonVideos;