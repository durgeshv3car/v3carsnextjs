'use client'

export default function VideoSideBarSkeleton() {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 animate-pulse">

                    {/* Thumbnail */}
                    <div className="relative h-14 w-24 rounded-md bg-gray-300 dark:bg-[#232323] flex-shrink-0">
                        {/* play icon */}
                        <div className="absolute inset-0 flex items-center justify-center" />
                    </div>

                    {/* Title */}
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-full bg-gray-300 dark:bg-[#232323] rounded" />
                        <div className="h-4 w-5/6 bg-gray-300 dark:bg-[#232323] rounded" />
                    </div>
                </div>
            ))}
        </>
    );
}
