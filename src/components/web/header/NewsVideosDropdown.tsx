"use client";
import Image from "next/image";
import { IoArrowForwardOutline } from "react-icons/io5";

const NewsVideosDropdown = () => {
    const sections = [
        {
            title: "News",
            desc: "Stay updated with the latest automotive news.",
            links: ["Latest News", "Auto Expo", "Press Release"],
        },
        {
            title: "Reviews",
            desc: "Discover expert car reviews and comparisons.",
            links: [
                "Expert Review",
                "Comparison Review",
                "Feature Explained",
                "Car Guide",
                "User Review",
            ],
        },
        {
            title: "Videos",
            desc: "Watch in-depth video reviews, comparison, variants explained and more.",
            links: [
                "Review Videos",
                "Compare Videos",
                "Variants Explained Videos",
                "More Videos",
                "Auto Expo Videos",
                "V3Cars YouTube Channel",
            ],
        },
    ];

    return (
        <div className="w-full bg-white shadow-md  z-50 border-b-[5px] rounded-[10px] border-gray-500 h-[50vh]">
            <div className="max-w-[1440px] mx-auto px-6 py-6 flex gap-6 items-start">
                {/* Section Columns */}
                <div className="flex-1 flex gap-6">
                    {sections.map((section, index) => (
                        <div key={index} className="w-[30%]">
                            {/* Yellow Section Header */}
                            <div className="bg-[#FFE167] px-4 py-2 rounded-[10px] font-medium text-[15px] text-gray-900 mb-3  border-b-[3px] border-yellow-500">
                                <div className="flex items-center justify-between">
                                    {section.title}
                                    <IoArrowForwardOutline size={18} />

                                </div>
                                <p className="text-xs text-gray-700 mb-4">{section.desc}</p>
                            </div>

                            <ul className="text-[13px] text-gray-800">
                                {section.links.map((text, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 hover:underline cursor-pointer py-2 border-b border-gray-200 last:border-b-0"
                                    >
                                        <Image
                                            src="/common/v3icon.svg"
                                            alt="icon"
                                            width={16}
                                            height={16}
                                            className="mt-[2px]"
                                        />
                                        <span>{text}</span>
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
