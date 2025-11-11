'use client'

import { useState } from "react";
import ReviewContant from "./ReviewContant";

type Tab = "Exterior Review" | "Performance Review" | "Interior Review" | "Verdict";

export default function Review() {
    const [activeTab, setActiveTab] = useState<Tab>("Exterior Review");

    const tabs: Tab[] = ["Exterior Review", "Performance Review", "Interior Review", "Verdict"];

    const renderContent = () => {
        switch (activeTab) {
            case "Exterior Review":
                return (
                    <ReviewContant
                        title="Exterior Review"
                    />
                );

            case "Interior Review":
                return (
                    <ReviewContant
                        title="Interior Review"
                    />
                );

            case "Performance Review":
                return (
                    <ReviewContant
                        title="Performance Review"
                    />
                );

            case "Verdict":
                return (
                    <ReviewContant
                        title="Verdict"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div>
            {/* Header */}
            <h1 className="text-xl font-bold mb-2">Tata Nexon Expert Review</h1>

            <p className="text-sm text-gray-400">“With its chic looks and modern features, the Tata Nexon is a very likable car with potential to be the segment leader. Only if Tata sorts out the reliability issues of its tech package, then the Nexon wouldn’t have any major flaw”</p>

            {/* Tabs */}
            <div className="flex my-6 overflow-x-auto gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-3 text-sm font-medium border-2 whitespace-nowrap rounded-lg transition-all ${activeTab === tab
                            ? "bg-slate-100 dark:bg-[#292929] dark:border-[#2e2e2e]"
                            : "bg-white dark:bg-[#171717] dark:border-[#2e2e2e]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px] animate-fadeIn">{renderContent()}</div>
        </div>
    );
}
