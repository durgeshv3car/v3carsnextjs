'use client';

import { clearPriceBucket, setPriceRange } from '@/redux/slices/advanceSearchSlice';
import { RootState } from '@/redux/store';
import { formatINRCompact } from '@/utils/helperFunction';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const INITIAL_MAX_PRICE = 5000000;
export const INITIAL_MIN_PRICE = 1;

const Slider = () => {
  const step = 1;

  const [minPrice, setMinPrice] = useState(INITIAL_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const dispatch = useDispatch()
  const selectedPriceBucket = useSelector(
    (state: RootState) => state.filters.priceBucket
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);

    if (selectedPriceBucket) {
      dispatch(clearPriceBucket());
    }

    setMinPrice(value);
    dispatch(
      setPriceRange({
        minPrice: value,   // ✅ new value
        maxPrice,
      })
    );
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + step);

    if (selectedPriceBucket) {
      dispatch(clearPriceBucket());
    }

    setMaxPrice(value);
    dispatch(
      setPriceRange({
        minPrice,
        maxPrice: value,   // ✅ new value
      })
    );
  };

  return (
    <div className="w-full">
      <div className="text-center text-primary font-semibold text-sm mb-2">
        Rs. {formatINRCompact(minPrice)} - {formatINRCompact(maxPrice)}
      </div>

      {/* Slider container */}
      <div className="relative w-full h-5">
        {/* Full background line */}
        <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-primary-light rounded-full -translate-y-1/2 z-0" />

        {/* Active range bar */}
        <div
          className="absolute h-[2px] bg-primary rounded-full z-10"
          style={{
            left: `${(minPrice / INITIAL_MAX_PRICE) * 100}%`,
            width: `${((maxPrice - minPrice) / INITIAL_MAX_PRICE) * 100}%`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Left Thumb */}
        <input
          type="range"
          min={INITIAL_MIN_PRICE}
          max={INITIAL_MAX_PRICE}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none z-30"
        />

        {/* Right Thumb */}
        <input
          type="range"
          min={INITIAL_MIN_PRICE}
          max={INITIAL_MAX_PRICE}
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
