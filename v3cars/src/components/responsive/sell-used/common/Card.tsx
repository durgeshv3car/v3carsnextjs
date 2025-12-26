"use client";

import { PropsWithChildren, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "white" | "glass" | "muted";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    /** default: "dark" */
    variant?: Variant;
    /** add default padding (p-4). default: false */
    padded?: boolean;
    /** hover effects (ring/shadow). default: true */
    hover?: boolean;
  }
>;

export default function Card({
  children,
  className,
  variant = "dark",
  padded = false,
  hover = true,
  ...rest
}: CardProps) {
  const base = "rounded-xl transition";
  const pad = padded ? "p-4" : "";

  const styles: Record<Variant, string> = {
    dark: "bg-neutral-900 ring-1 ring-neutral-800",
    muted: "bg-neutral-800 ring-1 ring-neutral-700",
    white: "bg-white ring-1 ring-black/10",
    glass: "bg-white/5 backdrop-blur-md ring-1 ring-white/10  ",
  };

  const hoverCls =
    hover &&
    (variant === "white"
      ? "hover:shadow-md"
      : "hover:ring-neutral-700")

  return (
    <div className={cn(base, styles[variant], pad, hoverCls, className)} {...rest}>
      {children}
    </div>
  );
}
