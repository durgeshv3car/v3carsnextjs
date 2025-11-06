'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";
import { useGetBrandsQuery, useGetModelsQuery, useGetVariantsQuery } from "@/redux/api/carModuleApi";
import { useGetCitiesQuery } from "@/redux/api/locationModuleApi";
import { setSelectedCity } from "@/redux/slices/commonSlice";
import { AppDispatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

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

interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
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

interface TransmissionTypes {
    id: number;
    name: string
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
    isImage: string;
}

const FilterSection: React.FC = () => {
    const [selectBrand, setSelectBrand] = useState<number | null>(null)
    const [modelId, setModelId] = useState<number | null>(null)
    const [variantId, setVariantId] = useState<number | null>(null)
    const [fuelType, setFuelType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [openModel, setOpenModel] = useState(false);
    const [query, setQuery] = useState("");
    const [city, setCity] = useState<City | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const { data: brandsData } = useGetBrandsQuery();
    const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand, });
    const { data: variantData } = useGetVariantsQuery({ modelId: modelId! }, { skip: !modelId, });
    const { data: citiesData } = useGetCitiesQuery({ query }, { skip: !query });

    const brands = brandsData?.rows ?? [];
    const models = modelsData?.rows ?? [];
    const variant: Variant[] = variantData?.rows ?? [];
    const cities = citiesData?.rows ?? [];

    const filteredCities =
        query.length >= 2
            ? cities.filter((c: City) =>
                c.cityName.toLowerCase().includes(query.toLowerCase())
            )
            : [];

    const handleCityChange = (selectedOption: City) => {
        setQuery("")
        setOpenModel(false)
        setCity(selectedOption);
        dispatch(setSelectedCity({
            cityId: selectedOption.cityId,
            cityName: selectedOption.cityName,
        }))
    };

    const fuelTypes = Array.from(
        new Set(variant.map(v => v.powertrain.fuelType))
    );

    const filteredVariants = variant.filter(
        v => v.powertrain.fuelType === fuelType
    );

    const uniqueTransmissionTypes = Array.from(
        new Set(filteredVariants.map(v => v.powertrain.transmissionType))
    );

    const transmissionTypes = uniqueTransmissionTypes.map((type, index) => ({
        id: index + 1,
        name: type
    }));

    const filteredVariantData = variant.filter(v => {
        const fuelMatch = fuelType ? v.powertrain.fuelType === fuelType : true;
        const transmissionMatch = transmission ? v.powertrain.transmissionType === transmission : true;
        return fuelMatch && transmissionMatch;
    });

    const fuelOptions: ("Petrol" | "Diesel" | "CNG")[] = ["Petrol", "Diesel", "CNG"];

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
        <div className="px-4 xl:px-10 bg-[#E2E2E2] dark:bg-[#2E2E2E]">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:app-container py-10 mx-auto">

                {/* Left Section */}
                <div className="flex flex-col justify-end items-center gap-4">
                    <h2 className="text-4xl">
                        Calculate Car{" "}
                        <span className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-semibold text-2xl rounded-full">On-Road</span><br />
                        Price In India
                    </h2>
                    <img
                        src="/car-on-road-price.png"
                        alt="Car"
                        className="w-96 object-contain grayscale"
                    />
                </div>

                {/* Right Section */}
                <div className="bg-white dark:bg-[#171717] rounded-2xl">
                    <div className="bg-black text-white text-center rounded-t-2xl py-3">
                        SELECT FILTER RIGHT CAR PRICE
                    </div>
                    <div className="px-4 py-8 grid grid-cols-2 gap-6 text-sm">
                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect
                                groupedOptions={groupedOptions}
                                placeholder="Select Brand"
                                labelKey="displayName"
                                valueKey="brandId"
                                value={selectBrand}
                                onSelect={(value: CarBrand) => { setSelectBrand(value.brandId) }}
                            />
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect
                                options={models}
                                placeholder="Select Model"
                                labelKey="modelName"
                                valueKey="modelId"
                                value={modelId}
                                onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                            />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <p className="mb-2 text-sm font-medium">Select Fuel Type</p>
                            <div className="flex gap-2">
                                {fuelTypes.length > 0 ? (
                                    fuelTypes.map((fuel, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setFuelType(fuel)}
                                            className={`w-full px-4 py-2 rounded-full ${fuelType === fuel
                                                ? "bg-yellow-400 text-black font-medium"
                                                : "bg-gray-200 dark:bg-[#2E2E2E]"
                                                }`}
                                        >
                                            {fuel}
                                        </button>
                                    ))
                                ) : (
                                    fuelOptions.map((fuel, index) => (
                                        <button
                                            key={index}
                                            disabled
                                            className={`w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-[#2E2E2E]`}
                                        >
                                            {fuel}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect
                                options={transmissionTypes}
                                placeholder="Select Transmission"
                                labelKey="name"
                                valueKey="id"
                                value={transmission}
                                onSelect={(value: TransmissionTypes) => { setTransmission(value.name) }}
                            />
                        </div>

                        <div className='border-b dark:border-[#2E2E2E] w-full'>
                            <CustomSelect
                                options={filteredVariantData}
                                placeholder="Select Variant"
                                labelKey="variantName"
                                valueKey="variantId"
                                value={variantId}
                                onSelect={(value: Variant) => { setVariantId(value.variantId) }}
                            />
                        </div>

                        <div className="relative shrink-0 w-full border-b dark:border-[#262626] transition-all duration-300 ease-in-out">
                            {/* Header / Toggle */}
                            <div
                                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
                                onClick={() => setOpenModel(!openModel)}
                            >
                                <label className="block">
                                    {city?.cityName || "City"}
                                </label>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`size-4 transform transition-transform duration-300 ${openModel ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>

                            {/* Dropdown panel with smooth animation */}
                            <div
                                className={`absolute z-20 w-full bg-white dark:bg-[#171717] rounded-b-lg border dark:border-[#2E2E2E] overflow-hidden transition-all duration-300 ease-in-out origin-top ${openModel
                                    ? "max-h-[300px] opacity-100 scale-y-100"
                                    : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                                    }`}
                            >
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="block w-full border-b dark:border-[#2E2E2E] p-3 focus:outline-none bg-transparent"
                                />

                                <div className="transition-opacity duration-300 ease-in-out">
                                    {query.length < 2 && (
                                        <p className="text-sm p-3 text-gray-300 italic">
                                            Please enter 2 or more characters
                                        </p>
                                    )}

                                    {query.length >= 2 && (
                                        <ul className="max-h-40 overflow-y-auto dark:bg-[#171717] overflow-hidden">
                                            {filteredCities.length > 0 ? (
                                                filteredCities.map((city: City, index: number) => (
                                                    <li
                                                        key={index}
                                                        className="p-3 hover:bg-slate-50 dark:hover:bg-[#2E2E2E] cursor-pointer border-b dark:border-[#2E2E2E] transition-colors duration-200"
                                                        onClick={() => handleCityChange(city)}
                                                    >
                                                        {city?.cityName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="p-2 text-gray-500">No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <button className="col-span-2 bg-yellow-400 text-black font-semibold py-3 text-lg rounded-lg hover:bg-yellow-500 transition">
                            Get On Road Price
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
