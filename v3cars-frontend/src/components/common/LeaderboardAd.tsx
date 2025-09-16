import Image from "next/image";

function LeaderboardAd() {
    return (
        <div className="bg-[#D9D9D9] dark:bg-[#262626] flex justify-center items-center py-4">
            <div className="w-full max-w-[728px] h-[90px] mx-auto relative">
                <Image
                    src="/ads/ad1.png"
                    alt="Ad image"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}

export default LeaderboardAd;