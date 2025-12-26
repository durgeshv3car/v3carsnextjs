'use client'

import { useGetTermsOfUsesQuery } from "@/redux/api/websiteContentApi";
import Link from "next/link";
import React from "react";

interface PageContent {
    id: number;
    moduleId: number;
    title: string;
    description: string; // Raw HTML content
    createdAt: string;
    updatedAt: string;
}

export default function TermsOfUse() {
    const { data: termsOfUsesData, isLoading, isError } = useGetTermsOfUsesQuery();

    const termsOfUses: PageContent[] = termsOfUsesData?.rows ?? [];

    if (isLoading) {
        return (
            <div className="text-center py-20 text-white bg-black">
                Loading Terms of Use...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500 bg-black">
                Failed to load Terms of Use.
            </div>
        );
    }

    const term = termsOfUses[0];

    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">Terms of Uses</span>
                    </div>
                </div>
            </div>

            <div>
                {/* Header */}
                <div className="relative p-4 flex items-center min-h-[225px] justify-between overflow-hidden bg-black border-b-[12px] border-[#FFCC00] mt-[1px]">
                    <div
                        className="absolute inset-0 top-0 right-0 bg-no-repeat bg-right"
                        style={{ backgroundImage: "url('/term/image.png')" }}
                    />
                    <h1 className="relative z-10 text-2xl font-semibold w-full lg:app-container mx-auto text-white">
                        {term ? term.title : "Terms of Use"}
                    </h1>
                </div>

                {/* Content */}
                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto my-6 space-y-6">
                        {termsOfUses.length > 0 ? (
                            termsOfUses.map((term) => {
                                // Sanitize the description by removing inline color styles
                                const sanitizedDescription = term.description.replace(
                                    /<(?!a\b)([^>]+?)\sstyle="([^"]*?)color:[^;"]+;?([^"]*?)"/gi,
                                    '<$1 style="$2$3"'
                                );

                                return (
                                    <div key={term.id}>
                                        <div
                                            className="prose prose-invert max-w-none text-base leading-loose"
                                            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No terms found.</p>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
