'use client'

import Link from 'next/link'
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
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/fronx.png",
        name: "Fronx",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/brezza.png",
        name: "Brezza",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/nexon.png",
        name: "Nexon",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/fronx.png",
        name: "Fronx",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/brezza.png",
        name: "Brezza",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/nexon.png",
        name: "Nexon",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/fronx.png",
        name: "Fronx",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/brezza.png",
        name: "Brezza",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/nexon.png",
        name: "Nexon",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
    {
        image: "/popular-cars/grand-vitara.png",
        name: "Grand Vitara",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/fronx.png",
        name: "Fronx",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*",
    },
    {
        image: "/popular-cars/brezza.png",
        name: "Brezza",
        engine: "103PS",
        nitro: "137Nm",
        mileage: "21.11kmpl",
        price: "₹10.99 - 19.93 lakh*"
    },
]

function HottestCarInIndia() {
    return (
        <section>
            <h2 className="text-lg font-medium my-6">Hottest Cars In India 2024</h2>

            <div className='p-2 bg-white border border-[#DEE2E6] rounded-xl'>
                <p className='text-[#4E4E4E] mb-2'>Discover India's Most-Loved Cars! This section dives into user interest on the V3Cars platform, showcasing the top 30 cars capturing hearts and minds. Go beyond just sales figures and explore the vehicles generating the most buzz! We provide detailed information on each car, including price, specifications, and mileage. Find the car that ignites your passion and explore your options with confidence.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingCars.map((car, idx) => (
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
                                    <p className="text-white font-semibold">Maruti Suzuki</p>
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
            </div>
        </section>
    );
}

export default HottestCarInIndia;