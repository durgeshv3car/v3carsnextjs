'use client'

import Image from "next/image";

interface Author {
    name: string;
    role: string;
    avatar: string;
}

const author: Author = {
    name: "Jagdev Kalsi",
    role: "Head of content",
    avatar: "/jagdev.png",
};

function ProfileSection() {
    return (
        <div className="w-full bg-white dark:bg-[#171717] rounded-xl">
            {/* Banner */}
            <div className="relative h-40 sm:h-60 md:h-72 rounded-t-xl">
                <Image
                    src="/profile-bg.png"
                    alt="Banner"
                    fill
                    className="object-cover rounded-t-xl"
                />
                {/* Profile photo */}
                <div className="absolute -bottom-12 left-4 sm:left-6 w-24 h-24 sm:w-40 sm:h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-[#171717]">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Name & Role */}
            <div className="mt-16 sm:mt-20 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold">{author.name}</h1>
                    <p className="text-gray-500 text-sm sm:text-base">{author.role}</p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mt-4 sm:mt-0">
                    <Image src={'/social/facebook.png'} alt="facebook" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                    <Image src={'/social/twitter.png'} alt="twitter" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                    <Image src={'/social/instagram.png'} alt="instagram" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                    <Image src={'/social/linkedin.png'} alt="linkedin" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
