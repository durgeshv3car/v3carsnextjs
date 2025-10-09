'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
    /** Top banner image path (full-width image like the 2nd screenshot) */
    bannerSrc?: string;
    /** Optional submit handler */
    onGetQuote?: (regNo: string) => void;
};

export default function InsuranceQuoteSection({
    bannerSrc = '/car-insurance/man.png',
    onGetQuote,
}: Props) {
    const [reg, setReg] = useState<string>("");
    const router = useRouter();

    const carNumberRegex = /^[A-Z]{2}-\d{2}-[A-Z]-\d{4}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.toUpperCase();
        value = value.replace(/[^A-Z0-9]/g, ""); // remove invalid chars

        // limit length to 9 characters (without dashes)
        if (value.length > 9) value = value.slice(0, 9);

        // insert dashes at correct positions: XX-00-X-0000
        if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
        if (value.length > 7) value = value.slice(0, 7) + "-" + value.slice(7);

        setReg(value);

        // show error if complete but invalid
        if (value.length === 13 && !carNumberRegex.test(value)) {
            alert("Invalid car number format");
        }
    };

    const submit = () => {
        if (!reg.trim()) return;
        if (!carNumberRegex.test(reg)) {
            alert("Please enter a valid car number");
            return;
        }
        router.push(
            `https://v3cars.coverfox.com/car-insurance/?fs=FALLBACK_MAKE&ft=flf&vehicle_reg_no=${reg}`
        );
    };

    return (

        <section className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">

            {/* Top banner: ONLY an image */}
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10">
                <Image
                    src={bannerSrc}
                    alt="Save upto 85%* on Car Insurance"
                    width={1600}
                    height={400}
                    priority
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Quote card */}
            <div className="mt-8 rounded-2xl p-6 md:p-10">
                <h2 className="text-center text-[22px] md:text-[26px] font-semibold text-neutral-800 dark:text-neutral-100">
                    Enter Your Car Registration Details
                </h2>

                {/* Input + Button */}
                <div className="mt-6 flex justify-center">
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full max-w-2xl flex overflow-hidden rounded-xl ring-1 ring-neutral-300 dark:ring-neutral-700 bg-white dark:bg-neutral-800">
                            <input
                                value={reg}
                                onChange={handleChange}
                                placeholder="Enter your car number"
                                className="flex-1 h-12 md:h-14 px-4 text-sm md:text-base outline-none bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-400"
                            />
                            <button
                                onClick={submit}
                                className="h-12 md:h-14 px-5 md:px-7 bg-[#ffcf2d] text-black font-semibold hover:brightness-95 active:translate-y-[1px]"
                            >
                                Get quote
                            </button>
                        </div>

                        {/* OR divider */}
                        <div className="w-full flex items-center gap-2 my-6">
                            <span className="h-px flex-1 bg-[#f0d15a] dark:bg-yellow-600" />
                            <span className="text-[#f0b400] dark:text-yellow-500 text-2xl font-semibold">or</span>
                            <span className="h-px flex-1 bg-[#f0d15a] dark:bg-yellow-600" />
                        </div>

                        {/* Yellow CTA card (no icons) */}
                        <button
                            className="w-full max-w-2xl text-left rounded-xl bg-[#ffc627] text-black dark:text-black px-4 py-4 md:py-5 hover:brightness-95"
                            onClick={() => onGetQuote?.('NEW_CAR')}
                        >
                            <div className="font-semibold">Looking to insure brand new car?</div>
                            <div className="text-sm opacity-90 mt-0.5">View plans ›</div>
                        </button>
                    </div>
                </div>
            </div>

        </section>

    );
}
