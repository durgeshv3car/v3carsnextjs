'use client'

import Link from 'next/link'
import { CiCalendarDate } from 'react-icons/ci'
import { FaUserEdit } from 'react-icons/fa'
import { IMAGE_URL } from '@/utils/constant'

interface CommonReviewCardProps {
    title: string
    viewAllLink: string;
    viewAllText: string;
    data: Article[]
}

interface ArticleThumbnail {
    url: string
    alt: string
}

interface ArticleAuthor {
    id: number
    name: string
    slug: string
}

interface Article {
    id: number
    title: string
    pageUrl: string
    publishDateandTime: string // ISO Date string
    shortDescription: string   // HTML string
    thumbnail: ArticleThumbnail
    author: ArticleAuthor
    commentsCount: number
}

const CommonReviewCard: React.FC<CommonReviewCardProps> = ({ title, viewAllLink, viewAllText, data }) => {
    return (
        <section>
            <h2 className="text-xl font-semibold lg:font-medium mb-4">{title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 border p-2 rounded-lg dark:border-[#2E2E2E]" >
                {data.slice(0, 6).map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg min-h-[371px] shadow-md overflow-hidden transition flex flex-col"
                    >
                        {/* Fixed height image */}
                        <div className="relative max-h-[200px] w-full">
                            <img
                                src={`${IMAGE_URL}${item.thumbnail.url}`}
                                alt={item.thumbnail.alt}
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>

                        {/* Fills the remaining space */}
                        <div className="flex flex-col flex-grow space-y-2 p-3">
                            <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                            <p
                                className="line-clamp-3 text-sm/8"
                                dangerouslySetInnerHTML={{ __html: item.shortDescription }}
                            />
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <FaUserEdit size={16} />
                                    <span>{item.author.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CiCalendarDate size={16} />
                                    <span>
                                        {new Date(item.publishDateandTime).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <Link
                    href={viewAllLink}
                    className="my-1 font-semibold text-blue-500 flex items-center hover:underline gap-2"
                >
                    {viewAllText}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </section>
    )
}

export default CommonReviewCard
