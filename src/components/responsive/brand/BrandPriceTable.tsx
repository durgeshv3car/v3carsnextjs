interface CarPriceItem {
  name: string;
  priceRange: string;
  onRoadPriceText: string;
  sales: string;
}

interface BrandPriceTableProps {
  title: string;
  cars: CarPriceItem[];
}

export default function BrandPriceTable({ title, cars }: BrandPriceTableProps) {
  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-[#D1D1D1]">
      <table className="min-w-[800px] w-full text-sm bg-white border-separate border-spacing-0">
        {/* Table Header Title */}
        <thead>
          <tr className="bg-[#5B5B5B] text-white text-[15px] text-center">
            <th colSpan={4} className="py-3 font-semibold">
              {title}
              <div className="text-xs font-normal text-white/80">
                (Ex-Showroom)
              </div>
            </th>
          </tr>

          {/* Column Titles */}
          <tr className="bg-[#F1F1F1] text-gray-900 text-left">
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC]">Mahindra Cars In India</th>
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC]">Mahindra Price Range</th>
            <th className="px-4 py-3 font-semibold border-r border-[#DCDCDC]">Check On-Road Price</th>
            <th className="px-4 py-3 font-semibold ">Mahindra Sales August 2024</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car, index) => (
            <tr key={index} className="border-t border-[#DCDCDC]">
              <td className="px-4 py-3 text-[#FFB800] font-medium hover:underline cursor-pointer border-r border-[#DCDCDC]">
                {car.name}
              </td>
              <td className="px-4 py-3 border-r border-[#DCDCDC]">{car.priceRange}</td>
              <td className="px-4 py-3 text-[#FFB800] hover:underline cursor-pointer border-r border-[#DCDCDC]">
                {car.onRoadPriceText}
              </td>
              <td className="px-4 py-3 ">{car.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
