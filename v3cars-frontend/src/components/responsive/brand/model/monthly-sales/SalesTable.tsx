"use client";

export default function SalesTable() {
    const salesData = [
        { month: "May 2025", sales: "17.40kmpl" },
        { month: "May 2025", sales: "17.40kmpl" },
        { month: "May 2025", sales: "17.40kmpl" },
        { month: "May 2025", sales: "17.40kmpl" },
        { month: "May 2025", sales: "17.40kmpl" },
        { month: "May 2025", sales: "17.40kmpl" },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">
                Tata Nexon Sales
            </h2>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                In September 2025, the total sales figure of Nexon was{" "}
                <strong>22,573 units</strong>, which is a{" "}
                <strong>37.96 percent MoM growth</strong>. In September 2025, the total
                sales figure of Tata cars was <strong>22,573 units</strong>. Want to
                compare monthly sales figures for all Tata models?{" "}
                <a
                    href="#"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Click here to compare all Tata car sales.
                </a>
            </p>

            <div className="overflow-x-auto bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2e2e2e]">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100 dark:bg-[#2e2e2e]">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold border-b border-r border-gray-200 dark:border-[#2e2e2e]">
                                Month
                            </th>
                            <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-[#2e2e2e]">
                                Sales Unit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((item, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-white dark:bg-[#171717]" : "bg-gray-50 dark:bg-[#292929]"
                                    } hover:bg-gray-100 dark:hover:bg-[#292929] transition`}
                            >
                                <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-[#2e2e2e]">
                                    {item.month}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 dark:border-[#2e2e2e]">
                                    {item.sales}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
