'use client';

import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { RiArrowUpDownFill } from 'react-icons/ri';
import FilterModel from './FilterModel';

const MobileFilter: React.FC = () => {
  const [showFilter, setShowFilter] = useState<string>("");
  const [showOthers, setShowOthers] = useState<boolean>(false);

  return (
    <>
      {/* Buttons Row */}
      <div className="flex gap-3 text-nowrap overflow-x-auto scroll-smooth scrollbar-hide text-xs">
        <button
          onClick={() => setShowFilter("Filter")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <PiSlidersHorizontal size={16} /> Filter
        </button>
        <button
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <RiArrowUpDownFill size={16} /> Sort
        </button>
        <button
          onClick={() => setShowFilter("Range")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Price Range
        </button>
        <button
          onClick={() => setShowFilter("Brand")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Brand
        </button>
        <button
          onClick={() => setShowFilter("Fuel")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Fuel Type
        </button>
        <button
          onClick={() => setShowFilter("Body")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Body Type
        </button>
        <button
          onClick={() => setShowFilter("Transmission")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Transmission
        </button>
        <button
          onClick={() => setShowFilter("Mileage")}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Mileage
        </button>
        <button
          onClick={() => {
            setShowOthers(true)
            setShowFilter("cylinders")
          }}
          className="flex items-center gap-0.5 border border-primary text-primary rounded-full px-3 py-1"
        >
          <BiChevronDown size={20} /> Others
        </button>
      </div>

      <FilterModel showFilter={showFilter} setShowFilter={setShowFilter} showOthers={showOthers} setShowOthers={setShowOthers} />
    </>
  );
}

export default MobileFilter;