'use client'

import { useGetModelCompetitorsQuery } from '@/redux/api/carModuleApi'
import { IMAGE_URL } from '@/utils/constant'
import { convertToSlug } from '@/utils/helperFunction'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BiTachometer } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdStarOutline } from 'react-icons/io'
import { PiEngine } from 'react-icons/pi'

interface CommonCompetitorCardProps {
    title: string;
    slug: string;
    cityName: string;
}

export interface CarImage {
    name: string;
    alt: string;
    url: string;
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface CarOverviewShort {
    modelId: number;
    name: string;
    slug: string;
    image: CarImage;
    priceRange: PriceRange;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
}

const CommonCompetitorCard: React.FC<CommonCompetitorCardProps> = ({ title, slug, cityName }) => {
    const { data: modelComparisonSimilarData } = useGetModelCompetitorsQuery({ model_slug: slug });

    const similarCars: CarOverviewShort[] = modelComparisonSimilarData?.items ?? [];

    const carList = similarCars.map(car => ({
        modelId: car.modelId,
        modelName: car.name,
        modelSlug: car.slug,
        imageUrl: car.image.url,

        // Engine & Mileage
        powerPS: car.powerPS,
        torqueNM: car.torqueNM,
        mileageKMPL: car.mileageKMPL,

        // Price
        priceMin: car.priceRange.min,
        priceMax: car.priceRange.max,

        // Brand
        brand: {
            name: car.slug.split("-")[0],
            slug: car.slug.split("-")[0]
        },

        image: car.image
    }));

    const router = useRouter()

    return (
        <div className="space-y-3 mt-4">
            <h2 className="text-xl font-semibold"><span className='font-normal'>{title}</span> Competitors</h2>
            <p className='text-sm'>The Maruti Suzuki Dzire competes with several cars in its segment, offering similar features and price ranges. Here are some popular alternatives you can check to view their on-road prices and decide which one fits your needs best.</p>

            {/* Cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {carList.map((car) => (
                    <div
                        key={car.modelId}
                        className="rounded-xl border border-[#DEE2E6] dark:border-[#2E2E2E] overflow-hidden h-auto flex-shrink-0 flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative h-[225px] w-full rounded-md overflow-hidden">
                            <Image
                                src={`${IMAGE_URL}/media/model-imgs/${car.imageUrl}`}
                                alt={car.image.alt || car.brand.name}
                                fill
                                sizes="(max-width: 1280px) 100vw, 400px"
                                priority={false}
                                className="object-cover shadow-md rounded-md"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-white font-semibold uppercase">{car.brand.name}</p>
                            </div>

                            {/* Favorite Button */}
                            <button className="absolute top-2 right-2 bg-white dark:bg-[#171717] rounded-full p-2 shadow">
                                <IoMdStarOutline />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="bg-white dark:bg-[#171717] px-2 py-4 flex-grow text-center flex flex-col justify-between gap-4">
                            <p className="font-semibold text-xl">{car.modelName}</p>
                            <div className='border-t border-b border-[#E9E9E9] dark:border-[#2E2E2E] p-2'>
                                <p className="text-xs">
                                    Starting On-Road Price
                                </p>
                                <p className="font-semibold text-2xl">
                                    ₹{(car.priceMin / 100000).toFixed(2)} - {(car.priceMax / 100000).toFixed(2)} Lakh*
                                </p>
                            </div>
                            <div className="flex gap-2 items-center justify-around">
                                <p className="flex items-center gap-1 text-sm">
                                    <PiEngine size={18} />
                                    {car.powerPS} PS
                                </p>
                                <p className="flex items-center gap-1 text-sm">
                                    <PiEngine size={18} />
                                    {car.torqueNM} Nm
                                </p>
                                <p className="flex items-center gap-1 text-sm">
                                    <BiTachometer size={18} />
                                    {car.mileageKMPL} kmpl
                                </p>
                            </div>
                            <button
                                className="p-3 text-sm w-full flex justify-between items-center text-black cursor-pointer rounded-lg bg-primary"
                                onClick={() => { router.push(`/${car.brand.slug}/${car.modelSlug}/on-road-price-in-${convertToSlug(cityName)}`) }}
                            >
                                Check {car.modelName} On-road Price
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonCompetitorCard;