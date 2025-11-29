'use client';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFuelType } from '@/redux/slices/advanceSearchSlice';

type FuelFilterProps = {
    openSection: string | null;
};

// Fuel options
const fuelTypes = [
    { label: 'Petrol', value: 'Petrol', icon: '/car-image/suv.png' },
    { label: 'Diesel', value: 'Diesel', icon: '/car-image/sedan.png' },
    { label: 'CNG', value: 'CNG', icon: '/car-image/hatchback.png' },
    { label: 'Electric', value: 'Electric', icon: '/car-image/electric.png' },
    { label: 'Hybrid', value: 'Hybrid', icon: '/car-image/hybrid.png' },
];

const FuelTypeFilter = ({ openSection }: FuelFilterProps) => {
    const dispatch = useDispatch();
    const selectedFuel = useSelector((state: RootState) => state.filters.fuelType);

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

    const handleFuelClick = (value: string) => {
        // Toggle selection
        const newFuel = selectedFuel === value ? null : value;
        dispatch(setFuelType(newFuel));
    };

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <div className="my-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {fuelTypes.map((type) => (
                        <div
                            key={type.value}
                            onClick={() => handleFuelClick(type.value)}
                            className={`flex flex-col min-w-[105px] min-h-[80px] items-center justify-center text-sm gap-1 border rounded-xl dark:border-[#2E2E2E] cursor-pointer
                                ${selectedFuel === type.value ? 'border-primary bg-primary-light text-black' : ''}`}
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

export default FuelTypeFilter;
