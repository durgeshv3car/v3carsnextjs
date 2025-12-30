'use client'

export default function FAQSkeleton() {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white dark:bg-[#171717] dark:border-[#2e2e2e] animate-pulse">

            {/* Question Row */}
            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#232323] px-4 py-3 rounded-t-xl">
                <div className="flex items-center gap-3">
                    {/* Q icon */}
                    <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-[#171717]" />
                    {/* Question text */}
                    <div className="h-4 w-64 bg-gray-300 rounded dark:bg-[#171717]" />
                </div>

                {/* Arrow */}
                <div className="h-4 w-4 bg-gray-300 rounded dark:bg-[#171717]" />
            </div>

            {/* Answer */}
            <div className="px-4 py-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded dark:bg-[#2e2e2e]" />
            </div>
        </div>
    );
}
