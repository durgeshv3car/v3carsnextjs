
"use client";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { TbCurrentLocation } from "react-icons/tb";

const popularCities = [
    "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Ahmedabad",
    "Jaipur", "Kolkata", "Lucknow", "Delhi", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
];

const otherCities = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Andhra Pradesh", "Andhra Pradesh", "Andhra Pradesh", "Andhra Pradesh"
];

const LocationDropdown = () => {

    return (
        <div className="max-w-[1600px] bg-white dark:bg-[#171717] my-1 mx-auto shadow-md z-50 rounded-xl">
            
                {/* Top Banner */}
                <div className="bg-[#ffe380] h-[80px] w-full flex items-center justify-between relative rounded-t-xl">
                    <img
                        src="/location/city-illust.png"
                        alt="Cities"
                        className="object-cover w-full h-full absolute top-0 left-0 opacity-50 rounded-t-xl"
                    />
                    {/* <button className="absolute top-4 right-4 text-black text-2xl">
                    <IoCloseOutline />
                </button> */}
                </div>

                {/* Content */}
                <div className="flex p-6 gap-6">
                    {/* Left */}
                    <div className="w-[50%]">
                        {/* City Dropdown + Detect Location */}
                        <div className="flex gap-4 mb-6 items-center">
                            <div className="flex items-center border dark:border-[#2E2E2E] rounded-lg px-4 py-2 gap-2 w-1/2 text-sm cursor-pointer">
                                <FiMapPin size={16} />
                                <span>Gurugram</span>
                            </div>
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-4 py-2 rounded-md flex items-center gap-2">
                                <TbCurrentLocation size={18} />
                                Detect my location
                            </button>
                        </div>

                        {/* Popular Cities */}
                        <div>
                            <h3 className="text-xs font-semibold mb-3 border-l-4 border-yellow-400 pl-2">
                                POPULAR CITIES
                            </h3>
                            <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin-yellow">

                                {popularCities.map((city, idx) => (
                                    <div
                                        key={idx}
                                        className="border dark:border-[#2E2E2E] rounded-md flex flex-col items-center justify-center p-2 text-center bg-[#fffceb] dark:bg-transparent hover:shadow transition cursor-pointer"
                                    >
                                        <Image
                                            src="/location/city-icon.png"
                                            alt="City Icon"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="text-[13px] font-medium mt-2">{city}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="w-[50%]">
                        
                        <h3 className="text-xs font-semibold mb-3 border-l-4 border-yellow-400 pl-2">
                            CONTINUE OTHER CITIES
                        </h3>

                        <div className="grid grid-cols-4 gap-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin-yellow">

                            {otherCities.map((city, idx) => (
                                <button
                                    key={idx}
                                    className="bg-gray-100 dark:bg-[#171717] hover:bg-yellow-100 px-2 py-2 text-sm rounded border border-[#2E2E2E] flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                                >
                                    {city}
                                </button>
                            ))}

                        </div>
                    </div>

                </div>
           
        </div>
    );

};

export default LocationDropdown;
