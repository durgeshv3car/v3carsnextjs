'use client'
import Image from 'next/image'
import { FiCalendar, FiUser } from 'react-icons/fi'

export default function CarNewsCard() {
    return (

        <div className="lg:p-8 p-4">
            <div className=" flex gap-5 flex-col md:flex-row rounded-lg overflow-hidden shadow-sm w-full lg:max-w-[1600px] mx-auto">

                {/* Left: Thumbnail */}
                <div className="">
                    <Image
                        src="/car-news/top-selling.png" // change to your actual image path
                        alt="Car News Thumbnail"
                        width={600}
                        height={300}
                        className="rounded-xl"
                    />
                </div>

                {/* Right: Text Content */}
                <div className="space-y-5 flex flex-col py-2">

                    {/* Title */}
                    <h2 className="text-4xl  ">
                        Maruti Suzuki Ciaz CSD Price Vs Ex-Showroom Price Comparison
                    </h2>

                    {/* Description */}
                    <p className="text-[16px] ">
                        Maruti Suzuki Ciaz sedan is also available through CSD for our men and women in uniform. In this article, we’ll provide the full GST-inclusive Maruti Suzuki Ciaz...
                    </p>

                    {/* Author + Date + Button */}
                    <div className="space-y-5">

                        <div className="flex items-center text-sm gap-4">
                            <span className="flex items-center gap-1">
                                <FiUser className="text-[14px]" />
                                Mahesh Yadav
                            </span>
                            <span className="flex items-center gap-1">
                                <FiCalendar className="text-[14px]" />
                                July 31 2024
                            </span>
                        </div>

                        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-2 rounded font-medium text-gray-800">
                            Read More
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
