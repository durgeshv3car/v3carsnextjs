import React from 'react'
import CarSpecsBlock from "@/components/responsive/car-news/CarSpecsBlock";
import UpcomingSideBar from '@/components/responsive/upcoming-cars/UpcomingSidebar';
import CommentSection from '@/components/responsive/car-news/CommentSection';

export default function page() {
  return (


    <div className="lg:p-8 p-4">
      <div className=" flex gap-5 flex-col md:flex-row rounded-lg overflow-hidden shadow-sm w-full lg:max-w-[1600px] mx-auto">

        <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
          <div className="w-auto lg:max-w-[74%]">

            <CarSpecsBlock />

            <CommentSection/>

          </div>
          <div className="w-auto lg:max-w-[24%]">
            <UpcomingSideBar />
          </div>
        </div>

      </div>
    </div>

  )
}
