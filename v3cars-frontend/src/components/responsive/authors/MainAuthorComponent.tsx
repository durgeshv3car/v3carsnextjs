'use client'

import { useGetAuthorsQuery } from '@/redux/api/websiteContentApi';
import { IMAGE_URL } from '@/utils/constant';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

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

const MainAuthorComponent: React.FC = () => {
    const router = useRouter();
    const { data: AuthorsData, isLoading, isError } = useGetAuthorsQuery();

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
            .reverse(); // Reverse for latest first
    }, [AuthorsData]);

    if (isLoading) return <p>Loading authors...</p>;
    if (isError) return <p>Failed to load authors.</p>;

    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Authors</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative w-full min-h-[250px] md:min-h-[300px]">
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center dark:invert"
                    style={{ backgroundImage: "url('/author/Vector.png')" }}
                />
                <div className="relative w-full lg:app-container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-6 pt-[60px] md:pt-[100px] px-4">
                        <h2 className="text-3xl/tight md:text-4xl/tight">
                            Meet The <br className="hidden md:block" />
                            <span className='text-yellow-400 font-bold'>Authors Of V3Cars</span>
                            <div className="h-[3px] bg-yellow-400 w-[100px] my-3" />
                        </h2>
                        <p className="text-gray-700 max-w-[500px] dark:text-gray-300 text-sm md:text-base">
                            At V3Cars, our team of experts is dedicated to simplifying car buying for India.
                            Every review, comparison and insight you read is backed by facts, logic and unbiased analysis — delivered by authors who live and breathe cars.
                        </p>
                    </div>
                </div>
            </div>

            {/* Authors List */}
            <section className="w-full lg:app-container mx-auto my-10 px-4">
                <div className="space-y-10">
                    {authors.map((author) => (
                        <div
                            key={author.id}
                            className="flex flex-col lg:flex-row justify-between gap-6 border-b border-gray-200 dark:border-[#2E2E2E] pb-6"
                        >
                            {/* Left: Image + Name + Socials */}
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                                <div className="relative shrink-0 self-center sm:self-start">
                                    <img
                                        src={`${IMAGE_URL}${author.imageUrl}`}
                                        alt={author.imageAltText || author.name}
                                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-sm cursor-pointer"
                                        onClick={() => { router.push(`/authors/${author.id}`) }}
                                    />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <h3
                                            className="text-xl md:text-2xl font-bold w-40 cursor-pointer"
                                            onClick={() => { router.push(`/authors/${author.id}`) }}
                                        >
                                            {author.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{author.designation}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3 text-gray-600">
                                        {author.facebookURL && (
                                            <Image
                                                src="/author/facebook.png"
                                                alt="facebook"
                                                width={28}
                                                height={28}
                                                onClick={() => router.push(author.facebookURL)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {author.instaURL && (
                                            <Image
                                                src="/author/instagram.png"
                                                alt="instagram"
                                                width={28}
                                                height={28}
                                                onClick={() => router.push(author.instaURL)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {author.twitterURL && (
                                            <Image
                                                src="/author/twitter1.png"
                                                alt="twitter"
                                                width={28}
                                                height={28}
                                                onClick={() => router.push(author.twitterURL)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                        {author.linkedInURL && (
                                            <Image
                                                src="/author/linkedin1.png"
                                                alt="linkedin"
                                                width={28}
                                                height={28}
                                                onClick={() => router.push(author.linkedInURL)}
                                                className="cursor-pointer"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Bio */}
                            <div className="flex flex-col justify-between max-w-[600px]">
                                <p className="text-sm md:text-base leading-relaxed mb-3 line-clamp-3">
                                    {author.authorBio}
                                </p>
                                <p className="text-xs md:text-sm text-right text-gray-400">
                                    Added: {new Date(author.addedDateTime).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MainAuthorComponent;
