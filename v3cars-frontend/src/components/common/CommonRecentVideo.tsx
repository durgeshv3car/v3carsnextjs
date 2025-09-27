'use client'
import React from 'react'
import Image from 'next/image'
import { IMAGE_URL } from '@/utils/constant'

interface CommonRecentVideoProps {
  title: string
  data: ReviewVideo[]
}

interface ReviewVideo {
  id: number
  title: string
  pageUrl: string
  publishDateandTime: string // ISO string (e.g. "2025-06-03T18:00:00.000Z")
  thumbnail: {
    url: string
    alt: string
  }
  videoYId: string
  author: {
    id: number
    name: string
    slug: string
  }
}

const CommonRecentVideo: React.FC<CommonRecentVideoProps> = ({ title, data }) => {
  return (
    <div className="rounded-xl shadow-sm border border-gray-300 dark:border-[#262626] overflow-hidden">
      {/* Header */}
      <div className="bg-[#DEE2E6] dark:bg-[#27272a] text-lg font-semibold p-4 rounded-t-xl">
        {title}
      </div>

      {/* Videos */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-[#262626]">
        {data.slice(0, 6).map((video) => (
          <div
            key={video.id}
            className="flex items-start gap-3 px-4 py-3 transition-all cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 group">
              <Image
                src={`${IMAGE_URL}${video.thumbnail.url}`}
                alt={video.thumbnail.alt}
                width={120}
                height={120}
                className="rounded-md object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 group-hover:bg-black/30 rounded" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/latest-video/youtube.png"
                  alt="Play"
                  width={30}
                  height={30}
                  className="drop-shadow-md"
                />
              </div>
            </div>

            {/* Title */}
            <p className="text-sm leading-snug line-clamp-3">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommonRecentVideo
