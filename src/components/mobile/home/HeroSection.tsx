'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CiSearch } from 'react-icons/ci';

// Define valid tabs
type TabOption = 'budget' | 'model';

const MobileHeroSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabOption>('budget');
    const paginationRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div className='space-y-4 px-4 py-2'>
                {/* Top Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    pagination={{
                        el: '.custom-pagination',
                        clickable: true,
                        bulletClass: 'swiper-custom-bullet',
                        bulletActiveClass: 'swiper-custom-bullet-active',
                    }}
                >
                    <SwiperSlide>
                        <img
                            src="https://imgs.search.brave.com/fTTu7ZYMKsPrXoaFbg6eL3vI7kJjbIqc5gkic9zvlQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FyYW5kYmlrZS5j/b20vX25leHQvaW1h/Z2U_dXJsPWh0dHBz/Oi8vaW1hZ2VzLmNh/cmFuZGJpa2UuY29t/L2Nhci1pbWFnZXMv/YmlnL3RhdGEvcHVu/Y2gvdGF0YS1wdW5j/aC5qcGc_dj0yMyZ3/PTY0MCZxPTc1"
                            alt="TATA Punch"
                            className="w-full h-auto"
                        />
                    </SwiperSlide>
                </Swiper>

                <div className="custom-pagination flex gap-2 justify-end" />

                {/* Feature Tiles */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-200 rounded-xl p-4 text-sm font-medium text-center">
                        Check on-road price
                    </div>
                    <div className="bg-gray-200 rounded-xl p-4 text-sm font-medium text-center">
                        Fuel price in India
                    </div>
                    <div className="bg-yellow-400 rounded-xl p-4 text-sm font-medium text-center">
                        Fuel cost calculator
                    </div>
                    <div className="bg-black text-white rounded-xl p-4 text-sm font-medium text-center">
                        Mileage calculator
                    </div>
                </div>

                {/* Filter Card */}
                <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
                    <div className="flex border-b text-center">
                        <button
                            onClick={() => setActiveTab('budget')}
                            className={`w-1/2 py-3 text-sm font-medium ${activeTab === 'budget'
                                ? 'border-b-2 border-yellow-400 bg-gray-100'
                                : 'bg-white text-gray-500'
                                }`}
                        >
                            By Budget
                        </button>
                        <button
                            onClick={() => setActiveTab('model')}
                            className={`w-1/2 py-3 text-sm font-medium ${activeTab === 'model'
                                ? 'border-b-2 border-yellow-400 bg-gray-100'
                                : 'bg-white text-gray-500'
                                }`}
                        >
                            By Model
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {activeTab === 'budget' ? (
                            <>
                                <select className="w-full border-b py-2 text-gray-600 border-gray-300">
                                    <option>Select Budget</option>
                                </select>
                                <select className="w-full border-b py-2 text-gray-600 border-gray-300">
                                    <option>All Vehicle Types</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <select className="w-full border-b py-2 text-gray-600 border-gray-300">
                                    <option>Select Brand</option>
                                </select>
                                <select className="w-full border-b py-2 text-gray-600 border-gray-300">
                                    <option>Select Model</option>
                                </select>
                            </>
                        )}

                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-md flex items-center justify-center gap-2">
                            <CiSearch size={20} /> SEARCH
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileHeroSection;
