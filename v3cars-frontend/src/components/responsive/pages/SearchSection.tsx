'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetDistrictsByStateIdQuery, useGetStatesQuery } from "@/redux/api/locationModuleApi";
import { convertToSlug } from "@/utils/helperFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

interface DistrictInfo {
    id: number;
    districtName: string;
    stateId: number;
    isPopularCity: number;
}


function slugify(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

interface SearchSectionProps {
    type: string;
    city: string | null;
    state: string | null;
    selectState: number | null;
    cityId: number | null;
    setCityId: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectState: React.Dispatch<React.SetStateAction<number | null>>;
}

function slugToName(slug: string): string {
    if (!slug) return "";

    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function SearchSection({ type, city, state, setCityId, selectState, setSelectState, cityId }: SearchSectionProps) {
    const stateName = slugToName(state || "")
    const cityName = slugToName(city || "")
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
        const slug = slugify(selectStateName)
        const citySlug = slugify(city)
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
                                onSelect={(value: FuelTypes) => {
                                    setFuelType(value.name)
                                    router.push(
                                        state && cityId && city
                                            ? `/${state.toLowerCase()}/${value.name.toLowerCase()}-price-in-${city.toLowerCase()}`
                                            : state
                                                ? `/${state.toLowerCase()}/${value.name.toLowerCase()}-price`
                                                : `${value.name.toLowerCase()}-price-in-india`
                                    );
                                }
                                }
                            />
                        </div>

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
                                    router.push(`/${convertToSlug(value.stateName).toLowerCase()}/${fuelType.toLowerCase()}-price`)
                                }}
                            />
                        </div>

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
            </div>
        </>
    );
}

export default SearchSection;