'use client'

import React, { useState } from "react";

// SAMPLE DATA (Replace with API data)
const sampleData = {
    all: [
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
    ],
    interior: [
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
    ],
    exterior: [
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
    ],
    others: [
        "/model/tata.png", "/model/tata.png", "/model/tata.png", "/model/tata.png",
    ],
};

export default function CarGallery() {
    const tabs = ["All Images", "Interior", "Exterior", "Others"];
    const [activeTab, setActiveTab] = useState("All Images");

    const getImages = () => {
        switch (activeTab) {
            case "Interior": return sampleData.interior;
            case "Exterior": return sampleData.exterior;
            case "Others": return sampleData.others;
            default: return sampleData.all;
        }
    };

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-6 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === tab
                            ? "bg-primary text-black"
                            : "border dark:border-[#2e2e2e] hover:bg-gray-100 dark:hover:bg-[#2e2e2e]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-4 gap-4">
                {getImages().map((img, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border p-2 dark:border-[#2e2e2e]">
                        <img
                            src={img}
                            className="w-full object-cover hover:scale-105 transition"
                            alt="car"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
