'use client'

import React, { useState } from "react";

export default function ImageDisplay() {
    const images = [
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
        "/model/tata.png",
    ];

    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-1">Tata Nexon Image Display</h2>
            <p className="text-gray-400 mb-4">Here the first FAQ will always be open and the rest will act as dropdowns</p>

            <div className="border rounded-2xl p-3 bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                <div className="flex gap-4">
                    <div className="flex-1 flex justify-center items-center rounded-xl overflow-hidden bg-gray-100 border dark:bg-[#171717] dark:border-[#2e2e2e]">
                        <img src={images[current]} alt="Main" className="w-full h-auto object-contain" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-1/4 border rounded-xl p-3 bg-gray-100 dark:bg-[#171717] dark:border-[#2e2e2e]">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`rounded-xl overflow-hidden border ${current === idx ? "border-blue-500" : "border dark:border-[#2e2e2e]"
                                    }`}
                            >
                                <img src={img} className="w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button onClick={prev} className="p-2 rounded-full border hover:bg-gray-100 dark:border-[#2e2e2e] dark:hover:bg-[#2e2e2e]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button onClick={next} className="p-2 rounded-full border hover:bg-gray-100 dark:border-[#2e2e2e] dark:hover:bg-[#2e2e2e]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
