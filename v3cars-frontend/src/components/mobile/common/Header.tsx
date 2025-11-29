"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMapPin, FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import MobileLoginModal from "./MobileLoginModal";
import { useRouter } from "next/navigation";
import LocationDropdown from "@/components/web/header/LocationDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TabKey = null | "location" | "newCars" | "news" | "tools" | "variant";

interface Location {
  cityId?: number;
  cityName?: string;
}

const MobileHeader = () => {
  const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
  const [isOpen, setIsOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const [dropdownTop, setDropdownTop] = useState<number>(45);
  const fixedWrapStyle = { top: dropdownTop };
  const [hoverTab, setHoverTab] = useState<TabKey>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const [location, setLocation] = useState<Location>(selectedCity);

  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;
    const setTop = () => setDropdownTop(el.getBoundingClientRect().height);
    setTop();
    const ro = new ResizeObserver(setTop);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const toolsLinks = [
    { label: "Car Loan EMI Calculator", href: "/car-loan-emi-calculator" },
    { label: "Fuel Cost Calculator", href: "/fuel-cost-calculator" },
    { label: "Mileage Calculator", href: "/mileage-calculator" },
    { label: "Car On-Road Price", href: "/car-on-road-price-in-india" },
    { label: "Buy/Renew Car Insurance", href: "/car-insurance-india" },
    { label: "Sell Used Car", href: "/sell-used-car" },
    { label: "Apply For Car Loan", href: "/apply-car-loan-india" },
    { label: "Compare Cars", href: "/compare-cars" },
    { label: "Fuel Price In India", href: "/fuel-price-in-india" },
  ];

  const newCarsLinks = [
    { label: "Upcoming Cars", href: "/upcoming-cars" },
    { label: "Popular Cars", href: "/popular-cars" },
    { label: "Latest Cars", href: "/latest-launched-cars" },
    { label: "Electric Cars", href: "/electric-cars" },
  ];

  const newsReviewsVideosLinks = [
    { label: "Latest News", href: "/news" },
    { label: "Auto Expo", href: "/news/auto-expo" },
    { label: "Press Release", href: "/latest-press-release" },
    { label: "Expert Review", href: "/car-expert-reviews" },
    { label: "Comparison Review", href: "/comparison" },
    { label: "Feature Explained", href: "/features-explained" },
    { label: "Car Guide", href: "/car-guide" },
    { label: "User Review", href: "/car-user-review" },
    { label: "Review Videos", href: "/car-review-videos" },
    { label: "Compare Videos", href: "/car-comparison-videos" },
    { label: "Variants Explained Videos", href: "/variants-explained-videos" },
    { label: "More Videos", href: "/other-videos" },
    { label: "Auto Expo Videos", href: "/auto-expo-videos" },
    { label: "V3Cars YouTube Channel", href: "https://www.youtube.com/c/V3cars-Official" },
  ];

  // ✅ fix type: each submenu holds an array of {label, href}
  const subMenus: Record<string, { label: string; href: string }[]> = {
    Tools: toolsLinks,
    "New Cars": newCarsLinks,
    "News, Reviews & Videos": newsReviewsVideosLinks,
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (hoverTab) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hoverTab]);

  return (
    <>
      <header className="w-full bg-white dark:bg-[#171717] z-40 relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(true)}>
              <FiMenu size={22} />
            </button>
            <Image
              src="/logo/header/v3logo.png"
              alt="Logo"
              width={100}
              height={40}
              onClick={() => router.push("/")}
              className="block dark:hidden cursor-pointer"
            />
            <Image
              src="/logo/header/v3-white2.png"
              alt="V3 Cars Logo Dark"
              width={100}
              height={40}
              onClick={() => router.push("/")}
              className="hidden dark:block cursor-pointer"
            />
          </div>

          {/* Right: Location + Login Icon */}
          <div className="flex items-center gap-4"
            onClick={() =>
              setHoverTab(hoverTab === "location" ? null : "location")
            }
          >
            <div className="flex items-center gap-1 text-md">
              <FiMapPin size={16} />
              {selectedCity.cityName}
            </div>
            <HiOutlineUserCircle size={24} />
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center mx-4 border dark:border-[#2E2E2E] rounded-full overflow-hidden mb-5">
          <input
            type="text"
            placeholder="Search Car"
            className="px-4 py-1 w-full outline-none text-sm bg-transparent"
          />
          <button className="bg-gray-700 p-2 px-6 text-white rounded-full">
            <FiSearch size={16} />
          </button>
        </div>

        {/* Drawer Overlay */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-[85%] bg-white dark:bg-[#171717] z-[101] shadow-md p-4 flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Top: Logo + Login */}
          <div className="flex justify-between items-center mb-4">
            <Image
              src="/logo/header/v3logo.png"
              alt="Logo"
              width={90}
              height={40}
              className="block dark:hidden"
            />
            <Image
              src="/logo/header/v3-white2.png"
              alt="Logo"
              width={90}
              height={40}
              className="hidden dark:block"
            />
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-primary text-black text-sm px-4 py-1 rounded-full font-medium"
              >
                Login
              </button>

            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            {["New Cars", "News, Reviews & Videos", "Variant Explained", "Tools"].map(
              (item) => {
                const hasSubmenu = !!subMenus[item];

                return (
                  <div key={item}>
                    <button
                      className="flex justify-between items-center w-full text-left font-medium py-2"
                      onClick={() => hasSubmenu && toggleTab(item)}
                    >
                      {item}
                      {hasSubmenu && (
                        <IoChevronDownOutline
                          size={16}
                          className={`transition-transform duration-300 ${openTab === item ? "rotate-180" : ""
                            }`}
                        />
                      )}
                    </button>

                    {/* Accordion submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openTab === item ? "max-h-[1000px]" : "max-h-0"
                        }`}
                    >
                      {hasSubmenu && (
                        <ul className="pl-4 text-sm space-y-2 py-2">
                          {subMenus[item].map((link, idx) => (
                            <li
                              key={idx}
                              className="border-b border-gray-100 dark:border-[#2E2E2E] pb-2"
                            >
                              <Link href={link.href} className="hover:underline">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </header>

      {hoverTab && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-[140]"
            onClick={() => setHoverTab(null)}
            onWheel={() => setHoverTab(null)}
          />
          {/* panel */}
          <div
            className="fixed inset-x-0 z-[150] px-0 lg:px-10 pointer-events-none"
            style={fixedWrapStyle}
          >
            <div
              className="app-container mx-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <LocationDropdown location={location} setLocation={setLocation} setHoverTab={setHoverTab} />
            </div>
          </div>
        </>
      )}

      {showLogin && <MobileLoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default MobileHeader;
