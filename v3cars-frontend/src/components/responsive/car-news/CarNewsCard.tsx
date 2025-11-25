'use client';
import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import { FiCalendar, FiUser } from 'react-icons/fi';

interface ArticleThumbnail {
    url: string;
    alt: string;
}

interface ArticleAuthor {
    id: number;
    name: string;
    slug: string;
}

interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO Date string
    shortDescription: string;   // HTML string
    thumbnail: ArticleThumbnail;
    author: ArticleAuthor;
    commentsCount: number;
}

interface CarNewsCardProps {
    data: Article;
}

export default function CarNewsCard({ data }: CarNewsCardProps) {
    // ✅ Sanitize the HTML (remove inline color styles except on <a> tags)
    const sanitizedDescription = data.shortDescription.replace(
        /<(?!a\b)([^>]+?)\sstyle="([^"]*?)color:[^;"]+;?([^"]*?)"/gi,
        '<$1 style="$2$3"'
    );

    return (
        <div className="lg:p-8 p-4">
            <div className="flex gap-5 flex-col lg:flex-row overflow-hidden w-full lg:app-container mx-auto p-2 border-b pb-6">
                {/* Left: Thumbnail */}
                <div className="mx-auto w-full lg:min-w-[600px]">
                    <Image
                        src={`${IMAGE_URL}${data.thumbnail.url}`}
                        alt={data.thumbnail.alt}
                        width={600}
                        height={300}
                        className="rounded-xl w-full object-cover"
                    />
                </div>

                {/* Right: Text Content */}
                <div className="space-y-5 flex flex-col py-2">
                    {/* Title */}
                    <h2 className="lg:text-4xl text-2xl font-semibold text-gray-600 dark:text-white">
                        {data.title}
                    </h2>

                    {/* Description */}
                    <div
                        className="text-[16px] line-clamp-3 prose prose-invert max-w-none leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                    />

                    {/* Author + Date + Button */}
                    <div className="space-y-5">
                        <div className="flex items-center text-sm gap-4">
                            <span className="flex items-center gap-1">
                                <FiUser className="text-[14px]" />
                                {data.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiCalendar className="text-[14px]" />
                                {new Date(data.publishDateandTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>

                        <button
                            className="bg-primary hover:bg-primary-hover text-sm px-4 py-2 rounded font-medium text-gray-800 w-full lg:w-auto transition-colors duration-300"
                            onClick={() => (window.location.href = `/news/${data.pageUrl}`)}
                        >
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
