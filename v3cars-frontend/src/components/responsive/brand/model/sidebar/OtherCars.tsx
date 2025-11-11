'use client'

import React from "react";

interface OtherCarsProps {
    title: string
}

const cars = [
  {
    id: 1,
    name: "Tata Punch",
    price: "₹5.50 - 9.30 lakh*",
    image: "/model/tata.png",
  },
  {
    id: 2,
    name: "Hyundai Exter",
    price: "₹6.00 - 10.00 lakh*",
    image: "/model/tata.png",
  },
  {
    id: 3,
    name: "Maruti Brezza",
    price: "₹8.29 - 14.14 lakh*",
    image: "/model/tata.png",
  },
];

const OtherCars: React.FC<OtherCarsProps> = ({ title }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} Car
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className="flex items-center border-b p-4 gap-4 w-full dark:border-[#2E2E2E]"
                    >
                        <img
                            src={car.image}
                            alt={car.name}
                            width={102}
                            height={73}
                            className="object-contain"
                        />
                        <div className="text-start">
                            <h2 className="text-lg">{car.name}</h2>
                            <p className="font-semibold text-gray-400">{car.price}</p>
                        </div>
                    </div>
                ))}

                {/* Button */}
                <div className="p-3 w-full">
                <button
                    className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                    onClick={() => alert('Downloading Nexon Brochure..')}
                    >
                    View All {title} Cars
                </button>
                </div>
            </div>
        </div>
    );
};

export default OtherCars;
