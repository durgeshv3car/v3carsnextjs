'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetCityByStatesIdQuery, useGetStatesQuery } from "@/redux/api/locationModuleApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FuelTypes {
    id: number,
    name: string
}

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

interface City {
    cityId: number;
    cityName: string;
    stateId: number;
    countryId: number;
    status: number;
    isPopularCity: number;
    isTopCity: number;
    ismajorCityPetrol: number;
    ismajorCityDiesel: number;
    ismajorCityCNG: number;
    isImage: string | null;
}


function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()  
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function SearchSection() {
    const [fuelType, setFuelType] = useState("")
    const [selectState, setSelectState] = useState<number | null>(null)
    const [selectCity, setSelectCity] = useState("")
    const [selectStateName, setSelectStateName] = useState("")
    const router = useRouter()

    const { data: cityByStatesIdData } = useGetCityByStatesIdQuery({ stateId: Number(selectState) }, { skip: !selectState })
    const { data: statesData } = useGetStatesQuery()

    const states = statesData?.rows ?? []
    const citys = cityByStatesIdData?.rows ?? []

    function handleCity(value: City) {
        const city = value.cityName
        setSelectCity(city);
        const slug = slugify(selectStateName)
        const citySlug = slugify(city)                
        router.push(`https://www.v3cars.com/${slug}/${fuelType.toLowerCase()}-price-in-${citySlug}`)
    }

    return (
        <>
            <div className="lg:bg-[#244261]">
                <div className="lg:bg-[url('/figma-banner.png')] lg:h-[217px] flex items-center justify-center bg-center bg-cover max-w-[1900px] mx-auto px-4 xl:px-10">
                    <div className="w-full lg:max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                            <CustomSelect
                                options={fuelTypes}
                                placeholder="Select Fuel Type"
                                labelKey="name"
                                valueKey="name"
                                value={fuelType}
                                onSelect={(value: FuelTypes) => { setFuelType(value.name) }}
                            />
                        </div>

                        <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                            <CustomSelect
                                options={states}
                                placeholder="Select State"
                                labelKey="stateName"
                                valueKey="stateId"
                                value={selectState}
                                onSelect={(value: State) => {
                                    setSelectState(value.stateId);
                                    setSelectStateName(value.stateName);
                                }}
                            />
                        </div>

                        <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                            <CustomSelect
                                options={citys}
                                placeholder="Select City"
                                labelKey="cityName"
                                valueKey="cityName"
                                value={selectCity}
                                onSelect={(value: City) => { handleCity(value) }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchSection;