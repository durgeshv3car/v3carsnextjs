'use client';

import Slider from '@/components/ui/custom-range-input/Slider';
import React, { useRef, useEffect, useState } from 'react';

type TransmissionFilterProps = {
    openSection: string | null;
    toggleSection: (section: string) => void;
};

const cylinderRanges: string[] = [
    'Automatic',
    'Manual',
];

function TransmissionFilter({ openSection, toggleSection }: TransmissionFilterProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'transmission' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    return (
        <div className="pt-3">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('transmission')}
            >
                <h3 className="font-semibold text-lg">Transmission</h3>
                <div className={`${openSection === 'transmission' ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>
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
                <div className="my-3 space-y-3">
                        {cylinderRanges.map((range, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        id={`transmission-${index}`}
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
                                <label htmlFor={`transmission-${index}`} className="flex-1">
                                    {range}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TransmissionFilter;
