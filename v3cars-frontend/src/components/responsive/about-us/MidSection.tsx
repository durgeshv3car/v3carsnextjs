'use client'

import Image from "next/image";
import { BiAward, BiCheckCircle } from "react-icons/bi";
import { FiBarChart2, FiFileText } from "react-icons/fi";


function MidSection() {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex flex-col max-w-40 items-center text-center">
                    <Image
                        src={'/about-us/review.png'}
                        alt="review"
                        width={60}
                        height={60}
                        className="dark:invert"
                    />
                    <p className="font-semibold text-xl mt-6">Unbiased Reviews</p>
                    <p className="text-sm mt-1">Decide with facts</p>
                </div>
                <div className="flex flex-col max-w-40 items-center text-center">
                    <Image
                        src={'/about-us/content.png'}
                        alt="review"
                        width={60}
                        height={60}
                        className="dark:invert"
                    />
                    <p className="font-semibold text-xl mt-6">Simplified Content</p>
                    <p className="text-sm mt-1">Clarity through simplicity</p>
                </div>
                <div className="flex flex-col max-w-44 items-center text-center">
                    <Image
                        src={'/about-us/research.png'}
                        alt="review"
                        width={60}
                        height={60}
                        className="dark:invert"
                    />
                    <p className="font-semibold text-xl mt-6">Research-Driven Insights</p>
                    <p className="text-sm mt-1">Trusted, transparent</p>
                </div>
                <div className="flex flex-col max-w-40 items-center text-center">
                    <Image
                        src={'/about-us/guide.png'}
                        alt="review"
                        width={60}
                        height={60}
                        className="dark:invert"
                    />
                    <p className="font-semibold text-xl mt-6">Most Trusted Car Guide</p>
                    <p className="text-sm mt-1">Indian Car Compas</p>
                </div>
            </div>
        </>
    );
}

export default MidSection;