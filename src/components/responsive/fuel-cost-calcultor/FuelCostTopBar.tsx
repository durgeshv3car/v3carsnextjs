'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaRupeeSign, FaEdit, FaChevronDown } from 'react-icons/fa';

export default function FuelCalculatorTopBar() {
    const [distanceType, setDistanceType] = useState('daily');

    return (
        <div className="w-full bg-[#111] ">

            {/* ========== Top Image Background Bar ========== */}
            <div className="relative w-full h-[100px] sm:h-[200px] bg-[#EAEFF2] overflow-hidden z-10">

                <Image
                    src="/fuel-cost-calculator/topbar.png"
                    alt="Background Skyline"
                    width={280}
                    height={230}
                    className="w-full h-[200px]"
                    priority
                />

                {/* Actual Country Dropdown */}
                <div className="absolute bottom-0 left-[10%] ">
                    <select
                        className="bg-[#1A1A1A] text-white text-[13px] font-semibold  px-4 py-2 appearance-none w-[190px] shadow-sm border border-[#333] focus:outline-none"
                        defaultValue=""
                    >

                        <option value="" disabled>Select Country</option>
                        <option value="india">India</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="uae">United Arab Emirates</option>
                        <option value="canada">Canada</option>
                        {/* Add more as needed */}


                    </select>
                </div>

                {/* Cars Image */}
                <div className="absolute right-20 bottom-0  w-auto">
                    <Image
                        src="/fuel-cost-calculator/fuel-cars.png"
                        alt="Fuel Cars"
                        width={280}
                        height={230}
                        className="h-[250px] w-auto"
                    />
                </div>

            </div>

            {/* ========== Options Bar ========== */}
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center px-4 sm:px-8 py-4 gap-4 bg-[#1A1A1A] text-white text-sm font-medium">

                {/* Currency */}
                <div className="flex flex-col gap-1 min-w-[180px] pr-6 border-r border-[#3A3A3A]">
                    <span className="text-[12px] text-[#FFCC00] font-semibold">Currency</span>
                    <div className="flex items-center border-b border-[#444] pb-1 relative">
                        {/* ₹ icon box */}
                        <div className="w-8 h-8 bg-[#FFCC00] rounded flex items-center justify-center text-black font-bold text-[14px]">
                            <FaRupeeSign />
                        </div>

                        {/* Select dropdown */}
                        <select
                            className="appearance-none bg-transparent text-white text-sm ml-2 pr-6 outline-none"
                            defaultValue="INR"
                        >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>

                        {/* Dropdown icon */}
                        <FaChevronDown className="absolute right-1 text-white text-xs pointer-events-none" />
                    </div>
                </div>

                {/* Distance Unit */}
                <div className="flex flex-col gap-1 min-w-[130px] pr-6 border-r border-[#3A3A3A]">

                    <span className="text-[12px] text-[#FFCC00] font-semibold">Currency</span>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1">
                            <input type="radio" name="distance" defaultChecked />
                            <span>Kilometre</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="distance" />
                            <span>Miles</span>
                        </label>
                    </div>

                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1 pr-6 border-r border-[#3A3A3A]">

                    <span className="text-[12px] text-[#FFCC00] font-semibold">Quantity</span>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1">
                            <input type="radio" name="quantity" defaultChecked />
                            <span>Liter</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="quantity" />
                            <span>Gallon</span>
                        </label>
                    </div>

                </div>

                {/* Driving Distance */}
                <div className="flex flex-col gap-1 pr-6 border-r border-[#3A3A3A]">
                    <span className="text-[12px] text-[#FFCC00] font-semibold">Driving Distance</span>
                    <div className="flex items-center gap-4">
                        {['daily', 'monthly', 'yearly'].map((type) => (
                            <label key={type} className="flex items-center gap-1 capitalize">
                                <input
                                    type="radio"
                                    name="driving"
                                    checked={distanceType === type}
                                    onChange={() => setDistanceType(type)}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Distance Value Box */}
                <div className="ml-auto bg-[#2B2B2B] rounded-md px-3 py-2 text-right text-[#FFCC00] font-semibold text-[15px] flex flex-col items-end justify-center min-w-[100px]">
                    <span className="text-[11px] text-white">DAILY</span>
                    <div className="flex items-center gap-1 text-[18px]">
                        2100
                        <FaEdit size={14} />
                    </div>
                </div>

            </div>
        </div>
    );
}
