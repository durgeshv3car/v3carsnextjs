import { Metadata } from "next";
import MainComponent from "@/components/responsive/home/MainComponent";

export const metadata: Metadata = {
  title: "V3Cars - Latest Car News, Reviews, Launches, Comparisons & Prices",
  description:
    "Get latest car news, reviews, comparisons, price updates, upcoming launches and much more from the Indian automobile industry at V3Cars.",
  keywords: [
    "V3Cars",
    "car news",
    "car reviews",
    "car launches",
    "car comparison",
    "car prices",
    "Indian cars",
    "new cars in India",
    "automobile news India",
  ],
};

export default function Page() {
  return <MainComponent />;
}
