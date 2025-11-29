'use client'

import { Dispatch, SetStateAction, useState } from "react";

interface SellUsedCarModelProps {
    openModel: boolean;
    setOpenModel: Dispatch<SetStateAction<boolean>>;
    selectedBrand: string | null;
}

const brands = [
    { name: "Maruti Suzuki", logo: "/brands/maruti.png" },
    { name: "Tata", logo: "/brands/tata.png" },
    { name: "Honda", logo: "/brands/honda.png" },
    { name: "Nexa", logo: "/brands/nexa.png" },
    { name: "MG", logo: "/brands/mg.png" },
    { name: "Nissan", logo: "/brands/nissan.png" },
    { name: "Kia", logo: "/brands/kia.png" },
    { name: "Toyota", logo: "/brands/toyota.png" },
    { name: "Skoda", logo: "/brands/skoda.png" },
    { name: "Renault", logo: "/brands/renault.png" },
    { name: "Lexus", logo: "/brands/lexus.png" },
    { name: "Jeep", logo: "/brands/jeep.png" },
    { name: "Porsche", logo: "/brands/porsche.png" },
    { name: "Lamborghini", logo: "/brands/lamborghini.png" },
    { name: "Ferrari", logo: "/brands/ferrari.png" },
];

const SellUsedCarModel = ({ openModel, setOpenModel, selectedBrand }: SellUsedCarModelProps) => {
    const [search, setSearch] = useState("");

    if (!openModel) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Close Button */}
            <button
                onClick={() => setOpenModel(false)}
                className="absolute top-4 right-4 bg-primary p-2 rounded-full hover:bg-primary-hover"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Header Tabs */}
            <div className="flex items-center gap-6 px-6 py-4 border-b">
                {["Brand", "Period", "Model", "Variant", "Ownership", "Odometer", "Location"].map((tab, i) => (
                    <span
                        key={i}
                        className={`cursor-pointer text-sm font-medium ${i === 0 ? "text-primary border-b-2 border-primary pb-2" : "text-gray-600"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Section */}
                <div className="w-3/4 border-r overflow-y-auto p-6">
                    {/* Search */}
                    <div className="flex items-center border rounded-full px-4 py-2 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search Brand name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 outline-none text-sm"
                        />
                    </div>

                    {/* Brands Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                        {brands
                            .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
                            .map((brand, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-primary"
                                >
                                    <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
                                    <p className="text-sm mt-2">{brand.name}</p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/4 p-6">
                    <div className="border rounded-lg p-4">
                        <h2 className="font-semibold text-green-600 mb-4">{selectedBrand || "Maruti Suzuki"}</h2>
                        <ul className="space-y-3">
                            {Array(7)
                                .fill(null)
                                .map((_, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-4 h-4 border rounded-full flex items-center justify-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        </span>
                                        {selectedBrand || "Maruti Suzuki"}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellUsedCarModel;
