'use client'

import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import DOMPurify from "dompurify";

interface NewsItem {
  id: number
  title: string
  pageUrl: string
  publishDateandTime: string // ISO date string
  shortDescription: string // HTML content
  thumbnail: {
    url: string
    alt: string
  }
  author: {
    id: number
    name: string
    slug: string
  }
  commentsCount: number
}

interface MobileExpertCarReviewsProps {
  newsList: NewsItem[]
}

const MobileExpertCarReviews: React.FC<MobileExpertCarReviewsProps> = ({ newsList }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    handleScroll()
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="py-6">
      <div className="w-full lg:app-container px-6 lg:px-0 mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <h2 className="text-lg font-semibold lg:font-medium">Expert Car Reviews</h2>
            <Link
              href="/car-expert-reviews"
              className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
            >
              View All
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
        </div>

        <div
          className="grid grid-flow-col auto-cols-[100%] gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
          ref={scrollRef}
        >
          {newsList.map((item) => {
            const cleanDescription = DOMPurify.sanitize(item.shortDescription, {
              FORBID_ATTR: ['style'],
            })

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#171717] rounded-lg border border-[#E2E2E2] dark:border-[#262629] snap-start h-auto shadow-md overflow-hidden hover:shadow-md transition p-2.5 flex flex-col space-y-4"
              >
                {/* Fixed height image */}
                <div className="relative h-[225px] w-full">
                  <Image
                    src={`${IMAGE_URL}${item.thumbnail.url}`}
                    alt={item.thumbnail.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="rounded-lg object-cover"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                </div>

                {/* Fills the remaining space */}
                <div className="flex flex-col flex-grow justify-center space-y-2">
                  <span className="text-gray-500 text-sm">
                    {new Date(item.publishDateandTime).toLocaleDateString()}
                  </span>
                  <h3 className="text-lg font-semibold line-clamp-3">{item.title}</h3>
                  <p
                    className="text-gray-500 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: cleanDescription }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MobileExpertCarReviews
