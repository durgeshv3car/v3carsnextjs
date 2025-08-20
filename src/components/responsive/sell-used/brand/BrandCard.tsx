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
  brand: Brand;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full",
        active ? "outline-none" : ""
      )}
    >
      <Card
        className={cn(
          "grid place-items-center h-24 md:h-28 px-3",
          active ? "ring-yellow-400 ring-2" : ""
        )}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={96}
          height={60}
          className="object-contain opacity-95"
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
