import Image from "next/image";

function SideBarAdSmall() {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[300px] h-[250px] relative">
                <Image
                    src="/upcoming/ad.png"
                    alt="Ad"
                    fill
                    className="object-contain rounded-lg"
                    priority
                />
            </div>
        </div>
    );
}

export default SideBarAdSmall;