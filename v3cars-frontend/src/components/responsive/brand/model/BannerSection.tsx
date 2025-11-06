import Link from "next/link";
import React from "react";

const BannerSection: React.FC = () => {
    return (

        <div className="space-y-10 ">
            <div className="flex justify-center items-center">
                <div className="border w-[970px] h-[90px] rounded-lg">
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-10">
                {/* Left Side - Car Image */}
                <div className="flex flex-col justify-end flex-1">
                    <img
                        src="/model/tata.png"
                        alt="Tata Nexon"
                        className="w-full drop-shadow-lg"
                    />

                    <div className="flex justify-between items-center">
                        <span className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                            </svg>
                            <span className="text-gray-700 text-xs">Colours</span>
                        </span>

                        <div className="flex gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </span>

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="text-4xl font-bold text-gray-800">
                                Tata <span className="text-yellow-400">Nexon</span>
                            </h1>
                            <p className="text-sm text-gray-400">Launched on Sep’25</p>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mt-4">
                            The Tata Nexon is a B2-segment SUV with seating for up to 5
                            occupants and costs between ₹7.32 lakh and ₹14.05 lakh
                            (ex-showroom).
                        </p>
                    </div>

                    {/* Price */}
                    <div>
                        <p className="text-sm">Ex-Showroom</p>
                        <div className="flex justify-between items-end">
                            <p className="text-2xl font-semibold text-gray-800">
                                ₹7.32 – ₹14.05 lakh
                            </p>
                            <Link
                                href="#"
                                className="text-blue-600 text-xs underline"
                            >
                                Check On Road Price in <span className="font-semibold">Delhi</span>
                            </Link>
                        </div>
                    </div>

                    {/* Fuel Type Buttons */}
                    <div>
                        <span className="text-sm text-gray-500">Available with</span>
                        <div className="flex items-center space-x-3 mt-1">
                            <div className="flex space-x-2">
                                <button className="border-2 border-yellow-400 px-4 py-2 rounded-md text-xs hover:bg-gray-100 transition">
                                    PETROL
                                </button>
                                <button className="border-2 border-yellow-400 px-4 py-2 rounded-md text-xs hover:bg-gray-100 transition">
                                    CNG
                                </button>
                                <button
                                    disabled
                                    className="border border-gray-200 bg-gray-100 px-4 py-2 rounded-md text-xs text-gray-400 cursor-not-allowed"
                                >
                                    DIESEL
                                </button>
                                <button
                                    disabled
                                    className="border border-gray-200 bg-gray-100 px-4 py-2 rounded-md text-xs text-gray-400 cursor-not-allowed"
                                >
                                    HYBRID
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Spec Boxes */}
                    <div className="flex space-x-4 mt-4">
                        <div className="border border-gray-200 rounded-xl shadow-sm w-28 text-center py-3">
                            <p className="text-xs text-gray-500">Segment</p>
                            <p className="font-semibold text-gray-800 mt-1">D1</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl shadow-sm w-28 text-center py-3">
                            <p className="text-xs text-gray-500">Body Type</p>
                            <p className="font-semibold text-gray-800 mt-1">SUV</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl shadow-sm w-28 text-center py-3">
                            <p className="text-xs text-gray-500">Seating</p>
                            <p className="font-semibold text-gray-800 mt-1">5</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-3">
                        <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold px-6 py-2 rounded-md w-full">
                            View Nexon Latest Offers
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Tabs */}
            <div className="mt-10">
                <div className="flex flex-wrap md:flex-nowrap space-x-6 mt-4 text-gray-600 font-medium text-sm overflow-x-auto">
                    {[
                        "Overview",
                        "Price",
                        "Variants",
                        "Dimensions",
                        "Mileage, Specs & Features",
                        "Reviews",
                        "Compare",
                    ].map((tab) => (
                        <button
                            key={tab}
                            className="pb-2 border-b-2 border-transparent hover:border-yellow-400 hover:text-gray-800 transition whitespace-nowrap"
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
