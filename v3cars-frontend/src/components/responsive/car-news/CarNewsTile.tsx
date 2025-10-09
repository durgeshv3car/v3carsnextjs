'use client';

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiCalendar } from "react-icons/fi";

interface ArticleThumbnail {
  url: string;
  alt: string;
}

interface ArticleAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string; // ISO Date string
  shortDescription: string;   // HTML string
  thumbnail: ArticleThumbnail;
  author: ArticleAuthor;
  commentsCount: number;
}

export default function CarNewsTile({ article }: { article: Article }) {
  const router = useRouter();

  // ✅ Sanitize description to remove inline color styles (except <a> tags)
  const sanitizedDescription = article.shortDescription.replace(
    /<(?!a\b)([^>]+?)\sstyle="([^"]*?)color:[^;"]+;?([^"]*?)"/gi,
    '<$1 style="$2$3"'
  );

  return (
    <div className="border dark:border-[#2E2E2E] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <Image
        src={`${IMAGE_URL}${article.thumbnail.url}`}
        alt={article.thumbnail.alt}
        width={400}
        height={200}
        className="w-full lg:max-h-[200px] object-cover cursor-pointer"
        onClick={() => router.push(`/news/${article.pageUrl}`)}
      />

      {/* Content */}
      <div className="md:p-4 p-2">
        {/* Title */}
        <h3
          className="lg:text-[18px] text-[12px] font-semibold text-gray-800 dark:text-white leading-tight mb-2 lg:mb-5 line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/news/${article.pageUrl}`)}
        >
          {article.title}
        </h3>

        {/* Description */}
        <div
          className="lg:text-[15px] text-[12px] mb-3 line-clamp-3 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />

        {/* Author + Date */}
        <div className="flex items-center justify-between text-gray-500 dark:text-white">
          <div className="flex items-center md:gap-2 gap-1 lg:text-[13px] text-[10px]">
            <FiUser /> {article.author.name}
          </div>

          <div className="flex items-center md:gap-2 gap-1 lg:text-[13px] text-[10px]">
            <FiCalendar />
            {new Date(article.publishDateandTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
