'use client'

import { ColorsResponse } from "./ModelColours";

interface VariantsColorTableProps {
    title: string;
    data: ColorsResponse | undefined;
}

export default function VariantsColorTable({ title, data }: VariantsColorTableProps) {

    return (
        <>
            <div className="w-full">
                <h2 className="font-semibold text-xl mb-4">{title} <span className="font-medium">Variant-wise Colour Options</span></h2>

                <div className="overflow-x-auto bg-white rounded-xl border dark:border-[#2e2e2e] dark:bg-[#171717] scrollbar-hide">
                    <table className="text-left">
                        <thead>
                            <tr className="bg-[#DEE2E6] dark:bg-[#292929]">
                                <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[200px]">Variants</th>
                                <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[200px]">White</th>
                                <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[200px]">Grey</th>
                                <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[200px]">Red</th>
                                <th className="p-4 font-semibold min-w-[200px]">Silver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.variants.map((label, index) => (
                                <tr key={index} className="border-t dark:border-[#2e2e2e]">
                                    <td className="p-4 border-r border-b dark:border-[#2e2e2e] min-w-[200px]">{label.name}</td>
                                    <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl text-red-500 min-w-[200px]">✕</td>
                                    <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl text-red-500 min-w-[200px]">✕</td>
                                    <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl text-red-500 min-w-[200px]">✕</td>
                                    <td className="p-4 text-xl text-red-500 min-w-[200px]">✕</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
