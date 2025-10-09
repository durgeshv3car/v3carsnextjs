'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetCityByStatesIdQuery, useGetStatesQuery } from "@/redux/api/locationModuleApi";
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
    isTodayFuelPrice: number; // 1 ya 0 - fuel price available today ya nahi
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


function SearchSection() {
    const [fuelType, setFuelType] = useState<number | null>(null)
    const [selectState, setSelectState] = useState<number | null>(null)
    const [selectCity, setSelectCity] = useState<number | null>(null)

    const { data: cityByStatesIdData } = useGetCityByStatesIdQuery({ stateId: Number(selectState) })
    const { data: statesData } = useGetStatesQuery()

    const states = statesData?.rows ?? []
    const citys = cityByStatesIdData?.rows ?? []

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
                                valueKey="id"
                                value={fuelType}
                                onSelect={(value: FuelTypes) => { setFuelType(Number(value.id)) }}
                            />
                        </div>

                        <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                            <CustomSelect
                                options={states}
                                placeholder="Select State"
                                labelKey="stateName"
                                valueKey="stateId"
                                value={selectState}
                                onSelect={(value: State) => { setSelectState(value.countryId); }}
                            />
                        </div>

                        <div className="bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-lg">
                            <CustomSelect
                                options={citys}
                                placeholder="Select City"
                                labelKey="cityName"
                                valueKey="cityId"
                                value={selectCity}
                                onSelect={(value: City) => { setSelectCity(value.cityId); }}
                            />
                            {/* <CustomSelect options={items} placeholder={"Select City"} onSelect={handleSelection} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchSection;