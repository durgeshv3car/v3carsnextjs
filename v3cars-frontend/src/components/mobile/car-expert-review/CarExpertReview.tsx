import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const buttons = ['Latest Expert Reviews', 'Trending Comparison Reviews', 'Top Comparison'];

const carArticles = [
    {
        image: '/car-review/image1.png', // Replace with your actual image paths
        title: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, ...',
        desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        image: '/car-review/image2.png',
        title: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, ...',
        desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        image: '/car-review/image3.png',
        title: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, ...',
        desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
    {
        image: '/car-review/image1.png',
        title: 'Upcoming Cars In August 2024 - Tata Curvv, Mahindra Tata Curvv, ...',
        desc: 'In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures for each car in this June 2024 ...',
        author: 'Mahesh Yadav',
        date: 'July 31 2024',
    },
];

const CarExpertReview = () => {
    return (
        <div>
            {/* Toggle Buttons */}
            <div className="flex gap-2 my-4 overflow-x-auto scrollbar-hide scroll-smooth">
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 text-xs rounded-full font-semibold text-nowrap ${idx === 0 ? 'bg-yellow-400 text-black' : 'border dark:border-[#2E2E2E]'
                            }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
                {carArticles.map((car, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden min-h-[221px] shadow-sm dark:border-[#2E2E2E]">
                        <div className='min-h-[116px]'>
                            <img src={car.image} alt={car.title} className='rounded-lg' />
                        </div>
                        <div className="p-3 space-y-2">
                            <h2 className="text-sm font-semibold line-clamp-2">{car.title}</h2>
                            <p className="text-xs text-gray-500 line-clamp-3">{car.desc}</p>
                            <div className="flex items-center justify-between text-gray-500 text-[10px]">
                                <span className="flex items-center gap-1">
                                    <FaUser className="text-[10px]" /> {car.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt className="text-[10px]" /> {car.date}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarExpertReview;
