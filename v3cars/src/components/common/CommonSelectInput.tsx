'use client'

import { useState } from "react";

type Props<T> = {
    placeholder?: string;
    defaultValue?: string;
    query: string;
    setQuery: (value: string) => void;
    options: T[];
    labelKey: keyof T;
    valueKey: keyof T;
    value?: string | number;
    onSelect: (item: T) => void;
};

export default function CommonSelectInput<T>({
    placeholder = "Search",
    defaultValue,
    options,
    query,
    setQuery,
    labelKey,
    valueKey,
    value,
    onSelect,
}: Props<T>) {

    const [openModel, setOpenModel] = useState(false);

    // 🔥 selected item by valueKey
    const selectedItem = options.find(
        (item) => item[valueKey] === value
    );

    return (
        <div className="relative w-full">

            {/* Header (UI SAME) */}
            <div
                className="flex justify-between items-center px-4 py-2 cursor-pointer"
                onClick={() => setOpenModel(!openModel)}
            >
                <span>
                    {selectedItem
                        ? String(selectedItem[labelKey])
                        : defaultValue}
                </span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className={`size-4 transition-transform ${openModel ? "rotate-180" : ""
                        }`}
                >
                    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            {/* Dropdown (UI SAME) */}
            {openModel && (
                <div className="absolute z-20 w-full bg-white dark:bg-[#171717] border dark:border-[#2E2E2E] rounded-b-lg">

                    <input
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-3 border-b dark:border-[#2E2E2E] bg-transparent outline-none"
                    />

                    {query.length < 2 ? (
                        <p className="p-3 text-sm text-gray-400 italic">
                            Please enter 2 or more characters
                        </p>
                    ) : (
                        <ul className="max-h-40 overflow-y-auto">
                            {options.length > 0 ? (
                                options.map((item, index) => (
                                    <li
                                        key={String(item[valueKey]) ?? index}
                                        className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
                                        onClick={() => {
                                            onSelect(item);   // 🔥 parent decides kya set karna
                                            setOpenModel(false);
                                            setQuery("");
                                        }}
                                    >
                                        {String(item[labelKey])}
                                    </li>
                                ))
                            ) : (
                                <li className="p-3 text-gray-400">No results found</li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
