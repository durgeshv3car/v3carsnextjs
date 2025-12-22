'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import WebStoryCard from '../web-stories/webStory'
import { useGetWebstoriesQuery } from '@/redux/api/webstoriesModuleApi'
import { IMAGE_URL } from '@/utils/constant'

const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
};

export interface Story {
    storyId: string;
    title: string;
    mediaUrl: string; // mp4
    contentUrl: string;
    authorId: string;
    status: boolean;
    createdAt: string; // ISO date string
    items: StoryItem[];
}

export interface StoryItem {
    id: string;
    subStoryId: number;
    title: string;
    mediaUrl: string;
    contentUrl: string;
    authorId: string;
    addedBy: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

const CarWebStories: React.FC = () => {
    const [openStory, setOpenStory] = useState<{
        open: boolean;
        items: StoryItem[];
    }>({
        open: false,
        items: [],
    });

    const { data: webstoriesData } = useGetWebstoriesQuery()

    const webstories: Story[] = webstoriesData?.rows ?? []

    return (
        <>
            <div className="py-10 px-6 lg:px-10">
                <div className="w-full lg:app-container mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                            <h2 className="text-lg font-medium">Car Web Stories</h2>
                            <Link href="#" className="text-primary font-medium text-sm hover:underline flex gap-2 items-center">
                                View All Car Web Stories
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>


                    <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[48.90%] lg:auto-cols-[15.70%] gap-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-smooth">
                        {webstories.map((story) => (
                            <div
                                key={story.storyId}
                                className="relative snap-start aspect-[9/16] rounded-[10px] overflow-hidden bg-black"
                            >
                                {isVideo(story.mediaUrl) ? (
                                    <video
                                        src={`${IMAGE_URL}/uploads/webstories/${story.mediaUrl}`}
                                        className="object-contain cursor-pointer w-full h-full"
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                        preload="metadata"
                                        onClick={() =>
                                            setOpenStory({
                                                open: true,
                                                items: story.items,
                                            })
                                        }
                                    />
                                ) : (
                                    <Image
                                        src={`${IMAGE_URL}/uploads/webstories/${story.mediaUrl}`}
                                        alt={story.title || "Story"}
                                        fill
                                        priority={false}
                                        sizes="(max-width: 768px) 100vw, 270px"
                                        className="object-contain cursor-pointer"
                                        onClick={() =>
                                            setOpenStory({
                                                open: true,
                                                items: story.items,
                                            })
                                        }
                                    />
                                )}

                                {/* Top-right mute icon */}
                                <div
                                    className="absolute top-2 right-2 bg-[#495057] dark:bg-[#171717] p-1.5 rounded-full w-8 h-8 cursor-pointer"
                                    onClick={() => setOpenStory({
                                        open: true,
                                        items: story.items
                                    })}
                                >
                                    <Image
                                        src="/web-stories/mobile.png"
                                        alt="Mobile Icon"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Bottom Gradient + Text */}
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-2 flex flex-col justify-end space-y-1">
                                    <p className="text-sm font-medium text-white line-clamp-3">{story.title}</p>
                                    <p className="text-sm text-white">{new Date(story.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {openStory.open && (
                <div
                    className="fixed inset-0 z-[999] bg-gradient-to-br from-[#495463] to-[#6b775b] flex items-center justify-center"
                    onClick={() => setOpenStory({
                        open: false,
                        items: []
                    })}
                >
                    <WebStoryCard
                        onClose={() => setOpenStory({
                            open: false,
                            items: []
                        })}
                        openStory={openStory}
                    />
                </div>
            )}
        </>
    )
}

export default CarWebStories;