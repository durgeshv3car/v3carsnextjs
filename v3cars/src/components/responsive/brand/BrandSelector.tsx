'use client';

import Image from 'next/image';
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import { IMAGE_URL } from '@/utils/constant';
import { useRouter } from 'next/navigation';

export interface CarBrand {
  brandId: number
  brandName: string
  brandSlug: string
  logoPath: string
  popularity: string
  unquieViews: number | null
  brandStatus: number
  serviceNetwork: boolean
  brandType: number
}

interface BrandSelectorProps {
  data: CarBrand[];
  selectBrand: number | null;
  setSelectBrand: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function BrandSelector({ data, setSelectBrand, selectBrand }: BrandSelectorProps) {

  console.log(setSelectBrand);
  
  const router = useRouter()

  function normalizeBrandName(name: string) {
    const lower = name.toLowerCase();
    if (lower === "maruti arena" || lower === "maruti nexa") {
      return "Maruti Suzuki";
    }
    return name;
  }

  function splitBrands(brands: CarBrand[]) {
    const normalizedBrands = brands.map((b) => ({
      ...b,
      displayName: normalizeBrandName(b.brandName),
    }));

    // Sort by popularity
    const sorted = [...normalizedBrands].sort((a, b) => {
      const pa = a.popularity && a.popularity.trim() !== "" ? Number(a.popularity) : Infinity;
      const pb = b.popularity && b.popularity.trim() !== "" ? Number(b.popularity) : Infinity;
      return pa - pb;
    });

    // Deduplicate by displayName
    const seen = new Set<string>();
    const uniqueSorted = sorted.filter((b) => {
      if (seen.has(b.displayName)) return false;
      seen.add(b.displayName);
      return true;
    });

    const popularBrands = uniqueSorted
      .filter((b) => b.popularity && b.popularity.trim() !== "")
      .slice(0, 10);

    const allBrands = uniqueSorted
      .filter((b) => !popularBrands.includes(b))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return {
      groupedOptions: [
        { label: "Popular Brands", options: popularBrands },
        { label: "All Brands", options: allBrands },
      ],
    };
  }


  const { groupedOptions } = splitBrands(data)

  const selectedBrand = data.find((b) => b.brandId === selectBrand);

  return (
    <div className="space-y-4">
      {/* Select dropdown */}
      <div className='border-b dark:border-[#2E2E2E] bg-[#FFCC00] rounded-md'>
        <CustomSelect
          groupedOptions={groupedOptions}
          placeholder="Select Brand"
          labelKey="displayName"
          valueKey="brandId"
          value={selectBrand}
          onSelect={(value: CarBrand) => { router.push(`/${value.brandSlug}`) }}
        />
      </div>

      {/* Brand Image */}
      {selectedBrand?.logoPath && (
        <div className="bg-white p-2 rounded-xl shadow">
          <Image
            src={`${IMAGE_URL}/media/brand-imgs/${selectedBrand.logoPath}`}
            alt={selectedBrand.brandName}
            width={250}
            height={150}
            className="w-full object-contain rounded-md"
          />
        </div>
      )}
    </div>
  );
}
