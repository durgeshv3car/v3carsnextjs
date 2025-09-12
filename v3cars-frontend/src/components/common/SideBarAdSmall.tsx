import Image from "next/image";

function SideBarAdSmall() {
    return (
        <div className="w-[300px] relative aspect-[386/280]">
            <Image
                src="/upcoming/ad.png"
                alt="ad mobile"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}

export default SideBarAdSmall;