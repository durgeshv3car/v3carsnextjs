'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci'
import { FaUserEdit } from 'react-icons/fa'

type NewsItem = {
    id: number
    image: string
    tag: string
    heading: string
    description: string
    author: string
    date: string
}

const newsList: NewsItem[] = [
    {
        id: 1,
        image: '/car-review/image1.png',
        tag: 'June 2024',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 2,
        image: '/car-review/image2.png',
        tag: 'Mahindra Thar Roxx',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 3,
        image: '/car-review/image3.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 4,
        image: '/car-review/image1.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        id: 5,
        image: '/car-review/image2.png',
        tag: 'Upcoming Cars',
        heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
        description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 all car sales analysis article, ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
]


const TopComparisonReviews: React.FC = () => {
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
                <h2 className="text-lg font-semibold lg:font-medium my-6">Top Comparison Reviews</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 border p-2 rounded-lg" >
                    {newsList.slice(0, 3).map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-h-[371px] shadow-md overflow-hidden transition flex flex-col"
                        >
                            {/* Fixed height image */}
                            <div className="relative h-[230px] w-full">
                                <img
                                    src={item.image}
                                    alt="news"
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Fills the remaining space */}
                            <div className="flex flex-col flex-grow space-y-2 p-3">
                                <h3 className="text-lg font-semibold line-clamp-2">{item.heading}</h3>
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

                    <Link href={"#"} className='my-1 font-semibold text-blue-500 flex items-center hover:underline gap-2'>
                        View All Upcoming Cars
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default TopComparisonReviews;