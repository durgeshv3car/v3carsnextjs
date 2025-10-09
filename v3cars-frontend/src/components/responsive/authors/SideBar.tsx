'use client'


import { useGetAuthorsQuery } from "@/redux/api/websiteContentApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

function SideBar() {
    const router = useRouter();
    const { data: AuthorsData, isLoading, isError } = useGetAuthorsQuery();

    // Convert API data → Author[]
    const authors: Author[] = useMemo(() => {
        if (!AuthorsData?.rows) return [];
        return AuthorsData.rows
            .map((item: Author) => ({
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
            .reverse(); // show latest first
    }, [AuthorsData]);

    if (isLoading)
        return (
            <div className="w-full rounded-xl bg-white dark:bg-[#171717] p-4 text-center">
                Loading authors...
            </div>
        );

    if (isError)
        return (
            <div className="w-full rounded-xl bg-white dark:bg-[#171717] p-4 text-center">
                Failed to load authors.
            </div>
        );

    return (
        <div className="w-full rounded-xl bg-white dark:bg-[#171717] p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                V3Cars Author
                <p className="h-[3px] bg-yellow-400 w-[65px] mt-1"></p>
            </h2>

            <div className="flex flex-col gap-3">
                {authors.slice(0, 5).map((auth) => (
                    <div
                        key={auth.id}
                        className="flex items-center gap-3 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        onClick={() => router.push(`/authors/${auth.id}`)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={`${IMAGE_URL}${auth.imageUrl}` || "/placeholder.jpg"}
                                    alt={auth.imageAltText || auth.name}
                                    width={70}
                                    height={70}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">{auth.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {auth.designation}
                                </span>
                            </div>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                ))}

                <Link
                    href="/authors"
                    className="text-sm text-center text-blue-600 mt-2 hover:underline"
                >
                    See More Authors
                </Link>
            </div>
        </div>
    );
}

export default SideBar;
