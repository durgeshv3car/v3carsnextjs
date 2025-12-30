'use client'

export default function RankedCarSkeleton() {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white dark:bg-[#171717] dark:border-[#2e2e2e] p-4 animate-pulse">

            {/* Header */}
            <div className="h-5 w-48 bg-gray-200 dark:bg-[#2e2e2e] rounded mb-4" />

            <div className="flex gap-4">
                {/* Rank Box */}
                <div className="flex-shrink-0 min-w-24 h-40 rounded-lg bg-gray-200 flex items-center justify-center dark:bg-[#2e2e2e]" />

                {/* Car Image */}
                <div className="min-w-64 h-40 rounded-lg bg-gray-200 dark:bg-[#2e2e2e]" />

                {/* Specs */}
                <div className="w-full">
                    <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="h-4 w-32 bg-gray-200 rounded dark:bg-[#2e2e2e]" />
                        <div className="h-4 w-28 bg-gray-200 rounded dark:bg-[#2e2e2e]" />

                        <div className="h-4 w-36 bg-gray-200 rounded dark:bg-[#2e2e2e]" />
                        <div className="h-4 w-24 bg-gray-200 rounded dark:bg-[#2e2e2e]" />

                        <div className="h-4 w-40 bg-gray-200 rounded dark:bg-[#2e2e2e]" />
                        <div className="h-4 w-20 bg-gray-200 rounded dark:bg-[#2e2e2e]" />
                    </div>

                    <div className="mt-4 h-10 w-full rounded-lg bg-gray-200 dark:bg-[#2e2e2e]" />
                </div>
            </div>

            {/* Button */}
        </div>
    );
}
