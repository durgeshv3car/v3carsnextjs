'use client';

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiGooglenews } from "react-icons/si";

const MobileFooter: React.FC = () => {
  return (
    <footer className="rounded-t-2xl border">
      <div className="mx-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Connect */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 inline-block pb-1">Connect</h3>
          </div>
          <p className="text-sm text-gray-700">
            V3Cars is your ultimate automotive resource. We provide comprehensive
            information on car specifications, prices, features, reviews, and the best
            variant to buy. Compare different models, explore expert opinions, and make
            informed decisions about your next vehicle.
          </p>
          <div className="flex items-start text-sm gap-3 text-gray-700">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <span>
              537, 5th Floor, JMD Megapolis, Sector 48, Gurugram, Haryana 122018
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <span>Email : editor@v3cars.com</span>
          </div>
        </div>

        {/* Research */}
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
          <div className="bg-[#D9D8D8] px-4 py-3 font-bold text-lg text-black">Research</div>
          <ul className="divide-y divide-gray-200 bg-white text-black">
            {[
              "Car Reviews",
              "Variants Explained",
              "Car Videos",
              "Upcoming Cars",
              "New Cars",
              "Car Segments In India",
              "Car On-Road Price",
            ].map((item, index) => (
              <li key={index} className="px-4 py-3 bg-[#F2F2F2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
          <div className="bg-[#D9D8D8] px-4 py-3 font-bold text-lg">Tools</div>
          <ul className="divide-y divide-gray-200 bg-white">
            {[
              "Compare Cars",
              "EMI Calculator",
              "Fuel Cost Calculator",
              "Buy / Renew Car Insurance",
              "Fuel Price In India",
              "Apply For Car Loan",
              "Mileage Calculator",
              "Sell Used Car",
            ].map((item, index) => (
              <li key={index} className="px-4 py-3 bg-[#F2F2F2] cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg inline-block text-gray-800 pb-1">Newsletter</h3>
          </div>
          <p className="text-sm text-gray-700">
            Sign up for our newsletter to receive the latest car news, reviews, expert
            advice, tips, and exclusive offers.
          </p>
          <div className="my-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-black bg-white focus:border-yellow-400 rounded-lg px-3 text-sm py-5"
            />
            <button className="w-full mt-4 bg-black font-light text-white py-4 rounded-xl hover:bg-gray-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Footer */}
      <div className="bg-yellow-400 text-center text-black px-4 pt-6 pb-20 rounded-t-xl">
        <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
        <div className="flex justify-center items-center gap-3 flex-wrap mb-4 mx-4">
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <FaYoutube />
          </Link>
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <FaFacebookF />
          </Link>
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <FaInstagram />
          </Link>
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <FaLinkedinIn />
          </Link>
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <RiTwitterXFill />
          </Link>
          <Link href="#">
            <PiWhatsappLogoThin size={50} />
          </Link>
          <Link href="#" className="border-2 border-black rounded-full p-3">
            <SiGooglenews />
          </Link>
        </div>

        <hr className="my-6 [border-color:rgba(0,0,0,0.2)] border" />

        <div className="mx-4 text-sm">
          {[
            "About",
            "Advertise With Us",
            "Careers",
            "Contact Us",
            "Term of Uses",
            "Privacy Policy",
            "RSS",
            "Sitemap",
          ].map((item, i) => (
            <Link
              key={i}
              href="#"
              className={`px-3 hover:underline ${i !== 7 ? "border-r" : ""}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <hr className="my-6 [border-color:rgba(0,0,0,0.2)] border" />
        <p className="text-sm">Copyright 2024 V3Cars</p>
      </div>
    </footer>
  );
};

export default MobileFooter;
