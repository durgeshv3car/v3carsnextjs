interface BrandInfoItem {
  label: string;
  value: string | string[];
}

interface BrandInfoTableProps {
  brandName: string;
  data: BrandInfoItem[];
}

export default function BrandInfoTable({ brandName, data }: BrandInfoTableProps) {
  return (
    <div className="text-white rounded-xl overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-[#111] px-2 py-3 text-[16px] font-semibold border-b border-[#2A2A2A]">
        {brandName}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#2A2A2A] text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex px-2 py-3">
            <div className="w-1/3 font-semibold text-gray-200">{item.label}</div>
            <div className="w-2/3 text-gray-300 whitespace-pre-line">
              {Array.isArray(item.value)
                ? item.value.map((line, idx) => (
                    <div key={idx}>
                      {idx + 1} = {line}
                    </div>
                  ))
                : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
