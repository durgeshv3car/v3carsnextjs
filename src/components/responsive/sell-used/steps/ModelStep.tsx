"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepHeader from "../common/StepHeader";
import SelectedTrail from "../brand/SelectedTrail";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { selectModel, setStep } from "@/redux/slices/sellUsedSlice";
import { MODELS } from "@/data/sell-used/models";
import StepTopBar from "../common/StepTopBar";

export default function ModelStep() {
  const dispatch = useDispatch();
  const { brand, model: selectedModel } = useSelector((s: RootState) => s.sellUsed);
  const [q, setQ] = useState("");

  const brandShort = useMemo(() => {
    if (!brand?.name) return "Brand";
    if (brand.name.toLowerCase().includes("maruti")) return "Maruti";
    return brand.name.split(" ")[0];
  }, [brand?.name]);

  const allModels = useMemo<string[]>(() => {
    if (!brand?.name) return [];
    return MODELS[brand.name] ?? ["Base","Deluxe","Prime","Plus","Pro"];
  }, [brand?.name]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return allModels;
    return allModels.filter((m) => m.toLowerCase().includes(t));
  }, [q, allModels]);

  const pickModel = (m: string) => {
    dispatch(selectModel(m));
    dispatch(setStep("variant")); // next
  };

  return (
    <div className="min-h-screen dark:bg-neutral-950 text-white">
      <StepHeader
        current={2}
        onBack={() => dispatch(setStep("period"))}
        onClose={() => dispatch(setStep("landing"))}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Top bar */}
         <StepTopBar
            title={`Select Your ${brandShort}`}
            query={q}
            onQueryChange={setQ}
            placeholder="Search model"
          />
          {/* List */}
          <div className="h-[62vh] overflow-y-auto pr-1 custom-scroll">
            <ul className="space-y-3">
              {list.map((m) => {
                const active = selectedModel === m;
                return (
                  <li key={m}>
                    <button
                      onClick={() => pickModel(m)}
                      className={`w-full flex items-center justify-between rounded-md border px-4 py-4 text-left transition
                        ${active
                          ? "bg-white border-yellow-400 ring-1 ring-yellow-400 text-neutral-900"
                          : "bg-white/90 hover:bg-white border-neutral-200 text-neutral-900"}`}
                    >
                      <span className="text-[15px]">{m}</span>
                      <span className="text-neutral-500">›</span>
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
          <Card variant="white" className="mt-4 p-4 text-sm text-gray-500">
            Tip: Choose your {brandShort} model to continue.
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
