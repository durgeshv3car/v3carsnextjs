'use client';

import React from "react";
import { ReactNode } from "react";

export interface LoanDetailCard {
  title: string;
  desc: string;
  icon: ReactNode;   // because you are passing JSX (<div>...</div>)
  bg: string;        // background color (hex, rgb, etc.)
}

interface CommonHowItWorkCardProps {
    data: LoanDetailCard[]
    title: string
}

export default function CommonHowItWorkCard({ title, data }: CommonHowItWorkCardProps) {
    return (
        <div>
            <h2 className="text-2xl mb-4">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {data.map((step, index) => (
                    <div
                        key={index}
                        className="rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between"
                        style={{ backgroundColor: step.bg }}
                    >
                        <div className="p-6 flex flex-col justify-between items-center gap-6">
                            <h3 className="text-lg text-black">Step {index + 1}</h3>

                            <p className="font-bold text-black text-center">{step.title}</p>

                            <div className="flex justify-center">{step.icon}</div>
                        </div>

                        <p className="bg-white text-black p-4 text-center m-0.5 rounded-b-xl">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
