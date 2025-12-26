'use client';

import Image from "next/image";
import Link from "next/link";

export default function CommonUsefulToolComponent() {
    const tools = [
        {
            name: "Mileage Calculator",
            url: "/mileage-calculator"
        },
        {
            name: "Fuel Cost Calculator",
            url: "/fuel-cost-calculator"
        },
        {
            name: "Car Loan EMI Calculator",
            url: "/car-loan-emi-calculator"
        },
        {
            name: "Fuel Price in India",
            url: "/fuel-price-in-india"
        },
        {
            name: "Buy / Renew Car Insurance",
            url: "/car-insurance-india"
        },
        {
            name: "Apply for Car Loan",
            url: "/apply-car-loan-india"
        },
        {
            name: "Car On-Road Price",
            url: "/car-on-road-price-in-india"
        },
        {
            name: "Sell Used Car",
            url: "/sell-used-car"
        },
        {
            name: "Buy Used Cars",
            url: "https://buysecondhandcars.v3cars.com/buy-cars"
        },
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
                        <Link href={item.url} className="text-[15px]">{item.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
