import React from 'react'
import CarSpecsBlock from "@/components/responsive/car-news/CarSpecsBlock";

import CommentSection from '@/components/responsive/car-news/CommentSection';
import AuthorMobileCard from '@/components/responsive/car-news/AuthorMobileCard';
import PopularNews from '@/components/common/PopularNews';
import UpcomingCarByTopBrands from '@/components/common/UpcomingCarByTopBrands';

export default function page() {
  return (


    <div className="lg:p-8 ">
      <div className=" flex gap-5 flex-col md:flex-row  overflow-hidden shadow-sm w-full lg:max-w-[1600px] mx-auto">

        <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
          <div className="w-auto lg:max-w-[74%]">

            <CarSpecsBlock />

            <CommentSection />

            <AuthorMobileCard />

          </div>
          <div className="w-auto lg:max-w-[24%]">
            <UpcomingCarByTopBrands />
            <PopularNews />
          </div>
        </div>

      </div>
    </div>

  )
}
