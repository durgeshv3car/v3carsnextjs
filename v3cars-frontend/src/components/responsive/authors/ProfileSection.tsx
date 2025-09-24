'use client'


import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiX } from "react-icons/fi";

interface Author {
    name: string;
    role: string;
    avatar: string;
}

const author: Author = {
    name: "Jagdev Kalsi",
    role: "Head of content",
    avatar: "/jagdev.png", // replace with your profile image path
};


function ProfileSection() {
    return (
        
            <div className="w-full bg-white rounded-xl">
                {/* Banner */}
                <div className="relative h-[300px] rounded-t-xl">
                    <Image
                        src="/profile-bg.png" // replace with your banner
                        alt="Banner"
                        fill
                        className="object-cover rounded-xl"
                    />
                    {/* Profile photo */}
                    <div className="absolute -bottom-12 left-6 w-60 h-60 rounded-full overflow-hidden">
                        <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                    </div>
                </div>

                {/* Name & Role */}
                <div className=" mt-10 p-6 flex items-center justify-between">
                    <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{author.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{author.role}</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-4">
                        <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF size={20} /></a>
                        <a href="#" className="text-black hover:text-gray-700"><FiX size={20} /></a>
                        <a href="#" className="text-pink-500 hover:text-pink-600"><FaInstagram size={20} /></a>
                        <a href="#" className="text-blue-500 hover:text-blue-700"><FaLinkedin size={20} /></a>
                    </div>
                </div>
            </div>
        
    );
}

export default ProfileSection;