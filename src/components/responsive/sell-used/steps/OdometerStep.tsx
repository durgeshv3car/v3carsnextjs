"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectOdometer, setStep } from "@/redux/slices/sellUsedSlice";
import StepTopBar from "../common/StepTopBar";

const RANGES: string[] = [
    "0 Km - 10,000 Km",
    "10,000 Km - 20,000 Km",
    "20,000 Km - 30,000 Km",
    "30,000 Km - 40,000 Km",
    "40,000 Km - 50,000 Km",
    "50,000 Km - 60,000 Km",
    "60,000 Km - 70,000 Km",
    "70,000 Km - 80,000 Km",
    "80,000 Km - 90,000 Km",
    "90,000 Km - 100,000 Km",
    "100,000 Km - 120,000 Km",
    "120,000 Km - 140,000 Km",
    "140,000 Km +",
];

export default function OdometerStep() {
    const dispatch = useDispatch();
    const selected = useSelector((s: RootState) => s.sellUsed.odometer);
    const [q, setQ] = useState("");

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return RANGES;
        return RANGES.filter((r) => r.toLowerCase().includes(t));
    }, [q]);

    const pick = (r: string) => {
        dispatch(selectOdometer(r));
        dispatch(setStep("location")); // next
    };

    return (

        <div className="min-h-screen dark:bg-neutral-950">
            <StepHeader
                current={5}
                onBack={() => dispatch(setStep("ownership"))}
                onClose={() => dispatch(setStep("landing"))}
            />

            <div className="mx-auto max-w-[1600px] px-4 py-6 grid grid-cols-12 gap-6">
                {/* Left */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                    {/* Top bar */}
                    <StepTopBar title="Select Odometer" query={q} onQueryChange={setQ} placeholder="Search kms" />

                    {/* Ranges list */}
                    <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
                        <ul className="space-y-3">
                            {list.map((r) => {
                                const active = selected === r;
                                return (
                                    <li key={r}>
                                        <button
                                            onClick={() => pick(r)}
                                            className={`w-full flex items-center justify-between rounded-md border px-4 py-4 text-left transition
                        ${active
                                                    ? "bg-white dark:bg-[#171717] border-yellow-400 ring-1 ring-yellow-400"
                                                    : "bg-white/90 hover:bg-white dark:bg-[#171717] border-neutral-200 dark:border-[#2E2E2E]"}`}
                                        >
                                            <span className="text-[15px]">{r}</span>
                                            <span className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-4">
                    <SelectedTrail />
                    <Card variant="white" className="mt-4 p-4 text-sm text-gray-500 dark:bg-[#171717] border dark:border-[#2E2E2E]">
                        Tip: Pick the km range that best matches your car’s odometer.
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
