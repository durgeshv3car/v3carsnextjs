"use client";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

const NewsVideosDropdown = () => {
    const sections = [
        {
            title: "News",
            desc: "Stay updated with the latest automotive news.",
            links: [
                { text: "Latest News", url: "/news" },
                { text: "Auto Expo", url: "/news/auto-expo" },
                { text: "Press Release", url: "/latest-press-release" }
            ],
        },
        {
            title: "Reviews",
            desc: "Discover expert car reviews and comparisons.",
            links: [
                { text: "Expert Review", url: "/car-expert-reviews" },
                { text: "Comparison Review", url: "/comparison" },
                { text: "Feature Explained", url: "/features-explained" },
                { text: "Car Guide", url: "/car-guide" },
                { text: "User Review", url: "/car-user-review" },
            ],
        },
        {
            title: "Videos",
            desc: "Watch in-depth video reviews, comparison, variants explained and more.",
            links: [
                { text: "Review Videos", url: "/car-review-videos" },
                { text: "Compare Videos", url: "/car-comparison-videos" },
                { text: "Variants Explained Videos", url: "/variants-explained-videos" },
                { text: "More Videos", url: "/other-videos" },
                { text: "Auto Expo Videos", url: "/auto-expo-videos" },
                { text: "V3Cars YouTube Channel", url: "https://www.youtube.com/c/V3cars-Official" },
            ],
        },
    ];


    return (
        <div className="w-full bg-white dark:bg-[#171717] shadow-md border-b-[5px] rounded-b-[10px] border-gray-500 dark:border-[#2E2E2E] h-full px-10">
            <div className="app-container mx-auto py-6 flex gap-6 items-start">
                {/* Section Columns */}
                <div className="flex-1 flex gap-6 h-full">
                    {sections.map((section, index) => (
                        <div key={index} className="w-[30%] ">
                            {/* Yellow Section Header */}
                            <div className="bg-[#FFE167] px-4 py-2 rounded-[10px] font-medium text-[15px] text-gray-900 mb-3  border-b-[3px] border-yellow-500">
                                <div className="flex items-center justify-between">
                                    {section.title}
                                    <IoArrowForwardOutline size={18} />

                                </div>
                                <p className="text-xs text-gray-700 mb-4">{section.desc}</p>
                            </div>

                            <ul className="text-[13px]">
                                {section.links.map((text, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 hover:underline cursor-pointer py-2 border-b border-gray-200 dark:border-[#2E2E2E] last:border-b-0"
                                    >
                                        <Image
                                            src="/common/v3icon.svg"
                                            alt="icon"
                                            width={16}
                                            height={16}
                                            className="mt-[2px] dark:invert"
                                        />
                                        <Link href={text.url}>{text.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Ad Box */}
                    <div className=" bg-gray-500 h-[250px] rounded-md flex items-center justify-center p-3 w-[30%]">

                    </div>
                </div>


            </div>
        </div>
    );
};

export default NewsVideosDropdown;
