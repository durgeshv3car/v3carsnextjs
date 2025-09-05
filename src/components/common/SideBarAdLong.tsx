import Image from "next/image";

function SideBarAdLong() {
    return (
        <div className="h-[648px] bg-[#D9D9D9] dark:bg-[#262626] flex justify-center items-center">
            <Image
                src="/upcoming/ad.png"
                alt="Ad image"
                width={302}
                height={600}
                className="rounded-xl object-cover"
                priority
            />
        </div>
    );
}

export default SideBarAdLong;