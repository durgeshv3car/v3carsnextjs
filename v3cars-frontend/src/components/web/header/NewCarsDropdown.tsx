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
    <div className="w-64 bg-white dark:bg-[#171717] shadow-xl border-b-[5px] rounded-b-[10px] border-gray-500 dark:border-[#2E2E2E] overflow-hidden">
      <ul className="flex flex-col text-[14px]">
        {items.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#27272a] cursor-pointer border-b border-gray-200 dark:border-[#2E2E2E] last:border-b-0 hover:text-primary"
          >
            <Image
              src="/common/v3icon.svg"
              alt="icon"
              width={18}
              height={18}
              className=" dark:invert group-hover:hidden"
            />

            <Image
              src="/common/v3.png"
              alt="v3-icon-yellow"
              width={18}
              height={18}
              className="hidden group-hover:block"
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NewCarsDropdown;
