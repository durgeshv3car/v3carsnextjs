'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const videoData = new Array(8).fill({
    thumbnail: '/latest-video/image2.png',
    playIcon: '/latest-video/youtube.png',
    date: 'July 30 2024',
    title:
        'Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...',
    description:
        'The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety, safety and performance...',
})

const PopularCarsVideos: React.FC = () => {
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
            <section>
                <div className="flex items-center justify-between my-6">
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                        <h2 className="text-lg font-medium">Car Videos</h2>
                        <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                            View All Car Videos
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
                    {videoData.map((video, index) => (
                        <div
                            key={index}
                            className="bg-[#E2E2E2] rounded-lg min-w-[390px] min-h-[303px] shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                        >
                            {/* Thumbnail with Play Icon */}
                            <div className="relative h-[228px]">
                                <img
                                    src={video.thumbnail}
                                    alt="Video thumbnail"
                                    className="object-cover w-full h-full rounded"
                                />
                                <div className="absolute inset-0 bg-black/10 rounded" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
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
                                <h3 className="font-semibold text-gray-800 line-clamp-2">X-Trail Driven | Nissan’s Plan For India | Upcoming Creta-Alcazar Rival, Mini EV, Magnite FL</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default PopularCarsVideos;