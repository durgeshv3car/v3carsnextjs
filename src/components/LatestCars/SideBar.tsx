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

function SideBar() {
    return (
        <>
            <div className="space-y-10">

                <div className="h-[300px] bg-[#D9D9D9] flex justify-center items-center">
                    <img
                        src={"/upcoming/ad.png"}
                        alt="ad image"
                        className="rounded-xl"
                    />
                </div>

                <div className="rounded-xl bg-white border border-gray-300 overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
                    <div className="font-bold text-lg text-black">Upcoming Cars</div>

                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        {brands.slice(0, 10).map((brand, i) => (
                            <div key={i} className="min-w-[156px] h-[96px] bg-white flex items-center justify-center shadow border border-[#D9D9D9] rounded-2xl">
                                <img src={brand.logo} alt={brand.name} className="max-h-[50px] object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-300 overflow-hidden h-[720px]">
                    <div className="bg-[#DEE2E6] px-4 py-3 font-bold text-lg text-black">Upcoming Cars By Top Brands</div>
                    <ul className="divide-y divide-gray-200 bg-white h-[663px] text-black overflow-y-auto">
                        {[
                            "Upcoming Maruti Arena Cars In India",
                            "Upcoming Tata Cars In India",
                            "Upcoming Maruti Nexa Cars In India",
                            "Upcoming Hyundai Cars In India",
                            "Upcoming Kia Cars In India",
                            "Upcoming Mahindra Cars In India",
                            "Upcoming Maruti Arena Cars In India",
                            "Upcoming Toyota Cars In India",
                            "Upcoming Honda Cars In India",
                            "Upcoming Honda Cars In India",
                            "Upcoming Honda Cars In India",
                            "Upcoming Honda Cars In India",
                        ].map((item, index) => (
                            <li key={index} className="px-4 py-3 bg-white cursor-pointer flex items-center gap-2">
                                <img src={"/logo/v3.svg"} alt="v3car" className="w-4 h-4" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl bg-white border border-gray-300 overflow-hidden h-[720px] p-3 space-y-4 flex flex-col ">
                    <div className="font-bold text-lg text-black">Popular Brands</div>

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

                <div className="h-[300px] bg-[#D9D9D9] flex justify-center items-center">
                    <img
                        src={"/upcoming/ad.png"}
                        alt="ad image"
                        className="rounded-xl"
                    />
                </div>

            </div>
        </>
    );
}

export default SideBar;