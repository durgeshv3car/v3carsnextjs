"use client";

import { useGetLatestFuelPriceQuery } from "@/redux/api/fuelModuleApi";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { RiInformationLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { FuelCostInputs } from "./MainMileageComponent";

// Unit converters
const kmToMiles = 1.60934;
const literToGallon = 3.78541;
const exchangeRates = { INR: 1, USD: 0.012, EUR: 0.011, AED: 0.044 };

type LatestFuelPriceType = {
    scope: string;
    stateId: number;
    stateName: string;
    districtId: number;
    cityName: string;
    price: number;
    prevPrice: number;
    change: number;
    updatedAt: string;
};

interface MileageCalculatorComponentProps {
    inputs: FuelCostInputs;
}

type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

export default function MileageCalculatorComponent({ inputs }: MileageCalculatorComponentProps) {
    const [activeTab, setActiveTab] = useState("mileage");
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

    // === Fetch Latest Fuel Price ===
    const { data: LatestFuelPriceData } = useGetLatestFuelPriceQuery({
        districtId: Number(selectedCity.cityId), fuelType: inputs?.fuel === "cng" ? 3 : inputs?.fuel === "diesel" ? 2 : 1
    });

    const latestFuelPrice = (LatestFuelPriceData?.data ?? null) as LatestFuelPriceType | null;

    // === Local states for user inputs ===
    const [distance, setDistance] = useState(""); // default km
    const [fuel, setFuel] = useState(""); // default liters
    const [cityPrice, setCityPrice] = useState<number | null>(null);
    const [currency, setCurrency] = useState<Currency>('INR');
    const [mileage, setMileage] = useState<number>(0);
    const [costPerKm, setCostPerKm] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cost100KM, setCost100KM] = useState<number>(0);
    const [mileageL100Km, setMileageL100Km] = useState<number>(0);

    useEffect(() => {
        if (latestFuelPrice?.price) {
            setCityPrice(latestFuelPrice.price);
        }
    }, [latestFuelPrice]);

    useEffect(() => {
        if (!distance) return;

        const val = Number(distance);

        if (inputs.distance === "mi") {
            // km → miles            
            setDistance((val / kmToMiles).toFixed(2));
        } else {
            // miles → km
            setDistance((val * kmToMiles).toFixed(2));
        }
    }, [inputs.distance]);

    useEffect(() => {
        if (!fuel) return;

        const val = Number(fuel);

        if (inputs.volume === "gal") {
            // liter → gallon
            setFuel((val / literToGallon).toFixed(2));
        } else {
            // gallon → liter
            setFuel((val * literToGallon).toFixed(2));
        }
    }, [inputs.volume]);

    // Convert fuel to Liters
    // let fuelLiter = Number(fuel);
    // if (inputs.volume === "gal") {
    //     fuelLiter = Number(fuel) * literToGallon;
    // }

    useEffect(() => {
        const calculateMileage = () => {
            const distNum = Number(distance);
            const fuelNum = Number(fuel);
            const priceNum = Number(cityPrice);

            if (distNum > 0 && fuelNum > 0 && priceNum > 0) {

                // -------- Mileage (KMPL) --------
                const mileageKmL = distNum / fuelNum;

                // -------- L/100km --------
                const mileageL100Km = (fuelNum / distNum) * 100;

                // -------- Total Fuel Cost --------
                const totalFuelCost = fuelNum * priceNum;

                // -------- Cost Per KM --------
                const costPerKmCalc = totalFuelCost / distNum;

                // -------- Cost Per 100 KM --------
                const costPer100Calc = costPerKmCalc * 100;

                setMileage(Number(mileageKmL.toFixed(2)));
                setCostPerKm(Number(costPerKmCalc.toFixed(2)));
                setTotalPrice(Number(totalFuelCost.toFixed(2)));
                setCost100KM(Number(costPer100Calc.toFixed(2)));
                setMileageL100Km(Number(mileageL100Km.toFixed(2)));
            } else {
                setMileage(0);
                setCostPerKm(0);
                setTotalPrice(0);
                setCost100KM(0);
            }
        };

        calculateMileage();
    }, [distance, fuel, cityPrice, currency, inputs]);

    const handleCurrencyChange = (val: Currency) => {
        if (cityPrice == null) return;
        const converted = (cityPrice / exchangeRates[currency]) * exchangeRates[val];
        setCurrency(val);
        setCityPrice(Number(converted.toFixed(2)));
    };


    return (
        <div className="w-full max-w-4xl mx-auto">

            {/* ===== Tabs ===== */}
            <div className="grid grid-cols-3 gap-2 my-4 w-full">
                {["Mileage", "Trip Mileage", "EV Mileage"].map((tab, idx) => (
                    <button
                        key={idx}
                        className={`py-6 rounded-lg border dark:border-[#2e2e2e]
              ${activeTab === tab.toLowerCase()
                                ? "bg-[#212529] dark:bg-[#232323] text-white"
                                : "bg-white dark:bg-[#171717]"
                            }`}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ===== Main Card ===== */}
            <div className="rounded-xl shadow-lg overflow-hidden border dark:border-[#2e2e2e]">
                <h2 className="text-center text-xl font-bold py-5 tracking-wide bg-[#212529] text-white dark:bg-[#232323]">
                    CALCULATE MILEAGE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                    {/* LEFT INPUT FIELDS */}
                    <div className="space-y-4">

                        {/* Distance Input */}
                        <div>
                            <label className="text-sm flex items-center gap-1">
                                Distance Travelled <RiInformationLine />
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full rounded-lg p-3 border dark:border-[#2e2e2e] bg-transparent"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                />
                                <span className="absolute right-1.5 px-5 py-2 text-sm rounded bg-gray-200 dark:bg-[#171717] border dark:border-[#2e2e2e]">
                                    {inputs.distance === "mi" ? "Miles" : "Km"}
                                </span>
                            </div>
                        </div>

                        {/* Fuel Input */}
                        <div>
                            <label className="text-sm flex items-center gap-1">
                                Fuel Consumed <RiInformationLine />
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-lg p-3 border dark:border-[#2e2e2e] bg-transparent"
                                    value={fuel}
                                    onChange={(e) => setFuel(e.target.value)}
                                />
                                <span className="absolute top-1.5 right-1.5 px-4 py-2 text-sm rounded bg-gray-200 dark:bg-[#171717] border dark:border-[#2e2e2e]">
                                    {inputs.volume === "gal" ? "Gallon" : "Liter"}
                                </span>
                            </div>
                        </div>

                        {/* Fuel Price */}
                        <div>
                            <label className="text-sm flex items-center gap-1 capitalize">
                                {inputs?.fuel} Price Per Liter <RiInformationLine />
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-lg p-3 border dark:border-[#2e2e2e] bg-transparent"
                                    value={cityPrice ?? ''}
                                    readOnly
                                />
                                <select
                                    value={currency}
                                    onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
                                    className="absolute top-1.5 right-1.5 px-2 py-2 rounded text-sm bg-gray-200 dark:bg-[#171717] border dark:border-[#2e2e2e]"
                                >
                                    <option>INR</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>AED</option>
                                </select>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                Cost of fuel in <span className="underline">{selectedCity.cityName}</span> • updated{" "}
                                {latestFuelPrice?.updatedAt?.slice(0, 10)}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT CALCULATED VALUES */}
                    <div className="space-y-4 text-sm">

                        <div className="flex justify-between border-b pb-4 dark:border-[#2e2e2e]">
                            <span>Total Fuel Cost</span>
                            <span>{totalPrice} {currency}</span>
                        </div>

                        <div className="flex justify-between border-b pb-4 dark:border-[#2e2e2e]">
                            <span className="capitalize">Fuel Cost Per {inputs?.distance}</span>
                            <span>{currency} {costPerKm}/{inputs?.distance}</span>
                        </div>

                        <div className="flex justify-between border-b pb-4 dark:border-[#2e2e2e]">
                            <span className=" capitalize">{inputs?.fuel} Cost Per 100km</span>
                            <span>{currency} {cost100KM}</span>
                        </div>

                        {/* Yellow Mileage Box */}
                        <div className="mt-6 bg-yellow-400 text-black rounded-lg p-3">
                            <h3 className="mb-2 text-center text-lg capitalize">{activeTab === "mileage" ? `Calculated ${activeTab}` : activeTab}</h3>

                            <div className="grid grid-cols-2 items-center gap-2">
                                <div className="text-2xl font-bold bg-yellow-200 px-4 py-2 rounded-lg text-center">
                                    {mileage} <span className="text-base">{inputs?.distance}/{inputs?.volume}</span>
                                </div>

                                <div className="text-2xl font-bold bg-yellow-200 px-4 py-2 rounded-lg text-center">
                                    {mileageL100Km} <span className="text-base">{inputs?.volume}/100{inputs?.distance}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ===== Summary Box ===== */}
            <div className="bg-white dark:bg-[#232323] rounded-xl p-4 mt-4 text-sm leading-relaxed border dark:border-[#2e2e2e]">
                Based on your inputs, your vehicle returned a mileage of {mileage} kmpl. This means you are spending ₹{costPerKm} per km or about ₹{cost100KM} per 100 km of driving. Mileage can vary depending on traffic, driving style, tyre pressure and service condition. Comparing this number with your past readings helps track your vehicle’s overall health and efficiency.
            </div>

        </div>
    );
}
