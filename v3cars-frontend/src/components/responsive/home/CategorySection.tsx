'use client';

import Image from 'next/image';
import React from 'react';

const categories = [
    { label: 'SUV', icon: '/car-image/suv.png' },
    { label: 'Sedan', icon: '/car-image/sedan.png' },
    { label: 'Hatchback', icon: '/car-image/hatchback.png' },
    { label: 'Pickup', icon: '/car-image/pickup.png' },
    { label: 'Coupe', icon: '/car-image/coupe.png' },
    { label: 'Convertible', icon: '/car-image/convertible.png' },
    { label: 'Hybrid', icon: '/car-image/hybrid.png' },
    { label: 'Electric', icon: '/car-image/electric.png' },
];

const CategorySection: React.FC = () => {
    return (
        <section className="px-6 lg:px-10">
            <div className="w-full xl:app-container xl:mx-auto my-6">
                <h2 className="text-sm xl:text-lg font-semibold xl:font-medium mb-4">
                    Search By Category
                </h2>
                <div
                    className="grid grid-flow-col auto-cols-[47.90%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin-yellow lg:grid-flow-row lg:grid-cols-8 lg:overflow-visible lg:snap-none">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group bg-gray-100 dark:bg-[#171717] border dark:border-[#2E2E2E] h-[104px] rounded-lg flex flex-col items-center justify-center text-center text-[12px] font-medium hover:shadow-sm transition-transform duration-300 cursor-pointer snap-start lg:snap-none">
                            <Image
                                src={category.icon}
                                alt={category.label}
                                width={80}
                                height={80}
                                loading="lazy"
                                className="dark:invert mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 64px, 80px"
                            />
                            <span className="mt-1.5 capitalize transition-transform duration-300 group-hover:scale-105">
                                {category.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
