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

export default function WebFilter() {
    const [openSection, setOpenSection] = useState<string | null>("brand");

    const toggleSection = (section: string) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    return (
        <div className="w-full rounded-xl p-4 shadow-md divide-y-[1px] space-y-3">
            <h2 className="text-2xl font-semibold">Filters</h2>

            {/* Brand Filter */}
            <BrandFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Price Range */}
            <PriceRangeFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <BodyTypeFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <CylindersFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <FuelTypeFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <MileageFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <SeatingCapacityFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <TransmissionFilter openSection={openSection} toggleSection={toggleSection} />

            {/* Body Type */}
            <EngineDisplacement openSection={openSection} toggleSection={toggleSection} />

        </div>
    );
}
