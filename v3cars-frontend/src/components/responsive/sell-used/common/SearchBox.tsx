"use client";
import { useId } from "react";

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search Brand name",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 ring-1 ring-neutral-700 text-sm text-gray-300"
    >
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none placeholder:text-gray-500 w-56 md:w-64"
      />
      <span className="text-gray-400">🔍</span>
    </label>
  );
}
