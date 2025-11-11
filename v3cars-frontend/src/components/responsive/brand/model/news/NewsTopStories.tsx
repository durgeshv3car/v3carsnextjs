'use client';

import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserEdit } from 'react-icons/fa';
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';

interface NewsTopStoriesProps {
    title: string;
    desc: string;
    newsList: NewsItem[];
    link: string;
}

interface NewsItem {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO date string
    shortDescription: string;   // HTML content
    thumbnail: {
        url: string;
        alt: string;
    };
    author: {
        id: number;
        name: string;
        slug: string;
    };
    commentsCount: number;
}

const NewsTopStories: React.FC<NewsTopStoriesProps> = ({ title, desc, newsList, link }) => {
    const router = useRouter()

    return (
        <section className='space-y-4'>
            <div>
                <h2 className="text-lg font-medium">{title}</h2>
                <p className='text-gray-400 text-sm'>{desc}</p>
            </div>

            <div className=" grid grid-cols-3 gap-2">
                {newsList.slice(0, 9).map((item) => {
                    // Clean shortDescription → remove inline styles
                    const cleanDescription = DOMPurify.sanitize(item.shortDescription, {
                        FORBID_ATTR: ["style"],
                    })

                    return (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-transparent dark:border dark:border-[#2E2E2E] rounded-lg snap-start h-auto overflow-hidden hover:shadow-md transition p-3 flex flex-col space-y-4 cursor-pointer"
                            onClick={() => { router.push(`${link}/${item.pageUrl}`) }}
                        >
                            {/* Fixed height image */}
                            <div className="relative w-full">
                                <Image
                                    src={`${IMAGE_URL}${item?.thumbnail?.url}`}
                                    alt={item?.thumbnail?.alt}
                                    width={600}
                                    height={310}
                                    className="rounded-xl object-cover"
                                />

                                {/* Gradient Overlay + Title */}
                                <div className="absolute bottom-0 w-full px-4 pt-16 pb-3 rounded-b-xl text-xs font-semibold text-white bg-gradient-to-t from-black/90 to-transparent">
                                    <h3 className="text-lg line-clamp-2">{item.title}</h3>
                                </div>
                            </div>

                            {/* Description + Meta */}
                            <div className="flex flex-col flex-grow space-y-4">
                                <p
                                    className="line-clamp-3 text-sm/8 text-black dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: cleanDescription }}
                                />
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <FaUserEdit size={16} />
                                        <span>{item.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CiCalendarDate size={16} />
                                        <span>{new Date(item.publishDateandTime).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button className='flex items-center justify-center gap-1 border bg-[#F2F5F9] rounded-lg p-3 text-sm w-full dark:bg-[#171717] dark:border-[#2e2e2e] hover:bg-[#eef2f8] dark:hover:bg-[#292929]'>
                Load More <span className='font-semibold'>News Stories</span>{" "}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </section>
    );
};

export default NewsTopStories;
