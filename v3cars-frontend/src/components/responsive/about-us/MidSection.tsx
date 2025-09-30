'use client'

import Image from "next/image";

function MidSection() {
    const items = [
        {
            img: '/about-us/review.png',
            title: 'Unbiased Reviews',
            desc: 'Decide with facts',
        },
        {
            img: '/about-us/content.png',
            title: 'Simplified Content',
            desc: 'Clarity through simplicity',
        },
        {
            img: '/about-us/research.png',
            title: 'Research-Driven Insights',
            desc: 'Trusted, transparent',
        },
        {
            img: '/about-us/guide.png',
            title: 'Most Trusted Car Guide',
            desc: 'Indian Car Compas',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center text-center"
                >
                    <Image
                        src={item.img}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="dark:invert"
                    />
                    <p className="font-semibold text-lg sm:text-xl mt-4">{item.title}</p>
                    <p className="text-sm mt-1">{item.desc}</p>
                </div>
            ))}
        </div>
    );
}

export default MidSection;
