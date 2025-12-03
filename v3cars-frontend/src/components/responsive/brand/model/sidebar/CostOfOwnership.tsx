'use client'

import React, { useState } from "react";

interface CostOfOwnershipProps {
    title: string
}

const CostOfOwnership: React.FC<CostOfOwnershipProps> = ({ title }) => {
    const [formData, setFormData] = useState({
        city: "",
        variant: "",
        price: "",
        period: "",
        running: "",
        cost: "",
        efficiency: "",
        fuelCost: "",
    })
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-semibold">Cost Of Ownership</span>
                </h3>
            </div>

            <div className="p-3">
                <div className="flex flex-col gap-3">
                    <InputField label="City" value={formData.city} onChange={(val) => setFormData(prev => ({ ...prev, city: val }))} />
                    <InputField label="Variants" value={formData.variant} onChange={(val) => setFormData(prev => ({ ...prev, variant: val }))} />
                    <InputField label="On-Road Price" value={formData.price} onChange={(val) => setFormData(prev => ({ ...prev, price: val }))} />
                    <InputField label="Period" value={formData.period} onChange={(val) => setFormData(prev => ({ ...prev, period: val }))} />
                    <InputField label="Total Running" value={formData.running} onChange={(val) => setFormData(prev => ({ ...prev, running: val }))} />
                    <InputField label="Maintenance Cost" value={formData.cost} onChange={(val) => setFormData(prev => ({ ...prev, cost: val }))} />
                    <InputField label="Fuel Efficiency" value={formData.efficiency} onChange={(val) => setFormData(prev => ({ ...prev, efficiency: val }))} />
                    <InputField label="Fuel Cost" value={formData.fuelCost} onChange={(val) => setFormData(prev => ({ ...prev, fuelCost: val }))} />
                </div>


                <div className="bg-yellow-50 dark:bg-[#232323] border dark:border-[#2e2e2e] rounded-lg mt-4 divide-y dark:divide-[#2e2e2e]">
                    <div className="p-3">
                        <p className="text-sm">Total Estimated 5-Year Cost</p>
                        <p className="text-xl font-semibold">₹11,43,124</p>
                    </div>

                    <div className="p-3">
                        <p className="text-sm">Cost per km</p>
                        <p className="text-xl font-semibold">₹22.86</p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-1">*Includes fuel and regular maintenance costs, but excludes insurance renewals and other periodic expenses.</p>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                {/* Button */}
                <div className="p-3 w-full">
                    <button
                        className="w-full border border-black rounded-lg py-2 text-sm font-medium bg-[#F8F9FA] hover:bg-gray-100 hover:dark:bg-[#292929] transition dark:bg-[#171717] dark:border-[#2E2E2E]"
                        onClick={() => alert('Downloading Nexon Brochure..')}
                    >
                        Customize & Calculate Ownership Cost
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CostOfOwnership;


function InputField({ label, value, onChange }: { label: string; value: string; onChange?: (val: string) => void }) {
    const hasValue = value && value.trim() !== "";


    return (
        <div className="relative w-full">
            <input
                className={`w-full border border-gray-200 rounded-xl px-4 py-2
                    bg-white dark:bg-[#171717] transition-all duration-200 
                    focus:ring-0 dark:border-[#2e2e2e]
                    ${hasValue ? "pt-4" : "pt-3.5"}`
                }
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            />

            <label
                className={`absolute left-4 text-gray-400 pointer-events-none transition-all duration-200  bg-white dark:bg-[#171717]
                ${hasValue ? "text-xs -top-2 px-1" : "top-3.5"}`}
            >
                {label}
            </label>
        </div>

    );
}