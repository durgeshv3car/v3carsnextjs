'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

export default function TopCarBrands() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

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
        <section className="bg-[#F8F9FA] dark:bg-[#262629] py-6 px-6 lg:px-10 mb-8">
            <div className="w-full lg:max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                        <h2 className="text-lg font-medium">Top Car Brands</h2>
                        <Link href="#" className="text-[#FFCC00] font-medium text-sm hover:underline flex gap-2 items-center">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>
                    <div className="hidden lg:block space-x-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={isAtStart}
                            className={`p-3 rounded-full ${isAtStart ? 'bg-slate-200 dark:bg-[#171717] text-gray-400 cursor-not-allowed' : 'bg-slate-100 dark:bg-[#2E2E2E]  hover:bg-slate-200 dark:hover:bg-[#171717]'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={isAtEnd}
                            className={`p-3 rounded-full ${isAtEnd ? 'bg-slate-200 dark:bg-[#171717] text-gray-400 cursor-not-allowed' : 'bg-slate-100 dark:bg-[#2E2E2E]  hover:bg-slate-200 dark:hover:bg-[#171717]'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 2-row horizontal scroll */}
                <div
                    ref={scrollRef}
                    className="mt-4 overflow-x-auto scroll-smooth scrollbar-hide flex flex-col gap-2"
                >
                    <div className="flex gap-2">
                        {list1.map((brand, i) => (
                            <div key={`list1-${i}`} className="min-w-[143px] h-[88px] lg:w-[260px] lg:h-[160px] bg-white flex items-center justify-center shadow rounded overflow-hidden">
                                <img src={brand.logo} alt={brand.name} className="p-6 object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {list2.map((brand, i) => (
                            <div key={`list2-${i}`} className="min-w-[143px] h-[88px] lg:w-[260px] lg:h-[160px] bg-white flex items-center justify-center shadow rounded overflow-hidden">
                                <img src={brand.logo} alt={brand.name} className="p-6 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                    <div className="space-y-6 text-center md:text-start w-full md:w-[60%]">
                        <h3 className="font-bold text-lg">
                            At V3Cars, we help car buyers take an informed decision through research-intensive but simplified content.
                        </h3>
                           <p className="text-sm">
                            We aim to be first and the most dependable voice when it comes to recommending a car by excluding personal bias and external influence.
                            The V3 in V3Cars represents a heart. It expresses our unending love for cars.
                        </p>
                        <p className="text-sm">
                            Buyers can visit our website www.v3cars.com to read in detail about the cars that they have shortlisted. The website furnishes details about a car’s specifications, prices, features, reviews, the best variant to buy, comparisons and more.
                            Our English text content is supplemented by Hindi videos and that makes us relevant to most of the buyers in India.
                        </p>
                        <div>
                            <button className="bg-yellow-400 text-black font-medium text-sm px-16 cursor-pointer py-2 rounded-full hover:bg-yellow-500 transition">
                                Read More About V3Cars
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end lg:min-h-[266px] lg:min-w-[375px] w-[250px] h-[244px]">
                        <img src="/logo/v3.svg" alt="Heart V3Cars" className="h-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}



const brands = [
    { name: "Maruti Suzuki Arena", logo: "/car-brands/suzuki.png" },
    { name: "Mahindra", logo: "/car-brands/mahindra.png" },
    { name: "Toyota", logo: "/car-brands/toyota.png" },
    { name: "Hyundai", logo: "/car-brands/hyundai.png" },
    { name: "Volkswagen", logo: "/car-brands/w.png" },
    { name: "Renault", logo: "/car-brands/renault.png" },
    { name: "Nexa", logo: "/car-brands/nexa.png" },
    { name: "Tata", logo: "/car-brands/tata.png" },
    { name: "Kia", logo: "/car-brands/kia.png" },
    { name: "Honda", logo: "/car-brands/honda.png" },
    { name: "Skoda", logo: "/car-brands/skoda.png" },
    { name: "Nissan", logo: "/car-brands/nisaan.png" },
];