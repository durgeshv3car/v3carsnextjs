import React from "react";

interface SalesStatsSectionProps {
    title: string;
    links: { name: string; href: string }[];
}

export default function SalesStatsSection({ title, links }: SalesStatsSectionProps) {
    return (
        <div className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#2e2e2e] rounded-xl p-4 mb-4">
            <h3 className="text-base font-semibold mb-2">{title}</h3>
            <div className="text-sm flex flex-wrap">
                {links.map((link, index) => (
                    <React.Fragment key={link.name}>
                        <a
                            href={link.href}
                            className="underline"
                        >
                            Sales statistic for {link.name}
                        </a>
                        {index < links.length - 1 && (
                            <span className="mx-2 text-gray-400">|</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
