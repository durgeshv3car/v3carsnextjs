'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setEngineDisplacement } from '@/redux/slices/advanceSearchSlice';

type EngineDisplacementProps = {
    openSection: string | null;
};

const engineOptions = [
    { label: '800cc cars', value: '800' },
    { label: '1000cc cars', value: '1000' },
    { label: '800cc to 1000cc cars', value: '800_1000' },
    { label: '1000cc to 1500cc cars', value: '1000_1500' },
    { label: '1500cc to 2000cc cars', value: '1500_2000' },
    { label: '2000cc to 3000cc cars', value: '2000_3000' },
    { label: '3000cc to 4000cc cars', value: '3000_4000' },
    { label: 'Above 4000cc cars', value: 'ABOVE_4000' },
];

function EngineDisplacement({ openSection }: EngineDisplacementProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    const dispatch = useDispatch();
    const selectedDisplacements = useSelector(
        (state: RootState) => state.filters.engineDisplacement
    ) as string[]; // array of selected values

    useEffect(() => {
        if (openSection === 'engine' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    const handleSelect = (value: string) => {
        let updatedList: string[];

        if (selectedDisplacements.includes(value)) {
            // Remove if already selected
            updatedList = selectedDisplacements.filter((v) => v !== value);
        } else {
            // Add new selection
            updatedList = [...selectedDisplacements, value];
        }

        dispatch(setEngineDisplacement(updatedList));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3 space-y-3">
                {engineOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id={`engine-${index}`}
                                checked={selectedDisplacements.includes(option.value)}
                                onChange={() => handleSelect(option.value)}
                            />
                            <div className="w-5 h-5 rounded-md border border-gray-400 peer-checked:bg-primary peer-checked:border-primary relative transition-all duration-200">
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
                        <label htmlFor={`engine-${index}`} className="flex-1">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EngineDisplacement;
