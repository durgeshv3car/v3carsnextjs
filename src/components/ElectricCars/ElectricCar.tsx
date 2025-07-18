'use client'

import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'

type CarProps = {
    image: string
    name: string
    engine: string,
    nitro: string,
    mileage: string,
    price: string,
}

const upcomingCars: CarProps[] = [
    {
        image: "/ford.jpg",
        name: "S-Presso",
        engine: "83PS",
        nitro: "113Nm",
        mileage: "21.11kmpl",
        price: "₹90.99 - 200.93 lakh*",
    },
]

function ElectricCar() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white border border-[#DEE2E6] rounded-xl">
                {Array(15).fill(null).flatMap(() => upcomingCars).map((car, idx) => (
                    <div
                        key={idx}
                        className="w-full h-auto lg:h-[454px] border border-[#DEE2E6] rounded-xl overflow-hidden flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative h-[200px] lg:h-[240px]">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-white font-semibold">FORD</p>
                            </div>
                            <button className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow">
                                <IoMdStarOutline />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-3 flex-grow flex flex-col justify-between text-center gap-2">
                            <p className="font-semibold text-lg sm:text-xl">{car.name}</p>

                            <div className="flex justify-between items-center text-sm border-t border-b border-[#E9E9E9] py-2">
                                <p className="flex items-center gap-1">
                                    <PiEngine size={18} />
                                    {car.engine}
                                </p>
                                <p className="flex items-center gap-1">
                                    <PiEngine size={18} />
                                    {car.nitro}
                                </p>
                                <p className="flex items-center gap-1">
                                    <BiTachometer size={18} />
                                    {car.mileage}
                                </p>
                            </div>

                            <p className="font-semibold">{car.price}</p>

                            <button className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
                                View Current Offers
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banner Section */}
            <div className='h-[331px] md:h-[240px] bg-[#B3B3B3] p-8 flex justify-center items-center my-6'>

                <div className="hidden sm:block w-full lg:w-[970px] lg:h-[180px] sm:h-[200px] mx-auto">
                    <img
                        src={'/ads/ad1.png'}
                        alt='ad1'
                        className='h-full w-full'
                    />
                </div>

                <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

                </div>
            </div>
        </>
    );
}

export default ElectricCar;