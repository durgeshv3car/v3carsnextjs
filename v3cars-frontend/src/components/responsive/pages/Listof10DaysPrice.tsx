'use client'

interface FuelPrice {
    day: string;
    price: number;
}

interface Listof10DaysPriceProps {
    data: FuelPrice[];
    type: string;
    city: string | null;
}

const Listof10DaysPrice = ({ type, data, city }: Listof10DaysPriceProps) => {
    // 🌀 Reverse data (latest first)
    const reversedData = [...data].reverse();

    // 🧮 Calculate change (prevPrice - nextPrice)
    const computedData = reversedData.map((item, index) => {
        const nextItem = reversedData[index + 1];
        const change = nextItem ? item.price - nextItem.price : 0;

        return {
            ...item,
            change: Number(change.toFixed(2)), // round to 2 decimals
        };
    });

    return (
        <div className="space-y-4">
            {/* Heading */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <h1 className="text-2xl capitalize">
                    List of 10 Days {type} Price In {city}
                </h1>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">DATE</th>
                            <th className="px-4 py-2 font-semibold min-w-[200px] uppercase">
                                {type} PRICE
                            </th>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">CHANGE</th>
                        </tr>
                    </thead>
                    <tbody className="border border-gray-200 dark:border-[#2E2E2E]">
                        {computedData.map((row, idx) => {
                            const colorClass =
                                row.change > 0
                                    ? "bg-red-200 text-red-700 dark:bg-red-900/30"
                                    : row.change < 0
                                        ? "bg-green-200 text-green-700 dark:bg-green-900/30"
                                        : "bg-green-200 text-green-700 dark:bg-green-900/30";

                            return (
                                <tr
                                    key={idx}
                                    className="even:bg-transparent odd:bg-gray-50 dark:odd:bg-[#171717]"
                                >
                                    <td className="p-4 border dark:border-[#2E2E2E]">{row.day}</td>
                                    <td className="p-4 border dark:border-[#2E2E2E]">
                                        ₹ {row.price}
                                    </td>
                                    <td className="p-3 border dark:border-[#2E2E2E]">
                                        <div className={`px-4 py-1 rounded w-fit ${colorClass}`}>
                                            {row.change > 0 ? "+" : ""}
                                            {row.change.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Listof10DaysPrice;
