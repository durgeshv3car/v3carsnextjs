'use client'

import Link from "next/link";

interface FuelPriceInfo {
    districtId: number;
    cityName: string;
    stateId: number;
    stateName: string;
    fuelType?: number;
    scope?: string;
    price: number;
    prevPrice: number;
    change: number;
    updatedAt: string; // ISO date string (e.g. "2025-10-28T00:00:00.000Z")
}

interface FuelPricesProps {
    fuelData: FuelPriceInfo[];
    type: string
}

function toSlug(name?: string) {
  if (!name || typeof name !== "string") return "";

  return name
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const FuelPrices = ({ fuelData, type }: FuelPricesProps) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fuelData.map((item, idx) => (
                <div
                    key={idx}
                    className={`p-4 rounded-lg border ${item.change < 0
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                        }`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-semibold text-black cursor-pointer hover:underline">
                            <Link
                                href={
                                    type === "Fuel" ?
                                    `/${toSlug(item.stateName)}/petrol-price-in-${toSlug(item.cityName)}`
                                    :
                                    `/${toSlug(item.stateName)}/${type.toLowerCase()}-price-in-${toSlug(item.cityName)}`
                                 }
                            >
                                {item.cityName}
                            </Link>
                        </h2>
                        <span
                            className={`text-sm font-bold text-white px-2 py-0.5 rounded ${item.change < 0 ? "bg-red-500" : "bg-green-500"
                                }`}
                        >
                            {item.change}
                        </span>
                    </div>
                    <div
                        className={`text-xs font-bold ${item.change < 0 ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        {type.toUpperCase()}
                    </div>
                    <div
                        className={`text-2xl font-bold ${item.change < 0 ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        ₹ {item.price}{" "}
                        <span className="text-lg">/L</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FuelPrices;
