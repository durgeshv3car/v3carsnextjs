"use client";
import Image from "next/image";
import Link from "next/link";

const NewCarsDropdown = () => {
  const items = [
    { label: "Upcoming Cars", href: "/upcoming-cars" },
    { label: "Popular Cars", href: "/popular-cars" },
    { label: "Latest Cars", href: "/latest-launched-cars" },
    { label: "Electric Cars", href: "/electric-cars" },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-b-[5px] rounded-b-[10px] border-gray-500 overflow-hidden">
      <ul className="flex flex-col text-[14px]">
        {items.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
          >
            <Image
              src="/common/v3icon.svg"
              alt="icon"
              width={18}
              height={18}
            />
            <span className="text-gray-800">{item.label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NewCarsDropdown;
