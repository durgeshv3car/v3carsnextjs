'use client'

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
        return AboutDetailsData.rows.map((item: any) => ({
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

    const about = aboutDetails[0];

    return (
        <div className="space-y-6">
            {/* Render HTML description safely */}
            {about?.description ? (
                <div
                    className="text-xl/loose"
                    dangerouslySetInnerHTML={{ __html: about.description }}
                />
            ) : (
                <p>No content available.</p>
            )}
        </div>
    );
}

export default TrustedCarGuide;
