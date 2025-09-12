
"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectVariant, setStep } from "@/redux/slices/sellUsedSlice";
import { VARIANTS, DEFAULT_VARIANTS } from "@/data/sell-used/variants";
import StepTopBar from "../common/StepTopBar";

export default function VariantStep() {
  const dispatch = useDispatch();
  const { model, variant: selectedVariant } = useSelector((s: RootState) => s.sellUsed);
  const [q, setQ] = useState("");

  const all = useMemo<string[]>(() => {
    if (!model) return DEFAULT_VARIANTS;
    return VARIANTS[model] ?? DEFAULT_VARIANTS;
  }, [model]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return all;
    return all.filter((v) => v.toLowerCase().includes(t));
  }, [q, all]);

  const pick = (v: string) => {
    dispatch(selectVariant(v));
    dispatch(setStep("ownership")); // next
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <StepHeader
        current={3}
        onBack={() => dispatch(setStep("model"))}
        onClose={() => dispatch(setStep("landing"))}
      />

      <div className="mx-auto app-container px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">

           <StepTopBar title="Select Variant" query={q} onQueryChange={setQ} placeholder="Search variant" />

          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
            <ul className="space-y-3">
              {list.map((v) => {
                const active = selectedVariant === v;
                return (
                  <li key={v}>
                    <button
                      onClick={() => pick(v)}
                      className={`w-full flex items-center justify-between rounded-md border px-4 py-4 text-left transition
                        ${active
                          ? "bg-white dark:bg-[#171717] border-yellow-400 ring-1 ring-yellow-400"
                          : "bg-white/90 hover:bg-white dark:bg-[#171717] border-neutral-200 dark:border-[#2E2E2E]"}`}
                    >
                      <span className="text-[15px]">{v}</span>
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
            Tip: Pick a variant to continue.
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
