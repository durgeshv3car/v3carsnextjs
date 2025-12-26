'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export interface LoanDetailCard {
    title: string;
    desc: string;
    img: string;   // because you are passing JSX (<div>...</div>)
    bg: string;        // background color (hex, rgb, etc.)
    url: string;
}

interface CommonQuickLinkComponentProps {
    data: LoanDetailCard[]
}

export default function CommonQuickLinkComponent({ data }: CommonQuickLinkComponentProps) {
    const router = useRouter()

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data && data.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.bg} border rounded-xl p-6 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition cursor-pointer`}
                        onClick={() => { router.push(`${item.url}`) }}

                    >
                        <div className="flex justify-center items-center flex-grow mb-4">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={60}
                                height={60}
                                className="w-full h-full"
                            />
                        </div>

                        <div>
                            <p className="font-semibold mb-1 text-black">{item.title}</p>
                            <p className="text-sm text-gray-400 leading-snug">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
