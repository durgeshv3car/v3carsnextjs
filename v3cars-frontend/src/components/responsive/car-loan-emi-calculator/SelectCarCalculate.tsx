'use client';

import React, { useState } from 'react';
import { useGetAllBrandsQuery, useGetModelsQuery, useGetVariantsQuery } from '@/redux/api/carModuleApi';
import { IMAGE_URL, IMAGE_URL2 } from '@/utils/constant';
import { BiCheck } from 'react-icons/bi';
import Image from 'next/image';
import { IoIosCheckmark } from 'react-icons/io';
import CarLoanCalculator from './CarLoanCalculator';
import CommonBrandModelTool from '@/components/common/CommonBrandModelTool';


interface PowerTrain {
    id: number,
    fuelType: string,
    transmissionType: string,
    label: string
}

interface CarVariant {
    variantId: number;
    variantName: string;
    modelId: number;
    modelPowertrainId: number | null;
    variantPrice: string;
    updatedDate: string; // ISO date string
    priceMin: number;
    priceMax: number;
    powertrain: PowerTrain;
}

interface SelectCarCalculateProps {
    onLoanDataChange: (data: {
        principal: number;
        annualInterestRate: number;
        tenureYears: number;
        emi: number;
    }) => void;
    searchQuery: string
}

const SelectCarCalculate = ({ searchQuery, onLoanDataChange }: SelectCarCalculateProps) => {
    const [modelId, setModelId] = useState<number | null>(null);
    const [variantId, setVariantId] = useState<number | null>(null);
    const [selectedVariantPrice, setSelectedVariantPrice] = useState<number>(500000);
    const fuelTypes = ["Petrol", "Diesel", "CNG", "Hybrid"];
    const [selectedFuelType, setSelectedFuelType] = useState("");
    const [selectedTransmissionType, setSelectedTransmissionType] = useState("");
    const { data: variantsData } = useGetVariantsQuery({ modelId: modelId! }, { skip: !modelId });

    
    const variants: CarVariant[] = variantsData?.rows ?? [];

    const availableFuels = new Set(
        variants.map(v => v.powertrain?.fuelType).filter(Boolean)
    );

    const availableTransmissions = new Set(
        variants.map(v => v.powertrain?.transmissionType).filter(Boolean)
    );

    const filteredVariants = variants.filter((v) => {

        const fuelMatch =
            !selectedFuelType || v.powertrain.fuelType === selectedFuelType;

        const transmissionMatch =
            !selectedTransmissionType || v.powertrain.transmissionType === selectedTransmissionType;

        return fuelMatch && transmissionMatch;
    });

    function normalizeBrandName(name: string) {
        const lower = name.toLowerCase();
        if (lower === "maruti arena" || lower === "maruti nexa") {
            return "Maruti Suzuki";
        }
        return name;
    }

    function handleVariant(data: CarVariant) {
        setVariantId(data.variantId)
        setSelectedVariantPrice(Number(data.variantPrice))
    }

    return (
        <div className="space-y-4">

            <CommonBrandModelTool searchQuery={searchQuery} modelId={modelId} setModelId={setModelId} />

            <div className='grid grid-cols-1 md:grid-cols-4 justify-between gap-4'>
                <div className="md:col-span-1">

                    {/* ================= LEFT FILTER PANEL ================= */}
                    <div className="space-y-3">
                        {/* Fuel Type */}
                        <div className="rounded-xl overflow-hidden border border-[#2D2F31]">

                            {/* Header */}
                            <div className="bg-[#2D2F31] text-white p-4 text-sm font-semibold">
                                Fuel Type
                            </div>

                            {/* Buttons */}
                            <div className="p-3 flex flex-wrap items-center gap-4">
                                {fuelTypes.map((fuel) => {

                                    const isAvailable = availableFuels.has(fuel);
                                    const isDisabled = !isAvailable;
                                    const isSelected = fuel === selectedFuelType;

                                    return (
                                        <button
                                            key={fuel}
                                            disabled={isDisabled}
                                            onClick={() => !isDisabled && setSelectedFuelType(fuel)}
                                            className={`
                                                flex items-center justify-center gap-1 px-4 py-3 rounded-md border dark:border-[#2e2e2e] shadow-md
                                                text-sm font-medium transition
                                                ${isDisabled
                                                    ? "bg-gray-200 dark:bg-[#232323] text-gray-500 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-primary text-black"
                                                        : "bg-white dark:bg-[#171717] hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"
                                                }
                                            `}
                                        >
                                            {isSelected && !isDisabled && (
                                                <BiCheck className="w-4 h-4" />
                                            )}

                                            {fuel.toUpperCase()}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>


                        <div className="rounded-xl overflow-hidden border border-[#2D2F31]">

                            {/* Header */}
                            <div className="bg-[#2D2F31] text-white p-4 text-sm font-semibold">
                                Transmission
                            </div>

                            {/* Buttons */}
                            <div className="p-3 flex flex-wrap items-center gap-4">
                                {transmissionTypes.map((type) => {

                                    const isAvailable = availableTransmissions.has(type);
                                    const isDisabled = !isAvailable;
                                    const isSelected = type === selectedTransmissionType;

                                    return (
                                        <button
                                            key={type}
                                            disabled={isDisabled}
                                            onClick={() => !isDisabled && setSelectedTransmissionType(type)}
                                            className={`
                                                flex items-center justify-center gap-1 px-4 py-3 rounded-md border shadow-md dark:border-[#2e2e2e]
                                                text-sm font-medium transition
                                                ${isDisabled
                                                    ? "bg-gray-200 dark:bg-[#232323] text-gray-500 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-primary text-black"
                                                        : "bg-white hover:bg-gray-100 dark:bg-[#171717] dark:hover:bg-[#1f1f1f]"
                                                }
                                            `}
                                        >
                                            {isSelected && !isDisabled && (
                                                <BiCheck className="w-4 h-4" />
                                            )}

                                            {type.toUpperCase()}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Variants */}
                        <div className="rounded-xl overflow-hidden border border-[#2D2F31]">
                            <p className="bg-[#2D2F31] text-white p-4 text-sm font-semibold">Variants</p>

                            {filteredVariants && filteredVariants.length > 0 ? (
                                <div className="divide-y dark:divide-[#2e2e2e] h-[120px] overflow-y-auto scrollbar-thin-yellow">
                                    {
                                        filteredVariants.map((v, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 text-sm cursor-pointer flex items-center justify-between"
                                                onClick={() => { handleVariant(v) }}
                                            >
                                                <div>
                                                    <p>{v.variantName}</p>
                                                    <p className="text-gray-400">{v.powertrain.fuelType} | {v.powertrain.transmissionType}</p>
                                                </div>

                                                {
                                                    v.variantId === variantId && (
                                                        <IoIosCheckmark size={30} />
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                                : (
                                    <div className="p-2 space-y-2 h-[120px]">
                                        {
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="
                                                    h-10 w-full rounded-lg
                                                    bg-gray-300 dark:bg-[#2e2e2e] 
                                                    animate-pulse
                                                ">
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Sliders & Results */}
                <div className='md:col-span-3'>
                    <CarLoanCalculator selectedVariantPrice={selectedVariantPrice} onLoanDataChange={onLoanDataChange} />
                </div>
            </div>
        </div>
    );
};

export default SelectCarCalculate;


const transmissionTypes = ["Manual", "Automatic"]