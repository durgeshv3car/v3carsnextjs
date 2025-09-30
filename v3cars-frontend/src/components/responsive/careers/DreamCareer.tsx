'use client'

import React from "react";
import Image from "next/image";

const DreamCareer: React.FC = () => {
    return (
        <section>
            {/* Heading Section */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
                <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-sm font-semibold mb-2">
                        Why a career at V3Cars ?
                    </h3>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl/tight font-bold">
                        Your Bridge to a <br className="hidden md:block" />
                        <span className="text-[#FFCC00] font-bold">Dream Career.</span>
                    </h1>
                    <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                        We follow a flat organizational structure, where every team member
                        uses their unique strengths and skills to help the company achieve
                        its goals. We also take time to share our skills and learning among
                        ourselves. Meanwhile, we promote a culture of continuous upskilling
                        to empower our team members so they can also achieve their goals.
                        When every team member grows, V3Cars grows automatically.
                    </p>
                </div>

                {/* Right Side Illustration */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <Image
                        src="/careers/Dream.png"
                        alt="Career Illustration"
                        width={400}
                        height={400}
                        className="w-72 sm:w-80 md:w-[350px] lg:w-[400px] h-auto dark:invert"
                    />
                </div>
            </div>

            {/* Bottom 3 Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white dark:bg-[#171717] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-3">WHAT?</h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                        We are helping car buyers objectively select the most suitable car
                        down to the variant and engine-transmission combo based on their
                        needs, budget and preferences.
                    </p>
                </div>
                <div className="bg-white dark:bg-[#171717] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-3">WHY?</h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                        Car buying can be stressful. Too many cars. Too many variants. A lot
                        of engine-transmission combos. And far too much misinformation. We
                        want to make the car buying journey enjoyable.
                    </p>
                </div>
                <div className="bg-white dark:bg-[#171717] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-3">HOW?</h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                        We are using data to build a car recommendation engine, which will
                        objectively suggest the most suitable car to suit the buyer’s budget
                        and feature preferences while also prioritizing the ownership
                        experience and value-for-money quotient.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DreamCareer;
