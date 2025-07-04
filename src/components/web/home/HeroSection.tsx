'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Dummy Slides
const slides = [
  {
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Tata Altroz Racer',
    tagline: 'More Performance,\nBig on Features',
  },
  {
    image: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg',
    title: 'Tata Punch EV',
    tagline: 'Power meets Efficiency',
  },
  {
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
    title: 'Tata Nexon',
    tagline: 'Next Level SUV',
  },
];

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('budget');

  return (
    <>
      <div className="relative h-[694px]">
        {/* Swiper Background */}
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 10000, // 10 seconds
            disableOnInteraction: false, // keeps autoplay running even after swipe
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
          }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Box Overlay */}
        <div className="absolute left-[160px] top-[125px] z-20">
          <div className="w-[403px] bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden font-sans">
            {/* Header */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-300">
              <CiFilter size={20} />
              <h2 className="text-gray-800 font-semibold text-lg">
                SEARCH THE RIGHT CAR
              </h2>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 p-6 space-y-6">
              <div className="grid grid-cols-2">
                {['budget', 'model'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center justify-center gap-2 py-3 text-sm font-medium ${activeTab === tab
                      ? 'bg-gray-200 border-b-2 border-yellow-400 text-black'
                      : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    <span
                      className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${activeTab === tab ? 'border-yellow-400' : 'border-gray-400'
                        }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${activeTab === tab ? 'bg-yellow-400' : ''
                          }`}
                      />
                    </span>
                    By {tab === 'budget' ? 'Budget' : 'Model'}
                  </button>
                ))}
              </div>

              {/* Form */}
              {activeTab === 'budget' ? (
                <>
                  <select className="w-full font-light border-b py-2 text-gray-600 border-gray-300">
                    <option>Select Budget</option>
                  </select>
                  <select className="w-full font-light border-b py-2 text-gray-600 border-gray-300">
                    <option>All Vehicle Types</option>
                  </select>
                </>
              ) : (
                <>
                  <select className="w-full font-light border-b py-2 text-gray-600 border-gray-300">
                    <option>Select Brand</option>
                  </select>
                  <select className="w-full font-light border-b py-2 text-gray-600 border-gray-300">
                    <option>Select Model</option>
                  </select>
                </>
              )}

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition py-3 rounded-full flex items-center justify-center gap-2">
                <CiSearch size={20} /> SEARCH
              </button>

              <div className="flex justify-end">
                <button className="flex items-center text-sm gap-1 cursor-pointer hover:underline">
                  Advanced Search <VscChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-pagination flex justify-end items-center sm:mr-20 xl:mr-48 my-2 gap-2" />
    </>
  );
};

export default HeroSection;
