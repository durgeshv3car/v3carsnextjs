'use client';

import React, { useRef, useEffect, useState } from 'react';

type Brand = {
    name: string;
    count: number;
};

type BrandFilterProps = {
    openSection: string | null;
};

const brands: Brand[] = [
    { name: 'Maruti Suzuki', count: 6 },
    { name: 'Tata', count: 10 },
    { name: 'Skoda', count: 9 },
    { name: 'Mahindra', count: 40 },
    { name: 'Toyota', count: 20 },
    { name: 'Kia', count: 9 },
    { name: 'Hyundai', count: 10 },
    { name: 'Honda', count: 25 },
];

function BrandFilter({ openSection }: BrandFilterProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'brand' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    return (
            <div
                ref={contentRef}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight: height }}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full my-3 px-3 py-2 text-sm border rounded-lg focus:outline-none bg-transparent dark:border-[#2E2E2E]"
                />
                <div className="max-h-[600px] lg:max-h-48 overflow-y-auto scrollbar-filter space-y-3 pr-1">
                    {brands.map((brand, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    id={`${index}`}
                                />
                                <div className="w-5 h-5 rounded-md border border-gray-400 peer-checked:bg-yellow-400 peer-checked:border-yellow-400 relative transition-all duration-200">
                                    <svg
                                        className="w-3 h-3 text-black absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </label>
                            <label htmlFor={`brand-${index}`} className="flex-1 text-sm">
                                {brand.name}{' '}
                                <span className="text-gray-500">({brand.count})</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default BrandFilter;
