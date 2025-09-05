"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import BrandCard from "../brand/BrandCard";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { BRANDS as RAW_BRANDS } from "@/data/sell-used/brands";
import { selectBrand, setStep, type Brand } from "@/redux/slices/sellUsedSlice";
import { RootState } from "@/redux/store";
import StepTopBar from "../common/StepTopBar";

const toId = (name: string, i: number) =>
  `${name.toLowerCase().replace(/\s+/g, "-")}-${i}`;

export default function BrandStep() {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.sellUsed.brand);
  const [q, setQ] = useState("");

  // normalize data + ensure id present
  const ALL: Brand[] = useMemo(() => {
    return (RAW_BRANDS as Partial<Brand>[])
      .filter(Boolean)
      .filter(
        (b): b is Partial<Brand> & { name: string; logo: string } =>
          !!b?.name && !!b?.logo
      )
      .map((b, i) => ({
        id: b.id ?? toId(b.name, i),
        name: b.name,
        logo: b.logo,
      }));
  }, []);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return ALL;
    return ALL.filter((b) => b.name.toLowerCase().includes(t));
  }, [q, ALL]);

  const onPick = (b: Brand) => {
    dispatch(selectBrand(b));
    dispatch(setStep("period")); // ⬅️ go to Step 2
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <StepHeader
        current={0}
        onBack={() => dispatch(setStep("landing"))}
        onClose={() => dispatch(setStep("landing"))}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* top bar */}
          <StepTopBar
            title="Select Your Car Brand"
            query={q}
            onQueryChange={setQ}
            placeholder="Search Brand name"
          />
          {/* grid */}
          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-2">
              {list.map((b) => (
                <BrandCard
                  key={b.id}
                  brand={b}
                  active={selected?.id === b.id}
                  onClick={() => onPick(b)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-4">
          <SelectedTrail />
          <Card
            variant="white"
            className="mt-4 p-4 text-sm text-gray-500 dark:bg-[#171717] border dark:border-[#2E2E2E]"
          >
            Tip: Use the search to quickly find your brand. Your selection
            appears here with a green tick.
          </Card>
        </div>
      </div>

      {/* optional subtle texture */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 opacity-20">
        <Image
          src="/sell-used/header-texture.png"
          alt=""
          width={1600}
          height={300}
          className="w-full h-auto"
        />
      </div>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #facc15;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
