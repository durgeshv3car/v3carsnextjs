'use client'

export default function TopBrandsSkeleton() {
    return (
        <>
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="h-24 rounded-xl border border-gray-200 bg-gray-300 dark:bg-[#292929] flex items-center justify-center animate-pulse dark:border-[#2e2e2e]"
                >
                    {/* Logo placeholder */}
                    {/* <div className="h-8 w-24 bg-gray-300 rounded" /> */}
                </div>
            ))}
        </>
    );
}
