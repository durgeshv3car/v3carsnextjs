'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import React, { useState } from "react";

const FilterSection: React.FC = () => {
    const [fuelType, setFuelType] = useState<"Petrol" | "Diesel" | "CNG">("Petrol");

    const fuelOptions: ("Petrol" | "Diesel" | "CNG")[] = ["Petrol", "Diesel", "CNG"];

    const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
    const items2 = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

    const handleSelection = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <div className="px-4 xl:px-10 bg-[#E2E2E2] dark:bg-[#2E2E2E]">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[1600px] py-10 mx-auto">

                {/* Left Section */}
                <div className="flex flex-col justify-end items-center gap-4">
                    <h2 className="text-4xl">
                        Calculate Car{" "}
                        <span className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-semibold text-2xl rounded-full">On-Road</span><br />
                        Price In India
                    </h2>
                    <img
                        src="/car-on-road-price.png"
                        alt="Car"
                        className="w-96 object-contain"
                    />
                </div>

                {/* Right Section */}
                <div className="bg-white dark:bg-[#171717] rounded-2xl">
                    <div className="bg-black text-white text-center rounded-t-2xl py-3">
                        SELECT FILTER RIGHT CAR PRICE
                    </div>
                    <div className="px-4 py-8 grid grid-cols-2 gap-6 text-sm">
                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect options={items} placeholder={"Select Brand Name"} onSelect={handleSelection} />
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect options={items2} placeholder={"Select Model"} onSelect={handleSelection} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <p className="mb-2 text-sm font-medium">Select Fuel Type</p>
                            <div className="flex gap-2">
                                {fuelOptions.map((fuel) => (
                                    <button
                                        key={fuel}
                                        onClick={() => setFuelType(fuel)}
                                        className={`w-full px-4 py-2 rounded-full ${fuelType === fuel
                                            ? "bg-yellow-400 text-black font-medium"
                                            : "bg-gray-200 dark:bg-[#2E2E2E]"
                                            }`}
                                    >
                                        {fuel}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect options={items2} placeholder={"Select Model"} onSelect={handleSelection} />
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect options={items} placeholder={"Select Brand Name"} onSelect={handleSelection} />
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full col-span-2 lg:col-span-1'>
                            <CustomSelect options={items2} placeholder={"Select Model"} onSelect={handleSelection} />
                        </div>

                        {/* Button */}
                        <button className="col-span-2 bg-yellow-400 text-black font-semibold py-3 text-lg rounded-lg hover:bg-yellow-500 transition">
                            Get On Road Price
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
