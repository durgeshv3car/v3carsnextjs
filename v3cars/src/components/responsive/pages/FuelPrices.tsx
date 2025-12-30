'use client';

import { convertToSlug } from "@/utils/helperFunction";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

interface FuelPriceProps {
    type: string;
    city: string;
    stateName: string;
    petrol: { price: number; change: number };
    diesel: { price: number; change: number };
    cng: { price: number; change: number };
    updatedAt: string;
}

const FuelPrices = ({ type, city, stateName, petrol, diesel, cng, updatedAt }: FuelPriceProps) => {
    const showAll = type === "fuel";

    return (
        <div className="p-5 rounded-2xl shadow-md border bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">{city}</h2>
                <span className="text-blue-600 text-sm cursor-pointer hover:underline flex items-center gap-1">
                    {
                        type === "fuel" ? "10-day trend" : "7-day trend"
                    }
                    <FaArrowRightLong size={12} />
                </span>
            </div>

            {/* Price Rows */}
            {(showAll || type === "petrol") && (
                <PriceRow label="Petrol" city={city} stateName={stateName} price={petrol.price} change={petrol.change} />
            )}

            {(showAll || type === "diesel") && (
                <PriceRow label="Diesel" city={city} stateName={stateName} price={diesel.price} change={diesel.change} />
            )}

            {(showAll || type === "cng") && (
                <PriceRow label="CNG" city={city} stateName={stateName} price={cng.price} change={cng.change} />
            )}

            {/* Footer */}
            <p className="text-xs text-gray-400 mt-4">
                Updated at {new Date(updatedAt).toLocaleString()}
            </p>
        </div>
    );
};

export default FuelPrices;


const PriceRow = ({
    label,
    city,
    stateName,
    price,
    change
}: {
    label: string;
    stateName: string;
    city: string;
    price: number;
    change: number;
}) => {
    const isPositive = change > 0;
    const isNegative = change < 0;

    return (
        <div className="flex items-center justify-between py-3 text-[15px] border-b dark:border-[#2e2e2e] ">
            <Link href={`/${convertToSlug(stateName)}/${convertToSlug(label)}-price-in-${convertToSlug(city)}`} className="cursor-pointer hover:underline">{label}</Link>

            <div className="flex items-center gap-3 text-lg">
                <span className="font-semibold">₹{price.toFixed(2)}</span>

                <span
                    className={`px-2 py-[2px] rounded-full text-sm font-medium min-w-[55px] text-center flex items-center ${isPositive
                        ? "bg-red-100 text-red-600"
                        : isNegative
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 dark:bg-[#2e2e2e]"
                        }`}
                >
                    {change === 0 ? (
                        "₹0.00"
                    ) : (
                        <>
                            {isPositive ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />}
                            ₹{Math.abs(change).toFixed(2)}
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};