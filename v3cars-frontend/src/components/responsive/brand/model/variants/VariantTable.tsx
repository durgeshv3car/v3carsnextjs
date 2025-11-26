'use client';

import React from "react";

export interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

export interface Variant {
    variantId: number;
    name: string;
    exShowroom: number;
    exShowroomMax: number;
    vfmValue: number;
    vfmRank: number;
    recommendation: string;
    updatedDate: string;
}

export interface PriceListVariantItem {
    powertrain: Powertrain;
    variant: Variant;
}

interface VariantTableProps {
    title: string;
    data: PriceListVariantItem[];
}

const VariantTable: React.FC<VariantTableProps> = ({ title, data }) => {

    // ✅ Convert API → UI Table Format
    const normalizeVariants = (rows: PriceListVariantItem[]) => {
        return rows.map((item) => ({
            variant: item.variant.name,
            vfm: item.variant.vfmValue,
            price: item.variant.exShowroom,
            recommendation: item.variant.recommendation,
            transmissionType: item.powertrain.transmissionType
        }));
    };

    // ✅ Create filtered normalized arrays
    const manualVariants = normalizeVariants(
        data.filter(v => v.powertrain.transmissionType === "Manual")
    );

    const dctVariants = normalizeVariants(
        data.filter(v => v.powertrain.transmissionType === "Automatic")
    );

    // ✅ Render Table Component
    const renderTable = (title: string, rows: { variant: string; vfm: number; price: number; recommendation: string, transmissionType: string }[]) => (
        <div className="bg-gray-50 dark:bg-[#171717] ">
            <div className="bg-[#F2F2F2] text-center font-semibold py-5 border-b dark:bg-[#171717] dark:border-[#2E2E2E]">
                {title}
                {
                    rows[0].transmissionType === "Manual" && (
                        <p className="mt-4">BUYING RECOMMENDATION</p>
                    )
                }
            </div>
            <table className="w-full text-sm border-b dark:border-[#2e2e2e]">
                <thead className="border-b bg-white dark:bg-[#2e2e2e] font-semibold dark:border-[#2E2E2E]">
                    <tr>
                        <th className="p-5 border-r dark:border-[#2E2E2E]">Variant</th>
                        <th className="p-5 border-r dark:border-[#2E2E2E]">VFM %</th>
                        <th className="p-5 border-r dark:border-[#2E2E2E]">Price</th>
                        <th className="p-5">Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, idx) => (
                        <tr
                            key={idx}
                            className={`border-t bg-white dark:bg-[#171717] dark:border-[#2E2E2E] text-center`}
                        >
                            <td className="p-5 border-r dark:border-[#2E2E2E]">{item.variant}</td>
                            <td className="p-5 border-r dark:border-[#2E2E2E]">{item.vfm}%</td>
                            <td className="p-5 border-r dark:border-[#2E2E2E]">₹{item.price.toLocaleString("en-IN")}</td>
                            <td className="p-5">{item.recommendation || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">{title} Value For Money Variant</h2>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                If you don’t want to do all the research into the value and
                variant-wise features, this simplified table should help you.
                We identify which variant offers the best balance of value
                for money and ownership experience.
            </p>

            <div className="border border-b-0 rounded-xl overflow-hidden dark:border-[#2E2E2E]">
                {manualVariants.length > 0 && renderTable(`${title} Petrol Manual`, manualVariants)}
                {dctVariants.length > 0 && renderTable(`${title} Petrol Automatic`, dctVariants)}
            </div>
        </div>
    );
};

export default VariantTable;
