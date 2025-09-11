'use client'
import Image from "next/image";

function BottomAd() {
  return (
    <div className="bg-[#B3B3B3] dark:bg-[#262626] py-4 flex justify-center items-center">

      {/* Desktop / Tablet Ad */}
      <div className="hidden sm:block w-full h-[280px] mx-auto relative ">
        <Image
          src="/ads/ad1.png"
          alt="ad1"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Mobile Ad */}
      <div className="block sm:hidden w-[300px] h-[250px] relative">
        <Image
          src="/upcoming/ad.png"
          alt="ad mobile"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default BottomAd;
