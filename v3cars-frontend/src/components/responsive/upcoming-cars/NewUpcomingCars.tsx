'use client'

import { useGetUpcomingCarsQuery } from '@/redux/api/upcomingApi'
import { IMAGE_URL } from '@/utils/constant'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'

const confidenceColor = (confidence: number): string => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
}

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string;
}

interface Image {
    name: string;
    alt: string;
    url: string;
}

interface CarModel {
    modelId: number;
    modelName: string;
    modelSlug: string;
    brandId: number;
    modelBodyTypeId: number;
    isUpcoming: boolean;
    launchDate: string;
    totalViews: number;
    expectedBasePrice: number;
    expectedTopPrice: number;
    brand: Brand;
    priceMin: number | null;
    priceMax: number | null;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
    image: Image;
    imageUrl: string;

    // Extra fields for UI
    confidence: number;
    price: string;
    expectedLaunch: string;
}

export default function NewUpcomingCars() {
    const { data: upcomingData, error, isLoading } = useGetUpcomingCarsQuery();

    // Calculate maxViews for confidence
    const maxViews =
        Math.max(...(upcomingData?.rows.map((c: any) => c.totalViews) ?? [1]));

    // Map API response into UI-friendly CarModel[]
    const upcomingCars: CarModel[] =
        upcomingData?.rows.map((car: any) => ({
            ...car,
            confidence: Math.round((car.totalViews / maxViews) * 100),
            price:
                car.expectedBasePrice > 0
                    ? `₹${car.expectedBasePrice.toLocaleString()} - ₹${car.expectedTopPrice.toLocaleString()}`
                    : "TBA",
            expectedLaunch: new Date(car.launchDate).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
            }),
        })) ?? [];

    if (isLoading) {
        return <p>Loading upcoming cars...</p>
    }

    if (error) {
        return <p className="text-red-500">Failed to load cars</p>
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-5">New Upcoming Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-[#FFFFFF] dark:bg-[#27262B] border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                {upcomingCars.map((car, idx) => (
                    <div
                        key={idx}
                        className={`dark:bg-[#171717] rounded-xl shadow-lg overflow-hidden min-h-[275px] lg:h-[487px] flex-shrink-0 flex flex-col border-b-[6px] ${car.confidence >= 90
                            ? "border-[#3D923A]"
                            : car.confidence >= 70
                                ? "border-[#F08200]"
                                : "border-[#D40808]"
                            }`}
                    >
                        {/* Image Section */}
                        <div className="rounded-xl shadow-sm">
                            <div className="relative h-[184px] lg:h-[242px]">
                                <img
                                    src={
                                        car.image?.url
                                            ? `${IMAGE_URL}/media/model-imgs/${car.image.url}`
                                            : "/coming-soon-car.jpg"
                                    }
                                    alt={car.image.alt}
                                    className="h-full w-full object-cover shadow-md"
                                />
                                <div className="absolute top-2 left-2 flex items-center bg-[#E7E7E7] dark:bg-[#171717] px-2 py-1 rounded-full space-x-2">
                                    <span
                                        className={`w-3 h-3 rounded-full ${confidenceColor(
                                            car.confidence
                                        )}`}
                                    />
                                    <p className="text-xs">Confidence {car.confidence}%</p>
                                </div>
                                <button className="absolute top-2 right-2 bg-[#E7E7E7] dark:bg-[#171717] rounded-full p-1 shadow">
                                    <IoMdStarOutline />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div
                                className={`grid grid-cols-2 justify-between text-sm lg:text-base items-center my-4`}
                            >
                                <div className="border-r border-[#0000004D] dark:border-[#2E2E2E] text-center mx-4">
                                    <p className="text-gray-500 font-medium truncate">
                                        {car.brand.name}
                                    </p>
                                    <p className="font-semibold truncate">{car.modelName}</p>
                                </div>

                                <div className="text-center mx-4">
                                    <p className="text-gray-500">Expected Launch</p>
                                    <p className="font-semibold">{car.expectedLaunch}</p>
                                </div>
                            </div>
                        </div>

                        {/* Price & Button */}
                        <div
                            className={`flex flex-col justify-around gap-2 p-4 items-center text-sm lg:text-base flex-grow`}
                        >
                            <p className="font-medium text-xl">
                                ₹{car.priceMin != null ? (car.priceMin / 100000).toFixed(2) : "TBA"} - {car.priceMax != null ? (car.priceMax / 100000).toFixed(2) : "TBA"} Lakh*
                            </p>
                            <p className="text-gray-500 text-sm">*Expected Launch Price</p>
                            <button className="p-3 font-semibold text-sm w-full flex justify-center gap-2 text-black items-center cursor-pointer rounded-lg bg-yellow-400">
                                Alert Me When Launched
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}

                <Link
                    href={"#"}
                    className="text-lg text-blue-500 hover:underline font-semibold p-3 flex items-center gap-2 w-fit"
                >
                    View All Upcoming Cars
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </Link>
            </div>
        </>
    )
}
