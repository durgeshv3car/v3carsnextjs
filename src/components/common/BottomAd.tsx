'use client'
import Image from "next/image";

function BottomAd() {
    return (

        <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] px-6 lg:px-10 flex justify-center items-center'>

            <div className="hidden sm:block w-full lg:max-w-[1600px] lg:h-[346px] sm:h-[200px] mx-auto relative">
                <Image
                    src={'/ads/ad1.png'}
                    alt='ad1'
                    fill
                    className='object-cover'
                />
            </div>

            <div className='block sm:hidden w-[293px] aspect-[800/500] relative'>
                <Image
                    src={'/ads/ad1.png'}
                    alt='ad'
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}

export default BottomAd;