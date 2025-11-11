import React from "react";

interface Variant {
    variant: string;
    vfm: string;
    price: string;
    recommendation: string;
}

const manualVariants: Variant[] = [
    {
        variant: "Smart (O) 5MT",
        vfm: "100%",
        price: "₹7,99,990",
        recommendation: "For those on a strict budget. Personalisation recommended.",
    },
    {
        variant: "Smart+ 5MT",
        vfm: "53%",
        price: "₹8,89,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
    {
        variant: "Smart+ S 5MT",
        vfm: "76%",
        price: "₹9,39,990",
        recommendation: "Misses basic features. Not recommended.",
    },
    {
        variant: "Pure",
        vfm: "46%",
        price: "₹9,79,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
    {
        variant: "Pure S",
        vfm: "60%",
        price: "₹10,29,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
];

const dctVariants: Variant[] = [
    {
        variant: "Smart (O) 5MT",
        vfm: "100%",
        price: "₹7,99,990",
        recommendation: "For those on a strict budget. Personalisation recommended.",
    },
    {
        variant: "Smart+ 5MT",
        vfm: "53%",
        price: "₹8,89,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
    {
        variant: "Smart+ S 5MT",
        vfm: "76%",
        price: "₹9,39,990",
        recommendation: "Misses basic features. Not recommended.",
    },
    {
        variant: "Pure",
        vfm: "46%",
        price: "₹9,79,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
    {
        variant: "Pure S",
        vfm: "60%",
        price: "₹10,29,990",
        recommendation: "Expensive upgrade. Misses basic features. Not recommended.",
    },
];

const VariantTable: React.FC = () => {
    const renderTable = (title: string, data: Variant[]) => (
        <div className="bg-gray-50 border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm dark:bg-[#171717] dark:border-[#2E2E2E]">
            <div className="bg-gray-100 text-center font-semibold py-4 border-b dark:bg-[#171717] dark:border-[#2E2E2E]">
                {title}
            </div>
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b font-semibold dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <tr>
                        <th className="p-4 text-left">Variant</th>
                        <th className="p-4 text-left">VFM %</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr
                            key={idx}
                            className={`border-t ${idx % 2 === 0 ? "bg-white dark:bg-[#171717] dark:border-[#2E2E2E]" : "bg-gray-50 dark:bg-[#292929] dark:border-[#2E2E2E]"}`}
                        >
                            <td className="p-4">{item.variant}</td>
                            <td className="p-4">{item.vfm}</td>
                            <td className="p-4">{item.price}</td>
                            <td className="p-4">{item.recommendation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">
                Tata Nexon Value For Money Variant
            </h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                If you don’t want to do all the research into the value and
                variant-wise features of the Tata Nexon, then this simplified table
                should help you make that decision. We use our exclusive algorithm to
                identify which variant of the Nexon offers the most appropriate balance
                of best value for money and ownership experience.
            </p>

            {renderTable("TATA NEXON PETROL-MANUAL", manualVariants)}
            {renderTable("DCT Automatic", dctVariants)}
        </div>
    );
};

export default VariantTable;
