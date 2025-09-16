'use client'


import React, { useState } from "react";

interface Car {
    name: string;
    image: string;
    fuel: "Petrol" | "Diesel" | "CNG";
}

const carsData: Car[] = [
    { name: "Mahindra XUV 3XO", image: "./car-on-road-price/image1.png", fuel: "Petrol" },
    { name: "Maruti Arena Swift", image: "./car-on-road-price/image2.png", fuel: "Petrol" },
    { name: "Tata Curvv EV", image: "./car-on-road-price/image3.png", fuel: "CNG" },
    { name: "Hyundai Creta N Line", image: "./car-on-road-price/image4.png", fuel: "Diesel" },
    { name: "Toyota Taisor", image: "./car-on-road-price/image5.png", fuel: "Petrol" },
    { name: "Skoda Superb", image: "./car-on-road-price/image6.png", fuel: "Diesel" },
    { name: "Nissan X-Trail", image: "./car-on-road-price/image7.png", fuel: "Diesel" },
    { name: "Citroen Basalt Coupe", image: "./car-on-road-price/image8.png", fuel: "CNG" },
    { name: "BMW i5 EV", image: "./car-on-road-price/image9.png", fuel: "Petrol" },
    { name: "Mini Cooper", image: "./car-on-road-price/image0.png", fuel: "Diesel" },
];

const FuelTab: React.FC = () => {
    const [selectedFuel, setSelectedFuel] = useState<"Petrol" | "Diesel" | "CNG">("Petrol");

    const fuelOptions: ("Petrol" | "Diesel" | "CNG")[] = ["Petrol", "Diesel", "CNG"];

    const filteredCars = carsData.filter((car) => car.fuel === selectedFuel);

    return (
        <div className="rounded-xl border dark:border-[#2E2E2E] p-3 space-y-3">
            {/* Fuel Filter Buttons */}
            <div className="flex gap-2">
                {fuelOptions.map((fuel) => (
                    <button
                        key={fuel}
                        onClick={() => setSelectedFuel(fuel)}
                        className={`px-4 py-2 w-full rounded-lg ${selectedFuel === fuel
                            ? "bg-yellow-400 text-black font-semibold"
                            : "bg-gray-100 dark:bg-[#171717]"
                            }`}
                    >
                        {fuel}
                    </button>
                ))}
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-2 gap-4">
                {filteredCars.map((car, index) => (
                    <div key={index} className="bg-white dark:bg-[#171717] h-[147px] rounded-lg overflow-hidden">
                        <p className="text-center text-sm font-medium p-2">{car.name}</p>
                        <div className="h-[121px]">
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-28 object-cover rounded-lg"
                        />
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FuelTab;
