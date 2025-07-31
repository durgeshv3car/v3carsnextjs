import CarNewsTile from "./CarNewsTile";

interface CarNewsSectionProps {
  title: string;
  viewAllLink: string;
  viewAllText: string;
  data: {
    image: string;
    title: string;
    desc: string;
    author: string;
    date: string;
  }[];
}

export default function CarNewsSection({
  title,
  viewAllLink,
  viewAllText,
  data,
}: CarNewsSectionProps) {
  return (
    <section className="my-8">
      {/* Top Heading */}
      <div className="px-2 mb-4">
        <h2 className="text-[18px] font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Card Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.map((item, i) => (
          <CarNewsTile key={i} {...item} />
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-4 px-2">
        <a
          href={viewAllLink}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          {viewAllText} →
        </a>
      </div>
    </section>
  );
}
