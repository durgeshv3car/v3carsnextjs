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
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FilterModelProps {
    showFilter: string;
    showOthers: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<string>>;
    setShowOthers: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModel: React.FC<FilterModelProps> = ({ showFilter, setShowFilter, showOthers, setShowOthers }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !showFilter) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setShowFilter("")} />

            {/* Filter Panel */}
            <div className="relative w-full bg-white dark:bg-black h-screen animate-slideUp overflow-hidden flex flex-col z-10">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b dark:border-[#2E2E2E]">
                    <button
                        onClick={() => {
                            setShowOthers(false)
                            setShowFilter("")
                        }}
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                        Filter
                    </button>
                    <button className="text-red-500 text-sm font-semibold">CLEAR ALL</button>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panel */}
                    <div className="w-1/3 border-r dark:border-[#2E2E2E] overflow-y-auto">
                        <ul className="text-sm">
                            <li
                                onClick={() => { setShowFilter("Range") }}
                                className={`p-4 ${showFilter === "Range" || showFilter === "Filter" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Price Range
                            </li>
                            <li
                                onClick={() => { setShowFilter("Brand") }}
                                className={`p-4 ${showFilter === "Brand" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Brand
                            </li>
                            <li
                                onClick={() => { setShowFilter("Fuel") }}
                                className={`p-4 ${showFilter === "Fuel" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Fuel Type
                            </li>
                            <li
                                onClick={() => { setShowFilter("Body") }}
                                className={`p-4 ${showFilter === "Body" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Body Type
                            </li>
                            <li
                                onClick={() => { setShowFilter("Transmission") }}
                                className={`p-4 ${showFilter === "Transmission" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Transmission
                            </li>
                            <li
                                onClick={() => { setShowFilter("Mileage") }}
                                className={`p-4 ${showFilter === "Mileage" ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Mileage
                            </li>
                            <li
                                onClick={() => { setShowOthers(!showOthers) }}
                                className={`p-4 flex justify-between items-center ${showOthers ? "bg-primary-light text-black font-semibold" : ""}`}
                            >
                                Others
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-4 transition-all duration-300 ${showOthers ? "rotate-180" : "rotate-0"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </li>
                            {
                                showOthers && (
                                    <div className='bg-slate-100 dark:bg-[#171717] divide-y-[1px] dark:divide-[#2E2E2E]'>
                                        <div
                                            className={`p-4 ${showFilter === "cylinders" ? "bg-primary-light text-black font-semibold" : ""}`}
                                            onClick={() => { setShowFilter("cylinders") }}
                                        >
                                            Cylinders
                                        </div>

                                        <div
                                            className={`p-4 ${showFilter === "seating" ? "bg-primary-light text-black font-semibold" : ""}`}
                                            onClick={() => { setShowFilter("seating") }}
                                        >
                                            Seating Capacity
                                        </div>

                                        <div
                                            className={`p-4 ${showFilter === "engine" ? "bg-primary-light text-black font-semibold" : ""}`}
                                            onClick={() => { setShowFilter("engine") }}
                                        >
                                            Engine Displacement
                                        </div>
                                    </div>
                                )
                            }
                        </ul>
                    </div>

                    {/* Right Panel */}
                    <div className="w-2/3 p-4 overflow-y-auto">
                        {showFilter === "Range" || showFilter === "Filter" ?
                            <>
                                <h2 className='font-semibold'>Price Range</h2>
                                <PriceRangeFilter openSection={"price"} />
                            </>
                            : ""
                        }
                        {showFilter === "Brand" && (
                            <>
                                <h2 className='font-semibold'>Brands</h2>
                                <BrandFilter openSection={"brand"} />
                            </>
                        )}
                        {showFilter === "Fuel" && (
                            <>
                                <h2 className='font-semibold'>Fuel Type</h2>
                                <FuelTypeFilter openSection={"fuel"} />
                            </>
                        )}
                        {showFilter === "Body" && (
                            <>
                                <h2 className='font-semibold'>Body Type</h2>
                                <BodyTypeFilter openSection={"body"} />
                            </>
                        )}
                        {showFilter === "Transmission" && (
                            <>
                                <h2 className='font-semibold'>Transmission</h2>
                                <TransmissionFilter openSection={"transmission"} />
                            </>
                        )}
                        {showFilter === "Mileage" && (
                            <>
                                <h2 className='font-semibold'>Mileage</h2>
                                <MileageFilter openSection={"mileage"} />
                            </>
                        )}
                        {showFilter === "cylinders" && (
                            <>
                                <h2 className='font-semibold'>Cylinders</h2>
                                <CylindersFilter openSection={"cylinders"} />
                            </>
                        )}
                        {showFilter === "seating" && (
                            <>
                                <h2 className='font-semibold'>Seating Capacity</h2>
                                <SeatingCapacityFilter openSection={"capacity"} />
                            </>
                        )}
                        {showFilter === "engine" && (
                            <>
                                <h2 className='font-semibold'>Engine Displacement</h2>
                                <EngineDisplacement openSection={"engine"} />
                            </>
                        )}
                    </div>
                </div>

                {/* Apply Button */}
                <div className="p-4 border-t dark:border-[#2E2E2E] shrink-0">
                    <button
                        onClick={() => {
                            setShowOthers(false)
                            setShowFilter("")
                        }}
                        className="w-full bg-primary text-black rounded-lg py-3 font-semibold"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default FilterModel;
