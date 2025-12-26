"use client";

import { useParams } from "next/navigation";
import { useGetWebstoriesQuery } from "@/redux/api/webstoriesModuleApi";
import WebStoryCard, { StoryItem } from "@/components/responsive/web-stories/webStory";
import { IMAGE_URL } from "@/utils/constant";
import { useMemo, useState, useRef } from "react";
import type { NavControls } from "@/components/responsive/web-stories/webStory";
import { BsArrowCounterclockwise } from "react-icons/bs";


type GroupedStory = {
  storyId: string;
  title: string;
  mediaUrl: string;
  createdAt: string;
  items: StoryItem[];
};


export default function WebStoryPage() {
  const params = useParams<{ id: string }>();
  const storyIdParam = params?.id;

  const { data, isLoading } = useGetWebstoriesQuery();
  const stories: GroupedStory[] = data?.rows ?? [];
  const [activeMedia, setActiveMedia] = useState<string | undefined>(undefined);
  const navRef = useRef<NavControls | null>(null);

  const current = useMemo(() => {
    if (!storyIdParam) return null;
    return stories.find((s) => String(s.storyId) === storyIdParam);
  }, [stories, storyIdParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1b2735]">
        <div className="text-white">Loading story…</div>
      </div>
    );
  }

  if (!current || !current.items?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1b2735] text-white">
        Story not found
      </div>
    );
  }

  const bgUrl = activeMedia
    ? `${IMAGE_URL}/uploads/webstories/${activeMedia}`
    : current.mediaUrl
      ? `${IMAGE_URL}/uploads/webstories/${current.mediaUrl}`
      : undefined;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={
        bgUrl
          ? {
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(0,0,0,0.65)), url(${bgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: "linear-gradient(135deg, #1f2733, #3a4351)" }
      }
    >
      <div className="absolute inset-0 backdrop-blur-[16px] bg-black/35" />

      <div className="z-10 flex flex-col items-center gap-0 lg:gap-4 w-full px-0 py-0 lg:px-4 lg:py-10">
        <div className="relative w-full max-w-full lg:max-w-[720px] flex items-center justify-center">

          <button
            type="button"
            onClick={() => navRef.current?.prev()}
            className={`hidden lg:flex absolute left-[6%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-700 shadow-lg items-center justify-center z-50 transition ${navRef.current?.isFirst ? "opacity-50" : "opacity-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <WebStoryCard
            openStory={{ open: true, items: current.items }}
            loop
            showClose={false}
            hideInternalNav
            navControlsRef={navRef}
            onSlideChange={(_, s) => setActiveMedia(s?.mediaUrl)}
          />

          <button
            type="button"
            onClick={() => navRef.current?.next()}
            className="hidden lg:flex absolute right-[6%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-700 shadow-lg items-center justify-center z-50"
          >
            {navRef.current?.isLast ? (
              <BsArrowCounterclockwise className="text-gray-700" size={22} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



'n9uj1fZ2ILB03g0PCmbI'