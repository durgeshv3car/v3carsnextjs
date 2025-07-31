import Image from "next/image";
import { FiUser, FiCalendar } from "react-icons/fi";

interface CarNewsTileProps {
  image: string;
  title: string;
  desc: string;
  author: string;
  date: string;
}

export default function CarNewsTile({
  image,
  title,
  desc,
  author,
  date,
}: CarNewsTileProps) {
  return (

    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">

      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-[280px] object-cover"
      />

      <div className="p-4">

        <h3 className="text-[18px] font-semibold text-gray-800 leading-tight mb-5 line-clamp-2">
          {title}
        </h3>

        <p className="text-[15px] text-gray-600 mb-3 line-clamp-2">{desc}</p>

        <div className="flex items-center justify-between text-gray-500 text-[12px]">

          <div className="flex items-center gap-2">
            <FiUser className="text-[13px]" />
            {author}
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-[13px]" />
            {date}
          </div>

        </div>
        
      </div>
    </div>
  );
}
