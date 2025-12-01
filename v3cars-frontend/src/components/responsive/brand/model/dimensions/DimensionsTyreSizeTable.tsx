'use client'

import { TyreByVariantItem, TyreSize } from "./DimensionsPage";
interface DimensionsTyreSizeTableProps {
    title: string;
    tyreSize: TyreSize | null;
    tyreByVariantData: TyreByVariantItem[];
    fuelType: string;
    setFuelType: React.Dispatch<React.SetStateAction<string>>;
    transmission: string;
    setTransmission: React.Dispatch<React.SetStateAction<string>>;
}

const DimensionsTyreSizeTable = ({ title, tyreSize, tyreByVariantData, fuelType, setFuelType, transmission, setTransmission }: DimensionsTyreSizeTableProps) => {
    const fuelOptions = ["Petrol", "CNG", "Diesel", "Hybrid"];
    const transmissionOptions = ["Manual", "Automatic"];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">
                {title} Tyre Size by Variant
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
                {`See the stock tyre size for every Nexon variant with section width, profile, rim size and spare tyre detail. The base variant uses ${tyreSize?.base} while the top variant gets ${tyreSize?.top}. Larger wheels can sharpen steering feel and high-speed stability yet may firm up the ride and add a small penalty to acceleration and braking due to extra rotational mass. Use this table to verify OEM fitment so you can pick the right replacement.`}
            </p>

            <div className="border border-b-0 rounded-xl dark:border-[#2e2e2e] bg-white dark:bg-[#171717] overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 p-2">

                    {/* Fuel Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {fuelOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setFuelType(option.toLowerCase())}
                                className={`px-4 py-2 text-sm rounded-md border transition-all ${fuelType === option.toLowerCase()
                                    ? "bg-primary text-black dark:border-[#2e2e2e]"
                                    : "bg-white dark:bg-[#2E2E2E] dark:border-[#292929] hover:bg-gray-200 dark:hover:bg-[#292929]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Transmission Buttons */}
                    <div className="flex flex-wrap gap-2 ml-auto">
                        {transmissionOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setTransmission(option.toLowerCase())}
                                className={`px-4 py-2 text-sm rounded-md border transition-all ${transmission === option.toLowerCase()
                                    ? "bg-primary text-black dark:border-[#2e2e2e]"
                                    : "bg-white dark:bg-[#2E2E2E] dark:border-[#292929] hover:bg-gray-200 dark:hover:bg-[#292929]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#F2F2F2] dark:bg-[#232323]">
                            <tr>
                                <th className="p-5 border-r rounded-tl-xl font-semibold dark:border-[#2E2E2E]">
                                    {title} Variant
                                </th>
                                <th className="px-4 py-3 rounded-tr-xl">
                                    Tyre Size
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tyreByVariantData.map((item, index) => (
                                <tr
                                    key={item.variantId}
                                    className={`bg-white dark:bg-[#171717] text-center`}
                                >
                                    <td className="p-5 border-r border-b font-medium dark:border-[#2E2E2E]">
                                        {item.variantName}
                                    </td>
                                    <td className="p-5 border-b dark:border-[#2E2E2E]">
                                        {item.top ?? "N/A"}
                                    </td>
                                </tr>
                            ))}

                            {tyreByVariantData.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                                        No data available for this selection.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DimensionsTyreSizeTable;
