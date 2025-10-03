'use client'

import React from "react";
import Image from "next/image";

const HiringBanner: React.FC = () => {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Left Illustration */}
        <div className="w-[150px] md:w-[200px] flex-shrink-0">
          <Image
            src="/careers/hireing.png"
            alt="Left Illustration"
            width={160}
            height={160}
            className="w-full h-auto dark:invert"
          />
        </div>

        {/* Center Text */}
        <div className="flex justify-between gap-4">
          <h2 className="text-xl font-semibold">
            WE ARE
          </h2>
          <h1 className="text-2xl md:text-5xl font-bold text-yellow-400">
            HIRING
          </h1>
          <p className="mt-2 text-start">
            Let’s <span className="font-bold">Work</span> Together <br />
            & Explore <span className="font-bold">Opportunities</span>
          </p>
        </div>

        {/* Right Illustration */}
        <div className="w-[150px] md:w-[200px] flex-shrink-0">
          <Image
            src="/careers/hireing1.png"
            alt="Right Illustration"
            width={160}
            height={160}
            className="w-full h-auto dark:invert"
          />
        </div>
      </div>
    </section>
  );
};

export default HiringBanner;
