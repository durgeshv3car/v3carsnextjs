'use client';

import Image from "next/image";

export default function CommonUsefulToolComponent() {
    const tools = [
        "Mileage Calculator",
        "Fuel Cost Calculator",
        "Car Loan EMI Calculator",
        "Fuel Price in India",
        "Buy / Renew Car Insurance",
        "Apply for Car Loan",
        "Car On-Road Price",
        "Sell Used Car",
        "Buy Used Cars",
    ];

    return (
        <div className="w-full border rounded-xl overflow-hidden dark:border-[#2e2e2e]">
            {/* Header */}
            <div className="text-center font-semibold py-4 bg-[#DEE2E6] dark:bg-[#232323]">
                Explore Useful Car Tools
            </div>

            {/* Scrollable List */}
            <div className="max-h-[360px] overflow-y-auto scrollbar-thin-yellow bg-white dark:bg-[#171717]">
                {tools.map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-3 p-4 border-b last:border-none hover:text-primary dark:border-[#2e2e2e] cursor-pointer"
                    >
                        <Image
                            src="/common/v3icon.svg"
                            alt="icon"
                            width={16}
                            height={16}
                            className=" dark:invert group-hover:hidden"
                        />

                        <Image
                            src="/common/v3.png"
                            alt="v3-icon-yellow"
                            width={16}
                            height={16}
                            className="hidden group-hover:block"
                        />
                        <p className="text-[15px]">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
