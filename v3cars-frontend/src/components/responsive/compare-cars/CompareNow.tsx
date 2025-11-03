'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { IMAGE_URL } from "@/utils/constant";
import { MdCompareArrows } from "react-icons/md";

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

interface Variant {
    variantId: number;
    variantName: string;
    modelId: number;
    modelPowertrainId: number;
    variantPrice: string;
    updatedDate: string; // ISO date string 
    priceMin: number;
    priceMax: number;
    powertrain: Powertrain;
}

interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

interface CompareNowProps {
    brands: CarBrand[];
    modelsData: CarModel[][];
    variantsData: Variant[][];

    selectedBrands: (number | null)[];
    setSelectedBrands: React.Dispatch<React.SetStateAction<(number | null)[]>>;

    selectedModels: (number | null)[];
    setSelectedModels: React.Dispatch<React.SetStateAction<(number | null)[]>>;

    selectedVariants: (number | null)[];
    setSelectedVariants: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

export default function CompareNow({
    brands,
    modelsData,
    variantsData,
    selectedBrands,
    setSelectedBrands,
    selectedModels,
    setSelectedModels,
    selectedVariants, 
    setSelectedVariants
}: CompareNowProps) {
    const boxes = Array(4).fill(0);

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
        <div className="w-full"> <div className="flex gap-2">
            <div className="lg:hidden min-w-[142px] h-[252px] bg-slate-100 dark:bg-[#262626] rounded-xl">
            </div>
            {boxes.map((_, i) => (
                <div key={i} className="w-full rounded-lg shadow-sm p-2 flex flex-col items-center gap-3 border dark:border-[#2E2E2E]" >
                    <div className="w-full h-[204px] bg-gray-100 dark:bg-[#262626] rounded flex items-center justify-center py-4">
                        {selectedModels[i] ? (
                            (() => {
                                const selectedModel = modelsData[i]?.find(
                                    (model: CarModel) => model.modelId === selectedModels[i]
                                );
                                return (
                                    <img
                                        src={`${IMAGE_URL}/media/model-imgs/${selectedModel?.imageUrl}`}
                                        alt={selectedModel?.modelName || "Selected Car"}
                                        className="w-full h-[204px] object-cover rounded"
                                    />
                                );
                            })()
                        ) : (
                            <img
                                src={"/compare-car/plus.png"}
                                alt="Plus Icon"
                                className="w-[100px] h-[100px]"
                            />
                        )}
                    </div>

                    {/* Brand Select */}
                    <div className="w-full border dark:border-[#2E2E2E] rounded-lg text-sm">
                        <CustomSelect
                            groupedOptions={groupedOptions}
                            placeholder="Select Brand"
                            labelKey="displayName"
                            valueKey="brandId"
                            value={selectedBrands[i]}
                            onSelect={(value: CarBrand) => {
                                const newBrands = [...selectedBrands];
                                newBrands[i] = value.brandId;
                                setSelectedBrands(newBrands);

                                // Reset model + variant on brand change
                                const newModels = [...selectedModels];
                                newModels[i] = null;
                                setSelectedModels(newModels);
                                const newVariants = [...selectedVariants];
                                newVariants[i] = null;
                                setSelectedVariants(newVariants);
                            }}
                        />
                    </div>

                    {/* Model Select */}
                    <div className="w-full border dark:border-[#2E2E2E] rounded-lg text-sm">
                        <CustomSelect
                            options={modelsData[i] ?? []}
                            placeholder="Select Model"
                            labelKey="modelName"
                            valueKey="modelId"
                            value={selectedModels[i]}
                            onSelect={(value: CarModel) => {
                                const newModels = [...selectedModels];
                                newModels[i] = value.modelId;
                                setSelectedModels(newModels);

                                // Reset variant on model change
                                const newVariants = [...selectedVariants];
                                newVariants[i] = null;
                                setSelectedVariants(newVariants);
                            }}
                        />
                    </div>

                    {/* Variant Select */}
                    <div className="w-full border dark:border-[#2E2E2E] rounded-lg text-sm">
                        <CustomSelect
                            options={variantsData[i] ?? []}
                            placeholder="Select Variant"
                            labelKey="variantName"
                            valueKey="variantId"
                            value={selectedVariants[i]}
                            onSelect={(value: Variant) => {
                                const newVariants = [...selectedVariants];
                                newVariants[i] = value.variantId;
                                setSelectedVariants(newVariants);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>

            <div className="mt-6 flex justify-center">
                <button 
                // onClick={()=>{router.push(`/compare/${toSlug(selectedBrands)}`)}}
                className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-8 py-3 rounded-full flex items-center gap-2 shadow-md">
                    Compare Now
                    <MdCompareArrows size={24} />
                </button>
            </div>
        </div>
    );
}
