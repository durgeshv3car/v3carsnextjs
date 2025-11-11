'use client'

import React from "react";

interface CostOfOwnershipProps {
    title: string
}

const CostOfOwnership: React.FC<CostOfOwnershipProps> = ({ title }) => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
            {/* Header */}
            <div className="border-b dark:border-[#2E2E2E] bg-[#F3F3F3] rounded-t-md p-3 dark:bg-[#171717]">
                <h3 className="">
                    {title} <span className="font-semibold">Cost Of Ownership</span>
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center text-center">
                <div className="overflow-hidden p-4">
                    <table className="w-full text-sm">
                        <tbody className="text-start">
                            <tr className="border-b-8 bg-[#F2F2F2] border-white dark:bg-[#2E2E2E] dark:border-[#171717]">
                                <td className="py-2 px-3 font-medium">Variants</td>
                                <td className="py-2 px-3">Nexon Smart 1.2 Petrol 5MT</td>
                            </tr>
                            <tr className="border-b-8 bg-[#F2F2F2] border-white dark:bg-[#2E2E2E] dark:border-[#171717]">
                                <td className="py-2 px-3 font-medium">Period</td>
                                <td className="py-2 px-3">5 years</td>
                            </tr>
                            <tr className="border-b-8 bg-[#F2F2F2] border-white dark:bg-[#2E2E2E] dark:border-[#171717]">
                                <td className="py-2 px-3 font-medium">Annual running</td>
                                <td className="py-2 px-3">5000km</td>
                            </tr>
                            <tr className="border-b-8 bg-[#F2F2F2] border-white dark:bg-[#2E2E2E] dark:border-[#171717]">
                                <td className="py-2 px-3 font-medium">City</td>
                                <td className="py-2 px-3">Delhi</td>
                            </tr>
                            <tr className="border-b-8 bg-[#F2F2F2] border-white dark:bg-[#2E2E2E] dark:border-[#171717]">
                                <td className="py-2 px-3 font-medium">Fuel</td>
                                <td className="py-2 px-3">Petrol @ ₹96.53</td>
                            </tr>
                            <tr className="bg-[#F2F2F2] dark:bg-[#2E2E2E]">
                                <td className="py-2 px-3 font-medium">Real-world mileage</td>
                                <td className="py-2 px-3">15.12kmpl</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Highlighted Cost Section */}
                    <div className="bg-yellow-50 px-4 py-3 border-t border-gray-200 text-start dark:bg-[#2E2E2E] dark:border-[#171717]">
                        <div className="flex justify-between text-sm font-medium mb-1">
                            <span>Estimated 5-year cost</span>
                            <span className="font-semibold">₹99.95 lakh*</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                            <span>Cost per km</span>
                            <span className="font-semibold">₹20</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            *Includes on-road price, 5-yr service/maintenance & fuel/charging
                        </p>
                    </div>
                </div>

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
