'use client'

import { useGetVideosByAuthorQuery } from "@/redux/api/commonApi";
import { IMAGE_URL } from "@/utils/constant";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

interface VideoThumbnail {
  url: string;
  alt: string;
}

interface VideoAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface Video {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string; // ISO date string
  thumbnail: VideoThumbnail;
  videoYId: string;
  author: VideoAuthor;
}

export default function ArticleList() {
  const { details } = useParams();
  const slug = typeof details === "string" ? details : "";

  const { data, isLoading, isError } = useGetVideosByAuthorQuery({ slug });

  // Convert API data → Video[]
  const videos: Video[] = useMemo(() => {
    if (!data?.rows) return [];
    return data.rows.map((item: any): Video => ({
      id: item.id,
      title: item.title,
      pageUrl: item.pageUrl,
      publishDateandTime: item.publishDateandTime,
      thumbnail: item.thumbnail,
      videoYId: item.videoYId,
      author: item.author,
    }));
  }, [data]);

  if (isLoading) return <p>Loading videos...</p>;
  if (isError) return <p>Failed to load videos.</p>;
  if (!videos.length) return <p>No videos found.</p>;

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-[#171717] rounded-xl">
      {/* Header */}
      <h1 className="text-lg sm:text-xl font-semibold">
        List of article by {videos[0].author.name}
      </h1>
      <p className="text-sm text-gray-500 mb-4">{videos.length} Articles</p>

      {/* Articles List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col sm:flex-row w-full border dark:border-[#2E2E2E] rounded-lg overflow-hidden shadow-sm gap-3 p-3"
          >
            {/* Left Thumbnail Section */}
            <div className="relative w-full sm:w-1/3 flex items-center justify-center">
              <img
                src={`${IMAGE_URL}${video.thumbnail.url}`}
                alt={video.thumbnail.alt}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/latest-video/youtube.png"
                  alt="play icon"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content Section */}
            <div className="flex flex-col justify-start w-full sm:w-2/3">
              <p className="text-xs sm:text-sm text-gray-400">
                {new Date(video.publishDateandTime).toLocaleDateString()}
              </p>
              <h2 className="text-sm sm:text-base font-semibold leading-snug mt-1">
                {video.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-4">
                Video ID: {video.videoYId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
