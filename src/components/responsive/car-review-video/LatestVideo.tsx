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

const LatestVideos: React.FC = () => {
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
                <h2 className="text-xl font-semibold my-3">Latest Videos</h2>

                <div className='grid grid-cols-2 2xl:grid-cols-3 gap-4'>
                    {videoData.map((video, index) => (
                        <div
                            key={index}
                            className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-h-[142px] lg:min-h-[303px] shadow-sm overflow-hidden hover:shadow-md transition p-2 flex flex-col"
                        >
                            {/* Thumbnail with Play Icon */}
                            <div className="relative min-h-[100px] lg:min-h-[228px]">
                                <img
                                    src={video.thumbnail}
                                    alt="Video thumbnail"
                                    className="object-cover w-full h-full rounded"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded" />
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
                                <h3 className="font-semibold line-clamp-2">X-Trail Driven | Nissan’s Plan For India | Upcoming Creta-Alcazar Rival, Mini EV, Magnite FL</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default LatestVideos;