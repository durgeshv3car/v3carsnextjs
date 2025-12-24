'use client'

import { getLaunchProbability } from '@/components/common/UpcomingCarInIndia'
import CustomTooltip from '@/components/ui/custom-tooltip/CustomTooltip'
import { useGetLatestCarsQuery } from '@/redux/api/carModuleApi'
import { IMAGE_URL } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'

const confidenceColor = (confidence: number): string => {
    if (confidence >= 70) return "bg-[#3D923A]"
    if (confidence >= 40) return "bg-[#F08200]"
    return "bg-[#D40808]"
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
    confidencePercent: number;
    image: Image;
    imageUrl: string;

    // Extra fields for UI
    price: string;
    expectedLaunch: string;
}

interface NewCarsLaunchedProps {
    selected: string
}

const currentYear = new Date().getFullYear();

export default function NewCarsLaunched({ selected }: NewCarsLaunchedProps) {
    const { data: latestCarData, error, isLoading } = useGetLatestCarsQuery({ launchMonth: selected! }, { skip: !selected });

    // Map API response to CarModel[]
    const latestCars: CarModel[] =
        latestCarData?.rows.map((car: CarModel) => ({
            ...car,
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
        return <p>Loading latest cars...</p>
    }

    if (error) {
        return <p className="text-red-500">Failed to load latest cars</p>
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-5">New Cars Launched in {currentYear}</h2>
            <div className='p-2 bg-[#FFFFFF] dark:bg-[#27262B] border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestCars.map((car, idx) => (
                        <div
                            key={idx}
                            className={`dark:bg-[#171717] rounded-xl shadow-lg overflow-hidden flex flex-col border-b-[6px] ${car.confidencePercent >= 90
                                ? "border-[#3D923A]"
                                : car.confidencePercent >= 70
                                    ? "border-[#F08200]"
                                    : "border-[#D40808]"
                                }`}
                        >
                            {/* Image Section */}
                            <div className="rounded-xl shadow-sm">
                                <div className="relative">
                                    <Image
                                        src={
                                            car.image?.url
                                                ? `${IMAGE_URL}/media/model-imgs/${car.image.url}`
                                                : "/coming-soon-car.jpg"
                                        }
                                        alt={car.image.alt}
                                        width={500}
                                        height={200}
                                        className="h-full w-full shadow-md"
                                    />

                                    <div className="absolute top-2 left-2">
                                        <CustomTooltip text={getLaunchProbability(car.confidencePercent)} tooltipClassName='bg-white dark:bg-[#171717] dark:border-[#2e2e2e]'>
                                            <div className='flex items-center bg-[#E7E7E7] dark:bg-[#171717] px-2 py-1 rounded-full space-x-2 cursor-default'>
                                                <span className={`w-3 h-3 rounded-full ${confidenceColor(car.confidencePercent)}`} />
                                                <p className="text-xs">Confidence {car.confidencePercent === null ? "0" : car.confidencePercent}%</p>
                                            </div>
                                        </CustomTooltip>
                                    </div>

                                    <button className="absolute top-2 right-2 bg-[#E7E7E7] dark:bg-[#171717] rounded-full p-1 shadow">
                                        <IoMdStarOutline />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="grid grid-cols-2 justify-between text-sm lg:text-base items-center my-4">
                                    <div className="border-r border-[#0000004D] dark:border-[#2E2E2E] text-center mx-4">
                                        <p className="text-gray-500 font-medium truncate">{car.brand.name}</p>
                                        <p className="font-semibold truncate">{car.modelName}</p>
                                    </div>

                                    <div className="text-center mx-4">
                                        <p className="text-gray-500">Launch Date</p>
                                        <p className="font-semibold">{car.expectedLaunch}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Button */}
                            <div className="flex flex-col justify-around gap-2 p-4 items-center text-sm lg:text-base flex-grow">
                                <p className="font-medium text-xl">
                                    ₹{car.priceMin != null ? (car.priceMin / 100000).toFixed(2) : "TBA"} - {car.priceMax != null ? (car.priceMax / 100000).toFixed(2) : "TBA"} Lakh*
                                </p>
                                <p className="text-gray-500 text-sm">*Launch Price</p>
                                <button className="p-3 font-semibold text-sm w-full flex justify-center gap-2 items-center cursor-pointer rounded-lg bg-primary text-black">
                                    Alert Me When Launched
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href={"#"}
                    className="col-span-1 sm:col-span-2 lg:col-span-3 text-blue-500 hover:underline font-semibold p-2 pb-0 flex items-center gap-2 w-fit"
                >
                    View All Newly Launched Cars
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
