'use client'

export default function WebStoriesSkeleton() {
  return (
    <div className="rounded-2xl bg-slate-200 dark:bg-[#171717] overflow-hidden animate-pulse">
      
      {/* Image / Video Skeleton */}
      <div className="relative h-80 dark:bg-[#2e2e2e]">
        {/* top-right icon */}
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white dark:bg-[#171717]" />
      </div>

      {/* Bottom Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 w-24 bg-white dark:bg-[#2e2e2e] rounded" />

        {/* Date */}
        <div className="h-3 w-20 bg-white dark:bg-[#2e2e2e] rounded" />
      </div>
    </div>
  );
}
