'use client';

import { useGetBrandsQuery } from '@/redux/api/carModuleApi';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleBrand } from '@/redux/slices/advanceSearchSlice';

interface Brand {
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

type BrandFilterProps = {
    openSection: string | null;
};

function BrandFilter({ openSection }: BrandFilterProps) {
    const dispatch = useDispatch();
    const selectedBrandIds = useSelector((state: RootState) => state.filters.brands);

    const { data: brandsData, isLoading } = useGetBrandsQuery();
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const brands: Brand[] = brandsData?.rows ?? [];

    useEffect(() => {
        if (openSection === 'brand' && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [openSection]);

    // Normalize brand names
    const normalizeBrandName = (name: string) => {
        if (name === 'Maruti Arena' || name === 'Maruti Nexa') return 'Maruti Suzuki';
        return name;
    };

    // Filter + deduplicate
    const filteredBrands = useMemo(() => {
        const lower = searchTerm.toLowerCase();

        const normalized = brands.map((brand) => ({
            ...brand,
            displayName: normalizeBrandName(brand.brandName),
        }));

        const unique = normalized.filter(
            (value, index, self) =>
                index === self.findIndex((b) => b.displayName === value.displayName)
        );

        return unique.filter((b) => b.displayName.toLowerCase().includes(lower));
    }, [brands, searchTerm]);

    const handleCheckboxChange = (brand: Brand) => {
        dispatch(
            toggleBrand({
                id: brand.brandId,
                label: brand.brandName,
            })
        );
    };

    if (isLoading) {
        return <p className="text-sm text-gray-400">Loading brands...</p>;
    }

    return (
        <div
            ref={contentRef}
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{ maxHeight: height }}
        >
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full my-3 px-3 py-2 text-sm border rounded-lg focus:outline-none bg-transparent dark:border-[#2E2E2E]"
            />

            <div className="max-h-[600px] lg:max-h-48 overflow-y-auto scrollbar-filter space-y-3 pr-1">
                {filteredBrands.length > 0 ? (
                    filteredBrands.map((brand, index) => (
                        <div key={brand.brandId} className="flex items-center gap-2">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    id={`brand-${index}`}
                                    checked={selectedBrandIds.some((b) => String(b.id) === String(brand.brandId))}
                                    onChange={() => handleCheckboxChange(brand)}
                                />
                                <div className="w-5 h-5 rounded-md border border-gray-400 peer-checked:bg-primary peer-checked:border-primary relative transition-all duration-200">
                                    <svg
                                        className="w-3 h-3 text-black absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </label>

                            <label htmlFor={`brand-${index}`} className="flex-1 text-sm">
                                {brand.displayName}
                            </label>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-gray-400 italic">No brands found.</p>
                )}
            </div>
        </div>
    );
}

export default BrandFilter;
