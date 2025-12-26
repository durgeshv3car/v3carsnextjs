import MainLatestCarComponent from "@/components/responsive/latest-launched-cars/MainLatestCarComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest Car Launches in India 2024 | New Car Prices, Images & Specs",
    description:
        "Discover the latest car launches in India in 2024. Get updated prices, specs, images, and features of newly launched cars from top brands like Maruti, Hyundai, Tata, Mahindra, Kia and more.",
    keywords: [
        "latest car launches India",
        "new cars 2024",
        "recently launched cars",
        "new car prices India",
        "new SUV launch",
        "car images and specs",
        "Maruti new cars",
        "Hyundai latest cars",
        "Tata recent launches",
        "Mahindra new models",
        "Kia India latest cars",
        "electric car launches",
        "V3Cars"
    ],
};


function Page() {

    return (
        <MainLatestCarComponent />
    );
}

export default Page;