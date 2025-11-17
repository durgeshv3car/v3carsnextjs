import MainAutoExpoComponent from '@/components/responsive/auto-expo/MainAutoExpoComponent';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auto Expo 2025 – New Car Launches, EV Debuts & Concept Cars | AutoNews India",
    description:
        "Catch all the latest from Auto Expo 2025: new car launches, EV unveilings, concept vehicles, and major announcements from Tata, Maruti, Hyundai, and more – live from Delhi.",
    keywords: [
        "Auto Expo 2025",
        "Auto Expo India",
        "Delhi Auto Expo",
        "Car Launches 2025",
        "EV Cars India",
        "Auto Show 2025",
        "Concept Cars India",
        "Tata Motors Auto Expo",
        "Maruti Suzuki Auto Expo",
        "Electric Vehicles Expo",
        "AutoNews India",
    ],
};


export default function Page() {

    return (
        <MainAutoExpoComponent />
    );
}