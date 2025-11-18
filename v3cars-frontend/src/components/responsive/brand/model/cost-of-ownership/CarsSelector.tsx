'use client'

import React from "react";
import { FaCar } from "react-icons/fa";

export default function CarsSelector() {
    return (

        <div>
            <h1 className="text-2xl font-semibold mb-2">
                Tata Nexon - <span className="font-bold">Select City & Variant</span>
            </h1>
            <p className="text-gray-600 mb-6">
                Choose your city, fuel, transmission and variant to generate the on-road
                price then we will use that for maintenance and running cost
            </p>

            <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-6 w-[4px] bg-yellow-400 rounded-lg"></span>
                    <FaCar size={28} />
                    <h2 className="text-xl font-semibold">Step 1: Select Your Car</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                            <option>Select</option>
                        </select>
                    </div>

                    {/* Fuel */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Fuel</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                            <option>Select</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Transmission</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                            <option>Select</option>
                        </select>
                    </div>

                    {/* Variant */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Variant</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                            <option>Select</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
