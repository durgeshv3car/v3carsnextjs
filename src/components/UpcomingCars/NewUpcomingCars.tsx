'use client'

import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'

type CarProps = {
    image: string
    name: string
    brand: string
    confidence: number
    price: string
    expectedLaunch: string
}

const upcomingCars: CarProps[] = [
    {
        image: "/upcoming/alto.png",
        name: "Alto K10",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹800.00 - 900.00 lakh*",
        expectedLaunch: "June 2021",
    },
    {
        image: "/upcoming/dzire.png",
        name: "Dzire",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹6.79 - 10.14 lakh*",
        expectedLaunch: "June 2021",
    },
    {
        image: "/upcoming/swift.png",
        name: "Swift",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹800.00 - 900.00 lakh*",
        expectedLaunch: "June 2021",
    },
    {
        image: "/upcoming/alto-k.png",
        name: "Alto K10",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹800.00 - 900.00 lakh*",
        expectedLaunch: "June 2021",
    },
    {
        image: "/upcoming/thar.png",
        name: "Thar Roxx",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹800.00 - 900.00 lakh*",
        expectedLaunch: "June 2021",
    },
    {
        image: "/upcoming/alto.png",
        name: "Alto K10",
        brand: "Maruti Suzuki Arena",
        confidence: 100,
        price: "₹800.00 - 900.00 lakh*",
        expectedLaunch: "June 2021",
    },
]

const confidenceColor = (confidence: number): string => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
}

export default function NewUpcomingCars() {

    return (
        <>
            <h2 className="text-xl font-semibold mb-5">New Upcoming Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 p-2 bg-[#FFFFFF] border border-[#DEE2E6] rounded-xl">
                {upcomingCars.map((car, idx) => (
                    <div
                        key={idx}
                        className={`rounded-xl shadow-lg overflow-hidden min-h-[275px] xl:h-[487px] flex-shrink-0 flex flex-col border-b-[6px] ${car.confidence >= 90 ? "border-[#3D923A]" : car.confidence >= 70 ? "border-[#F08200]" : "border-[#D40808]"}`}
                    >
                        {/* Image Section */}
                        <div className='rounded-xl shadow-sm'>
                            <div className="relative h-[184px] xl:h-[242px]">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="h-full w-full object-cover shadow-md"
                                />
                                <div className="absolute top-2 left-2 flex items-center bg-[#E7E7E7] px-2 py-1 rounded-full space-x-2">
                                    <span
                                        className={`w-3 h-3 rounded-full ${confidenceColor(
                                            car.confidence
                                        )}`}
                                    />
                                    <p className="text-xs text-black">Confidence {car.confidence}%</p>
                                </div>
                                <button className="absolute top-2 right-2 bg-[#E7E7E7] text-black rounded-full p-1 shadow">
                                    <IoMdStarOutline />
                                </button>
                            </div>

                            {/* Remaining Space for Content */}
                            <div className={`grid grid-cols-2 justify-between text-sm xl:text-base items-center my-4 bg-white`}>
                                <div className='border-r border-[#0000004D] text-center mx-4'>
                                    <p className="text-gray-700 font-medium truncate">{car.brand}</p>
                                    <p className="text-gray-900 font-semibold truncate">{car.name}</p>
                                </div>

                                <div className="text-center mx-4">
                                    <p className="text-gray-600">Expected Launch</p>
                                    <p className="text-black font-semibold">{car.expectedLaunch}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`flex flex-col justify-around gap-2 p-4 items-center text-sm xl:text-base flex-grow`}>
                            <p className="font-medium text-xl">{car.price}</p>
                            <p className="text-gray-600 text-sm">*Expected Launch Price</p>
                            <button className='p-3 font-semibold text-sm w-full flex justify-center gap-2 items-center cursor-pointer rounded-lg bg-yellow-400'>
                                Alert Me When Launched
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}

                <Link href={"#"} className='text-lg text-blue-500 hover:underline font-semibold p-3 flex items-center gap-2 w-fit'>
                    View All Upcoming Cars
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </>
    )
}
