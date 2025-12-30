'use client'

import React from "react";
import { GoDotFill } from "react-icons/go";
import DOMPurify from "dompurify";

interface DisAdvantagesProps {
    title: string;
    data: ProsConsItem[];
}

export interface ProsConsItem {
    id: number;
    heading: string; // HTML
    desc: string; // HTML
    addedDate: string;
}

const DisAdvantages: React.FC<DisAdvantagesProps> = ({ title, data }) => {

    return (
        <div>
            {/* Header */}
            <div className="border border-red-200 rounded-xl shadow-sm overflow-hidden dark:border-[#2e2e2e]">
                <div className="bg-[#FFE9E9] p-4 dark:bg-[#292929]">
                    <h2 className="text-red-600 font-semibold text-lg">
                        {title} DisAdvantages
                    </h2>

                    <p className="text-gray-400 text-sm mt-1 mb-4">
                        Listed below are the key disadvantages of {title}
                    </p>
                </div>

                {/* Disadvantage Items */}
                <div className="divide-y dark:divide-[#2e2e2e]">
                    {data.map((item) => {
                        const cleanHeading = DOMPurify.sanitize(item.heading);
                        const cleanDesc = DOMPurify.sanitize(item.desc);

                        return (
                            <div key={item.id} className="p-4 bg-[#FFF7F7] dark:bg-[#171717]">

                                <h3 className="font-semibold text-sm mb-1 flex items-center gap-1">
                                    <GoDotFill className="text-red-600" />
                                    <span
                                        dangerouslySetInnerHTML={{ __html: cleanHeading }}
                                    />
                                </h3>

                                <p
                                    className="text-gray-400 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: cleanDesc }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DisAdvantages;
