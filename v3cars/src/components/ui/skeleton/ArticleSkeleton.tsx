'use client'

export default function ArticleSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
            <div className="relative h-[300px] w-full lg:w-[500px] bg-gray-200 dark:bg-[#232323] rounded-lg" />

            {/* RIGHT : Content */}
            <div className="flex-1 space-y-4">
                {/* Title */}
                <div className="h-6 w-3/4 bg-gray-200 rounded dark:bg-[#232323]" />
                <div className="h-6 w-2/3 bg-gray-200 rounded dark:bg-[#232323]" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded dark:bg-[#232323]" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded dark:bg-[#232323]" />
                    <div className="h-4 w-10/12 bg-gray-200 rounded dark:bg-[#232323]" />
                </div>

                {/* Meta */}
                <div className="flex gap-4 items-center">
                    <div className="h-4 w-28 bg-gray-200 rounded dark:bg-[#232323]" />
                    <div className="h-4 w-32 bg-gray-200 rounded dark:bg-[#232323]" />
                </div>

                {/* Button */}
                <div className="h-10 w-28 bg-gray-200 rounded-lg dark:bg-[#232323]" />
            </div>
        </div>
    );
}
