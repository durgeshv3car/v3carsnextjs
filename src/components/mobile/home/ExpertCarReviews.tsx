'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

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


const MobileExpertCarReviews: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const container = scrollRef.current
        if (!container) return

        // const { scrollLeft, scrollWidth, clientWidth } = container
        // setIsAtStart(scrollLeft <= 0)
        // setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5)
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
            <section className="py-6">
                <div className="w-full lg:max-w-[1600px] px-6 lg:px-0 mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-semibold lg:font-medium">Expert Car Reviews</h2>
                            <Link
                                href="#"
                                className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
                            >
                                View All
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
                    </div>

                    <div className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide" ref={scrollRef}>
                        {newsList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-[#171717] rounded-lg min-w-[311px] border border-[#E2E2E2] dark:border-[#262629] lg:min-w-[520px] min-h-[456px] lg:min-h-[495px] shadow-md overflow-hidden hover:shadow-md transition p-2.5 flex flex-col space-y-4"
                            >
                                {/* Fixed height image */}
                                <div className="relative h-[180px] w-full">
                                    <Image
                                        src={item.image}
                                        alt="news"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 600px"
                                        className="rounded-lg object-cover"
                                        placeholder="blur"
                                        blurDataURL="/images/placeholder.png"
                                    />
                                </div>

                                {/* Fills the remaining space */}
                                <div className="flex flex-col flex-grow justify-center">
                                    <span className='text-gray-500'>{item.date}</span>
                                    <h3 className="text-lg font-semibold line-clamp-3">{item.heading}</h3>
                                    <p className="text-gray-500 line-clamp-3 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

export default MobileExpertCarReviews;