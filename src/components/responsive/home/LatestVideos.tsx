'use client'

import Image from 'next/image'
import Link from 'next/link'

const videoData = new Array(8).fill({
    thumbnail: '/latest-video/image.png',
    playIcon: '/latest-video/youtube.png',
    date: 'July 30 2024',
    title:
        'Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...',
    description:
        'The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety, safety and performance...',
})

const LatestVideos: React.FC = () => {
    return (
        <>
            <div className="bg-[#E2E2E2] dark:bg-[#262629] py-6 px-6 lg:px-10">
                <div className="w-full lg:max-w-[1600px] mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-medium">Latest Videos</h2>
                            <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                                View All Latest Videos
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className='flex lg:grid grid-cols-4 gap-4 overflow-x-auto scroll-smooth scrollbar-hide'>
                        {videoData.map((video, index) => (
                            <div
                                key={index}
                                className="max-w-[332px] min-h-[450px] xl:max-w-[381px] xl:max-h-[475px] rounded shadow-md overflow-hidden bg-white dark:bg-[#171717] border border-[#DEE2E6] dark:border-[#2E2E2E] p-1 flex-shrink-0 flex flex-col"
                            >
                                <div className="relative h-[180px] xl:h-[207px]">
                                    <Image
                                        src={video.thumbnail}
                                        alt="Video thumbnail"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 207px"
                                        className="object-cover w-full h-full rounded"
                                        priority={false} 
                                    />

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
                                <div className="p-2 flex flex-col justify-between flex-grow">
                                    <p className="text-sm text-gray-400">{video.date}</p>
                                    <h3 className="text-lg font-semibold line-clamp-3">{video.title}</h3>
                                    <p className="line-clamp-4 text-sm/7 text-justify">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    )
}

export default LatestVideos;