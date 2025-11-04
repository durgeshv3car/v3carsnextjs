'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { IMAGE_URL } from "@/utils/constant";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface Variant {
    variantId: number;
    variantName: string;
    modelId: number;
    modelPowertrainId: number;
    variantPrice: string;
    updatedDate: string;
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

interface CarImage {
    name: string;
    alt: string;
    url: string;
}

interface CarModel {
    modelId: number;
    modelName: string;
    modelSlug: string;
    brandId: number;
    modelBodyTypeId: number;
    isUpcoming: boolean;
    launchDate: string;
    totalViews: number;
    expectedBasePrice: number;
    expectedTopPrice: number;
    brand: {
        id: number;
        name: string;
        slug: string;
        logo: string;
    };
    priceMin: number;
    priceMax: number;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
    image: CarImage;
    imageUrl: string;
}

interface InformationProps {
    selectedModels: (number | null)[];
    modelsData: CarModel[][];
    variantsData: Variant[][];
    selectedVariants: (number | null)[];
    setSelectedVariants: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

const specsKeys = ["Engine", "Transmission", "Drivetrain", "Power", "Torque"];

// ✅ Demo data for initial state
const demoCars = [
    { id: 1, name: <Skeleton width={100} />, specs: { Engine: "_____", Transmission: "_____", Drivetrain: "_____", Power: "_____", Torque: "_____" } },
    { id: 2, name: <Skeleton width={100} />, specs: { Engine: "_____", Transmission: "_____", Drivetrain: "_____", Power: "_____", Torque: "_____" } },
    { id: 3, name: <Skeleton width={100} />, specs: { Engine: "_____", Transmission: "_____", Drivetrain: "_____", Power: "_____", Torque: "_____" } },
    { id: 4, name: <Skeleton width={100} />, specs: { Engine: "_____", Transmission: "_____", Drivetrain: "_____", Power: "_____", Torque: "_____" } }
];

export default function Information({
    selectedModels,
    modelsData,
    variantsData,
    selectedVariants,
    setSelectedVariants
}: InformationProps) {
    const [cars, setCars] = useState<any[]>(demoCars);

    useEffect(() => {
        const mappedCars = selectedModels.map((modelId, index) => {
            if (!modelId) return demoCars[index];

            const selectedModel = modelsData[index]?.find(
                (m) => m.modelId === modelId
            );

            if (!selectedModel) return demoCars[index];

            return {
                id: selectedModel.modelId,
                name: `${selectedModel.brand.name} ${selectedModel.modelName}`,
                image: selectedModel.imageUrl || selectedModel.image?.url || "/compare-car/placeholder.png",
                specs: {
                    Engine: `${selectedModel.powerPS} PS`,
                    Transmission: "—",
                    Drivetrain: "—",
                    Power: `${selectedModel.powerPS} PS`,
                    Torque: `${selectedModel.torqueNM} Nm`
                }
            };
        });

        setCars(mappedCars);
    }, [selectedModels, modelsData, variantsData]);

    return (
        <div className="overflow-x-auto scroll-smooth scrollbar-hide">
            <table className="min-w-full text-sm text-left border-collapse">
                <tbody>
                    {/* Car Cards Row */}
                    <tr className="hidden lg:table-row">
                        <td className="p-3 font-bold w-[300px]"></td>
                        {cars.map((car, index) => (
                            <td key={car.id} className="p-3 align-top w-[300px]">
                                <div className="relative border p-2 rounded-xl flex flex-col justify-between dark:border-[#2E2E2E] shadow-sm">
                                    {/* Dynamic Model Image */}
                                    <div className="min-h-[150px] mb-2">
                                        {
                                            car?.image ? (
                                                <img
                                                    src={`${IMAGE_URL}/media/model-imgs/${car?.image}`}
                                                    alt={car.name}
                                                    className="w-full rounded-xl"
                                                />
                                            ) : (
                                                <Skeleton height={150} />
                                            )
                                        }
                                    </div>

                                    {/* Variant Dropdown */}
                                    <div className="w-full border dark:border-[#2E2E2E] rounded-lg text-sm">
                                        <CustomSelect
                                            options={variantsData[index] ?? []}
                                            placeholder="Select Variant"
                                            labelKey="variantName"
                                            valueKey="variantId"
                                            value={selectedVariants[index]}
                                            onSelect={(value: Variant) => {
                                                const newVariants = [...selectedVariants];
                                                newVariants[index] = value.variantId;
                                                setSelectedVariants(newVariants);
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Basic Info Row */}
                    <tr className="font-semibold">
                        <td className="p-3 text-nowrap">Basic Information</td>
                        {cars.map((car, index) => (
                            <td
                                key={index}
                                className="bg-[#F2F2F2] dark:bg-[#262626] p-3 whitespace-pre-line text-nowrap text-center text-sm"
                            >
                                {car.name}
                            </td>
                        ))}
                    </tr>

                    {/* Dynamic Specs */}
                    {specsKeys.map((spec) => (
                        <tr
                            key={spec}
                            className="even:bg-[#fafafa] dark:even:bg-[#262626]"
                        >
                            <td className="border dark:border-[#2E2E2E] p-3 font-semibold text-nowrap text-sm">
                                {spec}
                            </td>
                            {cars.map((car) => (
                                <td
                                    key={car.id}
                                    className="border dark:border-[#2E2E2E] text-nowrap p-3 whitespace-pre-line text-center text-sm"
                                >
                                    {car.specs[spec as keyof typeof car.specs]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
