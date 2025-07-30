'use client'

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import CustomSelect from "../../ui/custom-inputs/CustomSelect";

const carData = [
    {
        id: 1,
        name: "2024 MAHINDRA THAR",
        image: "/upcoming-car/tata-curvv.png",
        specs: {
            Engine: "2.0L Turbo Petrol",
            Transmission: "6MT, 6TC",
            Drivetrain: "4WD",
            Power: "152PS @ 5000rpm",
            Torque: "300Nm @ 1250-3000rpm\n320Nm @ 1500-3000rpm"
        }
    },
    {
        id: 2,
        name: "2024 MAHINDRA THAR",
        image: "/upcoming-car/tata-curvv.png",
        specs: {
            Engine: "2.2L Diesel",
            Transmission: "6MT, 6TC",
            Drivetrain: "4WD",
            Power: "132PS @ 3750rpm",
            Torque: "300Nm @ 1600-2800rpm"
        }
    },
    {
        id: 3,
        name: "2024 MAHINDRA THAR",
        image: "/upcoming-car/tata-curvv.png",
        specs: {
            Engine: "1.5L Diesel",
            Transmission: "6MT",
            Drivetrain: "RWD",
            Power: "119PS @ 3500rpm",
            Torque: "300Nm @ 1750-2500rpm"
        }
    }
];

const specsKeys = ["Engine", "Transmission", "Drivetrain", "Power", "Torque"];

export default function Information() {
    const [cars, setCars] = useState(carData);
    const items3 = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

    const removeCar = (id: number) => {
        setCars(cars.filter((car) => car.id !== id));
    };

    const handleVariant = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <div className="overflow-x-auto scroll-smooth scrollbar-hide">
            <table className="min-w-full text-sm text-left border-collapse">
                <tbody>
                    {/* Car Cards Row - Visible on large screens only */}
                    <tr className="hidden lg:table-row">
                        <td className="p-3 font-bold w-[300px]"></td>
                        {cars.map((car) => (
                            <td key={car.id} className="p-3 font-semibold text-center align-top">
                                <div className="relative border p-2 rounded-xl flex flex-col justify-between dark:border-[#2E2E2E] shadow-sm">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => removeCar(car.id)}
                                        className="absolute top-2 right-2 bg-slate-100 dark:bg-[#262626] rounded-full p-1"
                                    >
                                        <IoClose size={16} />
                                    </button>

                                    {/* Car Image */}
                                    <div className="h-[235px] mb-2">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    {/* Variant Dropdown */}
                                    <div className="mt-4">
                                        <CustomSelect
                                            options={items3}
                                            placeholder="Select Variant"
                                            onSelect={handleVariant}
                                        />
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Basic Information Row */}
                    <tr className="font-semibold">
                        <td className="p-3 text-nowrap">Basic Information</td>
                        {cars.map((car) => (
                            <td key={car.id} className="bg-[#F2F2F2] dark:bg-[#262626] p-3 whitespace-pre-line text-nowrap text-center text-sm">
                                {car.name}
                            </td>
                        ))}
                    </tr>

                    {/* Dynamic Specification Rows */}
                    {specsKeys.map((spec) => (
                        <tr key={spec} className="even:bg-[#fafafa] dark:even:bg-[#262626]">
                            <td className="border dark:border-[#2E2E2E] p-3 font-semibold text-nowrap text-sm">{spec}</td>
                            {cars.map((car) => (
                                <td key={car.id} className="border dark:border-[#2E2E2E] text-nowrap p-3 whitespace-pre-line text-center text-sm">
                                    {car.specs[spec as keyof typeof car.specs]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
