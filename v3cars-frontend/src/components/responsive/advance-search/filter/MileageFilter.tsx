'use client';

import React, { useRef, useEffect, useState } from 'react';

type MileageFilterProps = {
    openSection: string | null;
};

const cylinderRanges: string[] = [
    'Under 10 kmpl',
    '10 kmpl - 15 kmpl',
    '15 kmpl and above',
];

function MileageFilter({ openSection }: MileageFilterProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'mileage' && contentRef.current) {
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
                <div className="my-3 space-y-3">
                        {cylinderRanges.map((range, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        id={`cylinder-${index}`}
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
                                <label htmlFor={`cylinder-${index}`} className="flex-1">
                                    {range}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
    );
}

export default MileageFilter;
