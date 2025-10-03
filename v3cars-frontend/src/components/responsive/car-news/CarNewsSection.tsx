
import Link from "next/link";
import CarNewsTile from "./CarNewsTile";
import { MdChevronRight } from "react-icons/md";

interface CarNewsSectionProps {
  title: string;
  viewAllLink: string;
  viewAllText: string;
  data: Article[];
}

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

export default function CarNewsSection({
  title,
  viewAllLink,
  viewAllText,
  data,
}: CarNewsSectionProps) {
  return (
    <section>
      <div className="lg:border dark:border-[#2E2E2E] rounded-lg lg:p-4  shadow-sm">
        {/* Top Heading */}
        <div className="mb-4">
          <h2 className="text-[18px] font-semibold  hidden lg:block">{title}</h2>
        </div>

        {/* Cards + View All Link inside border */}
        <div className="space-y-4">
          {/* Card Grid */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item: Article, i: number) => (
              <CarNewsTile key={item.id ?? i} article={item} />
            ))}
          </div>

          {/* View All Link with Icon */}
          <div>
            <Link
              href={viewAllLink}
              className=" text-blue-600 text-sm font-medium hover:underline hidden lg:block"
            >

              <div className="flex items-center">

                <p>
                  {viewAllText}
                </p>

                <p>
                  <MdChevronRight className="text-xl" />
                </p>
              </div>

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
