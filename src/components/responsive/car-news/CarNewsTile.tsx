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

    <div className=" border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">

      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full lg:h-[280px] object-cover"
      />

      <div className="md:p-4 p-2">

        <h3 className="lg:text-[18px] text-[12px] font-semibold text-gray-800 dark:text-white leading-tight mb-2 lg:mb-5 line-clamp-2">
          {title}
        </h3>

        <p className="lg:text-[15px] text-[12px] text-gray-600 dark:text-white mb-3 line-clamp-2">{desc}</p>

        <div className="flex items-center justify-between text-gray-500 dark:text-white">

          <div className="flex items-center md:gap-2 gap-1 lg:text-[13px] text-[10px]">
            <FiUser className=" " />
            {author}
          </div>

          <div className="flex items-center md:gap-2 gap-1 lg:text-[13px] text-[10px]">
            <FiCalendar className="" />
            {date}
          </div>

        </div>
       
      </div>
    </div>
  );
}

