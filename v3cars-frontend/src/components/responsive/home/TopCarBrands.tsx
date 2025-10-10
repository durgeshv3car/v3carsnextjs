'use client'

import { useGetAllBrandsQuery } from "@/redux/api/carModuleApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

interface CarBrand {
    brandId: number;
    brandName: string;
    brandSlug: string;
    logoPath: string;
    popularity: string;
    unquieViews: number | null;
    brandStatus: number;
    serviceNetwork: boolean;
    brandType: number;
}

export default function TopCarBrands() {
    const { data: brandData, error, isLoading } = useGetAllBrandsQuery();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const brands: CarBrand[] = (brandData?.rows ?? []).filter(
        (b: CarBrand) => b.popularity && b.popularity.trim() !== ""
    );

    const list1 = brands.filter((_, i) => i % 2 === 0);
    const list2 = brands.filter((_, i) => i % 2 !== 0);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setIsAtStart(scrollLeft <= 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 300;
            scrollRef.current.scrollBy({
                left: dir === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        handleScroll();
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="bg-[#F8F9FA] dark:bg-[#1f1f22] py-6 px-6 lg:px-10">
            <div className="w-full lg:app-container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                        <h2 className="text-lg font-medium">Top Car Brands</h2>
                        <Link
                            href="/brands"
                            className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center"
                        >
                            View All Car Brands
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="hidden lg:block space-x-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={isAtStart}
                            className={`p-3 rounded-full ${isAtStart
                                ? 'bg-slate-200 dark:bg-[#171717] text-gray-400 cursor-not-allowed'
                                : 'bg-slate-100 dark:bg-[#2E2E2E] hover:bg-slate-200 dark:hover:bg-[#171717]'
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={isAtEnd}
                            className={`p-3 rounded-full ${isAtEnd
                                ? 'bg-slate-200 dark:bg-[#171717] text-gray-400 cursor-not-allowed'
                                : 'bg-slate-100 dark:bg-[#2E2E2E] hover:bg-slate-200 dark:hover:bg-[#171717]'
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 2-row horizontal scroll */}
                <div
                    ref={scrollRef}
                    className="mt-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide flex flex-col gap-4"
                >
                    <div className="flex gap-4">
                        {list1.map((brand, i) => (
                            <div
                                key={`list1-${i}`}
                                className="relative min-w-[143px] h-[88px] lg:min-w-[260px] lg:h-[160px] bg-white flex items-center justify-center overflow-hidden"
                            >
                                <Image
                                    src={`${IMAGE_URL}/media/brand-imgs/${brand.logoPath}`}
                                    alt={brand.brandName}
                                    fill
                                    sizes="(max-width: 768px) 143px, 260px"
                                    className="p-4 object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {list2.map((brand, i) => (
                            <div
                                key={`list2-${i}`}
                                className="relative min-w-[143px] h-[88px] lg:min-w-[260px] lg:h-[160px] bg-white flex items-center justify-center overflow-hidden"
                            >
                                <Image
                                    src={`${IMAGE_URL}/media/brand-imgs/${brand.logoPath}`}
                                    alt={brand.brandName}
                                    fill
                                    sizes="(max-width: 768px) 143px, 260px"
                                    className="p-4 object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                />

                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                    <div className="space-y-6 text-center md:text-start w-full md:w-[60%]">
                        <h3 className="font-bold text-lg">
                            At V3Cars, we help car buyers take an informed decision through
                            research-intensive but simplified content.
                        </h3>
                        <p className="text-sm">
                            We aim to be first and the most dependable voice when it comes to
                            recommending a car by excluding personal bias and external
                            influence. The V3 in V3Cars represents a heart. It expresses our
                            unending love for cars.
                        </p>
                        <p className="text-sm">
                            Buyers can visit our website www.v3cars.com to read in detail
                            about the cars that they have shortlisted. The website furnishes
                            details about a car’s specifications, prices, features, reviews,
                            the best variant to buy, comparisons and more. Our English text
                            content is supplemented by Hindi videos and that makes us relevant
                            to most of the buyers in India.
                        </p>
                        <div>
                            <button className="bg-yellow-400 text-black font-medium text-sm px-16 cursor-pointer py-2 rounded-full hover:bg-yellow-500 transition">
                                Read More About V3Cars
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end lg:min-h-[266px] lg:min-w-[375px] w-[250px] h-[244px] relative">
                        <Image
                            src="/logo/v3.svg"
                            alt="Heart V3Cars"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
