
'use client';

import { FaChevronDown } from "react-icons/fa";
export default function CarLoanIntro() {
  return (
    <section className="max-w-[1650px] mx-auto px-4 sm:px-8 py-6">
      {/* Heading */}
      <h1 className="text-4xl font-light text-gray-800 dark:text-white">
        Car Loan in <span className="font-semibold">India</span>
      </h1>

      {/* Paragraph */}
      <p className="mt-2 text-lg leading-relaxed text-gray-600 dark:text-white">
        Looking for the latest fuel prices in India? Look no further! This page
        provides you with up-to-date information on fuel prices across major
        Indian cities (as of September 18, 2024). We understand fuel prices fluctuate,
        so we offer daily updates to help you find and compare fuel prices in
        and around your city. Today on September 18, 2024 the price of petrol in
        your city (Saharanpur) is ₹95.08 per liter
      </p>

      {/* Read More */}
      <button className="mt-3 flex items-center gap-1 text-[16px] text-orange-500 font-medium hover:underline">
        Read More
        <FaChevronDown size={12} />
      </button>
    </section>
  );
}
