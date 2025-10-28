'use client'
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
                        <h2 className="font-semibold text-black">{item.cityName}</h2>
                        <span
                            className={`text-sm font-bold text-white px-2 py-0.5 rounded ${item.change < 0 ? "bg-red-500" : "bg-green-500"
                                }`}
                        >
                            {item.change.toFixed(2)}
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
                        ₹ {item.price.toFixed(2)}{" "}
                        <span className="text-lg">/L</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FuelPrices;
