'use client';
import { useRef, useEffect, useState } from 'react';

type FuelFilterProps = {
    openSection: string | null;
    toggleSection: (section: string) => void;
};

const bodyTypes = [
    { label: 'Petrol', icon: '/car-image/suv.png' },
    { label: 'Diesel', icon: '/car-image/sedan.png' },
    { label: 'CNG', icon: '/car-image/hatchback.png' },
    { label: 'Electric', icon: '/car-image/electric.png' },
    { label: 'Hybrid', icon: '/car-image/hybrid.png' },
];

const FuelTypeFilter = ({ openSection, toggleSection }: FuelFilterProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (openSection === 'fuel') {
            const scrollHeight = contentRef.current?.scrollHeight || 0;
            setHeight(scrollHeight);
        } else {
            setHeight(0);
        }
    }, [openSection]);

    return (
        <div className="pt-3">
            {/* Toggle Header */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('fuel')}
            >
                <h3 className="font-semibold text-lg">Fuel Type</h3>
                <div className={`${openSection === 'fuel' ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>
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

            {/* Animated Section */}
            <div
                ref={contentRef}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight: height }}
            >
                <div className="my-3">
                    <div className="grid grid-cols-3 gap-2">
                        {bodyTypes.map((type, index) => (
                            <div
                                key={index}
                                className="flex flex-col min-w-[105px] min-h-[80px] items-center justify-center text-sm gap-1 border rounded-lg dark:border-neutral-700"
                            >
                                <img
                                    src={type.icon}
                                    alt={type.label}
                                    width={60}
                                    height={60}
                                />
                                {type.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuelTypeFilter;
