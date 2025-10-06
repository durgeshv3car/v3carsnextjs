'use client'

import CommonPopularVideo from "@/components/common/CommonPopularVideos";
import CommonRecentVideo from "@/components/common/CommonRecentVideo";
import LatestVideos from "@/components/responsive/car-review-video/LatestVideo";
import TopBanner from "@/components/responsive/car-review-video/TopBanner";
import { useGetLatestCarVideosQuery, useGetPopularCarVideosQuery } from "@/redux/api/videosModuleApi";
import Link from "next/link";

// export const metadata: Metadata = {
//     title: "Compare Cars in India | Specs, Features, Prices - V3Cars",
//     description:
//         "Compare cars in India by price, features, mileage, specifications & more. Use V3Cars' car comparison tool to find the best car for you.",
//     keywords: [
//         "compare cars India",
//         "car comparison tool",
//         "car specs comparison",
//         "price comparison cars",
//         "V3Cars compare",
//         "car features comparison",
//     ],
// };

function CarReviewVideos() {
  const { data: latestCarVideosData } = useGetLatestCarVideosQuery();
  const { data: popularCarVideosData } = useGetPopularCarVideosQuery();

  const latestCarVideos = latestCarVideosData?.rows ?? [];
  const popularCarVideos = popularCarVideosData?.rows ?? [];

  return (
    <>
      <div className='bg-[#18181b] text-white'>
        <div className='px-4 xl:px-10'>
          <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-yellow-500">›</span>
            <span className="font-medium text-yellow-500">
              Car Review Videos
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 xl:px-10">
        <div className="w-full lg:app-container mx-auto pb-6">
          <TopBanner />
          <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
            <div className="w-auto lg:max-w-[74%]">
              <LatestVideos data={latestCarVideos} />
            </div>
            <div className="w-auto lg:min-w-[24%] lg:mt-12 space-y-6">
              <CommonRecentVideo
                title="Recent Videos"
                data={latestCarVideos}
              />
              <CommonPopularVideo
                title="Popular Videos"
                data={popularCarVideos}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarReviewVideos;