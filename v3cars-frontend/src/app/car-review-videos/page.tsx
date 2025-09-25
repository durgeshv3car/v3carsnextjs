'use client'

import CommonPopularVideo from "@/components/common/CommonPopularVideos";
import CommonRecentVideo from "@/components/common/CommonRecentVideo";
import LatestVideos from "@/components/responsive/car-review-video/LatestVideo";
import TopBanner from "@/components/responsive/car-review-video/TopBanner";
import { useGetLatestCarVideosQuery } from "@/redux/api/carReviewVideosApi";
import { Metadata } from "next";
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

    const latestCarVideos = latestCarVideosData?.rows ?? [];

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
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarReviewVideos;






const data = [
    {
      "id": 1103,
      "title": "Tata Altroz CNG Mileage Test & Drive Impression | Better than Swift CNG?",
      "pageUrl": "tata-altroz-cng-mileage-test-drive-impression-better-than-swift-cng",
      "publishDateandTime": "2025-09-24T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/149694Tata-Altroz-CNG-Mileage-Test.webp",
        "alt": "Tata Altroz CNG Mileage Test & Drive Impression | Better than Swift CNG?"
      },
      "videoYId": "tGnjxGVtgKg",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1102,
      "title": "Maruti Victoris First Drive Review | Is Rear Seat Space A Concern? | Peppy Engine | Excellent Ri..",
      "pageUrl": "maruti-victoris-first-drive-review-is-rear-seat-space-a-concern-peppy-engine-excellent-ride",
      "publishDateandTime": "2025-09-19T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/993800Maruti-Victoris-First-Drive-Review.webp",
        "alt": "Maruti Victoris First Drive Review | Is Rear Seat Space A Concern? | Peppy Engine | Excellent Ri.."
      },
      "videoYId": "6uY6aJRWgTM",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1082,
      "title": "Kia Syros Diesel Automatic Mileage Test w/ Tank-to-tank Method & Drive Impression",
      "pageUrl": "kia-syros-diesel-automatic-mileage-test-w-tank-to-tank-method-drive-impression",
      "publishDateandTime": "2025-08-03T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/015475Kia-Syros-Diesel-Automatic-Mileage-Test.webp",
        "alt": "Kia Syros Diesel Automatic Mileage Test w/ Tank-to-tank Method & Drive Impression"
      },
      "videoYId": "-Ci1hQTmCjE",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1075,
      "title": "Kia Clavis EV Quick Range Test | A 7-seater Mass EV Is Finally Here, Par Range Kitni Degi?",
      "pageUrl": "kia-clavis-ev-quick-range-test-a-7-seater-mass-ev-is-finally-here-par-range-kitni-degi",
      "publishDateandTime": "2025-07-22T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/202733kia-carens-clavis-ev-range-test.webp",
        "alt": "Kia Clavis EV Quick Range Test | A 7-seater Mass EV Is Finally Here, Par Range Kitni Degi?"
      },
      "videoYId": "Cty0KMLhoDI",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1074,
      "title": "Tata Harrier EV Range Test | Long Range 4WD Version 600+km Ki Range Degi?",
      "pageUrl": "tata-harrier-ev-range-test-long-range-4wd-version-600-km-ki-range-degi",
      "publishDateandTime": "2025-07-20T12:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/790284Tata-Harrier-EV-Range-Test.webp",
        "alt": "Tata Harrier EV Range Test | Long Range 4WD Version 600+km Ki Range Degi?"
      },
      "videoYId": "jMV1Ziv0dHM",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1058,
      "title": "Mahindra XUV 3XO (131PS) Automatic Mileage Test using Tank-to-tank Method w/ Drive Impressions",
      "pageUrl": "mahindra-xuv-3xo-131ps-automatic-mileage-test-using-tank-to-tank-method-w-drive-impressions",
      "publishDateandTime": "2025-06-17T20:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/722556Mahindra-XUV-3XO-(131PS)-Automatic-Mileage-Test.webp",
        "alt": "Mahindra XUV 3XO (131PS) Automatic Mileage Test using Tank-to-tank Method w/ Drive Impressions"
      },
      "videoYId": "E7QZ9IifTHM",
      "author": {
        "id": 8,
        "name": "Prathu Sharma",
        "slug": "prathu-sharma"
      }
    },
    {
      "id": 1053,
      "title": "Hyundai Alcazar Turbo DCT Mileage Test using Tank-to-tank Method w/ Drive Impressions",
      "pageUrl": "hyundai-alcazar-turbo-dct-mileage-test-using-tank-to-tank-method-w-drive-impressions",
      "publishDateandTime": "2025-06-07T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/353079Hyundai-Alcazar-Turbo-DCT-Automatic-Mileage-Test.webp",
        "alt": "Hyundai Alcazar Turbo DCT Mileage Test using Tank-to-tank Method w/ Drive Impressions"
      },
      "videoYId": "gsdCgqcbQvk",
      "author": {
        "id": 8,
        "name": "Prathu Sharma",
        "slug": "prathu-sharma"
      }
    },
    {
      "id": 1052,
      "title": "Hyundai Creta CVT Mileage Test using Tank-to-tank Method w/ Drive Impressions",
      "pageUrl": "hyundai-creta-cvt-mileage-test-video",
      "publishDateandTime": "2025-06-05T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/322511hyundai-creta-cvt-mileage-test.webp",
        "alt": "Hyundai Creta CVT Mileage Test using Tank-to-tank Method w/ Drive Impressions"
      },
      "videoYId": "CbZ5Z_uQIkU",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    },
    {
      "id": 1051,
      "title": "Kia Carens Clavis HTK+ Walkaround | Features, Design & First Look Review | V3Cars",
      "pageUrl": "kia-carens-clavis-htk-walkaround-features-design-first-look-review",
      "publishDateandTime": "2025-06-03T18:00:00.000Z",
      "thumbnail": {
        "url": "/media/videoImages/084989kia-carens-clavis-htk-plus-walkaround.webp",
        "alt": "Kia Carens Clavis HTK+ Walkaround | Features, Design & First Look Review | V3Cars"
      },
      "videoYId": "35Dfit8t7S4",
      "author": {
        "id": 2,
        "name": "Jagdev Kalsi",
        "slug": "jagdev-kalsi"
      }
    }
  ]