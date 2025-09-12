"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router
import Image from "next/image";

const stories = [
  {
    id: 1,
    image: "/web-stories/thub1.png",
    heading:
      "'Richest star kid' Aryan Khan Net Worth: From Mercedes GLS S350D to Panchsheel Park property...",
    date: "July 11, 2024",
  },
  {
    id: 2,
    image: "/web-stories/thub2.png",
    heading:
      "Another top celebrity lifestyle revealed: Cars, mansions, and investments.",
    date: "July 12, 2024",
  },
  {
    id: 3,
    image: "/web-stories/thub3.png",
    heading:
      "Another top celebrity lifestyle revealed: Cars, mansions, and investments.",
    date: "July 12, 2024",
  },
  {
    id: 4,
    image: "/web-stories/thub4.png",
    heading:
      "Another top celebrity lifestyle revealed: Cars, mansions, and investments.",
    date: "July 12, 2024",
  },
  {
    id: 5,
    image: "/web-stories/thub5.png",
    heading:
      "Another top celebrity lifestyle revealed: Cars, mansions, and investments.",
    date: "July 12, 2024",
  },
];

const DURATION = 10_000; // 10 seconds

const WebStoryCard: FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);

  const router = useRouter(); // ✅ router hook

  const startProgress = () => {
    const startTime = Date.now() - (progressRef.current * DURATION) / 100;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / DURATION) * 100, 100);
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
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    progressRef.current = 0;
    setProgress(0);
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    if (isPlaying) startProgress();
    else pauseProgress();
    return () => pauseProgress();
  }, [isPlaying, currentStory]);

  const handleShare = () => {
    const story = stories[currentStory];
    if (navigator.share) {
      navigator
        .share({
          title: "Web Story",
          text: story.heading,
          url: window.location.href,
        })
        .catch(console.log);
    } else {
      alert("Share API not supported");
    }
  };

  const story = stories[currentStory];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#495463] to-[#6b775b]">
      <div className="relative w-full lg:w-[500px] aspect-[9/16] h-screen rounded-none lg:rounded-2xl overflow-hidden shadow-xl">
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
          {stories.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[2px] rounded-full bg-white/40 overflow-hidden"
            >
              <div
                className={`h-full bg-white rounded-full transition-all duration-100`}
                style={{
                  width:
                    i < currentStory
                      ? "100%"
                      : i === currentStory
                        ? `${progress}%`
                        : "0%",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Close (X) Button */}
        <button
          onClick={() => router.push("/")} // ✅ direct home redirect
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
          {/* Pause/Play */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            )}
          </button>

          {/* Share */}
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

        {/* Image */}
        <div className="relative h-screen bg-black">
          <Image
            src={story.image}
            alt="Web Story"
            fill
            className="object-contain"
          />
        </div>

        {/* Gradient + Text */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3 h-[50%] flex flex-col justify-end space-y-2">
          <p className="font-medium text-white line-clamp-3">
            {story.heading}
          </p>
          <p className="text-white">{story.date}</p>
        </div>
      </div>

      {/* Prev */}
      <div className="absolute left-2 lg:left-1/3">
        <div
          onClick={prevStory}
          className="lg:bg-white lg:dark:bg-[#171717] lg:rounded-full lg:p-3 lg:shadow-md cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-white lg:dark:text-white lg:text-black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* Next */}
      <div className="absolute right-2 lg:right-1/3">
        <div
          onClick={nextStory}
          className="lg:bg-white lg:dark:bg-[#171717] lg:rounded-full lg:p-3 lg:shadow-md cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-white lg:dark:text-white lg:text-black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WebStoryCard;
