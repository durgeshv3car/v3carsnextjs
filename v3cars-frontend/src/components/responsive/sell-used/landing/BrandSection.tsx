"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { selectBrand, setStep } from "@/redux/slices/sellUsedSlice";
import { IMAGE_URL2 } from "@/utils/constant";

interface CarBrand {
  brandId: number;
  brandName: string;
  brandSlug: string;
  logoPath: string;
  popularity: string;
  unquieViews: number | null;
  brandStatus: number;
  serviceNetwork: boolean;
  brandType: number;
}

interface BrandSectionProps {
  brands: CarBrand[];
}

export default function BrandSection({ brands }: BrandSectionProps) {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");

  // ✅ Use minimal data structure for Redux
  const handlePick = (b: CarBrand, i: number) => {
    dispatch(
      selectBrand({
        brandId: b.brandId,   // normalized ID
        brandName: b.brandName,
        logoPath: b.logoPath,
      })
    );

    dispatch(setStep("period")); // or whatever next step you want
  };

  const filteredBrands = brands.filter((b) =>
    b.brandName.toLowerCase().includes(q.toLowerCase())
  );

  function handleAllBrands() {
    dispatch(setStep("brand"));
  }

  return (
    <section className="px-4 xl:px-10 mb-5">
      <div className="w-full lg:app-container mx-auto">
        {/* Search */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] dark:bg-[#171717] px-3 py-2 ring-1 ring-black/5">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter Brand Name"
              className="w-56 md:w-72 bg-transparent dark:bg-[#171717] outline-none text-sm"
            />
            <span className="text-gray-500 text-base leading-none">▾</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <>
            {filteredBrands.slice(0, 10).map((b, i) => (
              <button
                key={`${b.brandName}-${i}`}
                onClick={() => handlePick(b, i)}
                className="relative overflow-hidden rounded-2xl border dark:border-[#2E2E2E] ring-1 ring-black/10 hover:shadow-md transition bg-white text-black"
                aria-label={b.brandName}
              >
                <div className="h-36 grid place-items-center p-3">
                  <Image
                    src={`${IMAGE_URL2}/ad-min/uploads/${b.logoPath}`}
                    alt={b.brandName}
                    width={120}
                    height={36}
                    className="object-cover"
                  />
                </div>

                {/* bottom-left soft gradient */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 w-44 h-16"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 0% 100%, rgba(0,0,0,0.09) 0%, rgba(0,0,0,0.05) 38%, rgba(255,255,255,0) 72%)",
                  }}
                />

                <span className="pointer-events-none absolute bottom-2 left-3 text-[13px] md:text-sm font-medium">
                  {b.brandName}
                </span>
              </button>
            ))}

            <button
              onClick={handleAllBrands}
              className="flex items-center justify-center gap-2 hover:underline rounded-2xl border dark:border-[#2E2E2E] ring-1 ring-black/10 hover:shadow-md transition bg-white text-yellow-500 text-sm"
            >
              View All Brand
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        </div>
      </div>
    </section>
  );
}
