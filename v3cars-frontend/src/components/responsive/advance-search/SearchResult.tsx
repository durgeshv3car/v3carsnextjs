'use client'

import { useState } from 'react'
import { FaThList } from 'react-icons/fa'
import CarGridCard from './card-type-show/CarGridCard'
import CarListCard from './card-type-show/CarListCard'
import { IoGrid } from 'react-icons/io5'
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect'

const dummyData = [
    {
        name: "Maruti Suzuki Grand Vitara",
        price: "₹10.99 - ₹19.93 lakh",
        mileage: "21.79kmpl",
        engine: "1462CC",
        fuel: "Petrol",
        seats: "5",
        image: "/popular.png",
    },
    {
        name: "Tata Nexon",
        price: "₹8.00 - ₹15.60 lakh",
        mileage: "17.44kmpl",
        engine: "1199CC",
        fuel: "Petrol",
        seats: "5",
        image: "/popular.png",
    },
];

export default function SearchResult() {
    const [view, setView] = useState<"grid" | "list">("grid");

    const items = ['Popularity', 'Upcoming', "Latest"];

    const handleSelection = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Your Search Result</h2>
                    <p>258  Cars in India With Search Options</p>
                </div>
                <div className="flex gap-2">
                    <div className='w-[300px] border dark:border-[#2E2E2E] rounded-lg text-sm'>
                        <CustomSelect options={items} placeholder={"Select Type"} onSelect={handleSelection} />
                    </div>
                    <button
                        onClick={() => setView("list")}
                        className={`w-10 h-10 flex justify-center items-center border dark:border-[#2E2E2E] rounded ${view === "list" ? "bg-gray-200 dark:bg-[#27272a]" : ""}`}
                    >
                        <FaThList />
                    </button>
                    <button
                        onClick={() => setView("grid")}
                        className={`w-10 h-10 flex justify-center items-center border dark:border-[#2E2E2E] rounded ${view === "grid" ? "bg-gray-200 dark:bg-[#27272a]" : ""}`}
                    >
                        <IoGrid />
                    </button>
                </div>
            </div>

            {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {dummyData.map((car, index) => (
                        <CarGridCard key={index} {...car} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {dummyData.map((car, index) => (
                        <CarListCard key={index} {...car} />
                    ))}
                </div>
            )}
        </>
    )
}
