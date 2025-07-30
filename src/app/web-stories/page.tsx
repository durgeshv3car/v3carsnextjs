'use client'

import WebStoryCard from "@/components/responsive/web-stories/webStory";
import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      <WebStoryCard />
    </>
  );  
}

