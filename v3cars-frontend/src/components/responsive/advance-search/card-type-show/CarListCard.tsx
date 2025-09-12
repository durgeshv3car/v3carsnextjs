// components/CarListCard.tsx
import React from "react";
import { GiGasPump } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { PiEngine } from "react-icons/pi";

interface CarProps {
    name: string;
    price: string;
    mileage: string;
    engine: string;
    fuel: string;
    seats: string;
    image: string;
}

const CarListCard: React.FC<CarProps> = ({ name, price, mileage, engine, fuel, seats, image }) => {
    return (
        <div className="border dark:border-[#2E2E2E] rounded-xl min-h-[232px] shadow-sm flex flex-col lg:flex-row gap-4 p-2">
            <div className="w-auto h-auto lg:min-w-[344px] lg:h-[215px]">
                <img src={image} alt={name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="w-full flex flex-col flex-shrink">
                <div className="space-y-3 text-center lg:text-left">
                    <h3 className="text-2xl font-semibold">{name}</h3>
                    <p className="">{price}</p>
                    <p className="text-xs text-yellow-300">*Ex-Showroom Price</p>
                </div>
                <div className="mt-2 flex flex-col lg:flex-row gap-4 justify-between border-t dark:border-[#2E2E2E] h-full flex-grow py-3 lg:py-0">
                    <div className="flex items-center justify-evenly lg:justify-normal gap-8 text-xs">
                        <span className="flex flex-col items-center justify-center gap-2">
                            <IoSpeedometerOutline size={20} />
                            {mileage}
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <PiEngine size={20} />
                            {engine}
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <GiGasPump size={20} />
                            {fuel}
                        </span>
                        <span className="flex flex-col items-center justify-center gap-2">
                            <MdOutlineAirlineSeatReclineExtra size={20} />
                            {seats} Seats
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-yellow-400 text-black text-sm font-medium w-full lg:w-[150px] h-10 rounded-md">View Details</button>
                        <button className="bg-yellow-400 text-black text-sm font-medium w-full lg:w-[150px] h-10 rounded-md">Get On Road Price</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListCard;
