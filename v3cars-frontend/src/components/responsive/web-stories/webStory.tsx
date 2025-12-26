"use client";
import {
  FC,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
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
  onClose?: () => void;
  startIndex?: number;
  openStory?: OpenStory;
  loop?: boolean;
  showClose?: boolean;
  onSlideChange?: (index: number, story?: StoryItem) => void;
  hideInternalNav?: boolean;
  navControlsRef?: React.MutableRefObject<NavControls | null>;
}

interface OpenStory {
  open: boolean;
  items: StoryItem[];
}

export interface NavControls {
  next: () => void;
  prev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const WebStoryCard: FC<WebStoryProps> = ({
  onClose,
  startIndex = 0,
  openStory,
  loop = true,
  showClose = true,
  onSlideChange,
  hideInternalNav = false,
  navControlsRef,
}) => {
  const stories = useMemo(() => openStory?.items ?? [], [openStory]);

  const [currentStory, setCurrentStory] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentDuration, setCurrentDuration] =
    useState<number>(IMAGE_DURATION);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextStory = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);

    setCurrentStory((prev) => {
      if (stories.length === 0) return 0;
      if (prev + 1 >= stories.length) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [loop, stories.length]);

  const prevStory = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  const startProgress = useCallback(() => {
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
  }, [currentDuration, nextStory]);

  const pauseProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

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
  }, [isPlaying, currentStory, currentDuration, startProgress, pauseProgress]);

  useEffect(() => {
    const s = stories[currentStory];
    onSlideChange?.(currentStory, s);
  }, [currentStory, stories, onSlideChange]);

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

  const isFirst = currentStory === 0;
  const isLast = stories.length > 0 && currentStory === stories.length - 1;

  const resetToFirst = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    setCurrentStory(0);
  }, []);

  const story = stories[currentStory] ?? null;

  // expose controls to parent (optional)
  useEffect(() => {
    if (navControlsRef) {
      navControlsRef.current = {
        next: () => {
          if (isLast) resetToFirst();
          else nextStory();
        },
        prev: prevStory,
        isFirst,
        isLast,
      };
    }
  }, [navControlsRef, isLast, isFirst, nextStory, prevStory, resetToFirst]);

  if (!story) return null;

  const isCurrentVideo = isVideo(story.mediaUrl);

  return (
    <div
      className="relative w-full max-w-full lg:max-w-[480px] h-dvh lg:h-[82vh] lg:aspect-[9/16] overflow-visible"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-[#0b0f16] rounded-none lg:rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Progress Bars */}
        <div className="absolute top-3 left-4 right-4 flex gap-1 z-20">
          {stories.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden"
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
        {showClose && onClose && (
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
        )}

        {/* Share & Pause/Play */}
        <div className="absolute top-5 right-5 z-20 flex gap-4">
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
        <div className="relative h-full bg-black overflow-visible">
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
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-5 h-[45%] flex flex-col justify-end space-y-3 text-center">
          <p className="font-semibold text-white text-lg leading-tight">
            {story.title}
          </p>
          <p className="text-white text-xs opacity-80">
            Published {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Tap zones for prev/next (invisible) */}
      {!hideInternalNav && (
        <>
          <button
            type="button"
            aria-label="Previous story"
            onClick={prevStory}
            className="absolute inset-y-0 left-0 w-1/2 z-40 bg-transparent outline-none border-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          />
          <button
            type="button"
            aria-label="Next story"
            onClick={() => {
              if (isLast) resetToFirst();
              else nextStory();
            }}
            className="absolute inset-y-0 right-0 w-1/2 z-40 bg-transparent outline-none border-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          />
        </>
      )}
    </div>
  );
};

export default WebStoryCard;
