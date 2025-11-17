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

const ServiceCostSnapshot: React.FC = () => {

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
            <h2 className="text-xl text-center py-4 bg-black text-white rounded-t-xl">Tata Nexon Service Cost Snapshot</h2>

            {/* Table Header */}
            <div className="overflow-x-auto border rounded-xl rounded-t-none dark:border-[#2e2e2e] dark:bg-[#171717]">
                <table className="min-w-full overflow-hidden">
                    <thead className="bg-[#DEE2E6] dark:bg-[#292929] text-sm font-semibold border-b dark:border-[#2e2e2e] text-center">
                        <tr>
                            <th className="p-3 border-r dark:border-[#2e2e2e]">Year</th>
                            <th className="p-3 border-r dark:border-[#2e2e2e]">Kilometer</th>
                            <th className="p-3">Cost Pricing</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-center">
                        {mileageData.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-white dark:bg-[#171717]" : "bg-gray-50 dark:bg-[#2e2e2e]"} border-b dark:border-[#2e2e2e]`}
                            >
                                <td className="p-3 border-r font-medium dark:border-[#2e2e2e]">
                                    {row.variant}
                                </td>
                                <td className="py-3 border-r dark:border-[#2e2e2e]">{row.claimed}</td>
                                <td className="py-3">{row.highway}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="p-3">This summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for theThis summary shows how scheduled service spend grows with time for the</p>
            </div>

        </div>
    );
};

export default ServiceCostSnapshot;
