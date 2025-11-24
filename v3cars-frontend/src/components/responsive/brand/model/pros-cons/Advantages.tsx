'use client'

import React from "react";
import { GoDotFill } from "react-icons/go";
import DOMPurify from "dompurify";

interface AdvantagesProps {
    title: string;
    data: ProsConsItem[];
}

export interface ProsConsItem {
    id: number;
    heading: string; // HTML
    desc: string; // HTML
    addedDate: string;
}

const Advantages: React.FC<AdvantagesProps> = ({ title, data }) => {

    return (
        <div>
            {/* Header */}
            <div className="border border-green-200 rounded-xl shadow-sm overflow-hidden dark:border-[#2e2e2e]">
                <div className="bg-[#EDFFF3] p-4 dark:bg-[#292929]">
                    <h2 className="text-green-600 font-semibold text-lg">
                        {title} Advantages
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 mb-4">
                        Listed below are the key advantages of {title}
                    </p>
                </div>

                {/* Advantage Items */}
                <div className="divide-y dark:divide-[#2e2e2e]">
                    {data.map((item) => {
                        const cleanHeading = DOMPurify.sanitize(item.heading);
                        const cleanDesc = DOMPurify.sanitize(item.desc);

                        return (
                            <div key={item.id} className="p-4 bg-[#F9FFFB] dark:bg-[#171717]">

                                <h3
                                    className="font-semibold text-sm mb-1 flex items-center gap-1"
                                >
                                    <GoDotFill className="text-green-600" />

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

export default Advantages;
