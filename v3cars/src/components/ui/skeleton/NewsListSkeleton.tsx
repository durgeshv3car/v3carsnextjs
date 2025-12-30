'use client'

export default function NewsListSkeleton() {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between gap-4 px-4 py-3 border-b last:border-b-0"
                >
                    {/* Left content */}
                    <div className="flex-1 space-y-2">
                        {/* Date */}
                        <div className="h-3 w-20 bg-gray-200 rounded" />

                        {/* Title */}
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                    </div>

                    {/* Thumbnail */}
                    <div className="h-14 w-24 rounded-lg bg-gray-200 flex-shrink-0" />
                </div>
            ))}
        </div>
    );
}
