'use client'

import Image from "next/image";

function TopBanner() {
    return (
        <>
            <div className="lg:hidden min-h-[49px] mb-4">
                <img
                    src={"/review-video-banner.png"}
                    alt="review-video-banner"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex items-start lg:items-center gap-4 h-auto lg:h-[200px] border-b pb-2 w-full dark:border-[#2E2E2E]">
                {/* Logo */}
                <div className="flex items-center justify-center lg:w-[160px] lg:h-[160px] p-5 bg-black dark:bg-[#171717] rounded-full border dark:border-[#2E2E2E]">
                    <Image
                        src="/logo/v3.svg" // Replace with actual image path
                        alt="V3Cars Logo"
                        width={160}
                        height={160}
                    />
                </div>

                {/* Channel Info */}
                <div className="flex flex-col gap-1 lg:gap-3">
                    <h1 className="lg:text-3xl font-semibold">V3Cars - Car Review Videos</h1>
                    <div className="text-xs lg:text-sm">
                        @V3cars-Official &nbsp;•&nbsp; 527K subscribers &nbsp;•&nbsp; 1.1K videos
                    </div>
                    <p className="text-xs lg:text-sm">
                        At V3Cars, our sole aim is to develop meaningful content for car buyers in India. Our research-based...
                    </p>

                    {/* Subscribe Button */}
                    <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 w-fit rounded-full text-xs lg:text-sm font-semibold hover:bg-gray-800">
                        Subscribe
                    </button>
                </div>

            </div>
        </>
    );
}

export default TopBanner;