import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FaRssSquare } from "react-icons/fa";

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

export default function RSSFeed() {
    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Rss Feed</span>
                    </div>
                </div>
            </div>

            <div>
                {/* Header */}
                <div className="relative p-4 flex items-center min-h-[310px] justify-between overflow-hidden mt-[1px]">
                    <div
                        className="absolute inset-0 top-0 right-0 bg-no-repeat bg-cover"
                        style={{ backgroundImage: "url('/rss-feed.png')" }}
                    />

                    {/* Foreground Content */}
                    <h1 className="relative z-10 text-6xl font-bold w-full lg:app-container mx-auto text-black text-center flex flex-col">
                        RSS
                        <span className="text-4xl font-normal">(Really Simple Syndication)</span>
                    </h1>
                </div>

                {/* Content */}
                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto my-6 space-y-6">
                        <p>
                            To use RSS, you need to get hold of an application called a news reader. There are many ways to choose from
                            freeware to shareware. News readers display RSS feeds from your chosen web sites on your computer. All you
                            have to do to get setup is choose which feeds you want, for example, the latest new stories from V3Cars India.
                        </p>

                        {/* Feeds List */}
                        <ul className="space-y-2">
                            {feeds.map((feed, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <FaRssSquare className="text-orange-500 w-4 h-4" />
                                    <a
                                        href={feed.href}
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        {feed.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}


  const feeds = [
    { label: "All content", href: "#" },
    { label: "News", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Variants Explained", href: "#" },
    { label: "Latest Press Release", href: "#" },
    { label: "Comparison", href: "#" },
    { label: "Videos", href: "#" },
    { label: "Feature Explained", href: "#" },
    { label: "Car Guide", href: "#" },
    { label: "Auto Expo", href: "#" },
  ];