'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import Slider from '@/components/ui/custom-range-input/Slider';
import { setPriceBucket } from '@/redux/slices/advanceSearchSlice';

type PriceRangeFilterProps = {
    openSection: string | null;
};

// Display values
const priceRanges: { label: string; bucket: string }[] = [
    { label: '₹ 1 - ₹ 5 Lakh', bucket: 'UNDER_5L' },
    { label: '₹ 5 - ₹ 10 Lakh', bucket: 'BETWEEN_5_10L' },
    { label: '₹ 10 - ₹ 20 Lakh', bucket: 'BETWEEN_10_20L' },
    { label: '₹ 20 - ₹ 40 Lakh', bucket: 'BETWEEN_20_40L' },
    { label: 'Above ₹ 40 Lakh', bucket: 'ABOVE_40L' },
];

function PriceRangeFilter({ openSection }: PriceRangeFilterProps) {
    const dispatch = useDispatch();
    const selectedPriceBucket = useSelector((state: RootState) => state.filters.priceBucket);

    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'price' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    const handleCheckboxChange = (bucket: string) => {
        // If the same bucket is clicked, deselect
        const newBucket = selectedPriceBucket === bucket ? null : bucket;
        dispatch(setPriceBucket(newBucket));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3 space-y-3">

                <Slider />

                <div className="max-h-48 overflow-y-auto scrollbar-filter space-y-3 pr-1">
                    {priceRanges.map((range, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    id={`price-${index}`}
                                    checked={selectedPriceBucket === range.bucket}
                                    onChange={() => handleCheckboxChange(range.bucket)}
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
                            <label htmlFor={`price-${index}`} className="flex-1 text-sm">
                                {range.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PriceRangeFilter;
