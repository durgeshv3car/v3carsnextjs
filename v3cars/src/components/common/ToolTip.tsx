import { useState } from "react";

interface TooltipProps {
  label: string;
  side?: "top" | "right" | "left" | "bottom";
  children: React.ReactNode;
}

export default function Tooltip({ label, side = "top", children }: TooltipProps) {
  const [show, setShow] = useState(false);

  const tooltipPos =
    side === "top"
      ? "left-1/2 -translate-x-1/2 bottom-full mb-2"
      : side === "right"
        ? "left-full ml-2 top-1/2 -translate-y-1/2"
        : side === "left"
          ? "right-full mr-2 top-1/2 -translate-y-1/2"
          : "left-1/2 -translate-x-1/2 top-full mt-2"; // bottom

  const arrowPos =
    side === "top"
      ? "left-1/2 -translate-x-1/2 top-full"
      : side === "right"
        ? "left-0 top-1/2 -translate-y-1/2 -ml-2"
        : side === "left"
          ? "right-0 top-1/2 -translate-y-1/2 -mr-2"
          : "left-1/2 -translate-x-1/2 bottom-full";

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}

      <div
        role="tooltip"
        className={`absolute ${tooltipPos} px-2 py-1 rounded-md text-xs text-white bg-black shadow-md z-50
          transform transition-all duration-200 ease-out
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {label}
        <div
          className={`absolute ${arrowPos}`}
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: side === "top" ? "6px solid black" : undefined,
            borderBottom: side === "bottom" ? "6px solid black" : undefined,
            borderLeftColor: side === "right" ? "black" : "transparent",
            borderRightColor: side === "left" ? "black" : "transparent",
          }}
        />
      </div>
    </div>
  );
}
