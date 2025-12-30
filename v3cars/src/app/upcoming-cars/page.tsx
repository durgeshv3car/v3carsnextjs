import MainUpcomingComponent from "@/components/responsive/upcoming-cars/MainUpcomingComponent";
import { Metadata } from "next";


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

function Page() {

    return (
        <MainUpcomingComponent />
    );
}

export default Page;