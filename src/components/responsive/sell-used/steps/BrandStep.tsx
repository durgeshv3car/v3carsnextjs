"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SearchBox from "../common/SearchBox";
import BrandCard from "../brand/BrandCard";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";

import { Brand, selectBrand } from "@/redux/slices/sellUsedSlice";
import { RootState } from "@/redux/store"; // adjust import to your store



 const BRANDS: Brand[] = [
  { id: "maruti", name: "Maruti Suzuki", logo: "/sell-used/brands/maruti.png" },
  { id: "tata", name: "Tata", logo: "/sell-used/brands/tata.png" },
  { id: "honda", name: "Honda", logo: "/sell-used/brands/honda.png" },
  { id: "nexa", name: "NEXA", logo: "/sell-used/brands/nexa.png" },
  { id: "mg", name: "MG", logo: "/sell-used/brands/mg.png" },
  { id: "kia", name: "Kia", logo: "/sell-used/brands/kia.png" },
  { id: "nissan", name: "Nissan", logo: "/sell-used/brands/nissan.png" },
  { id: "toyota", name: "Toyota", logo: "/sell-used/brands/toyota.png" },
  { id: "skoda", name: "Skoda", logo: "/sell-used/brands/skoda.png" },
  { id: "jeep", name: "Jeep", logo: "/sell-used/brands/jeep.png" },
  { id: "lexus", name: "Lexus", logo: "/sell-used/brands/lexus.png" },
  { id: "renault", name: "Renault", logo: "/sell-used/brands/renault.png" },
  { id: "porsche", name: "Porsche", logo: "/sell-used/brands/porsche.png" },
  { id: "lamborghini", name: "Lamborghini", logo: "/sell-used/brands/lamborghini.png" },
  { id: "ferrari", name: "Ferrari", logo: "/sell-used/brands/ferrari.png" },
];

export default function BrandStep() {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.sellUsed.brand);

  const [q, setQ] = useState("");

  const list = useMemo(() => {
    if (!q.trim()) return BRANDS;
    const t = q.toLowerCase();
    return BRANDS.filter((b) => b.name.toLowerCase().includes(t));
  }, [q]);

  const onPick = (b: Brand) => dispatch(selectBrand(b));

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <StepHeader current={0} />

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <Card className="px-4 py-2 text-sm font-medium">Select Your Car Brand</Card>
            <SearchBox value={q} onChange={setQ} />
          </div>

          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
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

          {/* (Optional) hint card */}
          <Card className="mt-4 p-4 text-sm text-gray-400">
            Tip: Use the search to quickly find your brand. Your selection appears here with a green tick.
          </Card>
        </div>
      </div>

      {/* subtle texture like the reference */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 opacity-20">
        <Image src="/sell-used/header-texture.png" alt="" width={1600} height={300} className="w-full h-auto" />
      </div>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 8px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
