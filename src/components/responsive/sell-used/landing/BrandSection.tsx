"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { BRANDS } from "@/data/sell-used/brands";
import { selectBrand, setStep, type Brand as BrandType } from "@/redux/slices/sellUsedSlice";

function toId(name: string, i: number) {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${i}`;
}


export default function BrandSection() {

  const dispatch = useDispatch();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return BRANDS;
    return BRANDS.filter((b) => b.name.toLowerCase().includes(t));
  }, [q]);

  const handlePick = (b: { name: string; logo: string }, i: number) => {
    const normalized: BrandType = { id: toId(b.name, i), name: b.name, logo: b.logo };
    dispatch(selectBrand(normalized));
    dispatch(setStep("brand")); // 👈 same URL par Step-1 view
  };

  return (
    <section className="px-4 xl:px-10 mb-5">
      <div className="w-full lg:max-w-[1600px] mx-auto">
        {/* Search */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3 py-2 ring-1 ring-black/5">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter Brand Name"
              className="w-56 md:w-72 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-500"
            />
            <span className="text-gray-500 text-base leading-none">▾</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {list.map((b, i) => (
            <button
              key={`${b.name}-${i}`}
              onClick={() => handlePick(b as any, i)}
              className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 hover:shadow-md transition"
              aria-label={b.name}
            >
              <div className="h-28 grid place-items-center p-3">
                <Image src={b.logo} alt={b.name} width={96} height={54} className="object-contain" />
              </div>

              {/* bottom-left soft gradient */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 w-44 h-16"
                style={{
                  background:
                    "radial-gradient(120% 100% at 0% 100%, rgba(0,0,0,0.09) 0%, rgba(0,0,0,0.05) 38%, rgba(255,255,255,0) 72%)",
                }}
              />

              <span className="pointer-events-none absolute bottom-2 left-3 text-[13px] md:text-sm font-medium text-neutral-900">
                {b.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
