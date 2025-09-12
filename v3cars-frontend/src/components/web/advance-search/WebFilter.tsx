'use client';

import BodyTypeFilter from '@/components/responsive/advance-search/filter/BodyType';
import BrandFilter from '@/components/responsive/advance-search/filter/BrandFilter';
import CylindersFilter from '@/components/responsive/advance-search/filter/CylindersFilter';
import EngineDisplacement from '@/components/responsive/advance-search/filter/EngineDisplacement';
import FuelTypeFilter from '@/components/responsive/advance-search/filter/FuelType';
import MileageFilter from '@/components/responsive/advance-search/filter/MileageFilter';
import PriceRangeFilter from '@/components/responsive/advance-search/filter/PriceRange';
import SeatingCapacityFilter from '@/components/responsive/advance-search/filter/SeatingCapacity';
import TransmissionFilter from '@/components/responsive/advance-search/filter/TransmissionFilter';
import { useState } from 'react';

interface FilterItem {
    key: string;
    title: string;
}

export const filtersConfig: FilterItem[] = [
    { key: 'brand', title: 'Brand' },
    { key: 'price', title: 'Price Range' },
    { key: 'body', title: 'Body Type' },
    { key: 'cylinders', title: 'Cylinders' },
    { key: 'fuel', title: 'Fuel Type' },
    { key: 'mileage', title: 'Mileage' },
    { key: 'capacity', title: 'Seating Capacity' },
    { key: 'transmission', title: 'Transmission' },
    { key: 'engine', title: 'Engine Displacement' },
];

export default function WebFilter() {
    const [openSection, setOpenSection] = useState<string | null>('brand');

    const toggleSection = (section: string) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const renderFilterComponent = (key: string) => {
        switch (key) {
            case 'brand':
                return <BrandFilter openSection={key} />;
            case 'price':
                return <PriceRangeFilter openSection={key} />;
            case 'body':
                return <BodyTypeFilter openSection={key} />;
            case 'cylinders':
                return <CylindersFilter openSection={key} />;
            case 'fuel':
                return <FuelTypeFilter openSection={key} />;
            case 'mileage':
                return <MileageFilter openSection={key} />;
            case 'capacity':
                return <SeatingCapacityFilter openSection={key} />;
            case 'transmission':
                return <TransmissionFilter openSection={key} />;
            case 'engine':
                return <EngineDisplacement openSection={key} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full rounded-xl p-4 border dark:border-[#2E2E2E] divide-y-[1px] dark:divide-[#2E2E2E] space-y-3">
            <h2 className="text-2xl font-semibold">Filters</h2>

            {filtersConfig.map(({ key, title }) => (
                <div key={key} className="pt-3">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(key)}
                    >
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <div
                            className={`transition-transform duration-300 ${openSection === key ? 'rotate-180' : 'rotate-0'
                                }`}
                        >
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

                    {/* Conditionally Render Filter Component */}
                    {openSection === key && renderFilterComponent(key)}
                </div>
            ))}
        </div>
    );
}
