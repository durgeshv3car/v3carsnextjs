'use client'

export default function VariantsColorTable() {
    const rows = Array(9).fill("Smart & Derivatives");

    return (
        <div className="w-full p-4">
            <div className="overflow-x-auto bg-white rounded-xl border dark:border-[#2e2e2e] dark:bg-[#171717]">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-[#DEE2E6] dark:bg-[#292929]">
                            <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Variants</th>
                            <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">White</th>
                            <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Grey</th>
                            <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Red</th>
                            <th className="p-4 font-semibold">Silver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((label, index) => (
                            <tr key={index} className="border-t dark:border-[#2e2e2e]">
                                <td className="p-4 border-r border-b dark:border-[#2e2e2e]">{label}</td>
                                <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl">✓</td>
                                <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl text-red-500">✕</td>
                                <td className="p-4 border-r border-b dark:border-[#2e2e2e] text-xl text-red-500">✕</td>
                                <td className="p-4 text-xl text-red-500">✕</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
