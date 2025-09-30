'use client'

import React, { useState } from "react";
import { BiCalendar, BiMapPin } from "react-icons/bi";

interface Job {
    title: string;
    reviews: string;
    exp: string;
    location: string;
    description: string;
    tags: string[];
    womenOnly: boolean;
    posted: string;
}

const JobListing: React.FC = () => {
    const tabs = ["UI/UX Developer", "Fullstack Developer", "PHP Developer"];

    const jobData: Record<string, Job[]> = {
        "UI/UX Developer": [
            {
                title: "UI/UX Developer",
                reviews: "454111 Reviews",
                exp: "4-9 Yrs",
                location: "Hyderabad, Chennai",
                description:
                    "Hiring for UI/UX Developer with experience range 1 to 18 YearsMandatory ...",
                tags: ["UI/UX", "User Interfaces", "Graphic"],
                womenOnly: true,
                posted: "3 days ago",
            },
            {
                title: "Senior UI Designer",
                reviews: "21123 Reviews",
                exp: "5-10 Yrs",
                location: "Bangalore",
                description:
                    "Looking for a Senior UI Designer with strong experience in Figma and Adobe XD...",
                tags: ["UI/UX", "Figma", "Design"],
                womenOnly: false,
                posted: "1 week ago",
            },
        ],
        "Fullstack Developer": [
            {
                title: "Fullstack Developer",
                reviews: "87612 Reviews",
                exp: "3-8 Yrs",
                location: "Pune, Remote",
                description:
                    "Hiring for MERN stack developer with good knowledge of Next.js and microservices...",
                tags: ["Node.js", "React", "Next.js"],
                womenOnly: false,
                posted: "5 days ago",
            },
        ],
        "PHP Developer": [
            {
                title: "PHP Developer",
                reviews: "54321 Reviews",
                exp: "2-6 Yrs",
                location: "Delhi, Noida",
                description:
                    "Hiring for PHP Developer with strong experience in Laravel and MySQL...",
                tags: ["PHP", "Laravel", "MySQL"],
                womenOnly: true,
                posted: "2 days ago",
            },
        ],
    };

    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section>
            {/* Tabs */}
            <div className="flex gap-3 mb-10 overflow-x-scroll scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-nowrap border transition ${activeTab === tab
                                ? "bg-[#171717] text-white dark:border-[#2E2E2E]"
                                : "bg-white dark:bg-black dark:border-[#2E2E2E] hover:bg-gray-100"
                            } font-medium`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobData[activeTab].map((job, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-[#171717] rounded-2xl shadow-xl p-6 flex flex-col gap-3"
                    >
                        {/* Job Title */}
                        <div>
                            <h2 className="text-lg font-semibold">{job.title}</h2>
                            <p className="text-sm">{job.reviews}</p>
                        </div>

                        {/* Job Info */}
                        <div className="flex items-center gap-5 text-sm">
                            <span className="flex items-center gap-1">
                                <BiCalendar size={16} /> {job.exp}
                            </span>
                            <span className="flex items-center gap-1">
                                <BiMapPin size={16} /> {job.location}
                            </span>
                        </div>

                        {/* Job Description */}
                        <p className="text-sm leading-snug">
                            {job.description}
                        </p>

                        {/* Tags */}
                        <div className="text-xs flex gap-3 flex-wrap">
                            {job.tags.map((tag, i) => (
                                <span key={i}>{tag}</span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                            {job.womenOnly && (
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                                    For women
                                </span>
                            )}
                            <span>{job.posted}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JobListing;
