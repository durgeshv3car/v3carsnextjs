"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectYear, setStep } from "@/redux/slices/sellUsedSlice";
import StepTopBar from "../common/StepTopBar";

export default function PeriodStep() {
  const dispatch = useDispatch();
  const { year: selectedYear } = useSelector((s: RootState) => s.sellUsed);

  const [q, setQ] = useState("");

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    const min = 2005; // adjust if you want deeper history
    const arr = [];
    for (let y = now; y >= min; y--) arr.push(y);
    return arr;
  }, []);

  const list = useMemo(() => {
    if (!q.trim()) return years;
    return years.filter((y) => String(y).includes(q.trim()));
  }, [q, years]);

  const pickYear = (y: number) => {
    dispatch(selectYear(y));
    dispatch(setStep("model")); // go to next step
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <StepHeader
        current={1}
        onBack={() => dispatch(setStep("brand"))}
        onClose={() => dispatch(setStep("landing"))}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Top bar */}
          <StepTopBar
            title="Select the registration year"
            query={q}
            onQueryChange={setQ}
            placeholder="Search year"
          />

          {/* Years list */}
          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll p-2">
            <ul className="divide-y divide-white/5 space-y-3">
              {list.map((y) => {
                const active = selectedYear === y;
                return (
                  <li key={y}>
                    <button
                      onClick={() => pickYear(y)}
                      className={`w-full flex items-center justify-between rounded-md border px-4 py-4 text-left transition
                        ${active
                          ? "bg-white dark:bg-[#171717] border-yellow-400 ring-1 ring-yellow-400"
                          : "bg-white/90 hover:bg-white dark:bg-[#171717] border-neutral-200 dark:border-[#2E2E2E]"}`}
                    >
                      <span className="">{y}</span>
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
            Tip: Pick registration year to continue.
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
