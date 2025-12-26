'use client';

import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserEdit } from 'react-icons/fa';
import DOMPurify from "dompurify";
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string;
    shortDescription: string;
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

interface NewsTopStoriesProps {
    title: string;
    desc: string;
    newsList: Article[];
    link: string;
}

const NewsTopStories: React.FC<NewsTopStoriesProps> = ({ title, desc, newsList, link }) => {
    const router = useRouter();

    return (
        <section className='space-y-4'>
            <div>
                <div className='flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4'>
                    <h2 className="text-xl md:text-2xl">{title}</h2>
                    <div className="w-full max-w-sm">
                        <div className="flex items-center bg-white dark:bg-[#171717] rounded-full shadow-sm overflow-hidden border dark:border-[#2e2e2e]">
                            <input
                                type="text"
                                placeholder="Tata Nexon"
                                className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
                            />

                            {/* Search Button */}
                            <button
                                className="bg-gray-700 text-white w-20 h-10 flex items-center justify-center rounded-full"
                            >
                                <FiSearch size={16} />
                            </button>

                        </div>
                    </div>
                </div>

                <p className='text-gray-400 text-sm'>{desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {newsList.slice(0, 9).map((item) => {
                    const cleanDescription = DOMPurify.sanitize(item.shortDescription, {
                        FORBID_ATTR: ["style"],
                    });

                    return (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-transparent dark:border dark:border-[#2E2E2E] rounded-lg snap-start h-auto overflow-hidden hover:shadow-md transition p-3 flex flex-col space-y-4 cursor-pointer"
                            onClick={() => router.push(`${link}/${item.pageUrl}`)}
                        >
                            <div className="relative w-full">
                                <Image
                                    src={`${IMAGE_URL}${item.thumbnail.url}`}
                                    alt={item.thumbnail.alt}
                                    width={600}
                                    height={310}
                                    className="rounded-xl object-cover"
                                />

                                <div className="absolute bottom-0 w-full px-4 pt-16 pb-3 rounded-b-xl text-xs font-semibold text-white bg-gradient-to-t from-black/90 to-transparent">
                                    <h3 className="text-lg line-clamp-2">{item.title}</h3>
                                </div>
                            </div>

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
                    );
                })}
            </div>

            <button className='flex items-center justify-center gap-1 border bg-[#F2F5F9] rounded-lg p-3 text-sm w-full dark:bg-[#171717] dark:border-[#2e2e2e] hover:bg-[#eef2f8] dark:hover:bg-[#292929]'>
                Load More <span className='font-semibold'>News Stories</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </section>
    );
};

export default NewsTopStories;
