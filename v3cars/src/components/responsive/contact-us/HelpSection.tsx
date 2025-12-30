'use client'


import Image from "next/image";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import HelpModel from "./HelpModel";

const HelpSection = () => {
    const [showHelpModel, setShowHelpModel] = useState<number | null>(null)

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between items-start">
                {/* Left Section */}
                <div className="flex">
                    <div className="max-w-md">
                        <h1 className="text-4xl/snug">
                            We’re Here To Help <br />
                            <span className="text-primary font-bold">Just Pick An Option</span>
                        </h1>
                        <span className="w-32 h-1 bg-primary inline-block rounded-sm"></span>
                        <p className="mt-2 text-gray-500">
                            ...that best matches your query and follow the steps.
                        </p>

                        {/* Illustration */}
                        <div className="mt-10 h-[600px] w-[600px] flex justify-center">
                            <Image
                                src="/contact-us/help.png"
                                alt="Illustration"
                                width={700}
                                height={700}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="min-w-[500px] border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                    {options.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-start px-6 pt-8 pb-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                            onClick={() => { setShowHelpModel(item.id) }}
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="w-0.5 h-5 bg-primary inline-block rounded-sm"></span>
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <BiChevronRight className="w-5 h-5 text-gray-500 mt-1" />
                        </div>
                    ))}
                </div>
            </div>

            {showHelpModel && <HelpModel showHelpModel={showHelpModel} onClose={() => setShowHelpModel(null)} />}
        </>
    );
};

export default HelpSection;


const options = [
    {
        id: 1,
        title: "Ask for Our Suggestion",
        description: "Get unbiased guidance on which car suits your needs best.",
    },
    {
        id: 2,
        title: "Request New Content",
        description:
            "Suggest reviews, comparisons or videos you’d like us to cover.",
    },
    {
        id: 3,
        title: "Get Info on a Car Model",
        description:
            "Ask us for details, features, pricing or the best variant to buy.",
    },
    {
        id: 4,
        title: "Report a Website or Tool Issue",
        description:
            "Spotted an error or glitch? Help us improve by reporting it here.",
    },
    {
        id: 5,
        title: "Share a Content or Tool Improvement Idea",
        description:
            "Tell us how we can improve our content or add new tools to help car buyers.",
    },
    {
        id: 6,
        title: "Business & Partnerships",
        description:
            "Connect with us for marketing, branding, influencer collaborations or partnerships.",
    },
    {
        id: 7,
        title: "Something Else",
        description:
            "For any other query not listed above, we’re here to help.",
    },
];