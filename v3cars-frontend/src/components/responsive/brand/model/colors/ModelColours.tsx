import { useState } from "react";

const colors = [
    { key: "red", value: "#ff1744" },
    { key: "pink", value: "#e91e63" },
    { key: "blue", value: "#2196f3" },
    { key: "purple", value: "#9c27b0" },
    { key: "yellow", value: "#ffeb3b" },
    { key: "green", value: "#4caf50" },
    { key: "black", value: "#000000" },
    { key: "grey", value: "#9e9e9e" },
    { key: "white", value: "#ffffff" },
    { key: "orange", value: "#ff9800" }
];

export default function ModelColours() {
    const [selected, setSelected] = useState("blue");

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-semibold">Tata Nexon Colours</h2>
            <p className="text-gray-400">Here the first FAQ will always be open and the rest will act as dropdowns</p>

            <div className="p-4 w-full bg-white dark:bg-[#171717] border rounded-xl dark:border-[#2e2e2e]">
                <div className="flex gap-6">
                    {/* Color options */}
                    <div className="border rounded-xl p-4 flex dark:border-[#2e2e2e]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-fit">
                            {colors.map((c) => (
                                <div
                                    key={c.key}
                                    onClick={() => setSelected(c.key)}
                                    className={`w-10 h-10 rounded-lg border cursor-pointer flex items-center justify-center`}
                                    style={{ backgroundColor: c.value }}
                                >
                                    {selected === c.key && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Car Preview */}
                    <div className="flex-1 flex flex-col items-center justify-center border rounded-xl dark:border-[#2e2e2e]">
                        <img
                            src="/model/tata.png"
                            alt="Tata Nexon"
                        />
                    </div>

                    {/* Navigation */}
                    {/* <div className="flex flex-col gap-2 justify-center">
                        <button className="border px-4 py-2 rounded-xl bg-white shadow">◀</button>
                        <button className="border px-4 py-2 rounded-xl bg-white shadow">▶</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
