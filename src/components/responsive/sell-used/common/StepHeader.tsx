"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoChevronBack, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setStep, type StepKey } from "@/redux/slices/sellUsedSlice";

// exclude "landing" from header steps
type FlowStep = Exclude<StepKey, "landing">;

const STEP_META: { key: FlowStep; label: string }[] = [
  { key: "brand",     label: "Brand" },
  { key: "period",    label: "Period" },
  { key: "model",     label: "Model" },
  { key: "variant",   label: "Variant" },
  { key: "ownership", label: "Ownership" },
  { key: "odometer",  label: "Odometer" },
  { key: "location",  label: "location" },
];

export default function StepHeader({
  current = 0,
  onBack,
  onClose,
}: {
  current?: number;
  onBack?: () => void;
  onClose?: () => void;
}) {
  const dispatch = useDispatch();
  const s = useSelector((st: RootState) => st.sellUsed);

  // compute completed steps (landing excluded)
  const completed: Record<FlowStep, boolean> = {
    brand: !!s.brand,
    period: s.year != null,
    model: !!s.model,
    variant: !!s.variant,
    ownership: !!s.ownership,
    odometer: !!s.odometer,
    location: !!s.location,
  };

  const farthestDoneIndex = STEP_META.reduce((acc, step, i) => {
    return completed[step.key] ? i : acc;
  }, -1);

  const canJumpUntil = Math.max(current, farthestDoneIndex);

  const handleJump = (i: number, key: FlowStep) => {
    if (i <= canJumpUntil) dispatch(setStep(key as StepKey));
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="relative overflow-hidden">
        <div className="relative h-[88px] md:h-[110px]">
          <Image
            src="/sell-used-car/bg-header.png"
            alt=""
            fill
            priority
            className="object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.88),rgba(0,0,0,.80)_40%,rgba(0,0,0,.68))]" />
          <div className="pointer-events-none absolute -left-32 -top-40 h-[220%] w-[55%] rotate-[18deg] bg-[radial-gradient(75%_65%_at_20%_50%,rgba(255,255,255,.08),transparent_60%)]" />

          <div className="relative mx-auto max-w-[1600px] px-4 xl:px-10 h-full flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                aria-label="Back"
                className="h-8 w-8 grid place-items-center rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
              >
                <IoChevronBack />
              </button>

              <h1 className="text-white text-lg md:text-xl font-medium">
                Sell Your <span className="font-semibold">Used Car</span>{" "}
                <span className="opacity-90">At Best Price</span>
              </h1>

              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-auto h-8 w-8 grid place-items-center rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
              >
                <IoClose />
              </button>
            </div>

            <nav className="mt-3 flex items-center gap-6 overflow-x-auto scrollbar-hide text-sm text-white/70">
              {STEP_META.map((step, i) => {
                const isActive = i === current;
                const isDone = completed[step.key];
                const clickable = i <= canJumpUntil;

                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => handleJump(i, step.key)}
                    className={cn(
                      "shrink-0 transition-colors",
                      clickable ? "cursor-pointer hover:text-white" : "cursor-not-allowed opacity-70",
                      (isActive || isDone) && "text-yellow-400 font-semibold"
                    )}
                    aria-current={isActive ? "step" : undefined}
                    aria-disabled={!clickable}
                  >
                    {step.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
