'use client'

import Image from "next/image";

const brands = [
    { name: "Maruti Suzuki Arena", logo: "/car-brands/suzuki.png" },
    { name: "Mahindra", logo: "/car-brands/mahindra.png" },
    { name: "Toyota", logo: "/car-brands/toyota.png" },
    { name: "Hyundai", logo: "/car-brands/hyundai.png" },
    { name: "Volkswagen", logo: "/car-brands/w.png" },
    { name: "Renault", logo: "/car-brands/renault.png" },
    { name: "Nexa", logo: "/car-brands/nexa.png" },
    { name: "Tata", logo: "/car-brands/tata.png" },
    { name: "Kia", logo: "/car-brands/kia.png" },
    { name: "Honda", logo: "/car-brands/honda.png" },
    { name: "Skoda", logo: "/car-brands/skoda.png" },
    { name: "Nissan", logo: "/car-brands/nisaan.png" },
];


function UpcomingCars() {
    return (
        <div className="rounded-xl bg-white dark:bg-[#171717] border border-gray-300 dark:border-[#262626] overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
            <div className="font-bold text-lg">Upcoming Cars</div>

            <div className="grid grid-cols-2 gap-4 flex-grow">
                {brands.slice(0, 10).map((brand, i) => (
                    <div
                        key={i}
                        className="min-w-[156px] h-[96px] bg-white flex items-center justify-center shadow border border-[#D9D9D9] rounded-2xl"
                    >
                        <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={120}   // max width for logo
                            height={50}   // max height
                            className="object-contain max-h-[50px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingCars;