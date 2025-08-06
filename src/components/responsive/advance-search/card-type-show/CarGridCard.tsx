// components/CarGridCard.tsx
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

const CarGridCard: React.FC<CarProps> = ({ name, price, mileage, engine, fuel, seats, image }) => {
  return (
    <div className="rounded-xl min-h-[460px] shadow-md overflow-hidden w-full flex flex-col flex-shrink">
      <div className="min-w-[344px] h-[215px]">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="flex flex-col justify-between items-center h-full flex-grow p-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="">{price}</p>
        <p className="text-xs text-yellow-300">*Ex-Showroom Price</p>
        <div className="flex items-center justify-between gap-8 text-xs border-t w-full pt-3 px-3">
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
        <div className="flex items-center gap-2 w-full justify-between">
          <button className="bg-yellow-400 text-sm w-full font-medium h-10 rounded-md">View Details</button>
          <button className="bg-yellow-400 text-sm w-full font-medium h-10 rounded-md">Get On Road Price</button>
        </div>
      </div>
    </div>
  );
};

export default CarGridCard;
