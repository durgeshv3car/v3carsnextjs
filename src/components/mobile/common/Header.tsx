"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu, FiMapPin, FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const toolsLinks = [
    "Car Loan EMI Calculator",
    "Fuel Cost Calculator",
    "Mileage Calculator",
    "Car On-Road Price",
    "Buy/Renew Car Insurance",
    "Sell Used Car",
    "Apply For Car Loan",
    "Compare Cars",
    "Fuel Price In India",
  ];

  const subMenus: Record<string, string[]> = {
    Tools: toolsLinks,
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-white  z-50 relative md:hidden ">
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
          />
        </div>

        {/* Right: Location + Login Icon */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-md text-gray-700">
            <FiMapPin size={16} />
            Visakhapatnam
          </div>
          <HiOutlineUserCircle size={24} />
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center mx-4 mb-3 border rounded-full overflow-hidden mb-5">
        <input
          type="text"
          placeholder="Search Car"
          className="px-4 py-1 w-full outline-none text-sm"
        />
        <button className="bg-gray-700 p-2 px-6 text-white rounded-full">
          <FiSearch size={16} />
        </button>
      </div>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] bg-white z-[101] shadow-md p-4 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Logo + Login */}
        <div className="flex justify-between items-center mb-4">
          <Image
            src="/logo/header/v3logo.png"
            alt="Logo"
            width={90}
            height={40}
          />
          <button className="bg-yellow-400 text-black text-sm px-4 py-1 rounded-full font-medium">
            Login
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {["New Cars", "News, Reviews & Videos", "Variant Explained", "Tools"].map((item) => {
            const hasSubmenu = !!subMenus[item];

            return (
              <div key={item}>
                <button
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800 py-2"
                  onClick={() => hasSubmenu && toggleTab(item)}
                >
                  {item}
                  {hasSubmenu && (
                    <IoChevronDownOutline
                      size={16}
                      className={`transition-transform duration-300 ${
                        openTab === item ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Accordion submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openTab === item ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  {hasSubmenu && (
                    <ul className="pl-4 text-sm text-gray-600 space-y-2 py-2">
                      {subMenus[item].map((link, idx) => (
                        <li
                          key={idx}
                          className="border-b border-gray-100 pb-2"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
