'use client'

interface MileageRow {
    variant: string;
    fuelType: string,
    claimed: string;
    real: string;
    city: string;
    highway: string;
}

const EngineMileageSpecsTable: React.FC = () => {

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
            {/* Variant Selection */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl">Tata Nexon <span className="font-semibold">Mileage, Specs & Features</span></h2>
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
                            <th className="text-left p-4 border-r dark:border-[#2e2e2e]">Real World Mileage</th>
                            <th className="text-left p-4 border-r dark:border-[#2e2e2e]">Mileage In City</th>
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
                                    {row.variant} <br/>
                                    <span className="text-xs text-gray-400">{row.fuelType}</span>
                                </td>
                                <td className="py-3 px-4 border-r dark:border-[#2e2e2e]">{row.claimed}</td>
                                <td className="py-3 px-4 border-r dark:border-[#2e2e2e]">{row.real}</td>
                                <td className="py-3 px-4 border-r dark:border-[#2e2e2e]">{row.city}</td>
                                <td className="py-3 px-4">{row.highway}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EngineMileageSpecsTable;
