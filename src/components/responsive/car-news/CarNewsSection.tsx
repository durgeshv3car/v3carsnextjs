
import Link from "next/link";
import CarNewsTile from "./CarNewsTile";
import { MdChevronRight } from "react-icons/md";

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
    <section className="">
      <div className="lg:border border-gray-200 rounded-lg lg:p-4  shadow-sm">
        {/* Top Heading */}
        <div className="mb-4">
          <h2 className="text-[18px] font-semibold  hidden lg:block">{title}</h2>
        </div>

        {/* Cards + View All Link inside border */}
        <div className="space-y-4">
          {/* Card Grid */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, i) => (
              <CarNewsTile key={i} {...item} />
            ))}
          </div>

          {/* View All Link with Icon */}
          <div>
            <Link
              href={viewAllLink}
              className=" text-blue-600 text-sm font-medium hover:underline hidden lg:block"
            >

              <div className="flex items-center">

                <p>
                  {viewAllText}
                </p>

                <p>
                  <MdChevronRight className="text-xl" />
                </p>
              </div>

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
