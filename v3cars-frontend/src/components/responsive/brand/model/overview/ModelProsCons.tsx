'use client'

import Link from "next/link";
import React from "react";

interface ModelProsConsProps {
    model: string
}

const ModelProsCons: React.FC<ModelProsConsProps> = ({ model }) => {
    const pros = [
        "Improved Road Presence And Best-In-Class Ground Clearance",
        "More Safety Features Now Offered As Standard",
        "Base Model Doesn’t Skimp On Features",
        "Wide Range Of Powertrain Options",
        "Good Set Of Features In Top Variants",
    ];

    const cons = [
        "Low And Mid Variants Lack A Few Must-Have Features",
        "Lower Variant Gets 5-Speed Manual Transmission",
        "Missing features like 360-degree camera, side thorax and curtain airbags",
        "Confusing Variant Lineup",
    ];

    return (
        <div>
            {/* Header */}
            <h2 className="text-lg mb-4">
                Should You Buy the {model}?{" "}
                <span className="font-semibold">Pros & Cons</span>
            </h2>

            {/* Pros & Cons Grid */}
            <div className="bg-white rounded-xl rounded-b-none border border-gray-200 border-b-0 p-2 dark:bg-[#171717] dark:border-[#2E2E2E]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pros */}
                    <div className="border border-green-200 bg-green-50 rounded-md p-4 ">
                        <div className="flex items-center mb-4 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            <h3 className="text-green-600 font-semibold text-base">
                                Nexon Advantages
                            </h3>
                        </div>
                        <ul className="list-none space-y-6">
                            {pros.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-700 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cons */}
                    <div className="border border-red-200 bg-red-50 rounded-md p-4">
                        <div className="flex items-center mb-4 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                            </svg>
                            <h3 className="text-red-600 font-semibold text-base">
                                Nexon Disadvantages
                            </h3>
                        </div>
                        <ul className="list-none space-y-4">
                            {cons.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-700 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className=" bg-[#F2F5F9] text-center border-t border-gray-200 rounded-b-xl dark:bg-[#171717] dark:border-[#2E2E2E]">
                <p className="text-sm py-3 flex items-center justify-center">
                    <span className="font-semibold hidden md:block">Pros & Cons Explained — </span>
                    <Link href="#" className="font-medium hover:underline flex items-center justify-center">
                        View Complete Tata Nexon Assessment
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ModelProsCons;
