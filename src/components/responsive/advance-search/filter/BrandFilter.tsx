'use client';

import React, { useRef, useEffect, useState } from 'react';

type Brand = {
    name: string;
    count: number;
};

type BrandFilterProps = {
    openSection: string | null;
    toggleSection: (section: string) => void;
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

function BrandFilter({ openSection, toggleSection }: BrandFilterProps) {
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
        <div className='pt-3'>
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('brand')}
            >
                <h3 className="font-semibold text-lg">Brand</h3>
                <div className={`${openSection === 'brand' ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </div>

            <div
                ref={contentRef}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight: height }}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full my-3 px-3 py-2 text-sm border rounded-lg focus:outline-none"
                />
                <div className="max-h-48 overflow-y-auto scrollbar-filter space-y-3 pr-1">
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
        </div>
    );
}

export default BrandFilter;
