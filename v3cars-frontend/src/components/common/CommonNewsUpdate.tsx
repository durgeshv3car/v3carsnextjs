'use client';

import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserEdit } from 'react-icons/fa';
import DOMPurify from "dompurify";

interface CommonNewsUpdateProps {
  title: string;
  view: string;
  newsList: NewsItem[];
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

const CommonNewsUpdate: React.FC<CommonNewsUpdateProps> = ({ title, view, newsList }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 390;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <Link
            href="#"
            className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
          >
            View All {view}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Arrows */}
        <div className="hidden lg:block space-x-3">
          <button
            onClick={() => scroll('left')}
            disabled={isAtStart}
            className={isAtStart ? 'cursor-not-allowed' : 'cursor-pointer'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={isAtEnd}
            className={isAtEnd ? 'cursor-not-allowed' : 'cursor-pointer'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className=" grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[32.25%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide" ref={scrollRef}>
        {newsList.map((item) => {
          // Clean shortDescription → remove inline styles
          const cleanDescription = DOMPurify.sanitize(item.shortDescription, {
            FORBID_ATTR: ["style"],
          })

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-transparent dark:border dark:border-[#2E2E2E] rounded-lg snap-start h-auto overflow-hidden hover:shadow-md transition p-3 flex flex-col space-y-4"
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
    </section>
  );
};

export default CommonNewsUpdate;
