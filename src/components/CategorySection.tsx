'use client';

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
        <section className='px-6 lg:px-10'>
            <div className="w-full xl:max-w-[1600px] xl:mx-auto my-6">
                <h2 className="text-sm xl:text-lg font-semibold xl:font-medium mb-4">Search By Category</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white min-w-[152px] h-[104px] xl:min-w-[180px] xl:h-[136px] rounded-lg flex flex-col items-center justify-center text-center text-[12px] font-medium hover:shadow-sm transition"
                        >
                            <img
                                src={category.icon}
                                alt={category.label}
                                width={80}
                                height={80}
                            />
                            <span className="mt-1.5 capitalize">{category.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
