import MainCarNewsComponent from '@/components/responsive/car-news/MainCarNewsComponent';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Car & Bike News in India – EV Updates, Launch Dates & Auto Industry Insights",
  description:
    "Stay updated with the latest car news, bike launches, EV trends, reviews, and auto industry updates from India. Your daily dose of automotive news and upcoming vehicle insights.",
  keywords: [
    "Car News India",
    "Bike News India",
    "Electric Vehicle News",
    "Tata Motors Updates",
    "Mahindra New Cars",
    "Maruti Suzuki Launch",
    "Car Launch Dates 2025",
    "EV Cars in India",
    "Automobile Industry India",
    "AutoNews India",
  ],
};


export default function Page() {

  return (
    <MainCarNewsComponent />
  );
}
