'use client';

import React, { useState } from 'react';

const Slider = () => {
  const minVal = 1;
  const maxVal = 100;
  const step = 1;

  const [minPrice, setMinPrice] = useState(minVal);
  const [maxPrice, setMaxPrice] = useState(maxVal);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
  };

  return (
    <div className="w-full">
      <div className="text-center text-yellow-500 font-semibold text-sm mb-2">
        Rs. {minPrice} Lakh - {maxPrice === 100 ? '1 Crore' : `${maxPrice} Lakh`}
      </div>

      {/* Slider container */}
      <div className="relative w-full h-5">
        {/* Full background line */}
        <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-yellow-200 rounded-full -translate-y-1/2 z-0" />

        {/* Active range bar */}
        <div
          className="absolute h-[2px] bg-yellow-400 rounded-full z-10"
          style={{
            left: `${(minPrice / maxVal) * 100}%`,
            width: `${((maxPrice - minPrice) / maxVal) * 100}%`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Left Thumb */}
        <input
          type="range"
          min={minVal}
          max={maxVal}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none z-30"
        />

        {/* Right Thumb */}
        <input
          type="range"
          min={minVal}
          max={maxVal}
          step={step}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none z-30"
        />
      </div>

      {/* Custom styles for thumbs */}
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          background: #facc15;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          margin-top: -6px;
          pointer-events: auto;
        }

        input[type='range']::-moz-range-thumb {
          height: 18px;
          width: 18px;
          background: #facc15;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }

        input[type='range']::-ms-thumb {
          height: 18px;
          width: 18px;
          background: #facc15;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }

        input[type='range']::-webkit-slider-runnable-track {
          height: 6px;
        }
      `}</style>
    </div>
  );
};

export default Slider;
