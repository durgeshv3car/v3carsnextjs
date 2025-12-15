"use client";

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetDistrictsByStateIdQuery, useGetStatesQuery } from "@/redux/api/locationModuleApi";
import { convertToName, convertToSlug } from "@/utils/helperFunction";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const fuelTypes = [
    {
        id: 1,
        name: "Petrol"
    },
    {
        id: 2,
        name: "Diesel"
    },
    {
        id: 3,
        name: "CNG"
    },
];

interface State {
    stateId: number;
    stateName: string;
    countryId: number;
    stateCode: string;
    shortCode: string;
    isTodayFuelPrice: number;
}

interface DistrictInfo {
    id: number;
    districtName: string;
    stateId: number;
    isPopularCity: number;
}

interface FuelTypes {
    id: number,
    name: string
}

interface PriceInputSectionProps {
    type: string;
    city: string | null;
    state: string | null;
    selectState: number | null;
    cityId: number | null;
    setCityId: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectState: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function PriceInputSection({ type, city, state, setCityId, selectState, setSelectState, cityId }: PriceInputSectionProps) {
    const stateName = convertToName(state || "")
    const cityName = convertToName(city || "")
    const [fuelType, setFuelType] = useState(type)
    const [selectCity, setSelectCity] = useState(cityName)
    const [selectStateName, setSelectStateName] = useState(stateName)
    const router = useRouter()

    const { data: cityByStatesIdData } = useGetDistrictsByStateIdQuery({ stateId: Number(selectState) }, { skip: !selectState })
    const { data: statesData } = useGetStatesQuery()

    const states: State[] = statesData?.rows ?? []
    const citys: DistrictInfo[] = cityByStatesIdData?.rows ?? []

    function handleCity(value: DistrictInfo) {
        const city = value.districtName
        setCityId(value.id)
        setSelectCity(city);
        const slug = convertToSlug(selectStateName)
        const citySlug = convertToSlug(city)
        router.push(`/${slug}/${fuelType.toLowerCase()}-price-in-${citySlug}`)
    }

    useEffect(() => {
        if (states.length > 0 && selectStateName) {
            const matched = states.find(
                (s: State) =>
                    s.stateName.toLowerCase() === selectStateName.toLowerCase()
            );
            if (matched) {
                setSelectState(matched.stateId);
            } else {
                setSelectState(null);
            }
        }
    }, [states, selectStateName]);

    useEffect(() => {
        if (citys.length > 0 && cityName) {
            const matched = citys.find(
                (c: DistrictInfo) =>
                    c.districtName.toLowerCase() === cityName.toLowerCase()
            );
            if (matched) {
                setCityId(matched.id);
            } else {
                setCityId(null);
            }
        }
    }, [citys, cityName]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

            {/* Fuel Type */}
            <div className="col-span-1 border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">
                <p className="text-sm mb-3">Select Fuel Type</p>

                <div className="flex gap-2">
                    {fuelTypes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setFuelType(item.name);

                                router.push(
                                    state && cityId && city
                                        ? `/${state.toLowerCase()}/${item.name.toLowerCase()}-price-in-${city.toLowerCase()}`
                                        : state
                                            ? `/${state.toLowerCase()}/${item.name.toLowerCase()}-price`
                                            : `${item.name.toLowerCase()}-price-in-india`
                                );
                            }}
                            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-1
                                ${fuelType === item.name
                                    ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                                    : "bg-gray-100 dark:bg-[#232323] border-gray-300 hover:bg-gray-200 dark:border-[#2e2e2e]"
                                }
                            `}>
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* State */}
            <div className="col-span-1 border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">
                <p className="text-sm mb-3">State</p>

                <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                    <CustomSelect
                        options={states}
                        placeholder="Select State"
                        labelKey="stateName"
                        valueKey="stateName"
                        value={selectStateName}
                        onSelect={(value: State) => {
                            setSelectState(value.stateId);
                            setSelectStateName(value.stateName);
                            setCityId(null)
                            router.push(`/${convertToSlug(value.stateName).toLowerCase()}/${fuelType === "Fuel" ? "petrol" : fuelType.toLowerCase()}-price`)
                        }}
                    />
                </div>
            </div>

            {/* City */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 border rounded-xl p-4 bg-white dark:bg-[#171717] shadow-sm dark:border-[#2e2e2e]">
                <p className="text-sm mb-3">City</p>

                <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                    <CustomSelect
                        options={citys}
                        placeholder="Select City"
                        labelKey="districtName"
                        valueKey="districtName"
                        value={selectCity}
                        onSelect={(value: DistrictInfo) => { handleCity(value) }}
                    />
                </div>
            </div>
        </div>
    );
}