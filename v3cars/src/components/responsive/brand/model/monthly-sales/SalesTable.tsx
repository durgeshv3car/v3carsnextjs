"use client";

interface SalesTableProps {
    title: string;
    data: MonthlySalesResponse | undefined;
}

export interface MonthlySales {
    monthKey: string;
    month: string;
    year: number;
    monthNum: number;
    units: number;
}

export interface MonthlySalesResponse {
    success: true,
    modelId: number,
    rows: MonthlySales[]
    total: number,
    summary: SummaryMonthlySales
}

export interface SummaryMonthlySales {
    month: string,
    units: number,
    prevMonth: string,
    prevUnits: number,
    momChangePct: number
}

export default function SalesTable({ title, data }: SalesTableProps) {

    const saleData: MonthlySales[] = data?.rows ?? [];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">
                {title} Sales
            </h2>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                In {data?.summary.month}, the total sales figure of {title} was{" "}
                <strong>{data?.summary.units} units</strong>, which is a{" "}
                <strong>{data?.summary.momChangePct} percent MoM growth</strong>. In {data?.summary.month}, the total
                sales figure of {title} cars was <strong>{data?.summary.units} units</strong>. Want to
                compare monthly sales figures for all {title} models?{" "}
                <a
                    href="#"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Click here to compare all {title} car sales.
                </a>
            </p>

            <div className="overflow-x-auto bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2e2e2e]">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-[#DEE2E6] dark:bg-[#2e2e2e]">
                        <tr>
                            <th className="text-left p-5 font-semibold border-b border-r border-gray-200 dark:border-[#2e2e2e]">
                                Month
                            </th>
                            <th className="text-left p-5 font-semibold border-b border-gray-200 dark:border-[#2e2e2e]">
                                Sales Unit
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...saleData].reverse().map((item, index) => (
                            <tr
                                key={index}
                                className={`bg-white dark:bg-[#171717] hover:bg-gray-100 dark:hover:bg-[#292929] transition`}
                            >
                                <td className="p-5 border-b border-r border-gray-200 dark:border-[#2e2e2e]">
                                    {item.month}
                                </td>

                                <td className="p-5 border-b border-gray-200 dark:border-[#2e2e2e]">
                                    {item.units}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
