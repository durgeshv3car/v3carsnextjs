'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCylinder } from '@/redux/slices/advanceSearchSlice';

type CylindersFilterProps = {
    openSection: string | null;
};

// Map display label to value for Redux
const cylinderRanges: { label: string; value: number }[] = [
    { label: '2 Cylinder', value: 2 },
    { label: '3 Cylinder', value: 3 },
    { label: '4 Cylinder', value: 4 },
    { label: '5 Cylinder', value: 5 },
    { label: '6 Cylinder', value: 6 },
    { label: '7 Cylinder', value: 7 },
    { label: '8 Cylinder & above', value: 8 },
];

function CylindersFilter({ openSection }: CylindersFilterProps) {
    const dispatch = useDispatch();
    const selectedCylinders = useSelector((state: RootState) => state.filters.cylinders);

    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'cylinders' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    const handleCheckboxChange = (value: { label: string; value: number }) => {
        dispatch(
            toggleCylinder({
                id: value.value,
                label: value.label,
            })
        );
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3 space-y-3">
                {cylinderRanges.map((cylinder, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id={`cylinder-${index}`}
                                checked={selectedCylinders.some((c) => String(c.id) === String(cylinder.value))}
                                onChange={() => handleCheckboxChange(cylinder)}
                            />
                            <div className="w-5 h-5 rounded-md border border-gray-400 peer-checked:bg-primary peer-checked:border-primary relative transition-all duration-200">
                                <svg
                                    className="w-3 h-3 text-black absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </label>
                        <label htmlFor={`cylinder-${index}`} className="flex-1">
                            {cylinder.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CylindersFilter;
