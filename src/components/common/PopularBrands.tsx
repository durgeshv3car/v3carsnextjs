'use client'

import Link from "next/link";

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


function PopularBrands() {
    return (
        <div className="rounded-xl bg-white dark:bg-[#171717] border border-gray-300 dark:border-[#262626] overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
            <div className="font-bold text-lg">Popular Brands</div>

            <div className="grid grid-cols-2 gap-4 flex-grow">
                {brands.slice(0, 10).map((brand, i) => (
                    <div key={i} className="min-w-[156px] h-[96px] bg-white flex items-center justify-center shadow border border-[#D9D9D9] rounded-2xl">
                        <img src={brand.logo} alt={brand.name} className="max-h-[50px] object-contain" />
                    </div>
                ))}

                <Link href={"#"} className='col-span-2 text-lg text-blue-500 hover:underline font-semibold p-3 flex items-center gap-2 w-full justify-center'>
                    View All Brands
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default PopularBrands;