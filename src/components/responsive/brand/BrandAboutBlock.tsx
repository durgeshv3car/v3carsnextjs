interface BrandOverviewProps {
  description: string[];
}

export default function BrandOverview({ description }: BrandOverviewProps) {
  return (
    <div className=" rounded-xl border border-gray-200 p-4 md:p-6 space-y-4 text-[15px]  leading-[1.8]">
      {description.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
}
