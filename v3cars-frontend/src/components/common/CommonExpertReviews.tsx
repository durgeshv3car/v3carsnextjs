'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci'
import { FaUserEdit } from 'react-icons/fa'

interface CommonExpertReviewProps {
    title: string;
    view: string;
    reviewList: ReviewItem[];
}

type ReviewItem = {
    id: number
    image: string
    tag: string
    heading: string
    description: string
    author: string
    date: string
}


const CommonExpertReviews: React.FC<CommonExpertReviewProps> = ({ title, view, reviewList }) => {
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
                            <h2 className="text-lg font-semibold lg:font-medium">{title}</h2>
                            <Link
                                href="#"
                                className="text-primary font-medium text-sm hover:underline flex gap-2 items-center"
                            >
                                View All {view}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-4"
                                >
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

                    <div className="flex space-x-2 overflow-x-auto scroll-smooth scrollbar-hide" ref={scrollRef}>
                        {reviewList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-w-[390px] min-h-[371px] shadow-sm overflow-hidden hover:shadow-md transition p-3 flex flex-col space-y-4"
                            >
                                {/* Fixed height image */}
                                <div className="relative h-[230px] w-full rounded-xl overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.heading}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                        className="object-cover rounded-xl"
                                        priority={false}
                                    />

                                    {/* Gradient + Text */}
                                    <div className="absolute bottom-0 w-full px-4 pt-16 pb-3 rounded-b-xl text-xs font-semibold text-white bg-gradient-to-t from-black/90 to-transparent">
                                        <h3 className="text-lg line-clamp-2">{item.heading}</h3>
                                    </div>
                                </div>

                                {/* Fills the remaining space */}
                                <div className="flex flex-col flex-grow space-y-4">
                                    <p className="line-clamp-3 text-sm/8">{item.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <FaUserEdit size={16} />
                                            <span>{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CiCalendarDate size={16} />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </section>
        </>
    )
    
}

export default CommonExpertReviews;