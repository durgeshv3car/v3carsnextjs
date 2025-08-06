import { Metadata } from "next";
import FiltersSection from "@/components/responsive/advance-search/FilterSection";
import Link from "next/link";
import SearchResult from "@/components/responsive/advance-search/SearchResult";

export const metadata: Metadata = {
    title: "Upcoming Cars in India 2024-2025 | Latest Launches, Prices, Images",
    description:
        "Explore all upcoming cars in India in 2024-2025 with expected prices, launch dates, images, and detailed specs. Stay updated on SUVs, hatchbacks, sedans, and electric cars from top brands like Maruti, Hyundai, Tata, Mahindra, and Kia.",
    keywords: [
        "upcoming cars India",
        "new car launches 2024",
        "upcoming SUV launches",
        "new cars in India 2025",
        "car launch dates",
        "expected car prices",
        "Maruti Suzuki upcoming cars",
        "Hyundai new cars",
        "Tata upcoming launches",
        "Mahindra car launch",
        "Kia India new cars",
        "electric cars India",
        "V3Cars"
    ]
};


function AdvanceSearch() {
    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:max-w-[1600px] mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Search / New Cars
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-full lg:min-w-[24%] space-y-10">
                            <FiltersSection />
                        </div>
                        <div className="w-auto lg:min-w-[74%]">
                            <SearchResult />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default AdvanceSearch;