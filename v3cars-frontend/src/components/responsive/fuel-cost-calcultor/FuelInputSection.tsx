'use client'

import { useGetCountriesQuery } from "@/redux/api/locationModuleApi";
import React, { useState } from "react";

interface Country {
    countryId: number;
    countryName: string;
    pincodeLength: number;
    countryCurrency: string;
    currencySymbol: string;
    distanceCalcOption: number;
    currencyRate: number | null;
    fuelUnitOption: number;
    isActive: number;
    exchangeCurrencyRate: number;
    countryCode: string;
}

export type DistanceUnit = 'km' | 'mi';
export type Period = 'daily' | 'monthly' | 'yearly';

interface FuelInputSectionProps {
    onInputChange: (data: Record<string, unknown>) => void;
}

export default function FuelInputSection({ onInputChange }: FuelInputSectionProps) {
    const [period, setPeriod] = useState<Period>('daily');
    const [distanceValue, setDistanceValue] = useState<number>(70);
    const [drivingDistance, setDrivingDistance] = useState<number>(70);
    const [openModel, setOpenModel] = useState(false);
    const [distanceUnit, setDistanceUnit] = useState<"km" | "mi">("km");
    const [quantityUnit, setQuantityUnit] = useState<"liter" | "gallon">("liter");
    const [query, setQuery] = useState("");
    const { data: countriesData } = useGetCountriesQuery({ query }, { skip: !query });
    const countries = countriesData?.rows ?? [];
    const [selectedCountry, setSelectedCountry] = useState(() => {
        const defaultCountry = countries.find((c: Country) => c.countryName === 'India');
        return (
            defaultCountry || {
                countryName: "India",
                countryCurrency: 'INR',
                currencySymbol: '₹',
                exchangeCurrencyRate: 1,
                countryId: 226,
            }
        );
    });

    const filteredCountries =
        query.length >= 2
            ? countries.filter((c: Country) =>
                c.countryName.toLowerCase().includes(query.toLowerCase())
            )
            : [];

    const handleCountryChange = (selectedOption: Country) => {
        setQuery("")
        setOpenModel(false)
        setSelectedCountry(selectedOption);
        onInputChange({
            country: selectedOption.countryName,
            currencySymbol: selectedOption.currencySymbol,
            exchangeCurrencyRate: selectedOption.exchangeCurrencyRate,
            drivingDistance,
            countryId: selectedOption.countryId,
        });
    };

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setDistanceValue(value);
            onInputChange({ drivingDistance: value });
        }
    };

    const handlePeriodChange = (newPeriod: Period) => {
        setPeriod(newPeriod);

        let newDistance = 70; // base daily distance

        if (newPeriod === 'daily') newDistance = drivingDistance;
        if (newPeriod === 'monthly') newDistance = drivingDistance * 30;
        if (newPeriod === 'yearly') newDistance = drivingDistance * 365;

        setDistanceValue(newDistance);
        onInputChange({ period: newPeriod, drivingDistance: newDistance });
    };

    const handleDistanceUnitChange = (unit: DistanceUnit) => {
        if (unit === distanceUnit) return;
        const conversionFactor = 0.621371; // 1 km = 0.621371 miles
        const newDistance =
            unit === 'mi'
                ? drivingDistance * conversionFactor
                : drivingDistance / conversionFactor;

        setDistanceUnit(unit);
        setDrivingDistance(newDistance);
        setDistanceValue(newDistance);
        onInputChange({ drivingDistance: newDistance, distanceUnit: unit });
    };

    return (
        <div>
            <div className="grid md:grid-cols-3 gap-2 lg:gap-6">

                {/* ---------------- COUNTRY CARD ---------------- */}
                <div className="bg-white rounded-xl shadow border p-5 dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <h3 className="text-sm font-medium mb-3">Country</h3>

                    <div className={`relative shrink-0 ${openModel ? "rounded-b-none" : ""} rounded-xl dark:bg-[#171717] w-full border dark:border-[#262626] transition-all duration-300 ease-in-out`}>
                        {/* Header / Toggle */}
                        <div
                            className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
                            onClick={() => setOpenModel(!openModel)}
                        >
                            <label className="block">
                                {selectedCountry.currencySymbol} {selectedCountry.countryName || "Country"}
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
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((country: Country, index: number) => (
                                                <li
                                                    key={index}
                                                    className="p-3 hover:dark:bg-[#2E2E2E] cursor-pointer border-b dark:border-[#2E2E2E] transition-colors duration-200"
                                                    onClick={() => handleCountryChange(country)}
                                                >
                                                    {country?.countryName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-2 text-gray-400">No results found</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        Choose your country to apply local currency & default distance/volume units.
                    </p>
                </div>

                {/* ---------------- DRIVING DISTANCE CARD ---------------- */}
                <div className="bg-white rounded-xl shadow border p-5 dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <h3 className="text-sm font-medium mb-3">Driving Distance</h3>

                    <div className="flex items-center gap-3">
                        <span className="font-medium">I drive</span>

                        <input
                            type="number"
                            value={distanceValue}
                            onChange={handleDistanceChange}
                            className="w-28 border rounded-lg py-2 px-3 text-center text-gray-800 font-semibold shadow-inner border-primary bg-primary-light focus:outline-none"
                        />

                        <span className="text-gray-400">km per</span>

                        <select
                            className="flex items-center border rounded-lg px-3 py-2 cursor-pointer dark:bg-[#232323] dark:border-[#2e2e2e]"
                            value={period}
                            onChange={(e) => { handlePeriodChange(e.target.value as Period) }}
                        >
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>

                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        Enter how much you drive and switch between day, month, or year to auto-update all results.
                    </p>
                </div>

                {/* ---------------- DISTANCE & QUANTITY CARD ---------------- */}
                <div className="bg-white rounded-xl border shadow p-5 dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <div className="grid grid-cols-2 gap-4">

                        {/* Distance toggle */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Distance</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDistanceUnitChange("km")}
                                    className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-medium ${distanceUnit === "km"
                                        ? "bg-primary border-primary text-gray-900"
                                        : "bg-transparent dark:border-[#2e2e2e]"
                                        }`}
                                >
                                    Kilometre
                                </button>

                                <button
                                    onClick={() => handleDistanceUnitChange("mi")}
                                    className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-medium ${distanceUnit === "mi"
                                        ? "bg-primary border-primary text-gray-900"
                                        : "bg-transparent dark:border-[#2e2e2e]"
                                        }`}
                                >
                                    Miles
                                </button>
                            </div>
                        </div>

                        {/* Quantity toggle */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Quantity</h3>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setQuantityUnit("liter")}
                                    className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-medium ${quantityUnit === "liter"
                                        ? "bg-primary border-primary text-gray-900"
                                        : "bg-transparent dark:border-[#2e2e2e]"
                                        }`}
                                >
                                    Liter
                                </button>

                                <button
                                    onClick={() => setQuantityUnit("gallon")}
                                    className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-medium ${quantityUnit === "gallon"
                                        ? "bg-primary border-primary text-gray-900"
                                        : "bg-transparent dark:border-[#2e2e2e]"
                                        }`}
                                >
                                    Gallon
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        Switch between km/miles and liter/gallon to match your regional preferences.
                    </p>
                </div>
            </div>
        </div>
    );
}
