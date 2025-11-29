'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSeatingList } from '@/redux/slices/advanceSearchSlice';

type SeatingCapacityFilterProps = {
    openSection: string | null;
};

// label + value mapping
const seatingOptions = [
    { label: '2 Seater', value: 2 },
    { label: '4 Seater', value: 4 },
    { label: '5 Seater', value: 5 },
    { label: '6 Seater', value: 6 },
    { label: '7 Seater', value: 7 },
    { label: '8 Seater', value: 8 },
    { label: '9 Seater', value: 9 },
];

function SeatingCapacityFilter({ openSection }: SeatingCapacityFilterProps) {
    const dispatch = useDispatch();
    const selectedSeats = useSelector((state: RootState) => state.filters.seatingList);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (openSection === 'capacity' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    const handleSeatToggle = (seatValue: number) => {
        let updatedSeats;

        if (selectedSeats.includes(seatValue)) {
            // remove seat if already selected
            updatedSeats = selectedSeats.filter((s: number) => s !== seatValue);
        } else {
            // add seat if not selected
            updatedSeats = [...selectedSeats, seatValue];
        }

        dispatch(setSeatingList(updatedSeats));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3 space-y-3">
                {seatingOptions.map((seat, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id={`seat-${index}`}
                                checked={selectedSeats.includes(seat.value)}
                                onChange={() => handleSeatToggle(seat.value)}
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
                        <label htmlFor={`seat-${index}`} className="flex-1">
                            {seat.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeatingCapacityFilter;
