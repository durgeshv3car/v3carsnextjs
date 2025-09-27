'use client'

import React from "react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    borderColor: string;
}

const teamMembers: TeamMember[] = [
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image1.png", borderColor: "bg-[#FFFFEC]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image2.png", borderColor: "bg-[#F2FFF4]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image3.png", borderColor: "bg-[#FFF4FB]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image4.png", borderColor: "bg-[#FFFFEC]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image5.png", borderColor: "bg-[#D5F8FB]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image6.png", borderColor: "bg-[#F2FFF4]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image27.png", borderColor: "bg-[#FFFFEC]" },
    { name: "Jagdev Kalsi", role: "Reference site about Lorem Ipsum, giving information on its origins, ", image: "/about-us/image8.png", borderColor: "bg-[#D5F8FB]" },
];

export default function TeamSection() {
    return (
        <div>
            {/* Heading */}
            <div className="text-left mb-10">
                <h2 className="text-2xl/relaxed lg:text-3xl/relaxed">
                    The <span className="font-bold">Team Dedicated</span> to Making Every Car Decision <br />
                    Simpler for You
                </h2>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className={`
                            ${member.borderColor} border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col p-3 gap-6
                            ${index % 2 !== 0 ? "translate-y-20" : ""}
                        `}
                    >
                        <div className="space-y-4">
                            <h3 className="font-bold text-xl w-20 text-black">{member.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{member.role}</p>
                        </div>
                        <div>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover flex-grow rounded-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer link */}
            <div className="mt-28">
                <a
                    href="#"
                    className="font-medium inline-flex items-center underline"
                >
                    Explore V3Cars Author Profiles{" "}
                    <span className="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    );
}
