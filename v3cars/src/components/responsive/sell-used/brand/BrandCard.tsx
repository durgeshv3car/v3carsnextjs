"use client";
import Image from "next/image";
import Card from "../common/Card";
import { cn } from "@/lib/utils";
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

export default function BrandCard({
  brand,
  active,
  onClick,
}: {
  brand?: CarBrand;
  active: boolean;
  onClick: () => void;
}) {
  if (!brand) return null;

  return (
    <button
      onClick={onClick}
      className={cn("group relative w-full", active ? "outline-none" : "")}
    >
      <Card
        variant="white"
        className={cn(
          "grid place-items-center h-24 md:h-28 px-3 dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-xl",
          active ? "ring-yellow-400 ring-2 border-transparent shadow-md" : ""
        )}
      >
        <Image
          src={`${IMAGE_URL2}/ad-min/uploads/${brand.logoPath}`}
          alt={brand.brandName || "Brand"}      
          width={96}
          height={60}
          className="object-contain opacity-95 max-h-12 dark:invert"
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
