'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiGooglenews } from "react-icons/si";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const path = usePathname()
  return (
    <>

      {
        path !== "/web-stories" && (
          <>
            <footer className="bg-[#E2E2E2] dark:bg-[#171717] border-t border-gray-300 dark:border-[#262629]">
              <section className="px-6 lg:px-10">
                <div className="w-full lg:max-w-[1600px] mx-auto pt-8 pb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {/* Connect */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg inline-block pb-1">Connect</h3>
                      <div className="h-0.5 rounded-full bg-gradient-to-r from-black to-transparent dark:from-[#262629] dark:to-transparent w-full"></div>
                    </div>
                    <p className="text-sm">
                      V3Cars is your ultimate automotive resource. We provide comprehensive
                      information on car specifications, prices, features, reviews, and the best
                      variant to buy. Compare different models, explore expert opinions, and make
                      informed decisions about your next vehicle.
                    </p>
                    <div className="flex items-start text-sm gap-3">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                      <span>
                        537, 5th Floor, JMD Megapolis, Sector 48, Gurugram, Haryana 122018
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <span>Email : editor@v3cars.com</span>
                    </div>
                  </div>

                  {/* Research */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg inline-block pb-1">Research</h3>
                      <div className="h-0.5 rounded-full bg-gradient-to-r from-black to-transparent dark:from-[#262629] dark:to-transparent w-full"></div>
                    </div>
                    <ul className="text-sm">
                      {[
                        "Car reviews",
                        "Variants explained",
                        "Car videos",
                        "Upcoming cars",
                        "New cars",
                        "Car segments In India",
                        "Car On-Road Price",
                      ].map((text, index) => (
                        <React.Fragment key={index}>
                          <li className="flex gap-2 items-center py-3">
                            <Image src="/logo/v3.svg" alt="v3-icon" width={16} height={16} />
                            <span>{text}</span>
                          </li>
                          <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:from-transparent dark:via-[#262629] dark:to-transparent" />
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div className="space-y-6">
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg inline-block pb-1">Tools</h3>
                      <div className="h-0.5 rounded-full bg-gradient-to-r from-black to-transparent dark:from-[#262629] dark:to-transparent w-full"></div>
                    </div>
                    <ul className="text-sm">
                      {[
                        "Compare Cars",
                        "EMI Calculator",
                        "Fuel Cost Calculator",
                        "Buy / Renew Car Insurance",
                        "Fuel Price In India",
                        "Apply For Car Loan",
                        "Mileage Calculator",
                        "Sell Used Car",
                      ].map((tool, index) => (
                        <React.Fragment key={index}>
                          <li className="flex gap-2 items-center py-3">
                            <Image src="/logo/v3.svg" alt="v3-icon" width={16} height={16} />
                            <span>{tool}</span>
                          </li>
                          <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:from-transparent dark:via-[#262629] dark:to-transparent" />
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg inline-block pb-1">Newsletter</h3>
                      <div className="h-0.5 rounded-full bg-gradient-to-r from-black to-transparent dark:from-[#262629] dark:to-transparent w-full"></div>
                    </div>
                    <p className="text-sm">
                      Sign up for our newsletter to receive the latest car news, reviews, expert
                      advice, tips, and exclusive offers.
                    </p>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full border border-[#262629] bg-transparent outline-none rounded-lg px-3 text-sm py-5"
                    />
                    <button className="w-full bg-black font-light text-white py-4 rounded-xl">
                      Subscribe
                    </button>

                    <h4 className="font-semibold mb-4">Connect With Us</h4>
                    <div className="flex flex-wrap justify-center items-center space-x-1 xl:space-x-2">
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><FaYoutube /></Link>
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><FaFacebookF /></Link>
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><FaInstagram /></Link>
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><FaLinkedinIn /></Link>
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><RiTwitterXFill /></Link>
                      <Link href="#"><PiWhatsappLogoThin size={50} /></Link>
                      <Link href="#" className="border-2 border-[#262629] rounded-full p-3"><SiGooglenews /></Link>
                    </div>
                  </div>

                </div>
              </section>

              <div className="bg-yellow-400 text-sm py-6 text-center px-6 lg:px-10">
                <div className="w-full lg:max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center">
                  <span className="text-black">Copyright 2024 V3Cars</span>
                  <div className="text-black">
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
                        className={`px-3 hover:underline ${i !== 7 ? "border-r border-[#262629]" : ""}`}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#343A40] py-2" />

            </footer>
          </>
        )}
    </>
  );
};

export default Footer;