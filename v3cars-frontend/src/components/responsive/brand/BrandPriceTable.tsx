'use client'

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface CarModel {
  modelId: number;
  modelName: string;
  modelSlug: string;
  brandId: number;
  modelBodyTypeId: number;
  isUpcoming: boolean;
  launchDate: string;
  totalViews: number;
  expectedBasePrice: number;
  expectedTopPrice: number;
  seats: number;
  brand: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
  priceMin: number;
  priceMax: number;
  powerPS: number;
  torqueNM: number;
  mileageKMPL: number;
  powerTrain: string;
  image: {
    name: string;
    alt: string;
    url: string;
  };
  imageUrl: string;
}

interface BrandPriceTableProps {
  title: string;
  cars: CarModel[];
}

const currentYear = new Date().getFullYear()

export default function BrandPriceTable({ title, cars }: BrandPriceTableProps) {
  const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-[#D1D1D1] dark:border-[#2E2E2E]">
      <table className="min-w-[800px] w-full text-sm border-separate border-spacing-0">
        {/* ===== HEADER ===== */}
        <thead>
          <tr className="bg-[#5B5B5B] text-white text-[15px] text-center">
            <th colSpan={4} className="py-3 font-semibold">
              {cars[0]?.brand?.name} Cars Price List
              <div className="text-xs font-normal text-white/80">(Ex-Showroom)</div>
            </th>
          </tr>

          <tr className="bg-[#F1F1F1] dark:bg-[#171717] text-left">
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
              {cars[0]?.brand?.name || 'Car'} Cars In India
            </th>
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
              {cars[0]?.brand?.name} Price Range
            </th>
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
              Check On-Road Price
            </th>
            <th className="px-4 py-3 font-semibold">
              {cars[0]?.brand?.name} Sales August {currentYear}
            </th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {cars.map((car) => {
            const priceRange =
              car.priceMin && car.priceMax
                ? `₹${(car.priceMin / 100000).toFixed(1)}L - ₹${(car.priceMax / 100000).toFixed(1)} lakh*`
                : 'N/A'

            const modelName = car.modelName?.trim() || 'N/A'

            return (
              <tr key={car.modelId} className="border-t dark:border-[#2E2E2E]">
                <td className="px-4 py-3 flex items-center gap-3 text-[#FFB800] font-medium hover:underline cursor-pointer border-b border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
                  {car.brand.name} {modelName}
                </td>

                <td className="px-4 py-3 border-b border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
                  {priceRange}
                </td>

                <td className="px-4 py-3 text-[#FFB800] hover:underline cursor-pointer border-b border-r border-[#DCDCDC] dark:border-[#2E2E2E]">
                  Check {car.modelName} Price in {selectedCity.cityName}
                </td>

                <td className="px-4 py-3 border-b border-[#DCDCDC] dark:border-[#2E2E2E]">
                  N/A
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
