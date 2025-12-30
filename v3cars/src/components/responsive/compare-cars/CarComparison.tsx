'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetBrandsQuery, useGetModelPowertrainsQuery, useGetModelsQuery, useGetVariantsByPowertrainsQuery } from "@/redux/api/carModuleApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { buildCarSlug, parseMultiCompareSlug } from "./parseMultiCompareSlug";
import { CarBrand, CarModel, Variant } from "./CompareInterface";
import { convertToName, normalize } from "@/utils/helperFunction";

interface Option {
    id: number;
    label: string;
    fuelType: string;
    transmissionType: string;
}

export interface PowerTrainResponse {
    success: boolean;
    modelId: number;
    options: Option[];
    total: number;
}

interface CarComparisonProps {
    slug?: string
    setSelectedVariantIds?: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

/* ---------------- Main Component ---------------- */
export default function CarComparison({ slug, setSelectedVariantIds }: CarComparisonProps) {
    const path = usePathname()
    const router = useRouter();

    const [compareSlug, setCompareSlug] = useState<string>("");
    const [cards, setCards] = useState<(boolean | null)[]>([
        true,
        true,
        true,
        true,
    ]);

    const exportSlug = parseMultiCompareSlug(slug ?? "")

    const handleCancel = (index: number) => {
        setCards((prev) =>
            prev.map((item, i) => (i === index ? null : item))
        );
        setSelectedVariantIds?.((prev) =>
            prev.filter((_, i) => i !== index)
        );
        setCompareSlug((prev) => {
            if (!prev) return prev;

            const slugs = prev.split("-vs-");
            slugs.splice(index, 1);

            return slugs.join("-vs-");
        });
    };

    return (
        <div className="rounded-2xl bg-[#DCE7FA] p-6 dark:bg-[#171717]">
            <p className="mb-6 text-center text-sm">
                {
                    path === "/cost-of-ownership" ? (
                        `Select a car to view its ownership cost breakdown. You can evaluate up to four cars.`
                    ) : (
                        `Select at least 2 cars to begin comparison. You can compare up to 4 at a
                        time.`
                    )
                }
            </p>

            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[49.40%] lg:auto-cols-[24.55%] gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
                {Array(4)
                    .fill(null)
                    .map((_, i) => {
                        const cardData = exportSlug?.[i];

                        return cards[i] ? (
                            <FilledCard
                                key={i}
                                index={i}
                                setCompareSlug={setCompareSlug}
                                onCancel={() => handleCancel(i)}
                                brandSlug={cardData?.brandSlug || ""}
                                modelSlug={cardData?.modelSlug || ""}
                                powertrainSlug={cardData?.powertrain || ""}
                                variantSlug={cardData?.variantName || ""}
                                setSelectedVariantIds={setSelectedVariantIds}
                            />
                        ) : (
                            <EmptyCard key={i} index={i + 1} />
                        );
                    })}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    className="rounded-xl bg-yellow-400 text-black px-12 py-4 text-lg font-semibold disabled:opacity-50"
                    disabled={compareSlug.split("-vs-").length < 2}
                    onClick={() =>
                        router.push(
                            path === "/cost-of-ownership"
                                ? `/ownership/${compareSlug}`
                                : `/compare/${compareSlug}`
                        )
                    }
                >
                    {
                        path === "/cost-of-ownership" ? (
                            "View Ownership Cost"
                        ) : (
                            "Compare Now"
                        )
                    }
                </button>
            </div>
        </div >
    );
}

/* ---------------- Filled Card ---------------- */
const FilledCard = ({
    index,
    onCancel,
    setCompareSlug,
    brandSlug,
    modelSlug,
    powertrainSlug,
    variantSlug,
    setSelectedVariantIds,
}: {
    index: number;
    onCancel: () => void;
    setCompareSlug: React.Dispatch<React.SetStateAction<string>>;
    brandSlug: string;
    modelSlug: string;
    powertrainSlug: string;
    variantSlug: string;
    setSelectedVariantIds?: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}) => {
    const [brandId, setBrandId] = useState<number | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const [powertrainId, setPowertrainId] = useState<number | null>(null)
    const [variantId, setVariantId] = useState<number | null>(null)
    const [modelData, setModelData] = useState<CarModel>()
    const { data: brandsData } = useGetBrandsQuery();
    const { data: modelsData } = useGetModelsQuery({ brandId: brandId! }, { skip: !brandId, });
    const { data: modelPowertrainsData } = useGetModelPowertrainsQuery({ modelId: modelId! }, { skip: !modelId, });
    const { data: variantsByPowertrainsData } = useGetVariantsByPowertrainsQuery({ modelId: modelId!, powertrainId: Number(powertrainId) }, { skip: !modelId || !powertrainId });

    const brands: CarBrand[] = brandsData?.rows ?? [];
    const models: CarModel[] = modelsData?.rows ?? [];
    const modelPowertrains: Option[] = modelPowertrainsData?.options ?? [];
    const variantsByPowertrains: Variant[] = variantsByPowertrainsData?.rows ?? [];
    const [slugParts, setSlugParts] = useState<{
        brandSlug?: string;
        modelSlug?: string;
        powertrain?: string;
        variantName?: string;
    }>({});
    const isUserActionRef = useRef(false);

    /* ---------- SLUG → ID MAPPING (CORE LOGIC) ---------- */

    useEffect(() => {
        if (!brandSlug || !brands.length) return;
        const brand = brands.find(
            (b: CarBrand) => b.brandSlug === brandSlug
        );
        if (brand) {
            setBrandId(brand.brandId);
            setSlugParts(prev => ({
                ...prev,
                brandSlug: brand.brandSlug
            }));
        }
    }, [brandSlug, brands]);

    useEffect(() => {
        if (!modelSlug || !models.length) return;
        const model = models.find(
            (m: CarModel) => m.modelSlug === modelSlug
        );
        if (model) {
            setModelId(model.modelId);
            setModelData(model);
            setSlugParts(prev => ({
                ...prev,
                modelSlug: model.modelSlug
            }));
        }
    }, [modelSlug, models]);

    useEffect(() => {
        if (!modelPowertrains.length) return;

        const pt = modelPowertrains.find((p: Option) =>
            p.label &&
            normalize(p.label) === normalize(convertToName(powertrainSlug))
        );

        if (pt) {
            setPowertrainId(pt.id);
            setSlugParts(prev => ({
                ...prev,
                powertrain: pt.label,
            }));
            return;
        }

        if (isUserActionRef.current) return;

        if (!powertrainSlug) {
            const first = modelPowertrains[0];
            setPowertrainId(first.id);
            setSlugParts(prev => ({
                ...prev,
                powertrain: first.label,
            }));
        }
    }, [powertrainSlug, modelPowertrains]);

    useEffect(() => {
        if (!variantsByPowertrains.length) return;

        const v = variantsByPowertrains.find(
            (x) =>
                x.variantName &&
                normalize(x.variantName) === normalize(convertToName(variantSlug))
        );

        if (v) {
            setVariantId(v.variantId);
            setSlugParts(prev => ({
                ...prev,
                variantName: v.variantName,
            }));
            return;
        }

        if (isUserActionRef.current) return;

        if (!variantSlug) {
            const first = variantsByPowertrains[0];
            setVariantId(first.variantId);
            setSlugParts(prev => ({
                ...prev,
                variantName: first.variantName,
            }));
        }
    }, [variantSlug, variantsByPowertrains]);

    /* ---------- Compare Slug ---------- */

    useEffect(() => {
        const cardSlug = buildCarSlug(slugParts);
        if (!cardSlug) return;

        setCompareSlug(prev => {
            const slugs = prev ? prev.split("-vs-") : [];

            if (slugs[index] === cardSlug) return prev;

            slugs[index] = cardSlug;
            return slugs.join("-vs-");
        });
    }, [slugParts, index]);

    useEffect(() => {
        if (!variantSlug && !variantId) return;

        setSelectedVariantIds?.((prev: (number | null)[]) => {
            const updated = [...prev];
            updated[index] = variantId;
            return updated;
        });
    }, [variantSlug, variantId, index, setSelectedVariantIds]);

    function normalizeBrandName(name: string) {
        const lower = name.toLowerCase();
        if (lower === "maruti arena" || lower === "maruti nexa") {
            return "Maruti Suzuki";
        }
        return name;
    }

    useEffect(() => {
        if (modelId) {
            const foundModel = models.find(
                (model: CarModel) => model.modelId === modelId
            );

            setModelData(foundModel);
        }
    }, [modelId, models]);

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

        <div className="relative flex flex-col gap-3 snap-start rounded-xl border border-dashed border-gray-300 bg-[#EAEFF8] dark:bg-[#232323] dark:border-[#2e2e2e] p-4">

            {/* Cancel Button */}
            <button
                onClick={onCancel}
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs dark:border-[#2e2e2e]"
            >
                <RxCross2 />
            </button>

            {/* Index */}
            <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border dark:border-[#2e2e2e] text-xs font-semibold">
                {index + 1}
            </div>

            <div className="mt-4 space-y-2">
                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Brand</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white dark:bg-[#171717] rounded-lg'>
                        <CustomSelect
                            groupedOptions={groupedOptions}
                            placeholder="Select Brand"
                            labelKey="displayName"
                            valueKey="brandId"
                            value={brandId}
                            onSelect={(value: CarBrand) => {
                                isUserActionRef.current = true;
                                setBrandId(value.brandId)
                                setSlugParts((prev) => ({
                                    ...prev,
                                    brandSlug: value.brandSlug,
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Model</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white dark:bg-[#171717] rounded-lg'>
                        <CustomSelect
                            options={models}
                            placeholder="Select Model"
                            labelKey="modelName"
                            valueKey="modelId"
                            value={modelId}
                            onSelect={(value: CarModel) => {
                                isUserActionRef.current = true;
                                setModelId(value.modelId)
                                setSlugParts((prev) => ({
                                    ...prev,
                                    modelSlug: value.modelSlug,
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Powertrain</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white dark:bg-[#171717] rounded-lg'>
                        <CustomSelect
                            options={modelPowertrains}
                            placeholder="Select Powertrain"
                            labelKey="label"
                            valueKey="id"
                            value={powertrainId}
                            onSelect={(value: Option) => {
                                isUserActionRef.current = true;
                                setPowertrainId(value.id)
                                setSlugParts((prev) => ({
                                    ...prev,
                                    powertrain: value.label.toLowerCase(),
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs">Variant</label>
                    <div className='border dark:border-[#2E2E2E] w-full text-xs py-1 bg-white dark:bg-[#171717] rounded-lg'>
                        <CustomSelect
                            options={variantsByPowertrains}
                            placeholder="Select Variant"
                            labelKey="variantName"
                            valueKey="variantId"
                            value={variantId}
                            onSelect={(value: Variant) => {
                                isUserActionRef.current = true;
                                setVariantId(value.variantId)
                                setSlugParts((prev) => ({
                                    ...prev,
                                    variantName: value.variantName,
                                }));
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center gap-3 rounded-lg border bg-gray-50 dark:bg-[#171717] p-2 dark:border-[#2e2e2e]">
                {
                    modelData ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={`${IMAGE_URL}/media/model-imgs/${modelData?.image?.url}`}
                                    alt={modelData?.image?.alt || "model-car"}
                                    width={28}
                                    height={16}
                                    className="w-28 h-16 rounded"
                                />
                                <div className="text-xs">
                                    <p className="font-semibold">{modelData.modelName}</p>
                                    <p className="text-gray-400 py-1">{modelData?.powerPS} PS | {modelData?.powerTrain} | {modelData?.transmissionType}</p>
                                    <p className="font-semibold text-gray-400">₹{modelData?.priceMin ? `${(modelData.priceMin / 100000).toFixed(2)} Lakh` : "-"}</p>
                                </div>
                            </div>

                            <button className="w-full rounded-lg text-black bg-yellow-400 py-2 text-sm font-semibold hover:bg-yellow-500">
                                Download Brochure
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="h-12 w-20 bg-gray-200 dark:bg-[#232323] rounded animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-2 w-40 bg-gray-200 dark:bg-[#232323] rounded animate-pulse" />
                                <div className="h-2 w-20 bg-gray-200 dark:bg-[#232323] rounded animate-pulse" />
                            </div>
                        </>
                    )
                }
            </div>
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