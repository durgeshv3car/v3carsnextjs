'use client'

import { useRouter } from "next/navigation";

function CommonSellUsedCarComponent() {
    const router = useRouter()
    return (
        <>
            <div className="relative rounded-xl inline-block">
                <img
                    src="/model/sell-used-car.png"
                    alt="sell-used-car"
                    className="w-full rounded-xl"
                />

                <div className="absolute bottom-[7px] md:bottom-6 left-[51.2%] -translate-x-3/4">
                    <button
                        onClick={() => { router.push('/sell-used-car') }}
                        className="bg-[#393939] text-primary px-3 py-1 md:px-12 md:py-3 text-[7px] md:text-lg font-semibold rounded md:rounded-lg"
                    >
                        Select Your Car Brand
                    </button>
                </div>
            </div>
        </>
    );
}

export default CommonSellUsedCarComponent;