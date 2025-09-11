import React from 'react'
import CarSpecsBlock from "@/components/responsive/car-news/CarSpecsBlock";
import CommentSection from '@/components/responsive/car-news/CommentSection';
import AuthorMobileCard from '@/components/responsive/car-news/AuthorMobileCard';
import PopularNews from '@/components/common/PopularNews';
import UpcomingCarByTopBrands from '@/components/common/UpcomingCarByTopBrands';
import CommonNewsUpdate from '@/components/common/CommonNewsUpdate';
import CommonExpertReviews from '@/components/common/CommonExpertReviews';
import CommonVideos from '@/components/common/CommonVideos';
import BottomAd from '@/components/common/BottomAd';
import SideBarAdSmall from '@/components/common/SideBarAdSmall';
import UpcomingCarInIndia from '@/components/common/UpcomingCarInIndia';
import RecentVideos from '@/components/common/RecentVideo';
import LeaderboardAd from '@/components/common/LeaderboardAd';

const newsList = [
  {
    id: "1",
    image: "/latest-news/image1.png",
    tag: "June 2024",
    heading:
      "Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...",
    description:
      "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
    author: "Mahesh Yadav",
    date: "July 31 2024",
  },
  {
    id: "2",
    image: "/latest-news/image2.png",
    tag: "Mahindra Thar Roxx",
    heading:
      "Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...",
    description:
      "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
    author: "Mahesh Yadav",
    date: "July 31 2024",
  },
  {
    id: "3",
    image: "/latest-news/image3.png",
    tag: "Upcoming Cars",
    heading:
      "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
    description:
      "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
    author: "Mahesh Yadav",
    date: "July 31 2024",
  },
  {
    id: "4",
    image: "/latest-news/image3.png",
    tag: "Upcoming Cars",
    heading:
      "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
    description:
      "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
    author: "Mahesh Yadav",
    date: "July 31 2024",
  },
  {
    id: "5",
    image: "/latest-news/image3.png",
    tag: "Upcoming Cars",
    heading:
      "Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...",
    description:
      "In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
    author: "Mahesh Yadav",
    date: "July 31 2024",
  },
]

const reviewList = [
  {
    id: 1,
    image: '/car-review/image1.png',
    tag: 'June 2024',
    heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
    description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
    author: 'Mahesh Yadav',
    date: 'July 31 2024',
  },
  {
    id: 2,
    image: '/car-review/image2.png',
    tag: 'Mahindra Thar Roxx',
    heading: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, Thar Roxx, Citroen Basalt city in...',
    description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
    author: 'Mahesh Yadav',
    date: 'July 31 2024',
  },
  {
    id: 3,
    image: '/car-review/image3.png',
    tag: 'Upcoming Cars',
    heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
    description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
    author: 'Mahesh Yadav',
    date: 'July 31 2024',
  },
  {
    id: 4,
    image: '/car-review/image1.png',
    tag: 'Upcoming Cars',
    heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
    description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
    author: 'Mahesh Yadav',
    date: 'July 31 2024',
  },
  {
    id: 5,
    image: '/car-review/image2.png',
    tag: 'Upcoming Cars',
    heading: 'Upcoming Cars In August 2024 - Tata Curvv, Thar Roxx, Citroen Basalt city in...',
    description: 'In this June 2024 all car sales analysis article, we’ll look at the YoY and MoM change in sales figures...',
    author: 'Mahesh Yadav',
    date: 'July 31 2024',
  },
]

const videoList = new Array(8).fill({
  thumbnail: '/latest-video/image2.png',
  playIcon: '/latest-video/youtube.png',
  date: 'July 30 2024',
  title:
    'Summer Range Impact and Charging Issue in EVs | 4 Months & 4000km Driv EVs | 4 Months & 4000km Dr...',
  description:
    'The success of the Volkswagen Virtus in the Indian market is a clear reflection of our customers’ trust and confidence in the brand’s commitment to quality, safety and performance...',
})

export default function Page() {
  return (
    <div className="lg:p-8 ">
      <div className="flex gap-5 flex-col md:flex-row w-full lg:max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
          <div className="w-auto lg:max-w-[74%]">
            <CarSpecsBlock />

            <LeaderboardAd />

            <CommentSection />

            <AuthorMobileCard />

            <div className='px-4 lg:px-0'>
              <CommonNewsUpdate
                title="Car News Update"
                view="Car News Update"
                newsList={newsList}
              />

              <CommonExpertReviews
                title="Car News Update"
                view="Car News Update Reviews"
                reviewList={reviewList}
              />

              <CommonVideos
                title="Car News Update"
                view="Car News Update Videos"
                videoList={videoList}
              />

              <UpcomingCarInIndia
                title={"Upcoming Cars In India"}
              />

            </div>
          </div>

          {/* sidebar */}
          <div className="w-auto lg:max-w-[24%] space-y-6 flex flex-col items-center">
            <SideBarAdSmall />
            <UpcomingCarByTopBrands />
            <SideBarAdSmall />
            <RecentVideos />
            <SideBarAdSmall />
            <PopularNews />
            <SideBarAdSmall />
          </div>
        </div>
      </div>
    </div>
  )
}
