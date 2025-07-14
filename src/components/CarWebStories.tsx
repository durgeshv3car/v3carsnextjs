'use client'

import Link from 'next/link'

type Story = {
    id: number
    image: string
    badge?: string
    label?: string
    heading: string
    date: string
}

const stories: Story[] = [
    {
        id: 1,
        image: '/web-stories/thub1.png',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
    {
        id: 2,
        image: '/web-stories/thub2.png',
        badge: '2.2L',
        label: '100PS • 250Nm',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
    {
        id: 3,
        image: '/web-stories/thub3.png',
        badge: 'digital shareable key',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
    {
        id: 4,
        image: '/web-stories/thub4.png',
        badge: 'Tata Curvv',
        label: 'PART 01: DIMENSIONS',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
    {
        id: 5,
        image: '/web-stories/thub5.png',
        badge: 'Thar ROXX',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
    {
        id: 6,
        image: '/web-stories/thub6.png',
        badge: 'TATA CURVV',
        label: 'WHAT TO EXPECT',
        heading:
            "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
        date: 'July 11, 2024',
    },
]

const CarWebStories: React.FC = () => {
    return (
        <>
            {/* Banner Section */}
            <div className='hidden  h-[331px] md:h-[407px] bg-[#B3B3B3] p-8 sm:flex justify-center items-center'>

                <div className="w-full lg:w-[1600px] xl:h-[346px] sm:h-[200px] mx-auto">
                    <img
                        src={'/ads/ad1.png'}
                        alt='ad1'
                        className='h-full w-full'
                    />
                </div>
            </div>


            <div className="py-6">
                <div className="w-full lg:w-[1600px] px-6 lg:px-0 mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-medium">Car Web Stories</h2>
                            <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                                View All Car Web Stories
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>


                    <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
                        {stories.map((story) => (
                            <div key={story.id} className="relative min-w-[270px] h-[480px]">
                                <img
                                    src={story.image}
                                    alt="Story"
                                    className="rounded-[10px] object-cover w-full h-full"
                                />

                                {/* Top-right mute icon (placeholder) */}
                                <div className="absolute top-2 right-2 bg-[#495057] p-1.5 rounded-full w-10 h-10">
                                    <img
                                        src={'/web-stories/mobile.png'}
                                        alt="Story"
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Bottom Gradient + Text */}
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3 rounded-[10px] h-[50%] flex flex-col justify-end space-y-1">
                                    <p className="text-sm font-medium text-white line-clamp-3">{story.heading}</p>
                                    <p className="text-sm text-white">{story.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarWebStories;