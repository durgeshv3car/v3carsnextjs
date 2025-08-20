
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-neutral-900 ring-1 ring-neutral-800 shadow-sm hover:ring-neutral-700 transition",
        className
      )}
    >
      {children}
    </div>
  );
}
