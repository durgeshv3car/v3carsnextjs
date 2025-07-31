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
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";

const Header = () => {

    const [hoverTab, setHoverTab] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        const closeOnScroll = () => setHoverTab(null);
        window.addEventListener('scroll', closeOnScroll);
        return () => window.removeEventListener('scroll', closeOnScroll);
    }, []);

    return (
        <>
            {
                path !== "/web-stories" && (
                    <>
                        <header className="w-full z-50 shadow-xl lg:px-4 xl:px-10 sticky top-0 bg-white dark:bg-[#171717] border-b dark:border-[#2E2E2E]">
                            <div className="max-w-[1600px] mx-auto py-3 flex items-center justify-between">
                                {/* Logo */}
                                <div
                                    className="flex items-center cursor-pointer gap-2"
                                    onClick={() => router.push('/')}
                                >
                                    {/* Light mode logo */}
                                    <Image
                                        src="/logo/header/v3logo.png"
                                        alt="V3 Cars Logo"
                                        width={150}
                                        height={40}
                                        priority
                                        className="block dark:hidden"
                                    />

                                    {/* Dark mode logo */}
                                    <Image
                                        src="/logo/header/v3-white2.png"
                                        alt="V3 Cars Logo Dark"
                                        width={150}
                                        height={40}
                                        priority
                                        className="hidden dark:block"
                                    />
                                </div>


                                {/* Nav Links */}
                                <nav className="flex items-center gap-6 text-sm font-medium">
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
                                            <div className="fixed left-0 top-[76px] w-full z-50 px-10" onClick={(e) => e.stopPropagation()}>
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
                                            <div className="absolute left-0 top-0 pt-12 z-50">
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
                                            <div className="fixed left-0 top-[60px] w-full z-40">
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
                                            <div className="fixed top-[60px] left-0 w-full z-40">
                                                <ToolsDropdown />
                                            </div>
                                        )}
                                    </div>
                                </nav>

                                {/* Right Section */}
                                <div className="flex items-center gap-4">
                                    {/* Search */}
                                    <div className="2xl:flex items-center hidden border border-[#e5e5e5] dark:border-[#3a3a3a] rounded-full overflow-hidden">
                                        <input
                                            type="text"
                                            placeholder="Search Car"
                                            className="px-4 py-1 w-48 outline-none bg-transparent text-sm rounded-l-full"
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

                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>
                        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
                    </>
                )
            }
        </>
    );
};

export default Header;
