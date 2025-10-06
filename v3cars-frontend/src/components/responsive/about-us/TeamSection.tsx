'use client'

import { useGetAuthorsQuery } from "@/redux/api/websiteContentApi";
import { IMAGE_URL } from "@/utils/constant";
import Link from "next/link";
import React, { useMemo } from "react";

interface Author {
    moduleId: number;
    id: number;
    name: string;
    designation: string;
    url_slug: string;
    imageUrl: string;
    backgroundImageUrl: string;
    authorBio: string;
    facebookURL: string;
    twitterURL: string;
    instaURL: string;
    linkedInURL: string;
    addedDateTime: string; // ISO date string
    status: number;
    imageAltText: string;
}

export default function TeamSection() {
    const { data: AuthorsData, isLoading, isError } = useGetAuthorsQuery();

    // Convert API data → Author[]
    const authors: Author[] = useMemo(() => {
        if (!AuthorsData?.rows) return [];
        return AuthorsData.rows
            .map((item: any) => ({
                moduleId: item.moduleId,
                id: item.id,
                name: item.name,
                designation: item.designation,
                url_slug: item.url_slug,
                imageUrl: item.imageUrl,
                backgroundImageUrl: item.backgroundImageUrl,
                authorBio: item.authorBio,
                facebookURL: item.facebookURL,
                twitterURL: item.twitterURL,
                instaURL: item.instaURL,
                linkedInURL: item.linkedInURL,
                addedDateTime: item.addedDateTime,
                status: item.status,
                imageAltText: item.imageAltText,
            }))
            .reverse();
    }, [AuthorsData]);

    if (isLoading) return <p>Loading authors...</p>;
    if (isError) return <p>Failed to load authors.</p>;

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
                {authors.map((member, index) => (
                    <div
                        key={member.id}
                        className={`
              border border-gray-300 rounded-xl overflow-hidden shadow-sm flex flex-col p-3 gap-6
              ${index % 2 !== 0 ? "translate-y-20 bg-[#F2FFF4]" : "bg-[#FFFFEC]"}
            `}
                    >
                        <div className="space-y-2">
                            <h3 className="font-bold text-xl text-black">{member.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{member.authorBio}</p>
                        </div>
                        <div>
                            <img
                                src={`${IMAGE_URL}${member.imageUrl}`}
                                alt={member.imageAltText || member.name}
                                className="w-full h-full object-cover flex-grow rounded-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer link */}
            <div className="mt-28">
                <Link
                    href="/authors"
                    className="font-medium inline-flex items-center underline"
                >
                    Explore V3Cars Author Profiles{" "}
                    <span className="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
}
