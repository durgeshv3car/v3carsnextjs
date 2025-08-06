'use client';

import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { RiArrowUpDownFill } from 'react-icons/ri';

export default function MobileFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState<number[]>([50000, 7000000]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  return (
    <>
      {/* Buttons Row */}
      <div className="flex gap-2 p-2 border-b border-gray-300">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 border border-yellow-500 text-yellow-600 rounded-full px-3 py-1 text-sm"
        >
          <PiSlidersHorizontal size={16} /> Filter
        </button>
        <button className="flex items-center gap-1 border border-yellow-500 text-yellow-600 rounded-full px-3 py-1 text-sm">
          <RiArrowUpDownFill size={16} /> Sort
        </button>
        <button className="flex items-center gap-1 border border-yellow-500 text-yellow-600 rounded-full px-3 py-1 text-sm">
          <BiChevronDown size={16} /> Price Range
        </button>
        <button className="flex items-center gap-1 border border-yellow-500 text-yellow-600 rounded-full px-3 py-1 text-sm">
          <BiChevronDown size={16} /> Brand
        </button>
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <button onClick={() => setShowFilter(false)}>&larr; Filter</button>
            <button className="text-red-500 text-sm font-medium">CLEAR ALL</button>
          </div>

          {/* Filter Content */}
          <div className="flex">
            {/* Left Panel */}
            <div className="w-1/3 border-r">
              <ul className="text-sm">
                <li className="bg-yellow-100 px-4 py-3 font-medium">Price Range</li>
                <li className="px-4 py-3">Brand + Model</li>
                <li className="px-4 py-3">Fuel Type</li>
                <li className="px-4 py-3">Body Type</li>
                <li className="px-4 py-3">Year</li>
                <li className="px-4 py-3">Transmission</li>
                <li className="px-4 py-3">Kms Driven</li>
                <li className="px-4 py-3">Color</li>
                <li className="px-4 py-3">Others</li>
              </ul>
            </div>

            {/* Right Panel */}
            <div className="w-2/3 p-4">
              <p className="text-sm font-medium mb-2">Price Range</p>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>₹ {price[0].toLocaleString()}</span>
                <span>₹ {price[1].toLocaleString()}</span>
              </div>
              {/* <Slider
                value={price}
                onChange={handlePriceChange}
                min={50000}
                max={7000000}
                step={10000}
                sx={{
                  color: '#f59e0b',
                  '& .MuiSlider-thumb': {
                    borderRadius: '50%',
                    border: '2px solid #f59e0b',
                  },
                }}
              /> */}
              <div className="flex justify-between text-xs mt-1">
                <span>Minimum</span>
                <span>Maximum</span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="px-4 py-4">
            <button
              onClick={() => setShowFilter(false)}
              className="w-full bg-yellow-500 text-white rounded-lg py-3 font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}
