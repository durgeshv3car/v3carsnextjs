"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { BRANDS } from "@/data/sell-used/brands";
import { selectBrand, setStep, type Brand as BrandType } from "@/redux/slices/sellUsedSlice";

function toId(name: string, i: number) {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${i}`;
}

// Define brand shape (from BRANDS)
type BrandItem = {
  name: string;
  logo: string;
};

export default function BrandSection() {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");

  const list: BrandItem[] = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return BRANDS;
    return BRANDS.filter((b) => b.name.toLowerCase().includes(t));
  }, [q]);

  const handlePick = (b: BrandItem, i: number) => {
    const normalized: BrandType = {
      id: toId(b.name, i),
      name: b.name,
      logo: b.logo,
    };
    dispatch(selectBrand(normalized));
    dispatch(setStep("brand")); // 👈 same URL par Step-1 view
  };

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
          {list.map((b, i) => (
            <button
              key={`${b.name}-${i}`}
              onClick={() => handlePick(b, i)} // ✅ no "any" now
              className="relative overflow-hidden rounded-2xl border dark:border-[#2E2E2E] ring-1 ring-black/10 hover:shadow-md transition"
              aria-label={b.name}
            >
              <div className="h-28 grid place-items-center p-3">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={96}
                  height={54}
                  className="object-contain dark:invert"
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
                {b.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
