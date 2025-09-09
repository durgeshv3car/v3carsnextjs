"use client";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

const ToolsDropdown = () => {
  const sections = [
    {
      title: "Calculators",
      desc: "Estimate costs and savings with our handy automotive calculators.",
      links: [
        { text: "Car Loan EMI Calculator", url: "/car-loan-emi-calculator" },
        { text: "Fuel Cost Calculator", url: "/fuel-cost-calculator" },
        { text: "Mileage Calculator", url: "/mileage-calculator" },
        { text: "Car On-Road Price", url: "/car-on-road-price-in-india" },
      ],
    },
    {
      title: "Buy, Sell, Renew",
      desc: "Simplify your car ownership journey with our buying, selling, and renewal tools.",
      links: [
        { text: "Buy/Renew Car Insurance", url: "/car-insurance-india" },
        { text: "Sell Used Car", url: "/sell-used-car" },
        { text: "Apply For Car Loan", url: "/apply-car-loan-india" },
      ],
    },
    {
      title: "Others",
      desc: "Explore additional resources and comparisons for car enthusiasts.",
      links: [
        { text: "Compare Cars", url: "/compare-cars" },
        { text: "Fuel Price In India", url: "/fuel-price-in-india" },
      ],
    },
  ];


  return (
    <div className="w-full bg-white dark:bg-[#171717] shadow-md border-b-[5px] rounded-b-[10px] border-gray-500 dark:border-[#2E2E2E] h-full px-10">
      <div className="max-w-[1600px] mx-auto py-6 flex gap-6 items-start">
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

              <ul className="text-[13px]">
                {section.links.map((text, i) => (
                  <li
                    key={i}
                    className="group flex items-center gap-2 cursor-pointer py-2 border-b border-gray-200 dark:border-[#2E2E2E] last:border-b-0 w-fit hover:text-yellow-400"
                  >
                    <Image
                      src="/common/v3icon.svg"
                      alt="icon"
                      width={16}
                      height={16}
                      className=" dark:invert group-hover:hidden"
                    />

                    <Image
                      src="/common/v3.png"
                      alt="v3-icon-yellow"
                      width={16}
                      height={16}
                      className="hidden group-hover:block"
                    />
                    <Link href={text.url}>{text.text}</Link>
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
