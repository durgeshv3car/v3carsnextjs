'use client'

import React, { useEffect, useState } from "react";
import { CarData } from "../brand/model/overview/Overview";
import { useGetPriceListDetailsQuery, useGetVariantsQuery } from "@/redux/api/carModuleApi";
import { BiCheck } from "react-icons/bi";
import { IoIosCheckmark } from "react-icons/io";
import Image from "next/image";
import { IMAGE_URL, IMAGE_URL2 } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Breakdown, PriceListItem } from "../brand/model/price/OnRoadPriceTable";

interface ModelOnRoadPriceDetailsProps {
    data: CarData | null
    modelId: number | null
}

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

const breakdownLabels: Record<keyof Breakdown, string> = {
    exShowroom: "Ex-Showroom",
    roadTax: "Road Tax",
    registrationCharges: "Registration Charges",
    fastag: "FASTag",
    hypothecationEndorsement: "Hypothecation Endorsement",
    roadSafetyCess: "Road Safety Cess",
    otherCharges: "Other Charges",
    insurance: "Insurance",
    total: "Total"
};

export default function ModelOnRoadPriceDetails({ modelId, data }: ModelOnRoadPriceDetailsProps) {
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const fuelTypes = ["Petrol", "Diesel", "CNG", "Hybrid"];
    const transmissionTypes = ["Manual", "Automatic"]
    const { data: variantsData } = useGetVariantsQuery({ modelId: modelId! }, { skip: !modelId });
    const router = useRouter()

    const variants: CarVariant[] = variantsData?.rows ?? [];

    const [selectedFuelType, setSelectedFuelType] = useState("Petrol");
    const [selectedTransmissionType, setSelectedTransmissionType] = useState("Manual");
    const [variantId, setVariantId] = useState<number | null>(null);

    const { data: priceListDetailsData } =
        useGetPriceListDetailsQuery(
            { model_slug: Number(modelId), cityId: Number(selectedCity.cityId), fuelType: selectedFuelType.toLowerCase(), transmissionType: selectedTransmissionType.toLowerCase(), singleVariantId: variantId ? Number(variantId) : undefined },
            { skip: !variantId }
        );

    const priceListDetails: PriceListItem[] = priceListDetailsData?.rows ?? []

    useEffect(() => {
        if (variants && variants.length > 0) {
            setVariantId(variants[0].variantId);
        }
    }, [variants]);

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

    function handleVariant(data: CarVariant) {
        setVariantId(data.variantId)
    }

    function handleBtn(label: string) {
        if (label === "Download Brochure") {
            router.push(`${IMAGE_URL2}/ad-min/uploads/${data?.brochure?.url}`)
        }
        if (label === "View Latest Offers") {
            router.push(`/${data?.model?.brand?.slug}/${data?.model?.slug}/offers-discounts`)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4">

            <div className="w-full lg:w-[75%]">
                <h1 className="text-xl md:text-3xl mb-6">
                    {data?.model?.brand?.name} <span className="font-bold">{data?.model?.name}</span> {variants[0]?.variantName} {selectedFuelType} {selectedTransmissionType}
                </h1>

                {/* LEFT SIDE — CAR IMAGE */}
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="w-full md:w-[65%] space-y-6 flex flex-col justify-between">
                        <Image
                            src={`${IMAGE_URL}/media/model-imgs/${data?.media?.primaryImage?.url}`}
                            alt={data?.media?.primaryImage?.alt || "Car Image"}
                            width={700}
                            height={400}
                            className="rounded-2xl object-cover h-auto lg:h-[400px] w-full"
                            placeholder="blur"
                            blurDataURL="/blur-placeholder.png"
                        />

                        <div className="flex items-center gap-4 text-nowrap overflow-x-auto scrollbar-hide">
                            <ActionBtn label="Download Brochure" onClick={() => handleBtn("Download Brochure")} />
                            <ActionBtn label="View Latest Offers" onClick={() => handleBtn("View Latest Offers")} />
                            <ActionBtn label="Book a Test Drive" onClick={() => handleBtn("Book a Test Drive")} />
                        </div>
                    </div>

                    <div className="w-full lg:w-[35%] space-x-2 lg:space-y-6 flex flex-col justify-between">
                        <div className="divide-y divide-[#F6F6F6] dark:divide-[#2e2e2e]">
                            {priceListDetails.length > 0 ?
                                priceListDetails?.map((list: PriceListItem, idx) => {
                                    const keys = list.breakdown ? Object.keys(list.breakdown) : [];
                                    const filteredKeys = keys.slice(0, -1); // last key remove

                                    return (
                                        <div key={idx}>
                                            {filteredKeys.map((key) => (
                                                <PriceRow
                                                    key={key}
                                                    label={breakdownLabels[key as keyof Breakdown]}
                                                    value={list.breakdown ? list.breakdown[key as keyof Breakdown] : null}
                                                />
                                            ))}
                                        </div>
                                    );
                                }) : (
                                    <div
                                        className="
                                            h-[400px] w-full rounded-lg
                                            bg-gray-300 dark:bg-[#2e2e2e] 
                                            animate-pulse
                                        ">
                                    </div>
                                )
                            }
                        </div>

                        <div className="p-5 rounded-xl bg-primary-light text-black flex items-center justify-between gap-2">
                            <span className="font-semibold text-sm lg:text-base">On Road Price</span>
                            {priceListDetails?.map((list: PriceListItem, idx) => {
                                const keys = list.breakdown ? Object.keys(list.breakdown) : [];
                                const lastKey = keys[keys.length - 1] as keyof Breakdown; // last key

                                return (
                                    <div key={idx}>
                                        {lastKey && (
                                            <span className="font-bold text-sm lg:text-xl">
                                                ₹{Number(list.breakdown![lastKey]).toLocaleString("en-IN")}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


                <p className="text-gray-400 text-sm mt-4">The on-road price of {data?.model.brand.name} {data?.model.name} in {selectedCity?.cityName} may vary slightly across dealers depending on insurance packages, handling charges, additional accessories, warranty or service packages. State taxes and RTO fees remain uniform across Haryana. You can view the variant-wise price breakup, compare on-road prices across cities, and estimate EMI or ownership costs using the calculator above.</p>
            </div>

            <div className="space-y-3 lg:w-[25%] flex flex-col">
                {/* Fuel Type */}
                <div className="rounded-xl overflow-hidden border dark:border-[#2D2F31]">

                    {/* Header */}
                    <div className="bg-[#E9E9E9] dark:bg-[#232323] p-4 text-sm font-semibold">
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

                <div className="rounded-xl overflow-hidden border dark:border-[#2D2F31]">

                    {/* Header */}
                    <div className="bg-[#E9E9E9] dark:bg-[#232323] p-4 text-sm font-semibold">
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
                <div className="rounded-xl overflow-hidden border dark:border-[#2D2F31] flex-grow flex flex-col">
                    <p className="bg-[#E9E9E9] dark:bg-[#232323] p-4 text-sm font-semibold">Variants</p>

                    {filteredVariants && filteredVariants.length > 0 ? (
                        <div className="divide-y dark:divide-[#2e2e2e] h-[120px] overflow-y-auto scrollbar-thin-yellow flex-grow">
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
    );
}

/* Small Components */

function PriceRow({ label, value }: { label: string | null; value: number | null }) {
    return (
        <div className="flex justify-between py-3 text-sm">
            <span>{label}</span>
            <span className="font-medium">₹ {Number(value).toLocaleString("en-IN")}</span>
        </div>
    );
}

function ActionBtn({ label, highlight, onClick }: { label: string; highlight?: boolean; onClick?: () => void }) {
    return (
        <button
            className={`p-5 rounded-lg border hover:bg-primary hover:dark:bg-primary hover:dark:text-black bg-white shadow-sm dark:bg-[#171717] dark:border-[#2e2e2e]`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
