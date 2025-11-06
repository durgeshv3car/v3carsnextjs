"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../common/Card";
import { RootState } from "@/redux/store";
import { setStep } from "@/redux/slices/sellUsedSlice";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function CongratsRedirect({
  seconds = 5,
  onDone,
}: {
  seconds?: number;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(seconds);
  const timerRef = useRef<number | null>(null);

  // start / restart timer when mounted
  useEffect(() => {
    setCount(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCount((c) => c - 1);
    }, 1000) as unknown as number;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [seconds]);

  // call onDone AFTER render via effect (no render-phase updates)
  useEffect(() => {
    if (count <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      onDone?.();
    }
  }, [count, onDone]);

  return (
    <div className="px-4 pb-5">
      <button
        type="button"
        className="w-full rounded-lg bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition"
      >
        Congratulation
      </button>

      <div className="mt-6 text-center">
        <div className="font-semibold text-[18px] leading-none">
          {Math.max(count, 0)}s
        </div>
        <div className="text-gray-500 text-sm mt-1">Auto Redirecting</div>
      </div>
    </div>
  );
}

export default function SelectedTrail() {
  const dispatch = useDispatch();
  const { step, brand, year, model, variant, ownership, odometer, location } =
    useSelector((s: RootState) => s.sellUsed);

  const rows = useMemo(
    () => [
      { key: "brand",     label: brand?.brandName ?? "Brand",           done: !!brand },
      { key: "year",      label: year ? `Year ${year}` : "Year",   done: year != null },
      { key: "model",     label: model ?? "Model",                 done: !!model },
      { key: "variant",   label: variant ?? "Variant",             done: !!variant },
      { key: "ownership", label: ownership ?? "Ownership",         done: !!ownership },
      { key: "odometer",  label: odometer ?? "Odometer",           done: !!odometer },
      { key: "location",  label: location ?? "Location",           done: !!location },
    ],
    [brand, year, model, variant, ownership, odometer, location]
  );

  const complete = rows.every((r) => r.done);
  const showCTA = step === "location" && complete;

  return (
    <Card variant="white" className="p-0 overflow-hidden border dark:border-[#2E2E2E] dark:bg-[#171717]">
      <ul className="px-4 py-3">
        {rows.map((r, i) => {
          const nextDone = rows[i + 1]?.done;
          return (
            <li
              key={r.key}
              className="grid grid-cols-[24px_1fr] gap-3 items-start"
            >
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "mt-2 h-5 w-5 rounded-full grid place-items-center text-[11px] font-bold",
                    r.done
                      ? "bg-green-600"
                      : "bg-white border border-gray-300 "
                  )}
                >
                  ✓
                </span>
                {i < rows.length - 1 && (
                  <span
                    className={cn(
                      "mt-1 w-[2px] rounded-full",
                      nextDone ? "bg-green-600" : "bg-gray-200"
                    )}
                    style={{ height: 26 }}
                  />
                )}
              </div>

              <div className="py-1.5">
                <span className={cn("text-[15px]", r.done ? "font-semibold" : "")}>
                  {r.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {showCTA && (
        <CongratsRedirect
          seconds={5}
          onDone={() => dispatch(setStep("landing"))}
        />
      )}
    </Card>
  );
}
