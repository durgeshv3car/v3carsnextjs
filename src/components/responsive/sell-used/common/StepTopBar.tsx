"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  query?: string;
  onQueryChange?: (v: string) => void;
  placeholder?: string;
  showSearch?: boolean;               // default: true
  className?: string;
  inputWidthClass?: string;           // e.g. "w-[220px] md:w-[280px]"
  rightSlot?: React.ReactNode;        // optional extra UI on right side
  onSubmit?: (query: string) => void; // enter key submit
};

export default function StepTopBar({
  title,
  query = "",
  onQueryChange,
  placeholder = "Search",
  showSearch = true,
  className,
  inputWidthClass = "w-[210px] md:w-[260px]",
  rightSlot,
  onSubmit,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-md bg-neutral-900 ring-1 ring-neutral-800 px-3 py-2 flex items-center gap-3",
        className
      )}
    >
      <span className="text-sm text-white/95 font-medium">{title}</span>

      <div className="ml-auto flex items-center gap-3">
        {showSearch && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.(query);
            }}
            className="relative"
          >
            <input
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className={cn(
                "h-9 rounded-full bg-white pl-4 pr-9 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none",
                inputWidthClass
              )}
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-neutral-900 text-white text-xs">
              🔍
            </span>
          </form>
        )}

        {rightSlot}
      </div>
    </div>
  );
}
