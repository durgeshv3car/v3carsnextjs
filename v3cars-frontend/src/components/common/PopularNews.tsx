'use client'

import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";

const images = [
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",
    "/car-news/car.png",

];

interface ArticleThumbnail {
    url: string;
    alt: string;
}

interface ArticleAuthor {
    id: number;
    name: string;
    slug: string;
}

export interface Article {
    id: number;
    title: string;
    pageUrl: string;
    publishDateandTime: string; // ISO Date string
    shortDescription: string;   // HTML string
    thumbnail: ArticleThumbnail;
    author: ArticleAuthor;
    commentsCount: number;
}

interface PopularNewsProps {
    title: string;
    data: Article[];
}

export default function PopularNews({ title, data }: PopularNewsProps) {
    return (
        <div className=" rounded-xl p-4 space-y-4 border my-5 hidden lg:block dark:border-[#2E2E2E]">
            {/* Heading */}
            <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                <h3 className="text-[18px] font-semibold">{title}</h3>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3">
                {data.map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <Image
                            src={`${IMAGE_URL}${item.thumbnail.url}`}
                            alt={`Popular news ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}
