"use client";
import Image from "next/image";
import { IoArrowForwardOutline } from "react-icons/io5";

const ToolsDropdown = () => {
  const sections = [
    {
      title: "Calculators",
      desc: "Estimate costs and savings with our handy automotive calculators.",
      links: [
        "Car Loan EMI Calculator",
        "Fuel Cost Calculator",
        "Mileage Calculator",
        "Car On-Road Price",
      ],
    },
    {
      title: "Buy, Sell, Renew",
      desc: "Simplify your car ownership journey with our buying, selling, and renewal tools.",
      links: [
        "Buy/Renew Car Insurance",
        "Sell Used Car",
        "Apply For Car Loan",
      ],
    },
    {
      title: "Others",
      desc: "Explore additional resources and comparisons for car enthusiasts.",
      links: ["Compare Cars", "Fuel Price In India"],
    },
  ];

  return (
    <div className="w-full bg-white shadow-md z-50 border-b-[5px] rounded-[10px] border-gray-500 h-[50vh]">
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex gap-6 items-start">
        <div className="flex-1 flex gap-6">
          {sections.map((section, index) => (
            <div key={index} className="w-[30%]">
              {/* Section Header */}
              <div className="bg-[#FFE167] px-4 py-2 rounded-[10px] font-medium text-[15px] text-gray-900 mb-3 border-b-[3px] border-yellow-500">
                <div className="flex items-center justify-between">
                  {section.title}
                  <IoArrowForwardOutline size={18} />
                </div>
                <p className="text-xs text-gray-700 mb-4">{section.desc}</p>
              </div>

              <ul className="text-[13px] text-gray-800">
                {section.links.map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 hover:underline cursor-pointer py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <Image
                      src="/common/v3icon.svg"
                      alt="icon"
                      width={16}
                      height={16}
                      className="mt-[2px]"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

            {/* Ad Box */}
                    <div className=" bg-gray-500 h-[250px] rounded-md flex items-center justify-center p-3 w-[30%]">

                    </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsDropdown;
