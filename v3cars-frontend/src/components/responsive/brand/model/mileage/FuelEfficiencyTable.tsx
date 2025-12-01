'use client'

import { useGetModelFuelEfficiencyQuery } from "@/redux/api/carModuleApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FuelEfficiencyTableProps {
  title: string;
  slug: string;
}

export interface MileageSources {
  realWorld: string | null;
  city: string | null;
  highway: string | null;
}

export interface PowertrainInfo {
  id: number;
  label: string;
  fuelType: string;
  transmissionType: string;
}

export interface VariantMileageItem {
  variantId: number;
  variantName: string;
  powertrain: PowertrainInfo;
  claimedFE: number;
  realWorldMileage: number;
  cityMileage: string;
  highwayMileage: string;
  sources: MileageSources;
  updatedDate: string; // ISO timestamp
}

const FuelEfficiencyTable: React.FC<FuelEfficiencyTableProps> = ({ title, slug }) => {
  const [filterData, setFilterData] = useState<VariantMileageItem[]>([]);
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const { data: modelFuelEfficiencyData } =
    useGetModelFuelEfficiencyQuery(
      { model_slug: slug, fuelType: fuelType, transmissionType: transmissionType },
      { skip: !slug }
    )

  const data: VariantMileageItem[] = modelFuelEfficiencyData?.rows ?? []


  useEffect(() => {
    if (data && data.length > 0 && filterData.length === 0) {
      const uniqueData = data.filter(
        (item, index, self) =>
          index === self.findIndex(
            (t) => t.powertrain.label === item.powertrain.label
          )
      );

      setFilterData(uniqueData);
    }
  }, [data]);

  return (
    <div>

      <div className="flex flex-col md:flex-row mb-4 justify-between md:items-center">
        <div>
          <h2 className="text-xl mb-1">{title} Fuel Efficiency</h2>
          <p className="text-sm text-gray-400 mb-4">See claimed and real-world mileage for {title} by powertrain with separate city and highway figures</p>
        </div>

        <select
          className="border px-4 py-3 rounded-lg dark:bg-[#171717] dark:border-[#2e2e2e] text-sm"
          onChange={(e) => {
            const value = JSON.parse(e.target.value);
            setFuelType(value.fuelType)
            setTransmissionType(value.transmissionType)
          }}
        >
          {filterData && filterData.map((opt, idx) => (
            <option key={idx}
              value={JSON.stringify({
                fuelType: opt.powertrain.fuelType,
                transmissionType: opt.powertrain.transmissionType
              })}
            >
              {opt.powertrain.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#171717] border rounded-t-xl dark:border-[#2e2e2e] scrollbar-hide">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="bg-[#DEE2E6] dark:bg-[#292929] border-b border-gray-200 dark:border-[#2e2e2e] text-center">
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[250px] text-left">Powertrain</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[250px]">Claimed FE</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[250px]">Real World Mileage</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e] min-w-[250px]">Mileage In City</th>
              <th className="p-4 font-semibold min-w-[250px]">Highway Mileage</th>
            </tr>
          </thead>

          <tbody>
            {data.map((variant) => (
              <tr
                key={variant.variantId}
                className="border-t border-gray-200 dark:border-[#2e2e2e] hover:bg-gray-50 transition dark:hover:bg-[#2e2e2e] text-center"
              >
                <td className="p-4 border-r dark:border-[#2e2e2e] text-left">
                  <p className="font-medium">{variant.variantName}</p>
                  <p className="text-xs text-gray-400">{variant.powertrain.label}</p>
                </td>

                <td className="p-4 border-r dark:border-[#2e2e2e]">
                  {variant.claimedFE ? `${variant.claimedFE} km/l` : "N/A"}
                </td>

                <td className="p-4 border-r dark:border-[#2e2e2e]">
                  {variant.realWorldMileage ? `${variant.realWorldMileage} km/l` : "N/A"}
                </td>

                <td className="p-4 border-r dark:border-[#2e2e2e]">
                  <Link href={variant.cityMileage} className="hover:text-blue-500 line-clamp-2">
                    {variant.cityMileage || "N/A"}
                  </Link>
                </td>

                <td className="p-4">
                  <Link href={variant.highwayMileage} className="hover:text-blue-500 line-clamp-2">
                    {variant.highwayMileage || "N/A"}
                  </Link>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No mileage data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelEfficiencyTable;
