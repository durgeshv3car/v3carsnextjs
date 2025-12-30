'use client'

export default function TableSkeleton() {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white dark:bg-[#171717] dark:border-[#2e2e2e] animate-pulse overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#2e2e2e] px-4 py-3">
                <div className="h-6 w-6 rounded bg-gray-300 dark:bg-[#171717]" />
                <div className="h-4 w-56 bg-gray-300 rounded dark:bg-[#171717]" />
            </div>

            {/* Table */}
            <div className="divide-y dark:divide-[#2e2e2e]">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 px-4 py-4">

                        {/* Label */}
                        <div className="h-4 w-48 bg-gray-200 rounded dark:bg-[#2e2e2e]" />

                        {/* Variant 1 */}
                        <div className="h-4 w-32 bg-gray-200 rounded dark:bg-[#2e2e2e]" />

                        {/* Variant 2 (highlight pill) */}
                        <div className="flex justify-start">
                            <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-[#2e2e2e]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Note */}
            <div className="px-4 py-3">
                <div className="h-3 w-3/4 bg-gray-200 rounded dark:bg-[#2e2e2e]" />
            </div>

            {/* Summary */}
            <div className="mx-4 mb-4 rounded-lg bg-gray-100 dark:bg-[#232323] p-3 space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded dark:bg-[#2e2e2e]" />
            </div>
        </div>
    );
}
