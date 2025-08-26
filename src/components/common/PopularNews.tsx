import Image from "next/image";

const images = [
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
   
];

export default function PopularNews() {
    return (
        <div className=" rounded-xl p-4 space-y-4 border my-5 hidden lg:block dark:border-[#2E2E2E]">
            {/* Heading */}
            <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                <h3 className="text-[18px] font-semibold">Popular News</h3>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3">
                {images.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <Image
                            src={src}
                            alt={`Popular news ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}
