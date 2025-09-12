'use client';

import { useState } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import Image from 'next/image';

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
    width: '350px',
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

export default function BrandSelector() {
  const [selectedBrand, setSelectedBrand] = useState<BrandOption>(brandOptions[0]);

  const handleChange = (selected: SingleValue<BrandOption>) => {
    if (selected) setSelectedBrand(selected);
  };

  return (
    <div className="space-y-4 overflow-visible">
      {/* Select dropdown */}
      <div className="relative">
        <Select
          options={brandOptions}
          styles={customStyles}
          placeholder="Select a brand"
          onChange={handleChange}
          isSearchable
          defaultValue={selectedBrand}
        />
      </div>

      {/* Brand Image */}
      {selectedBrand?.image && (
        <div className="bg-white p-2 rounded-xl shadow">
          <Image
            src={selectedBrand.image}
            alt={selectedBrand.label}
            width={250}
            height={150}
            className="w-full object-contain rounded-md"
          />
        </div>
      )}
    </div>
  );
}
