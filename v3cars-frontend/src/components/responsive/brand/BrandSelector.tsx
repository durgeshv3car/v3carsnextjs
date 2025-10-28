'use client';

import { useState } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import Image from 'next/image';
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import { IMAGE_URL, IMAGE_URL2 } from '@/utils/constant';

interface BrandOption {
  value: string;
  label: string;
  image: string;
}

const brandOptions: BrandOption[] = [
  { value: 'mahindra', label: 'Mahindra', image: '/brands/mahindra.png' },
  { value: 'maruti', label: 'Maruti Suzuki', image: '/brands/maruti.png' },
  { value: 'tata', label: 'Tata Motors', image: '/brands/tata.png' },
  { value: 'honda', label: 'Honda', image: '/brands/honda.png' },
  { value: 'hyundai', label: 'Hyundai', image: '/brands/hyundai.png' },
];

const customStyles: StylesConfig<BrandOption, false> = {
  container: (base) => ({
    ...base,
    width: 'auto',
    margin: 'auto',
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: '#FFCC00',
    borderColor: state.isFocused ? '#FFB800' : '#FFCC00',
    boxShadow: 'none',
    paddingLeft: '4px',
    minHeight: '44px',
    '&:hover': {
      borderColor: '#FFB800',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
    fontWeight: 500,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#000',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#FFCC00'
      : state.isFocused
        ? '#FFF2B3'
        : '#fff',
    color: '#000',
    fontWeight: state.isSelected ? 600 : 400,
    cursor: 'pointer',
  }),
};

interface CarBrand {
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
          onSelect={(value: CarBrand) => { setSelectBrand(value.brandId) }}
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
