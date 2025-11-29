'use client';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setBodyTypeIds } from '@/redux/slices/advanceSearchSlice';

type BodyFilterProps = {
    openSection: string | null;
};

const bodyTypes = [
    { id: 3, label: 'SUV', icon: '/car-image/suv.png' },
    { id: 4, label: 'Sedan', icon: '/car-image/sedan.png' },
    { id: 1, label: 'Hatchback', icon: '/car-image/hatchback.png' },
    { id: 6, label: 'Pickup', icon: '/car-image/pickup.png' },
    { id: 8, label: 'Coupe', icon: '/car-image/coupe.png' },
    { id: 9, label: 'Convertible', icon: '/car-image/convertible.png' },
    { id: 5, label: 'Crossover', icon: '/car-image/hybrid.png' },
    { id: 7, label: 'MUV', icon: '/car-image/electric.png' },
];

const BodyTypeFilter = ({ openSection }: BodyFilterProps) => {
    const dispatch = useDispatch();
    const selectedBodyTypeIds = useSelector((state: RootState) => state.filters.bodyTypeIds);

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

    const handleBodyClick = (id: number) => {
        const updated = selectedBodyTypeIds.includes(id)
            ? selectedBodyTypeIds.filter((item) => item !== id)
            : [...selectedBodyTypeIds, id];

        dispatch(setBodyTypeIds(updated));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {bodyTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => handleBodyClick(type.id)}
                            className={`flex flex-col min-w-[105px] min-h-[80px] items-center justify-center text-sm gap-1 border rounded-xl dark:border-[#2E2E2E] cursor-pointer
                                ${selectedBodyTypeIds.includes(type.id) ? 'border-primary bg-primary-light text-black' : ''}`}
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
