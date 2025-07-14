"use client";
import Image from "next/image";
import { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import LocationDropdown from "../header/LocationDropdown";
import NewCarsDropdown from "../header/NewCarsDropdown";
import NewsVideosDropdown from "../header/NewsVideosDropdown";
import ToolsDropdown from "../header/ToolsDropdown.";
import LoginModal from "./LoginModal";

const Header = () => {
    const [hoverTab, setHoverTab] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>

            <header className="w-full bg-white z-50">
                <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo/header/v3logo.png"
                            alt="V3 Cars Logo"
                            width={150}
                            height={40}
                            priority
                        />
                    </div>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-6 text-sm font-medium text-gray-800">
                        {/* Location */}
                        <div
                            className="relative py-4"
                            onMouseEnter={() => setHoverTab("location")}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <div className={`cursor-pointer flex items-center gap-1 ${hoverTab === "location" ? "text-yellow-500" : ""}`}>
                                <FiMapPin size={16} />
                                Visakhapatnam
                                <IoChevronDownOutline size={14} />
                            </div>

                            {/* Dropdown stays visible while hovering */}
                            {hoverTab === "location" && (
                                <div className="fixed left-0 top-[65px] w-full z-50">
                                    <LocationDropdown />
                                </div>
                            )}
                        </div>

                        {/* New Cars */}
                        <div
                            className="relative"
                            onMouseEnter={() => setHoverTab("newCars")}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <div
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "newCars" ? "text-yellow-500" : ""
                                    }`}
                            >
                                New Cars
                                <IoChevronDownOutline size={14} />
                            </div>

                            {hoverTab === "newCars" && (
                                <div className="absolute left-0 top-full pt-2 z-50">
                                    <NewCarsDropdown />
                                </div>
                            )}
                        </div>

                        {/* News, Reviews & Videos */}
                        <div
                            className="relative py-4"
                            onMouseEnter={() => setHoverTab("news")}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <span
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "news" ? "text-yellow-500" : ""
                                    }`}
                            >
                                News, Reviews & Videos
                                <IoChevronDownOutline size={14} />
                            </span>

                            {hoverTab === "news" && (
                                <div className="fixed left-0 top-[65px] w-full z-50">
                                    <NewsVideosDropdown />
                                </div>
                            )}
                        </div>

                        {/* Variant Explained */}
                        <div
                            className="relative  py-4"
                            onMouseEnter={() => setHoverTab("variant")}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <span
                                className={`cursor-pointer ${hoverTab === "variant" ? "text-yellow-500" : ""
                                    }`}
                            >
                                Variant Explained
                            </span>
                        </div>

                        {/* Tools */}
                        <div
                            className="relative  py-4"
                            onMouseEnter={() => setHoverTab("tools")}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <span
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "tools" ? "text-yellow-500" : ""
                                    }`}
                            >
                                Tools
                                <IoChevronDownOutline size={14} />
                            </span>

                            {hoverTab === "tools" && (
                                <div className="fixed top-[65px] left-0 w-full z-50">
                                    <ToolsDropdown />
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="flex items-center border rounded-full overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search Car"
                                className="px-4 py-1 w-48 outline-none text-sm rounded-l-full"
                            />
                            <button className="bg-gray-700 p-2 flex items-center justify-center h-full w-20 rounded-r-full rounded-l-full">
                                <FiSearch size={18} color="#fff" />
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={() => setShowLogin(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                        >
                            <HiOutlineUserCircle size={20} />
                            Login / Signup
                        </button>
                    </div>
                </div>
            </header>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>


    );
};

export default Header;
