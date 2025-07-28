'use client'

import Link from 'next/link'
import Image from 'next/image'

type NewsItem = {
    id: number
    image: string
    tag: string
    heading: string
}

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    )
}

const newsList: NewsItem[] = [
    {
        id: 1,
        image: '/variant-explain/image1.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 2,
        image: '/variant-explain/image2.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 3,
        image: '/variant-explain/image3.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 4,
        image: '/variant-explain/image1.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 5,
        image: '/variant-explain/image2.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 6,
        image: '/variant-explain/image3.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
    {
        id: 7,
        image: '/variant-explain/image1.png',
        tag: 'June 2021',
        heading: 'Exclusive: Tata Curvv Petrol/Diesel Full Exclusive: Tata Curvv Petrol/Di...',
    },
]

const MobileVariantsExplained = () => {
    const chunkedNews = chunkArray(newsList, 5)

    return (
        <>
            <section className="p-6">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Variants Explained</h2>
                        <Link
                            href="#"
                            className="text-sm text-[#FFCC00] font-medium hover:underline flex items-center gap-2"
                        >
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </Link>
                    </div>

                    {/* News List */}
                    <div className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide">
                        {chunkedNews.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="min-w-[336px] min-h-[475px] border dark:border-[#262629] rounded-lg p-4 space-y-3 shadow"
                            >
                                {group.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between border-b pb-1 border-[#C8C8C8] dark:border-[#262629]"
                                    >
                                        {/* Text Content */}
                                        <div className="flex flex-col space-y-1 w-3/5">
                                            <span className="text-xs text-gray-500 font-medium">{item.tag}</span>
                                            <p className="text-sm font-medium line-clamp-3">
                                                {item.heading}
                                            </p>
                                        </div>

                                        {/* Thumbnail */}
                                        <div className="w-[104px] h-[65px] relative rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt="news" className="object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-8 flex justify-center items-center'>
                <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

                </div>
            </div>
        </>
    )
}

export default MobileVariantsExplained;
