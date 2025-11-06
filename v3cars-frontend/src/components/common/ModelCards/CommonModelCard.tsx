'use client'

import { useEffect, useRef, useState } from 'react'

interface CommonModelCardProps {
    title: string;
    data: ReviewItem[];
}

type ReviewItem = {
    id: number;
    src: string;
    name: string
}


const CommonModelCard: React.FC<CommonModelCardProps> = ({ title, data }) => {
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
            const amount = 390;
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                        <h2 className="text-lg font-semibold">Top things to know about <span className='font-normal'>{title}</span></h2>
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

                <div className="flex space-x-2 overflow-x-auto scroll-smooth scrollbar-hide" ref={scrollRef}>
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#E2E2E2] dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-2xl min-w-[340px] shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
                        >
                            {/* Fixed height image */}
                            <div className="overflow-hidden">
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-full rounded-b-xl text-sm p-3">
                                <h3 className="line-clamp-3">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )

}

export default CommonModelCard;