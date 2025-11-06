'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setMileage } from '@/redux/slices/advanceSearchSlice';

type MileageFilterProps = {
    openSection: string | null;
};

// Map display label to Redux value
const mileageRanges: { label: string; value: string }[] = [
    { label: 'Under 10 kmpl', value: 'UNDER_10' },
    { label: '10 kmpl - 15 kmpl', value: 'BETWEEN_10_15' },
    { label: '15 kmpl and above', value: 'ABOVE_15' },
];

function MileageFilter({ openSection }: MileageFilterProps) {
    const dispatch = useDispatch();
    const selectedMileage = useSelector((state: RootState) => state.filters.mileage);

    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'mileage' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    const handleCheckboxChange = (value: string) => {
        // Toggle selection
        const newValue = selectedMileage === value ? null : value;
        dispatch(setMileage(newValue));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3 space-y-3">
                {mileageRanges.map((range, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id={`mileage-${index}`}
                                checked={selectedMileage === range.value}
                                onChange={() => handleCheckboxChange(range.value)}
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
                        <label htmlFor={`mileage-${index}`} className="flex-1">
                            {range.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MileageFilter;
