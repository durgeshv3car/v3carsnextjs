"use client";
import Card from "../common/Card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // adjust if your store path differs

export default function SelectedTrail() {
  const { brand, year, model, variant, ownership, odometer, location } = useSelector(
    (s: RootState) => s.sellUsed
  );

  const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex items-center justify-between border-b border-neutral-800/80 py-3 text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-5 w-5 grid place-items-center rounded-full ${value ? "bg-green-500" : "bg-neutral-700"}`}>
          {value ? "✓" : "○"}
        </span>
        <span className="text-gray-300">{label}</span>
      </div>
      <span className="text-gray-400">{value ?? ""}</span>
    </div>
  );

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-4 py-3 text-sm font-semibold text-white border-b border-neutral-800">
        Selection
      </div>
      <div className="px-4">
        <Row label="Maruti Suzuki" value={brand?.name} />
        <Row label="Year" value={year} />
        <Row label="Model" value={model} />
        <Row label="Variant" value={variant} />
        <Row label="Ownership" value={ownership} />
        <Row label="Odometer" value={odometer} />
        <Row label="Location" value={location} />
      </div>
    </Card>
  );
}
