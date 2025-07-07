"use client";
import Image from "next/image";

const NewCarsDropdown = () => {
  const items = [
    { label: "Upcoming Cars" },
    { label: "Popular Cars" },
    { label: "Latest Cars" },
    { label: "Electric Cars" },
  ];

  return (
    <div className="w-64 bg-white rounded-md shadow-xl border-b-[5px] rounded-[10px] border-gray-500">
      <ul className="flex flex-col text-[14px]">
        {items.map((item, idx) => (
          <li
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewCarsDropdown;
