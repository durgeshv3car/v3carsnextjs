'use client'

import Link from "next/link";

interface MileageRow {
    variant: string;
    fuelType: string,
    claimed: string;
    real: string;
    city: string;
    highway: string;
}

const ServiceCostTable: React.FC = () => {

    const mileageData: MileageRow[] = [
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
        {
            variant: "Tata Nexon 1.2",
            fuelType: "Turbo Petrol Manual",
            claimed: "17.40kmpl",
            real: "17.40kmpl",
            city: "17.40kmpl",
            highway: "17.40kmpl",
        },
    ];

    return (
        <div>
            <div className="space-y-2 mb-4">
                <h2 className="text-xl">Tata Nexon Service Cost</h2>
                <p className="text-gray-400">This section lists the official service schedule for the Nexon with interval milestones in km or years and the expected cost at each visit. You will see which visits are free for labour only what consumables are replaced and the items usually inspe...</p>
            </div>

            {/* Variant Selection */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-3">
                <h2 className="text-xl">Tata Nexon <span className="font-semibold">Service Schedule</span></h2>
                <select name="" id="" className="border rounded-lg p-3 bg-gray-50 text-sm dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                    <option value="1.2L Turbo Petrol with 6-speed MT">1.2L Turbo Petrol with 6-speed MT</option>
                </select>
            </div>

            {/* Table Header */}
            <div className="overflow-x-auto border rounded-xl dark:border-[#2e2e2e] dark:bg-[#171717]">
                <table className="min-w-full overflow-hidden">
                    <thead className="bg-[#DEE2E6] dark:bg-[#292929] text-sm font-semibold border-b dark:border-[#2e2e2e]">
                        <tr>
                            <th className="text-left p-4 border-r dark:border-[#2e2e2e]">Variants</th>
                            <th className="text-left p-4 border-r dark:border-[#2e2e2e]">Claimed FE</th>
                            <th className="text-left p-4">Highway Mileage</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {mileageData.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-white dark:bg-[#171717]" : "bg-gray-50 dark:bg-[#2e2e2e]"} border-b dark:border-[#2e2e2e]`}
                            >
                                <td className="py-3 px-4 border-r font-medium dark:border-[#2e2e2e]">
                                    {row.variant} <br />
                                    <span className="text-xs text-gray-400">{row.fuelType}</span>
                                </td>
                                <td className="py-3 px-4 border-r dark:border-[#2e2e2e]">{row.claimed}</td>
                                <td className="py-3 px-4">{row.highway}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>
                                <div className="flex justify-center items-center py-4">
                                    <Link href={"#"}>Wondering what your Nexon will really cost to own? Calculate total cost of ownership →</Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceCostTable;
