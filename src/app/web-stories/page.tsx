'use client'

import WebStoryCard from "@/components/WebStories/webStory";
import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      <WebStoryCard />
    </>
  );  
}

