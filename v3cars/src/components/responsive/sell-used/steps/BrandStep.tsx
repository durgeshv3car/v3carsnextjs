"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import BrandCard from "../brand/BrandCard";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { selectBrand, setStep, type Brand } from "@/redux/slices/sellUsedSlice";
import { RootState } from "@/redux/store";
import StepTopBar from "../common/StepTopBar";

interface BrandStepProps {
  brands: CarBrand[];
}

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

export default function BrandStep({ brands }: BrandStepProps) {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.sellUsed.brand);
  const [q, setQ] = useState("");

  // ✅ Normalize data from API/interface
  const ALL: CarBrand[] = useMemo(() => {
    // Sirf active brands le rahe hain (brandStatus === 1)
    return brands.filter((b) => b.brandStatus === 1);
  }, [brands]);

  // ✅ Normal brand name search filter
  const list = useMemo(() => {
    const search = q.trim().toLowerCase();
    if (!search) return ALL;
    return ALL.filter((b) =>
      b.brandName.toLowerCase().includes(search)
    );
  }, [q, ALL]);

  const onPick = (b: Brand) => {
    dispatch(selectBrand(b));
    dispatch(setStep("period"));
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <StepHeader
        current={0}
        onBack={() => dispatch(setStep("landing"))}
        onClose={() => dispatch(setStep("landing"))}
      />

      <div className="mx-auto app-container px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <StepTopBar
            title="Select Your Car Brand"
            query={q}
            onQueryChange={setQ}
            placeholder="Search Brand name"
          />

          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-2">
              {list.map((b: CarBrand) => (
                <BrandCard
                  key={b.brandId}
                  brand={b}
                  active={selected?.brandId === b.brandId}
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
