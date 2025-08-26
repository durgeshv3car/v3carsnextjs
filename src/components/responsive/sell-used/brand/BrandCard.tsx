"use client";
import Image from "next/image";
import Card from "../common/Card";
import { Brand } from "@/redux/slices/sellUsedSlice";
import { cn } from "@/lib/utils";

export default function BrandCard({
  brand,
  active,
  onClick,
}: {
  brand?: Brand;        // 👈 optional to avoid runtime crash
  active: boolean;
  onClick: () => void;
}) {
  if (!brand) return null;                          // 👈 guard

  return (
    <button
      onClick={onClick}
      className={cn("group relative w-full", active ? "outline-none" : "")}
    >
      <Card
        variant="white"
        className={cn(
          "grid place-items-center h-24 md:h-28 px-3 bg-white border border-black/10 rounded-xl",
          active ? "ring-yellow-400 ring-2 border-transparent shadow-md" : ""
        )}
      >
        <Image
          src={brand.logo || "/placeholder.svg"}     // 👈 fallback
          alt={brand.name || "Brand"}
          width={96}
          height={60}
          className="object-contain opacity-95 max-h-12"
        />
      </Card>

      {active && (
        <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 text-white grid place-items-center text-xs">
          ✓
        </span>
      )}
    </button>
  );
}
