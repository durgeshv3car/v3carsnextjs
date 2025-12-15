'use client';

import React, { useEffect, useState } from "react";
import { FaGasPump } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

/* -------------------- TYPES -------------------- */
type FuelCostInputs = {
    drivingDistance?: number;
    country?: string;
    currencySymbol?: string;
    exchangeCurrencyRate?: number;
};

interface City {
    cityId: number;
    cityName: string;
}

interface FuelCardSectionProps {
    inputs: FuelCostInputs;
    selectedCity?: City | null;
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function FuelCardSection({ inputs, selectedCity }: FuelCardSectionProps) {
    const [fuelEfficiencies, setFuelEfficiencies] = useState({
        petrol: 15,
        diesel: 20,
        cng: 22,
    });

    const [fuelCosts, setFuelCosts] = useState({
        petrol: 94.77,
        diesel: 87.67,
        cng: 75.09,
    });

    const { drivingDistance = 70, country = "India", currencySymbol = "₹", exchangeCurrencyRate } = inputs;

    /* -------------------- FUEL TYPES -------------------- */
    const fuelTypes: Array<"petrol" | "diesel" | "cng"> =
        country === "India" ? ["petrol", "diesel", "cng"] : ["petrol"];

    /* -------------------- Update Fuel Cost Based on Country -------------------- */
    useEffect(() => {
        if (country !== "India" && exchangeCurrencyRate) {
            setFuelCosts({
                petrol: +(exchangeCurrencyRate * 95.6).toFixed(2),
                diesel: +(exchangeCurrencyRate * 87.67).toFixed(2),
                cng: +(exchangeCurrencyRate * 75.09).toFixed(2),
            });
        } else {
            setFuelCosts({
                petrol: 94.77,
                diesel: 87.67,
                cng: 75.09,
            });
        }
    }, [country, exchangeCurrencyRate]);

    /* -------------------- Fetch City Specific Prices -------------------- */
    const fetchCityFuelPrice = async () => {
        if (!selectedCity?.cityId) return;

        try {
            // TODO: Change this API endpoint with your real API
            const res = await fetch(`/api/fuel-prices?cityId=${selectedCity.cityId}`);
            const data = await res.json();

            if (data?.petrol || data?.diesel || data?.cng) {
                setFuelCosts({
                    petrol: data.petrol ?? fuelCosts.petrol,
                    diesel: data.diesel ?? fuelCosts.diesel,
                    cng: data.cng ?? fuelCosts.cng,
                });
            }
        } catch (e) {
            console.warn("City price fetch failed, using default prices.");
        }
    };

    useEffect(() => {
        fetchCityFuelPrice();
    }, [selectedCity]);

    /* -------------------- CALCULATION ENGINE -------------------- */
    const calc = (fuelType: "petrol" | "diesel" | "cng") => {
        const kmPerUnit = fuelEfficiencies[fuelType];
        const costPerUnit = fuelCosts[fuelType];

        const daily = kmPerUnit > 0 ? (drivingDistance / kmPerUnit) * costPerUnit : 0;
        const monthly = daily * 30;
        const yearly = daily * 365;

        return { daily, monthly, yearly };
    };

    return (
        <div className="w-full">
            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[48%] lg:auto-cols-[32.20%] snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide gap-6">

                {/* PETROL */}
                <FuelCard
                    title="PETROL"
                    color="bg-[#254482]"
                    border="border-[#254482]"
                    fuelCost={calc("petrol")}
                    fuelPrice={fuelCosts.petrol}
                    fuelEfficiency={fuelEfficiencies.petrol}
                    onEfficiencyChange={(v: number) => setFuelEfficiencies(prev => ({ ...prev, petrol: v }))}
                    onPriceChange={(v: number) => setFuelCosts(prev => ({ ...prev, petrol: v }))}
                    currency={currencySymbol}
                    city={selectedCity}
                />

                {/* DIESEL */}
                <FuelCard
                    title="DIESEL"
                    color="bg-[#a54169]"
                    border="border-[#a54169]"
                    fuelCost={calc("diesel")}
                    fuelPrice={fuelCosts.diesel}
                    fuelEfficiency={fuelEfficiencies.diesel}
                    onEfficiencyChange={(v: number) => setFuelEfficiencies(prev => ({ ...prev, diesel: v }))}
                    onPriceChange={(v: number) => setFuelCosts(prev => ({ ...prev, diesel: v }))}
                    currency={currencySymbol}
                    city={selectedCity}
                />

                {/* CNG */}
                <FuelCard
                    title="CNG"
                    color="bg-[#4eb16e]"
                    border="border-[#4eb16e]"
                    fuelCost={calc("cng")}
                    fuelPrice={fuelCosts.cng}
                    fuelEfficiency={fuelEfficiencies.cng}
                    onEfficiencyChange={(v: number) => setFuelEfficiencies(prev => ({ ...prev, cng: v }))}
                    onPriceChange={(v: number) => setFuelCosts(prev => ({ ...prev, cng: v }))}
                    currency={currencySymbol}
                    city={selectedCity}
                />

            </div>
        </div>
    );
}

/* -----------------------------------------------------
   REUSABLE FUEL CARD COMPONENT
------------------------------------------------------ */

function FuelCard({
    title,
    color,
    border,
    fuelCost,
    fuelPrice,
    fuelEfficiency,
    onEfficiencyChange,
    onPriceChange,
    currency,
    city,
}: any) {

    const avg = fuelCost.daily > 0 ? (fuelPrice / fuelEfficiency).toFixed(2) : "0.00";

    return (
        <div
            className={`rounded-xl shadow-lg snap-start overflow-hidden border-2 ${border} bg-white dark:bg-[#171717]`}
        >
            {/* Header */}
            <div className={`${color} py-4 text-center font-semibold`}>
                <div className="flex justify-center items-center gap-2 text-white">
                    <FaGasPump />
                    <span>{title}</span>
                </div>
            </div>

            {/* Inputs */}
            <div className="p-4 space-y-4">
                {/* Efficiency */}
                <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                        Fuel Efficiency (km/unit)
                        <MdInfoOutline />
                    </label>
                    <input
                        value={fuelEfficiency}
                        onChange={(e) => onEfficiencyChange(+e.target.value)}
                        className="mt-1 w-full border rounded-lg px-3 py-2 dark:border-[#2e2e2e] bg-transparent"
                        type="number"
                    />
                </div>

                {/* Cost */}
                <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                        Fuel Cost Per Unit
                        <MdInfoOutline />
                    </label>
                    <input
                        value={fuelPrice}
                        onChange={(e) => onPriceChange(+e.target.value)}
                        className="mt-1 w-full border rounded-lg px-3 py-2 dark:border-[#2e2e2e] bg-transparent"
                        type="number"
                    />
                </div>

                {/* City */}
                <div className="text-xs text-gray-400">
                    Cost of fuel in{" "}
                    <span className="text-blue-600 cursor-pointer">{city?.cityName}</span>
                    <span className="ml-1">● last updated today</span>
                </div>
            </div>

            {/* Prices */}
            <div className={`${color} text-white text-sm`}>
                <Row label="Daily Fuel Cost:" value={`${currency}${fuelCost.daily.toFixed(0)}`} />

                <Row label="Monthly Fuel Cost:" value={`${currency}${fuelCost.monthly.toFixed(0)}`} />

                <Row label="Yearly Fuel Cost:" value={`${currency}${fuelCost.yearly.toFixed(0)}`} />

                <div className="p-4 text-center font-medium">
                    Average Fuel Cost: {currency}{avg} per km
                </div>
            </div>
        </div>
    );
}

/* ------------------ SINGLE ROW ------------------ */
function Row({ label, value }: any) {
    return (
        <div className="p-4 flex justify-between border-b border-white/20">
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}
