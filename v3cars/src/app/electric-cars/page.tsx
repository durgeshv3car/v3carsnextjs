import MainElectricCarComponent from "@/components/responsive/electric-cars/MainElectricCarComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Electric Cars in India 2024 | Prices, Range, Images & More - V3Cars",
    description:
        "Explore the top electric cars in India in 2024. Compare EV prices, battery range, charging time, images, and features from brands like Tata, MG, Hyundai, Mahindra, and more.",
    keywords: [
        "electric cars India 2024",
        "EV cars India",
        "electric car price",
        "electric SUV",
        "electric vehicle range",
        "Tata electric cars",
        "MG EV models",
        "Hyundai electric car",
        "Mahindra electric SUV",
        "affordable electric cars",
        "best electric cars India",
        "V3Cars EV comparison",
    ],
};

function Page() {

    return (
        <MainElectricCarComponent />
    );
}

export default Page;
