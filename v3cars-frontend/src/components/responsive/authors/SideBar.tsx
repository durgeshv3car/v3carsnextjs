'use client'

import Image from "next/image";


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
            <div className="w-full rounded-xl bg-white p-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">V3Cars Author</h2>
                <div className="flex flex-col gap-3">
                    {otherAuthors.map((auth, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <Image src={auth.avatar} alt={auth.name} width={70} height={70} className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">{auth.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{auth.role}</span>
                            </div>
                        </div>
                    ))}
                    <a href="#" className="text-sm text-blue-600 mt-2 hover:underline">See More Author</a>
                </div>
            </div>
        </>
    );
}

export default SideBar;