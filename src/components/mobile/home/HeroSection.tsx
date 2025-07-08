'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CiSearch } from 'react-icons/ci';
import CustomSelect from '@/components/CustomInputs/CustomSelect';

// Define valid tabs
type TabOption = 'budget' | 'model';

const slides = [
    {
        image: '/images/mobile-banner.png',
        title: 'Tata Altroz Racer',
        tagline: 'More Performance,\nBig on Features',
    },
];

const MobileHeroSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('budget');
    const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
    const items2 = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
    const paginationRef = useRef<HTMLDivElement | null>(null);

    const handleSelection = (value: string) => {
        console.log('Selected:', value);
    };

    const handle = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <div className='space-y-4 px-4 py-2'>
            {/* Top Slider */}
            <div className="relative">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    pagination={{
                        el: paginationRef.current!,
                        clickable: true,
                        bulletClass: 'swiper-custom-bullet',
                        bulletActiveClass: 'swiper-custom-bullet-active',
                    }}
                    onSwiper={(swiper) => {
                        if (paginationRef.current) {
                            // @ts-ignore
                            swiper.params.pagination.el = paginationRef.current;
                            swiper.pagination.init();
                            swiper.pagination.render();
                            swiper.pagination.update();
                        }
                    }}
                    className="h-[200px] w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={slide.image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover object-center rounded-[9px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div ref={paginationRef} className="custom-pagination flex gap-2 mt-4" />
            </div>

            {/* Feature Tiles */}
            <div className="flex items-center h-[243px] gap-4">
                {/* Left Tile */}
                <div
                    className="w-[150px] h-full bg-cover bg-center rounded-lg overflow-hidden"
                    style={{ backgroundImage: 'url("/images/on-road-price.png")' }}
                >
                    <div className="bg-black/40 w-full h-full flex items-center justify-center px-2 text-white text-sm font-medium text-center">
                        Check on-road price
                    </div>
                </div>

                {/* Right Side Grid */}
                <div className="w-[222px] h-full flex flex-col justify-between gap-4">
                    <div className="h-[116px] bg-[#338177] relative rounded-lg overflow-hidden flex items-end justify-end">
                        <span className="absolute top-2 left-2 text-white text-sm font-medium">
                            Fuel price in India
                        </span>

                        <div className="w-[120px] h-[120px]">
                            <img
                                src="/images/fuel-price-in-india.png"
                                alt="fuel-price-in-india"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Bottom Two Tiles */}
                    <div className="flex gap-4 h-[116px]">

                        <div className="bg-black flex-1 relative rounded-lg overflow-hidden flex flex-col">
                            <span className="absolute top-2 left-2 text-white text-sm font-medium">
                                Fuel cost calculator
                            </span>

                            <div className="w-[70px] h-[70px] mt-auto self-center">
                                <img
                                    src="/images/fuel-cost-calculator.png"
                                    alt="fuel-cost-calculator"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Bottom Tile */}
                        <div className="bg-[#FFC414] flex-1 relative rounded-lg overflow-hidden flex flex-col">
                            <span className="absolute top-2 left-2 text-sm font-medium">
                                Mileage calculator
                            </span>

                            <div className="w-[80px] h-[80px] mt-auto self-center">
                                <img
                                    src="/images/mileage-calculator.png"
                                    alt="mileage-calculator"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Filter Card */}
            <div className="bg-[#EEEEEE] rounded-xl shadow-md border border-gray-300 overflow-hidden">

                <div className="grid grid-cols-2 mt-2">
                    {['budget', 'model'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center justify-center gap-2 py-3 text-sm font-medium`}
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

                <div className="p-4 space-y-4">
                    {activeTab === 'budget' ? (
                        <div className='flex items-center gap-2 text-xs'>
                            <CustomSelect options={items} placeholder={"Select Budget"} onSelect={handleSelection} />
                            <CustomSelect options={items2} placeholder={"All Vehicle Types"} onSelect={handle} />
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 text-xs'>
                            <CustomSelect options={items} placeholder={"Select Brand"} onSelect={handleSelection} />
                            <CustomSelect options={items2} placeholder={"Select Model"} onSelect={handle} />
                        </div>
                    )}

                    <button className="w-full font-semibold text-xs bg-yellow-400 hover:bg-yellow-500 py-3 rounded-md flex items-center justify-center gap-1">
                        <CiSearch size={16} /> SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileHeroSection;
