"use client";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGE_URL } from "@/utils/constant";

const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export interface StoryItem {
  id: string;
  subStoryId: number;
  title: string;
  mediaUrl: string;
  contentUrl: string;
  authorId: string;
  addedBy: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const IMAGE_DURATION = 10_000; // image = 10 sec

interface WebStoryProps {
  onClose: () => void;
  startIndex?: number;
  openStory?: OpenStory;
}

interface OpenStory {
  open: boolean;
  items: StoryItem[];
}

const WebStoryCard: FC<WebStoryProps> = ({
  onClose,
  startIndex = 0,
  openStory,
}) => {
  const stories = openStory?.items ?? [];

  const [currentStory, setCurrentStory] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentDuration, setCurrentDuration] =
    useState<number>(IMAGE_DURATION);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startProgress = () => {
    const startTime =
      Date.now() - (progressRef.current * currentDuration) / 100;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(
        (elapsed / currentDuration) * 100,
        100
      );

      setProgress(percentage);
      progressRef.current = percentage;

      if (percentage >= 100) {
        clearInterval(intervalRef.current!);
        nextStory();
      }
    }, 50);
  };

  const pauseProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextStory = () => {
    progressRef.current = 0;
    setProgress(0);

    setCurrentStory((prev) => {
      if (prev + 1 >= stories.length) {
        setFinished(true);
        return prev;
      }
      return prev + 1;
    });
  };

  const prevStory = () => {
    progressRef.current = 0;
    setProgress(0);
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    if (finished) onClose();
  }, [finished, onClose]);

  useEffect(() => {
    pauseProgress();

    if (isPlaying) {
      startProgress();
      if (videoRef.current) {
        videoRef.current.play().catch(() => { });
      }
    } else {
      if (videoRef.current) videoRef.current.pause();
    }

    return () => pauseProgress();
  }, [isPlaying, currentStory, currentDuration]);

  useEffect(() => {
    document.body.style.overflow = openStory ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openStory]);

  const handleShare = () => {
    const story = stories[currentStory];
    if (!story) return;

    if (navigator.share) {
      navigator.share({
        title: "Web Story",
        text: story.title,
        url: window.location.href,
      });
    }
  };

  const story = stories[currentStory];
  if (!story) return null;

  const isCurrentVideo = isVideo(story.mediaUrl);

  return (
    <div
      className="relative w-full lg:w-[500px] aspect-[9/16] h-[100vh] overflow-hidden bg-black"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Progress Bars */}
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
        {stories.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[2px] rounded-full bg-white/40 overflow-hidden"
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{
                width:
                  i < currentStory
                    ? "100%"
                    : i === currentStory
                      ? `${progress}%`
                      : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Share & Pause/Play */}
      <div className="absolute top-6 right-4 z-20 flex gap-4">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          )}
        </button>

        <button onClick={handleShare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </button>
      </div>

      {/* Media */}
      <div className="relative h-screen lg:h-full bg-black">
        {isCurrentVideo ? (
          <video
            ref={videoRef}
            src={`${IMAGE_URL}/uploads/webstories/${story.mediaUrl}`}
            className="object-contain cursor-pointer w-full h-full"
            muted
            playsInline
            autoPlay
            preload="metadata"
            onLoadedMetadata={(e) => {
              setCurrentDuration(e.currentTarget.duration * 1000);
            }}
            onEnded={nextStory}
          />
        ) : (
          <Image
            src={`${IMAGE_URL}/uploads/webstories/${story.mediaUrl}`}
            alt={story.title || "Story"}
            fill
            className="object-contain cursor-pointer"
            onLoadingComplete={() => {
              setCurrentDuration(IMAGE_DURATION);
            }}
          />
        )}
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3 h-[50%] flex flex-col justify-end space-y-2">
        <p className="font-medium text-white line-clamp-3">
          {story.title}
        </p>
        <p className="text-white">
          {new Date(story.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Prev */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <div onClick={prevStory} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Next */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <div onClick={nextStory} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WebStoryCard;
