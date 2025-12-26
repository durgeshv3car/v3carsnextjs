'use client';

import { useGetAboutDetailsQuery } from "@/redux/api/websiteContentApi";
import { useMemo } from "react";

interface PageContent {
    id: number;
    moduleId: number;
    title: string;
    description: string; // Raw HTML content
    createdAt: Date;
    updatedAt: Date;
}

function TrustedCarGuide() {
    const { data: AboutDetailsData, isLoading, isError } = useGetAboutDetailsQuery();

    const aboutDetails: PageContent[] = useMemo(() => {
        if (!AboutDetailsData?.rows) return [];
        return AboutDetailsData.rows.map((item: PageContent) => ({
            id: item.id,
            moduleId: item.moduleId,
            title: item.title,
            description: item.description,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
        }));
    }, [AboutDetailsData]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load About details.</p>;

    return (
        <div className="space-y-6">
            {/* Render HTML description safely */}
            {aboutDetails.length > 0 ? (
                aboutDetails.map((about, index) => {
                    // ✅ Remove inline color styles except those on <a> tags
                    const sanitizedDescription = about.description.replace(/color:\s*[^;"]+;?/gi, '');

                    return (
                        <div
                            key={index}
                            className="prose prose-invert max-w-none text-xl/loose"
                            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                        />
                    );
                })
            ) : (
                <p>No content available.</p>
            )}
        </div>
    );
}

export default TrustedCarGuide;
