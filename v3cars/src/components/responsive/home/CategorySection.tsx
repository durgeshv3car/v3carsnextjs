'use client';

import { toggleBodyType } from '@/redux/slices/advanceSearchSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Categories {
    id: number;
    label: string;
    icon: string;
}

const categories: Categories[] = [
    { id: 3, label: 'SUV', icon: '/car-image/suv.png' },
    { id: 4, label: 'Sedan', icon: '/car-image/sedan.png' },
    { id: 1, label: 'Hatchback', icon: '/car-image/hatchback.png' },
    { id: 6, label: 'Pickup', icon: '/car-image/pickup.png' },
    { id: 8, label: 'Coupe', icon: '/car-image/coupe.png' },
    { id: 9, label: 'Convertible', icon: '/car-image/convertible.png' },
    { id: 5, label: 'Crossover', icon: '/car-image/hybrid.png' },
    { id: 7, label: 'MUV', icon: '/car-image/electric.png' },
];

const CategorySection: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    function handleCategory(value: Categories) {
        if (!value) {
            return alert("Something Went Worng. Try Again Later")
        }
        dispatch(
            toggleBodyType({
                id: value.id,
                label: value.label,
            })
        );
        router.push("/search/new-cars");
    }

    return (
        <section className="px-6 lg:px-10">
            <div className="w-full xl:app-container xl:mx-auto mb-6">
                <h2 className="text-sm xl:text-lg font-semibold xl:font-medium mb-4">
                    Search By Category
                </h2>
                <div
                    className="grid grid-flow-col auto-cols-[47.90%] sm:auto-cols-[23.30%] lg:auto-cols-[47.90%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin-yellow lg:grid-flow-row lg:grid-cols-8 lg:overflow-visible lg:snap-none">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] h-[104px] rounded-lg flex flex-col items-center justify-center text-center text-[12px] font-medium hover:shadow-sm transition-transform duration-300 cursor-pointer snap-start lg:snap-none"
                            onClick={() => { handleCategory(category) }}
                        >
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
