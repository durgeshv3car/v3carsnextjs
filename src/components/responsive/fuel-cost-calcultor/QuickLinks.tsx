'use client';

import { FaTachometerAlt, FaMoneyBillWave, FaGasPump, FaRoad, FaCalculator } from 'react-icons/fa';

const quickLinks = [
  {
    title: 'Mileage Calculator',
    description: "Estimate Your Vehicle's Fuel Efficiency",
    icon: <FaTachometerAlt size={40} />,
    bg: 'bg-[#E6F3FF]',
  },
  {
    title: 'Sell Used Cars',
    description: 'Sell Your Pre-Owned Car Today',
    icon: <FaMoneyBillWave size={40} />,
    bg: 'bg-[#E8FFE8]',
  },
  {
    title: 'Fuel Price in India',
    description: 'Check Latest Fuel Prices Across India',
    icon: <FaGasPump size={40} />,
    bg: 'bg-[#FFF2D9]',
  },
  {
    title: 'Car On-road Price',
    description: 'Get On-road Price Estimates',
    icon: <FaRoad size={40} />,
    bg: 'bg-[#E8FFE8]',
  },
  {
    title: 'Car Loan EMI Calculator',
    description: 'Calculate Your Monthly Car Loan EMI',
    icon: <FaCalculator size={40} />,
    bg: 'bg-[#E6F3FF]',
  },
];

export default function QuickLinks() {
  return (
    <div className="mt-10 max-w-[1600px] mx-auto my-10">
      <h3 className="text-[28px] font-semibold text-gray-900 mb-4 dark:text-white">Quick Links</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickLinks.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition`}
          >
            <div className="text-black mb-2">{item.icon}</div>
            <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
            <p className="text-xs text-gray-700 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
