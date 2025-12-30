'use client'

export default function BrandListSkeleton() {
    return (
        <div className="divide-y animate-pulse dark:divide-[#2e2e2e]">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2">
                    <div className="h-8 w-full bg-gray-200 dark:bg-[#2e2e2e] rounded" />
                </div>
            ))}
        </div>
    );
}
