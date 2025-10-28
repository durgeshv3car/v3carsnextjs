"use client";

import { useState, useEffect, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // Optional: tailwind classnames helper

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function FloatingInput({
    label,
    error,
    value,
    onChange,
    ...props
}: FloatingInputProps) {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    // Update hasValue when parent changes value
    useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    return (
        <div className="relative w-full">
            {/* Input field */}
            <input
                {...props}
                value={value}
                onChange={(e) => {
                    setHasValue(!!e.target.value);
                    onChange?.(e);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={cn(
                    "peer w-full border rounded-md px-3 pt-5 pb-2 text-sm outline-none transition-colors",
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500",
                    "bg-white dark:bg-gray-800"
                )}
            />

            {/* Floating label */}
            <label
                className={cn(
                    "absolute left-3 text-sm transition-all duration-200 pointer-events-none",
                    hasValue || focused
                        ? "top-1 text-xs text-blue-500 dark:text-blue-400"
                        : "top-5 text-gray-400 dark:text-gray-500",
                    error ? "text-red-500" : ""
                )}
            >
                {label}
            </label>

            {/* Error message */}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
