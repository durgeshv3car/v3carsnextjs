'use client'

export default function CarCardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:bg-black dark:border-[#2e2e2e] overflow-hidden animate-pulse">

            {/* Image Skeleton */}
            <div className="h-48 w-full bg-gray-200 dark:bg-[#292929]" />

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Brand */}
                <div className="h-4 w-24 bg-gray-200 rounded dark:bg-[#292929]" />

                {/* Title */}
                <div className="h-5 w-40 bg-gray-200 rounded dark:bg-[#292929]" />

                {/* Specs */}
                <div className="flex justify-between">
                    <div className="h-4 w-14 bg-gray-200 rounded dark:bg-[#292929]" />
                    <div className="h-4 w-14 bg-gray-200 rounded dark:bg-[#292929]" />
                    <div className="h-4 w-14 bg-gray-200 rounded dark:bg-[#292929]" />
                </div>

                {/* Price */}
                <div className="h-6 w-36 bg-gray-200 rounded dark:bg-[#292929]" />

                {/* Button */}
                <div className="h-12 w-full bg-gray-200 rounded-xl dark:bg-[#292929]" />
            </div>
        </div>
    );
}
