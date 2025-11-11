'use client'

import React from "react";
import { GoDotFill } from "react-icons/go";

const DisAdvantages: React.FC = () => {
    const advantages = [
        {
            title: "Rugged Looks With 190mm Ground Clearance",
            description:
                "The Maruti Suzuki Fronx offers a Grand Vitara-inspired front design, which gels well with the side body cladding and high-riding stance. In the flesh, the Fronx looks rugged and doesn’t feel similar to the Baleno despite having the same underpinnings. It also offers 190mm of ground clearance, making it more practical than the Baleno.",
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="border border-red-200 rounded-xl shadow-sm overflow-hidden dark:border-[#2e2e2e]">
                <div className="bg-[#FFE9E9] p-4 dark:bg-[#292929]">
                    <h2 className="text-red-600 font-semibold text-lg">
                        Tata Nexon DisAdvantages
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 mb-4">
                        See claimed and real-world mileage for Tata Nexon by powertrain with separate city and highway figures
                    </p>
                </div>

                {/* Advantage Items */}
                <div className="divide-y dark:divide-[#2e2e2e]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="p-4 bg-[#FFF7F7] dark:bg-[#171717]">
                            <h3 className="font-semibold text-sm mb-1 flex items-center gap-1">
                                <GoDotFill className="text-red-600" />
                                {advantages[0].title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {advantages[0].description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisAdvantages;
