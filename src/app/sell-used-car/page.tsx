
import SellUsedCarPage from "@/components/responsive/sell-used/SellUsedCarPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compare Cars in India | Specs, Features, Prices - V3Cars",
    description:
        "Compare cars in India by price, features, mileage, specifications & more. Use V3Cars' car comparison tool to find the best car for you.",
    keywords: [
        "compare cars India",
        "car comparison tool",
        "car specs comparison",
        "price comparison cars",
        "V3Cars compare",
        "car features comparison",
    ],
};

function SellUsedCar() {
    return (
        <>
          <SellUsedCarPage/>
        </>
    );
}

export default SellUsedCar;