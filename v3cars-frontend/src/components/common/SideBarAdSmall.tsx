import Image from "next/image";

function SideBarAdSmall() {
    return (
        <div className="w-[300px] h-[250px] relative">
            <Image
                src="/upcoming/ad.png"
                alt="Ad"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}

export default SideBarAdSmall;