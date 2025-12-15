'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetBrandsQuery, useGetModelsQuery } from "@/redux/api/carModuleApi";
import React, { useState } from "react";

/* ---------------- Types ---------------- */
type CardType = {
    id: number;
    type: "filled" | "empty";
    model?: string;
    variant?: string;
    brochureLabel?: string;
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
interface CarImage {
    name: string
    alt: string
    url: string
}

interface CarModel {
    modelId: number
    modelName: string
    modelSlug: string
    brandId: number
    modelBodyTypeId: number
    isUpcoming: boolean
    launchDate: string // ISO date string
    totalViews: number
    expectedBasePrice: number
    expectedTopPrice: number
    brand: {
        id: number
        name: string
        slug: string
        logo: string
    }
    priceMin: number
    priceMax: number
    powerPS: number
    torqueNM: number
    mileageKMPL: number
    image: CarImage
    imageUrl: string
}

/* ---------------- Main Component ---------------- */
export default function CarComparison() {
    const [cards, setCards] = useState<(boolean | null)[]>([
        true,
        true,
        true,
        true,
    ]);

    const handleCancel = (index: number) => {
        setCards((prev) =>
            prev.map((item, i) => (i === index ? null : item))
        );
    };

    return (
        <div className="rounded-2xl bg-[#DCE7FA] p-6">
            <p className="mb-6 text-center text-sm text-gray-700">
                Select at least 2 cars to begin comparison. You can compare up to 4 at a
                time.
            </p>

            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[49.40%] lg:auto-cols-[24.55%] gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {Array(4)
                    .fill(null)
                    .map((_, i) =>
                        cards[i] ? (
                            <FilledCard
                                key={i}
                                index={i + 1}
                                onCancel={() => handleCancel(i)}
                            />
                        ) : (
                            <EmptyCard key={i} index={i + 1} />
                        )
                    )}
            </div>

            <div className="mt-8 flex justify-center">
                <button className="rounded-xl bg-yellow-400 px-12 py-4 text-lg font-semibold">
                    Compare Now
                </button>
            </div>
        </div>
    );
}









/* ---------------- Select Field ---------------- */
const SelectField = ({
    label,
    placeholder = "Select Brand Name",
    disabled = false,
}: {
    label: string;
    placeholder?: string;
    disabled?: boolean;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        <select
            disabled={disabled}
            className={`w-full rounded-md border px-3 py-2.5 text-sm ${disabled
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-700"
                }`}
        >
            <option>{placeholder}</option>
        </select>
    </div>
);

/* ---------------- Filled Card ---------------- */
const FilledCard = ({ index, onCancel, }: { index: number, onCancel: () => void }) => {
    const [selectBrand, setSelectBrand] = useState<number | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const { data: brandsData } = useGetBrandsQuery();
    const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand, });

    const brands = brandsData?.rows ?? [];
    const models = modelsData?.rows ?? [];

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


    const { groupedOptions } = splitBrands(brands)

    return (

        <div className="relative flex flex-col gap-3 snap-start rounded-xl border border-dashed border-gray-300 bg-[#EAEFF8] p-4">

            {/* Cancel Button */}
            <button
                onClick={onCancel}
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs text-gray-600 hover:bg-red-100"
            >
                ×
            </button>

            {/* Index */}
            <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                {index}
            </div>

            <div className="mt-4 space-y-2">
                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Brand</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white rounded-lg'>
                        <CustomSelect
                            groupedOptions={groupedOptions}
                            placeholder="Select Brand"
                            labelKey="displayName"
                            valueKey="brandId"
                            value={selectBrand}
                            onSelect={(value: CarBrand) => { setSelectBrand(value.brandId) }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Model</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white rounded-lg'>
                        <CustomSelect
                            options={models}
                            placeholder="Select Model"
                            labelKey="modelName"
                            valueKey="modelId"
                            value={modelId}
                            onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Powertrain</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white rounded-lg'>
                        <CustomSelect
                            options={models}
                            placeholder="Select Powertrain"
                            labelKey="modelName"
                            valueKey="modelId"
                            value={modelId}
                            onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Variant</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white rounded-lg'>
                        <CustomSelect
                            options={models}
                            placeholder="Select Variant"
                            labelKey="modelName"
                            valueKey="modelId"
                            value={modelId}
                            onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center gap-3 rounded-lg border bg-gray-50 p-2">
                <img 
                    src={"/model/tata.png"}
                    alt="tata"
                    className="w-10 h-10"
                />
                <div className="text-xs">
                    {/* <p className="font-semibold">{brochureLabel}</p> */}
                    <p className="text-gray-500">1199cc | Petrol | Manual</p>
                    <p className="font-semibold text-gray-800">₹8.79 Lakh</p>
                </div>
            </div>

            <button className="mt-auto rounded-lg bg-yellow-400 py-2 text-sm font-semibold hover:bg-yellow-500">
                Download Brochure
            </button>
        </div>

    )
}

/* ---------------- Empty Card ---------------- */
const EmptyCard = ({ index }: { index: number }) => (
    <div className="relative flex flex-col gap-3 rounded-xl border border-dashed border-gray-300 bg-[#EAEFF8] p-4">

        <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
            {index}
        </div>

        <div className="mt-4 space-y-2">
            <SelectField label="Brand" disabled />
            <SelectField label="Model" disabled />
            <SelectField label="Powertrain" disabled />
            <SelectField label="Variant" disabled />
        </div>

        <div className="mt-2 rounded-lg border bg-white p-3">
            <div className="flex gap-3">
                <div className="h-12 w-16 rounded bg-gray-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/2 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                </div>
            </div>
        </div>
    </div>
);