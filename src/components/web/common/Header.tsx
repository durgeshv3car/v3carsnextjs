"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import LocationDropdown from "../header/LocationDropdown";
import NewCarsDropdown from "../header/NewCarsDropdown";
import NewsVideosDropdown from "../header/NewsVideosDropdown";
import LoginModal from "./LoginModal";
import { usePathname, useRouter } from "next/navigation";
import ToolsDropdown from "../header/ToolsDropdown.";
import ThemeToggle from "@/components/common/ThemeToggle";

type TabKey = null | "location" | "newCars" | "news" | "tools" | "variant";

const HOVER_CLOSE_DELAY = 160; // ms grace period

const Header = () => {

    const [hoverTab, setHoverTab] = useState<TabKey>(null);
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter();
    const path = usePathname();

    // header height → position dropdowns just below
    const headerRef = useRef<HTMLElement | null>(null);
    const [dropdownTop, setDropdownTop] = useState<number>(60);
    const fixedWrapStyle = { top: dropdownTop };

    // --- LOCATION (click-to-open) overlay needs no timers ---
    // measure header height
    useEffect(() => {
        if (!headerRef.current) return;
        const el = headerRef.current;
        const setTop = () => setDropdownTop(el.getBoundingClientRect().height);
        setTop();
        const ro = new ResizeObserver(setTop);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Optional: close on scroll / route / ESC (keep for polish)
    useEffect(() => {
        const closeOnScroll = () => setHoverTab(null);
        window.addEventListener("scroll", closeOnScroll);
        return () => window.removeEventListener("scroll", closeOnScroll);
    }, []);

    useEffect(() => {
        setHoverTab(null);
    }, [path]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHoverTab(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // ---------- NEW CARS: position exactly under the tab ----------
    const newCarsTriggerRef = useRef<HTMLDivElement | null>(null);
    const [newCarsLeft, setNewCarsLeft] = useState(0);
    const DROPDOWN_W = 256;

    useEffect(() => {

        const update = () => {
            const r = newCarsTriggerRef.current?.getBoundingClientRect();
            if (!r) return;
            let left = r.left; // align left edges
            const maxLeft = window.innerWidth - DROPDOWN_W - 8;
            if (left > maxLeft) left = Math.max(8, maxLeft);
            if (left < 8) left = 8;
            setNewCarsLeft(left);
        };

        update();
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true as any);
        };

    }, []);

    // ---------- HOVER INTENT (grace period) for hover menus ----------
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openTab = (key: Exclude<TabKey, null>) => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setHoverTab(key);
    };

    const scheduleClose = () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
            setHoverTab(null);
            closeTimerRef.current = null;
        }, HOVER_CLOSE_DELAY);
    };

    const cancelClose = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    };

    return (

        <>
            {path !== "/web-stories" && (
                <>
                    <header
                        ref={headerRef as any}
                        className="w-full z-[200] lg:px-4 xl:px-10 sticky top-0 bg-white dark:bg-[#171717] border-b dark:border-[#2E2E2E]"
                    >
                        <div className="max-w-[1600px] mx-auto py-3 flex items-center justify-between">
                            {/* Logo */}
                            <div
                                className="flex items-center cursor-pointer gap-2"
                                onClick={() => router.push("/")}
                            >
                                <Image
                                    src="/logo/header/v3logo.png"
                                    alt="V3 Cars Logo"
                                    width={150}
                                    height={40}
                                    priority
                                    className="block dark:hidden"
                                />
                                <Image
                                    src="/logo/header/v3-white2.png"
                                    alt="V3 Cars Logo Dark"
                                    width={150}
                                    height={40}
                                    priority
                                    className="hidden dark:block"
                                />
                            </div>

                            {/* Nav */}
                            <nav className="flex items-center gap-6 text-sm font-medium">
                                {/* Location (click-to-toggle + overlay handles outside click) */}
                                <div
                                    className="relative py-4"
                                    onClick={() =>
                                        setHoverTab(hoverTab === "location" ? null : "location")
                                    }
                                >
                                    <div
                                        className={`cursor-pointer flex items-center gap-1 ${hoverTab === "location" ? "text-yellow-500" : ""
                                            }`}
                                    >
                                        <FiMapPin size={16} />
                                        Visakhapatnam
                                        <IoChevronDownOutline size={14} />
                                    </div>
                                </div>

                                {/* New Cars (hover with intent) */}
                                <div
                                    ref={newCarsTriggerRef}
                                    className="relative py-4"
                                    onMouseEnter={() => openTab("newCars")}
                                    onMouseLeave={scheduleClose}
                                >
                                    <div
                                        className={`cursor-pointer flex items-center gap-1 ${hoverTab === "newCars" ? "text-yellow-500" : ""
                                            }`}
                                    >
                                        New Cars
                                        <IoChevronDownOutline size={14} />
                                    </div>

                                    {hoverTab === "newCars" && (
                                        <div
                                            className="fixed z-[150]"
                                            style={{ top: dropdownTop, left: newCarsLeft }}
                                            onMouseEnter={cancelClose}
                                            onMouseLeave={scheduleClose}
                                        >
                                            <div style={{ width: DROPDOWN_W }}>
                                                <NewCarsDropdown />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* News, Reviews & Videos (hover with intent; full-width panel) */}
                                <div
                                    className="relative py-4"
                                    onMouseEnter={() => openTab("news")}
                                    onMouseLeave={scheduleClose}
                                >
                                    <span
                                        className={`cursor-pointer flex items-center gap-1 ${hoverTab === "news" ? "text-yellow-500" : ""
                                            }`}
                                    >
                                        News, Reviews & Videos
                                        <IoChevronDownOutline size={14} />
                                    </span>

                                    {hoverTab === "news" && (
                                        <div
                                            className="fixed left-0 w-full z-[150] px-10"
                                            style={fixedWrapStyle}
                                            onMouseEnter={cancelClose}
                                            onMouseLeave={scheduleClose}
                                        >
                                            <div className="max-w-[1600px] mx-auto">
                                                <NewsVideosDropdown />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Variant Explained (no dropdown; no timers needed) */}
                                <div className="relative py-4">
                                    <span className="cursor-pointer">Variant Explained</span>
                                </div>

                                {/* Tools (hover with intent; full-width panel) */}
                                <div
                                    className="relative py-4"
                                    onMouseEnter={() => openTab("tools")}
                                    onMouseLeave={scheduleClose}
                                >
                                    <span
                                        className={`cursor-pointer flex items-center gap-1 ${hoverTab === "tools" ? "text-yellow-500" : ""
                                            }`}
                                    >
                                        Tools
                                        <IoChevronDownOutline size={14} />
                                    </span>

                                    {hoverTab === "tools" && (
                                        <div
                                            className="fixed left-0 w-full z-[150] px-10"
                                            style={fixedWrapStyle}
                                            onMouseEnter={cancelClose}
                                            onMouseLeave={scheduleClose}
                                        >
                                            <div className="max-w-[1600px] mx-auto">
                                                <ToolsDropdown />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </nav>

                            {/* Right */}
                            <div className="flex items-center gap-4">
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

                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                                >
                                    <HiOutlineUserCircle size={20} />
                                    Login / Signup
                                </button>
                            </div>

                            <ThemeToggle/>


                        </div>
                    </header>

                    {/* LOCATION overlay/backdrop (click-to-open; outside click closes) */}
                    {hoverTab === "location" && (
                        <>
                            {/* backdrop */}
                            <div
                                className="fixed inset-0 z-[140]"
                                onClick={() => setHoverTab(null)}
                            />
                            {/* panel */}
                            <div
                                className="fixed inset-x-0 z-[150] px-10 pointer-events-none"
                                style={fixedWrapStyle}
                            >
                                <div
                                    className="max-w-[1600px] mx-auto pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <LocationDropdown />
                                </div>
                            </div>
                        </>
                    )}

                    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
                </>
            )}
        </>

    );

};

export default Header;



