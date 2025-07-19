"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import LocationDropdown from "../header/LocationDropdown";
import NewCarsDropdown from "../header/NewCarsDropdown";
import NewsVideosDropdown from "../header/NewsVideosDropdown";
import ToolsDropdown from "../header/ToolsDropdown.";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

const Header = () => {
    const [hoverTab, setHoverTab] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const closeOnScroll = () => setHoverTab(null);
        window.addEventListener('scroll', closeOnScroll);
        return () => window.removeEventListener('scroll', closeOnScroll);
    }, []);

    return (
        <>

            <header className="w-full bg-white z-50 shadow-xl">
                <div className="max-w-[1600px] mx-auto py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer gap-2" onClick={() => router.push('/')}>
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
                            onClick={() => setHoverTab(hoverTab === "location" ? null : "location")}
                        >
                            <div className={`cursor-pointer flex items-center gap-1 ${hoverTab === "location" ? "text-yellow-500" : ""}`}>
                                <FiMapPin size={16} />
                                Visakhapatnam
                                <IoChevronDownOutline size={14} />
                            </div>

                            {/* Dropdown stays visible while hovering */}
                            {hoverTab === "location" && (
                                <div className="fixed left-0 top-[76px] w-full z-50">
                                    <LocationDropdown />
                                </div>
                            )}
                        </div>

                        {/* New Cars */}
                        <div
                            className="relative"
                            onClick={() => setHoverTab(hoverTab === "newCars" ? null : "newCars")}
                        >
                            <div
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "newCars" ? "text-yellow-500" : ""
                                    }`}
                            >
                                New Cars
                                <IoChevronDownOutline size={14} />
                            </div>

                            {hoverTab === "newCars" && (
                                <div className="absolute left-0 top-[48px] z-50">
                                    <NewCarsDropdown />
                                </div>
                            )}
                        </div>

                        {/* News, Reviews & Videos */}
                        <div
                            className="relative py-4"
                            onClick={() => setHoverTab(hoverTab === "news" ? null : "news")}

                        >
                            <span
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "news" ? "text-yellow-500" : ""
                                    }`}
                            >
                                News, Reviews & Videos
                                <IoChevronDownOutline size={14} />
                            </span>

                            {hoverTab === "news" && (
                                <div className="fixed left-0 top-[76px] w-full z-40">
                                    <NewsVideosDropdown />
                                </div>
                            )}
                        </div>

                        {/* Variant Explained */}
                        <div
                            className="relative  py-4"
                            onClick={() => setHoverTab(hoverTab === "variant" ? null : "variant")}
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
                            onClick={() => setHoverTab(hoverTab === "tools" ? null : "tools")}
                        >
                            <span
                                className={`cursor-pointer flex items-center gap-1 ${hoverTab === "tools" ? "text-yellow-500" : ""
                                    }`}
                            >
                                Tools
                                <IoChevronDownOutline size={14} />
                            </span>

                            {hoverTab === "tools" && (
                                <div className="fixed top-[76px] left-0 w-full z-40">
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
