'use client'


import React, { useState } from "react";

const StateWiseFuelList = () => {
    const [activeTab, setActiveTab] = useState<"Petrol" | "Diesel" | "CNG">("Petrol");

    const fuelData = [
        { state: "Andaman and Nicobar Islands", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Andhra Pradesh", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Arunachal Pradesh", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Assam", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Bihar", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Chandigarh", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Chhattisgarh", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Dadra and Nagar Haveli", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Daman and Diu", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Delhi", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Goa", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Gujarat", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Haryana", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Himachal Pradesh", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Jammu and Kashmir", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
        { state: "Jharkhand", petrol: "82.42₹/L", diesel: "78.01₹/L", cng: "83.99₹/kg" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                {/* Heading */}
                <h1 className="text-2xl">State-wise List For Fuel Price</h1>

                {/* Tabs */}
                <div className="grid grid-cols-3 divide-x-[1px] dark:divide-[#2E2E2E] border rounded-lg dark:border-[#2E2E2E]">
                    {["Petrol", "Diesel", "CNG"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`font-semibold px-6 py-2 ${activeTab === tab
                                ? "text-black dark:text-white"
                                : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b dark:border-[#2E2E2E]">
                        <tr>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">STATE</th>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">PETROL</th>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">DIESEL</th>
                            <th className="px-4 py-2 font-semibold min-w-[200px]">CNG</th>
                        </tr>
                    </thead>
                    <tbody className="border border-gray-200 dark:border-[#2E2E2E]">
                        {fuelData.map((row, idx) => (
                            <tr
                                key={idx}
                                className={idx % 2 === 0 ? "bg-transparent" : "bg-gray-50 dark:bg-[#171717]"}
                            >
                                <td className="p-4 border dark:border-[#2E2E2E]">{row.state}</td>
                                <td className="p-4 border dark:border-[#2E2E2E]">{row.petrol}</td>
                                <td className="p-4 border dark:border-[#2E2E2E]">{row.diesel}</td>
                                <td className="p-4 border dark:border-[#2E2E2E]">{row.cng}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StateWiseFuelList;
