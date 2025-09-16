'use client';
import { useRef, useEffect, useState } from 'react';

type BodyFilterProps = {
    openSection: string | null;
};

const bodyTypes = [
    { label: 'SUV', icon: '/car-image/suv.png' },
    { label: 'Sedan', icon: '/car-image/sedan.png' },
    { label: 'Hatchback', icon: '/car-image/hatchback.png' },
    { label: 'Pickup', icon: '/car-image/pickup.png' },
    { label: 'Coupe', icon: '/car-image/coupe.png' },
    { label: 'Convertible', icon: '/car-image/convertible.png' },
    { label: 'Hybrid', icon: '/car-image/hybrid.png' },
    { label: 'Electric', icon: '/car-image/electric.png' },
];

const BodyTypeFilter = ({ openSection }: BodyFilterProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (openSection === 'body') {
            const scrollHeight = contentRef.current?.scrollHeight || 0;
            setHeight(scrollHeight);
        } else {
            setHeight(0);
        }
    }, [openSection]);

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {bodyTypes.map((type, index) => (
                        <div
                            key={index}
                            className="flex flex-col min-w-[105px] min-h-[80px] items-center justify-center text-sm gap-1 border rounded-xl dark:border-[#2E2E2E]"
                        >
                            <img
                                src={type.icon}
                                alt={type.label}
                                width={60}
                                height={60}
                                className='dark:invert'
                            />
                            {type.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BodyTypeFilter;
