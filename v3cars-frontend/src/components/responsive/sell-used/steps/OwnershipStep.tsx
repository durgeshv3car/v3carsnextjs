// src/components/sell-used/steps/OwnershipStep.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectOwnership, setStep } from "@/redux/slices/sellUsedSlice";
import { cn } from "@/lib/utils";
import StepTopBar from "../common/StepTopBar";

// 1..8 owners
const OPTIONS = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    return { count: n, label: `${n}${suffix} owner` };
});

/** symmetric triangle scales for N icons (center biggest) */
function triangleScales(count: number, min = 0.6, max = 1) {
    if (count <= 1) return [max];
    const center = (count - 1) / 2;
    const denom = center === 0 ? 1 : center;
    return Array.from({ length: count }, (_, i) => {
        const dist = Math.abs(i - center);
        const t = 1 - dist / denom; // 0..1
        return min + (max - min) * t;
    });
}

export default function OwnershipStep() {
    const dispatch = useDispatch();
    const { ownership: selected } = useSelector((s: RootState) => s.sellUsed);
    const [q, setQ] = useState("");

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return OPTIONS;
        return OPTIONS.filter((o) => o.label.toLowerCase().includes(t));
    }, [q]);

    const pick = (label: string) => {
        dispatch(selectOwnership(label));
        dispatch(setStep("odometer"));
    };

    return (
        <div className="min-h-screen dark:bg-neutral-950">
            <StepHeader
                current={4}
                onBack={() => dispatch(setStep("variant"))}
                onClose={() => dispatch(setStep("landing"))}
            />

            <div className="mx-auto app-container px-4 py-6 grid grid-cols-12 gap-6">
                {/* Left */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                    {/* Top bar */}
                    <StepTopBar title="Select Car Ownership" query={q} onQueryChange={setQ} placeholder="Search owner" />
                    {/* Grid */}
                    <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
                            {list.map((o) => {
                                const active = selected === o.label;
                                const scales = triangleScales(o.count); // e.g. [0.6,0.8,1,0.8,0.6]
                                return (
                                    <button
                                        key={o.count}
                                        onClick={() => pick(o.label)}
                                        className={cn(
                                            "relative rounded-xl border grid gap-3 px-4 py-7 bg-white dark:bg-[#171717] transition place-items-center",
                                            active
                                                ? "ring-2 ring-yellow-400 border-transparent shadow-md"
                                                : "border-[#2E2E2E] hover:border-primary/90"
                                        )}
                                    >
                                        {/* Overlapped one-row triangle (/_\) using same image */}
                                        <div className="flex items-end justify-center">
                                            {scales.map((s, idx) => (
                                                <div
                                                    key={idx}
                                                    className={cn(idx > 0 && "-ml-3 md:-ml-4")} // overlap
                                                    style={{ zIndex: Math.round(s * 100) }} // bigger on top
                                                >
                                                    <Image
                                                        src="/sell-used-car/first-owner.png"
                                                        alt={`${o.label} icon`}
                                                        width={56}
                                                        height={56}
                                                        className="object-contain dark:invert"
                                                        style={{ transform: `scale(${s})` }}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <span className="text-gray-500 text-sm">{o.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-4">
                    <SelectedTrail />
                    <Card variant="white" className="mt-4 p-4 text-sm text-gray-500 dark:bg-[#171717] border dark:border-[#2E2E2E]">
                        Tip: Choose the number of previous owners for your car.
                    </Card>
                </div>
            </div>

            <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #facc15; border-radius: 8px; }
      `}</style>
        </div>
    );
}
