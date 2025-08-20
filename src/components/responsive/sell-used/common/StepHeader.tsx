"use client";
import { cn } from "@/lib/utils";

const STEPS = ["Brand", "Period", "Model", "Variant", "Ownership", "Odometer", "Location"];

export default function StepHeader({ current = 0 }: { current: number }) {
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-br from-neutral-950 to-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <button
          aria-label="Back"
          className="h-8 w-8 grid place-items-center rounded-full bg-yellow-500/90 text-black font-bold"
          onClick={() => history.back()}
        >
          ‹
        </button>

        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span
                className={cn(
                  "text-sm uppercase tracking-wide",
                  i === current ? "text-yellow-400 font-semibold" : "text-gray-300"
                )}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && <span className="h-3 w-3 rounded-full bg-gray-700" />}
            </div>
          ))}
        </div>

        <div className="ml-auto text-gray-400">✕</div>
      </div>
    </div>
  );
}
