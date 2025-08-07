interface BrandOverviewProps {
  description: string[];
}

export default function BrandOverview({ description }: BrandOverviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4 text-[15px] text-gray-800 leading-[1.8]">
      {description.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
}
