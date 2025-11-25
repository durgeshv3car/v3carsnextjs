"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectLocation, setStep } from "@/redux/slices/sellUsedSlice";
import StepTopBar from "../common/StepTopBar";

const CITIES = [
    "Delhi", "Gurugram", "Noida", "Ghaziabad", "Faridabad",
    "Mumbai", "Pune", "Thane", "Navi Mumbai",
    "Bengaluru", "Hyderabad", "Chennai",
    "Kolkata", "Jaipur", "Ahmedabad", "Surat", "Indore",
    "Lucknow", "Chandigarh", "Bhopal", "Nagpur", "Coimbatore", "Kochi",
    "Visakhapatnam", "Patna"
];

export default function LocationStep() {
    const dispatch = useDispatch();
    const selected = useSelector((s: RootState) => s.sellUsed.location);
    const [q, setQ] = useState("");

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return CITIES;
        return CITIES.filter((c) => c.toLowerCase().includes(t));
    }, [q]);

    const pick = (city: string) => {
        dispatch(selectLocation(city));
    };

    return (
        <div className="min-h-screen dark:bg-neutral-950">
            <StepHeader
                current={6}
                onBack={() => dispatch(setStep("odometer"))}
                onClose={() => dispatch(setStep("landing"))}
            />

            <div className="mx-auto app-container px-4 py-6 grid grid-cols-12 gap-6">
                {/* Left */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                    {/* Top bar */}
                    <StepTopBar
                        title="Select City"
                        query={q}
                        onQueryChange={setQ}
                        placeholder="Search your city"
                        inputWidthClass="w-[220px] md:w-[280px]"
                    />
                    {/* Cities list */}
                    <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
                        <ul className="space-y-3">
                            {list.map((city) => {
                                const active = selected === city;
                                return (
                                    <li key={city}>
                                        <button
                                            onClick={() => pick(city)}
                                            className={`w-full flex items-center justify-between rounded-md border px-4 py-4 text-left transition
                                            ${active
                                                    ? "bg-white dark:bg-[#171717] border-primary ring-1 ring-yellow-400"
                                                    : "bg-white/90 hover:bg-white dark:bg-[#171717] border-neutral-200 dark:border-[#2E2E2E]"
                                                }`}
                                        >
                                            <span className="text-[15px]">{city}</span>
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
                        Tip: Pick the city where your car is currently registered/located.
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
