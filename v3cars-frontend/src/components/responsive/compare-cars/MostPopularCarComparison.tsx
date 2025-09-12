'use client'

import React from 'react';
import { FaBolt, FaRoad, FaTachometerAlt } from 'react-icons/fa';

const carComparisons = [
    {
        id: 1,
        car1: {
            brand: 'FORD',
            name: 'S-Presso',
            price: '₹10.99 - ₹19.93 lakh*',
            power: '83PS',
            torque: '113Nm',
            mileage: '21.11kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
        car2: {
            brand: 'FORD',
            name: 'S-Presso',
            price: '₹10.99 - ₹19.93 lakh*',
            power: '83PS',
            torque: '113Nm',
            mileage: '21.11kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
    },
    {
        id: 2,
        car1: {
            brand: 'FORD',
            name: 'EcoSport',
            price: '₹9.50 - ₹11.50 lakh*',
            power: '98PS',
            torque: '125Nm',
            mileage: '20.2kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
        car2: {
            brand: 'FORD',
            name: 'EcoSport',
            price: '₹9.50 - ₹11.50 lakh*',
            power: '98PS',
            torque: '125Nm',
            mileage: '20.2kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
    },
    {
        id: 3,
        car1: {
            brand: 'FORD',
            name: 'Endeavour',
            price: '₹29.55 - ₹36.27 lakh*',
            power: '170PS',
            torque: '420Nm',
            mileage: '12.4kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
        car2: {
            brand: 'FORD',
            name: 'Endeavour',
            price: '₹29.55 - ₹36.27 lakh*',
            power: '170PS',
            torque: '420Nm',
            mileage: '12.4kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
    },
    {
        id: 4,
        car1: {
            brand: 'FORD',
            name: 'Endeavour',
            price: '₹29.55 - ₹36.27 lakh*',
            power: '170PS',
            torque: '420Nm',
            mileage: '12.4kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
        car2: {
            brand: 'FORD',
            name: 'Endeavour',
            price: '₹29.55 - ₹36.27 lakh*',
            power: '170PS',
            torque: '420Nm',
            mileage: '12.4kmpl',
            image: '/popular-cars/grand-vitara.png',
        },
    },
];

const MostPopularCarComparison = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-6">Most Popular Car Comparison by Tool</h2>

            <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                {carComparisons.map((comparison) => (
                    <div key={comparison.id}>
                        <div className="relative min-w-[390px] flex gap-2 items-start justify-center border dark:border-[#2E2E2E] rounded-t-xl p-1">
                            {/* Car 1 */}
                            <div className="w-full">
                                <div className="relative max-w-[253px] h-[143px]">
                                    <img
                                        src={comparison.car1.image}
                                        alt="car"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 rounded-b-xl text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="line-clamp-2">{comparison.car1.brand}</h3>
                                    </div>
                                </div>
                                <div className="space-y-4 m-4">
                                    <div className="flex flex-col lg:flex-row justify-between items-center">
                                        <div className="text-sm font-semibold">{comparison.car1.name}</div>
                                        <div className="text-sm font-medium">
                                            {comparison.car1.price}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-center text-xs border-t pt-2 dark:border-[#2E2E2E]">
                                        <div className="flex flex-col items-center gap-1">
                                            <FaBolt />
                                            {comparison.car1.power}
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaRoad />
                                            {comparison.car1.torque}
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaTachometerAlt />
                                            {comparison.car1.mileage}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* VS Circle */}
                            <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="w-16 h-16 bg-black text-yellow-400 font-bold text-lg rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                                    VS
                                </div>
                            </div>

                            {/* Car 2 */}
                            <div className="w-full overflow-hidden">
                                <div className="relative max-w-[253px] h-[143px]">
                                    <img
                                        src={comparison.car2.image}
                                        alt="car"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <div className="absolute bottom-0 w-full px-4 pt-6 pb-3 rounded-b-xl text-xs font-semibold text-white bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="line-clamp-2">{comparison.car2.brand}</h3>
                                    </div>
                                </div>
                                <div className="space-y-4 m-4">
                                    <div className="flex flex-col lg:flex-row justify-between items-center">
                                        <div className="text-sm font-semibold">{comparison.car2.name}</div>
                                        <div className="text-sm font-medium">
                                            {comparison.car2.price}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-center text-xs border-t pt-2 dark:border-[#2E2E2E]">
                                        <div className="flex flex-col items-center gap-1">
                                            <FaBolt />
                                            {comparison.car2.power}
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaRoad />
                                            {comparison.car2.torque}
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <FaTachometerAlt />
                                            {comparison.car2.mileage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="bg-yellow-400 hover:bg-yellow-500 w-full py-3 rounded-b-xl text-black font-semibold text-sm">
                            Compare Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostPopularCarComparison;
