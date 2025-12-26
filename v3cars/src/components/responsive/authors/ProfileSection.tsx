'use client'

import { useGetAuthorDetailsQuery } from "@/redux/api/websiteContentApi";
import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import { useParams } from "next/navigation";

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

function ProfileSection() {
    const { details } = useParams();
    const authorId = Number(details);

    const { data: authorsDetailsData, isLoading, isError } = useGetAuthorDetailsQuery({ authorId });
    const authorsData: Author[] = authorsDetailsData?.rows ?? [];

    const author = authorsData[0];

    if (isLoading) return <p className="text-center py-10">Loading author details...</p>;
    if (isError || !author) return <p className="text-center py-10">Author details not found.</p>;

    return (
        <>
            <div className="w-full bg-white dark:bg-[#171717] rounded-xl">
                {/* Banner */}
                <div className="relative h-40 sm:h-60 md:h-72 rounded-t-xl">
                    <Image
                        src={author.backgroundImageUrl ? `${IMAGE_URL}${author.backgroundImageUrl}` : '/profile-bg.png'}
                        alt="Banner"
                        fill
                        className="object-cover rounded-t-xl"
                    />
                    {/* Profile photo */}
                    <div className="absolute -bottom-12 left-4 sm:left-6 w-24 h-24 sm:w-40 sm:h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-[#171717]">
                        <Image
                            src={`${IMAGE_URL}${author.imageUrl}`}
                            alt={author.imageAltText || author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Name & Role */}
                <div className="mt-16 sm:mt-20 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold">{author.name}</h1>
                        <p className="text-gray-500 text-sm sm:text-base">{author.designation}</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-4 sm:mt-0">
                        {author.facebookURL && (
                            <a href={author.facebookURL} target="_blank" rel="noopener noreferrer">
                                <Image src={'/social/facebook.png'} alt="facebook" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                            </a>
                        )}
                        {author.twitterURL && (
                            <a href={author.twitterURL} target="_blank" rel="noopener noreferrer">
                                <Image src={'/social/twitter.png'} alt="twitter" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                            </a>
                        )}
                        {author.instaURL && (
                            <a href={author.instaURL} target="_blank" rel="noopener noreferrer">
                                <Image src={'/social/instagram.png'} alt="instagram" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                            </a>
                        )}
                        {author.linkedInURL && (
                            <a href={author.linkedInURL} target="_blank" rel="noopener noreferrer">
                                <Image src={'/social/linkedin.png'} alt="linkedin" width={32} height={32} className="sm:w-10 sm:h-10 cursor-pointer" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-[#171717] p-4 mt-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">About</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {author.authorBio}
                </p>
            </div>
        </>
    );
}

export default ProfileSection;
