'use client'

import React from "react";
import { ReactNode } from "react";
import { SlEnergy } from "react-icons/sl";

interface ToolsCommonSectionProps {
    title: ReactNode;
    desc: string
    url?: string
}

export default function ToolsCommonSection({ title, desc, url }: ToolsCommonSectionProps) {
    return (
        <div className='w-full'>
            <div className='px-4 xl:px-10 py-12'>
                <div className="w-full lg:app-container mx-auto space-y-5 text-center">
                    <h1 className="text-4xl font-semibold mb-2">{title}</h1>
                    <p className="text-center text-gray-400 mb-6">
                        {desc}
                        <span className="text-black"> More</span>
                    </p>

                    {
                        url === "/car-loan-emi-calculator" && (
                            <p className="flex items-center justify-center text-xs gap-1 text-gray-400">
                                <SlEnergy className="text-[#FF7300]" />
                                Real-time EMI calculations with interactive sliders
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
