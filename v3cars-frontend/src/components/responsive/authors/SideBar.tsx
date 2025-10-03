'use client'

import Image from "next/image";
import Link from "next/link";


interface Author {
    name: string;
    role: string;
    avatar: string;
}

const otherAuthors: Author[] = Array(6).fill({
    name: "Lakshya Khanna",
    role: "Head of content",
    avatar: "/lakshya.png",
});

function SideBar() {
    return (
        <>
            <div className="w-full rounded-xl bg-white dark:bg-[#171717] p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    V3Cars Author
                    <p className="h-[3px] bg-yellow-400 w-[65px] mt-1"></p>
                </h2>
                <div className="flex flex-col gap-3">
                    {otherAuthors.map((auth, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <Image src={auth.avatar} alt={auth.name} width={70} height={70} className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{auth.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{auth.role}</span>
                                </div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    ))}
                    <Link href="#" className="text-sm text-center text-blue-600 mt-2 hover:underline">See More Author</Link>
                </div>
            </div>
        </>
    );
}

export default SideBar;