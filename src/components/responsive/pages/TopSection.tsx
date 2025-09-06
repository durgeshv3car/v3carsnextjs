'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopSectionProps {
  type: string;
}

function TopSection({ type }: TopSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<"3rem" | "none" | string>("3rem");
  const contentRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const descriptionText = `Looking for the latest ${type} prices in India? Look no further! This page provides you with up-to-date information on ${type} prices across major Indian cities (as of September 18, 2024). We understand prices fluctuate, so we offer daily updates to help you find and compare ${type} prices in and around your city. Today on September 18, 2024 the price of ${type} in your city (Saharanpur) is ₹95.08 per liter.`;

  const wordCount = descriptionText.trim().split(/\s+/).filter(Boolean).length;
  const hasReadMore = wordCount > 65;

  useEffect(() => {
    if (!hasReadMore) {
      setMaxHeight("none");
      return;
    }
    if (isExpanded && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + "px");
    } else {
      setMaxHeight("3rem");
    }
  }, [isExpanded, descriptionText, hasReadMore]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#18181b] text-white">
        <div className="px-4 xl:px-10">
          <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-yellow-500">›</span>
            <span className="font-medium text-yellow-500">
              {path === "/petrol-price-in-india" ? "Petrol Price In India" :
               path === "/diesel-price-in-india" ? "Diesel Price In India" :
               path === "/cng-price-in-india" ? "CNG Price In India" :
               "Fuel Price In India"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full min-h-[186px] py-[30px]">
        <div className="px-4 xl:px-10">
          <div className="w-full lg:max-w-[1600px] mx-auto space-y-5">

            {/* Title */}
            <h1 className="text-4xl font-semibold ">
              Today's {type} Prices in India - {" "}
              <span className="font-thin text-gray-400">September 18, 2024</span>
            </h1>

            {/* Description */}
            <div
              ref={contentRef}
              style={{ maxHeight }}
              className={`${hasReadMore ? "overflow-hidden transition-all duration-500 ease-in-out" : "overflow-visible"}`}
              aria-expanded={hasReadMore ? isExpanded : true}
            >
              <p className="text-wrap">{descriptionText}</p>
            </div>

            {/* Read More / Less */}
            {hasReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-[#FFCC00] font-medium hover:underline flex items-center gap-1"
              >
                {isExpanded ? "Read Less" : "Read More"}
                <span
                  className={`transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopSection;
