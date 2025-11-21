import React from "react";

interface CommonModelTopSectionProps {
    title: string;
    highlight: string;
    description: string;
    others: string;
}

const CommonModelTopSection: React.FC<CommonModelTopSectionProps> = ({ title, highlight, description, others }) => {
    return (
        <div className="relative w-full h-[200px] overflow-hidden flex flex-col justify-end">
            {/* Foreground Content */}
            <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl mb-2">
                    {title}{" "}
                    <span className="text-yellow-400 font-semibold">{highlight}</span>{" "}
                    {others}
                </h1>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CommonModelTopSection;
