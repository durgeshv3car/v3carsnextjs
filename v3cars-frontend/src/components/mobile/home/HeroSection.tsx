'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CiSearch } from 'react-icons/ci';
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setBodyTypeIds, setBrandIds, setPriceBucket } from '@/redux/slices/advanceSearchSlice';
import { useRouter } from 'next/navigation';
import { useGetHeroBannersQuery } from '@/redux/api/homeModuleApi';

const slides = [
    {
        image: '/images/mobile-banner.webp',
        title: 'Tata Altroz Racer',
        tagline: 'More Performance,\nBig on Features',
    },
];

interface MobileHeroSectionProps {
    selectBrand: number | null;
    setSelectBrand: React.Dispatch<React.SetStateAction<number | null>>;
    data: CarBrand[];
    models: CarModel[]
}

interface CarBrand {
    brandId: number
    brandName: string
    brandSlug: string
    logoPath: string
    popularity: string
    unquieViews: number | null
    brandStatus: number
    serviceNetwork: boolean
    brandType: number
}
interface CarImage {
    name: string
    alt: string
    url: string
}

interface CarModel {
    modelId: number
    modelName: string
    modelSlug: string
    brandId: number
    modelBodyTypeId: number
    isUpcoming: boolean
    launchDate: string // ISO date string
    totalViews: number
    expectedBasePrice: number
    expectedTopPrice: number
    brand: {
        id: number
        name: string
        slug: string
        logo: string
    }
    priceMin: number
    priceMax: number
    powerPS: number
    torqueNM: number
    mileageKMPL: number
    image: CarImage
    imageUrl: string
}

const budgetOptions = [
    { id: 1, label: 'Below ₹5 Lakh', value: 'UNDER_5L' },
    { id: 2, label: '₹5 Lakh - ₹10 Lakh', value: 'BETWEEN_5_10L' },
    { id: 3, label: '₹10 Lakh - ₹20 Lakh', value: 'BETWEEN_10_20L' },
    { id: 4, label: '₹20 Lakh - ₹40 Lakh', value: 'BETWEEN_20_40L' },
    { id: 5, label: 'Above ₹40 Lakh', value: 'ABOVE_40L' },
]

const allVehicleTypes = [
    { id: 1, name: 'Hatchback' },
    { id: 3, name: 'SUV' },
    { id: 4, name: 'Sedan' },
    { id: 5, name: 'Crossover' },
    { id: 6, name: 'Pickup Truck' },
    { id: 7, name: 'MUV' },
    { id: 8, name: 'Coupe' },
    { id: 9, name: 'Convertible' },
]

interface AllVehicleTypes {
    id: number
    name: string
}

const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({ selectBrand, setSelectBrand, data, models }) => {
    const { data: heroBannerData } = useGetHeroBannersQuery()
    const [modelId, setModelId] = useState<number | null>(null)
    const [budget, setBudget] = useState<string>("")
    const [vehicleType, setVehicleType] = useState<number | null>(null)
    const [activeTab, setActiveTab] = useState('budget');
    const dispatch = useDispatch();
    const router = useRouter()

    console.log(heroBannerData);

    function normalizeBrandName(name: string) {
        const lower = name.toLowerCase();
        if (lower === "maruti arena" || lower === "maruti nexa") {
            return "Maruti Suzuki";
        }
        return name;
    }

    function handleSearch() {

        if (activeTab === "budget") {
            if (!budget) {
                alert("Budget Not Selected");
                return;
            }

            if (!vehicleType) {
                alert("Vehicle Not Selected");
                return;
            }

            dispatch(setPriceBucket(budget));
            dispatch(setBodyTypeIds([vehicleType]));

        } else {
            if (!selectBrand) {
                alert("Brand Not Selected");
                return;
            }

            dispatch(setBrandIds([selectBrand]));
        }

        // 🔹 Common redirect
        router.push("/search/new-cars");
    }

    function splitBrands(brands: CarBrand[]) {
        const normalizedBrands = brands.map((b) => ({
            ...b,
            displayName: normalizeBrandName(b.brandName),
        }));

        // Sort by popularity
        const sorted = [...normalizedBrands].sort((a, b) => {
            const pa = a.popularity && a.popularity.trim() !== "" ? Number(a.popularity) : Infinity;
            const pb = b.popularity && b.popularity.trim() !== "" ? Number(b.popularity) : Infinity;
            return pa - pb;
        });

        // Deduplicate by displayName
        const seen = new Set<string>();
        const uniqueSorted = sorted.filter((b) => {
            if (seen.has(b.displayName)) return false;
            seen.add(b.displayName);
            return true;
        });

        const popularBrands = uniqueSorted
            .filter((b) => b.popularity && b.popularity.trim() !== "")
            .slice(0, 10);

        const allBrands = uniqueSorted
            .filter((b) => !popularBrands.includes(b))
            .sort((a, b) => a.displayName.localeCompare(b.displayName));

        return {
            groupedOptions: [
                { label: "Popular Brands", options: popularBrands },
                { label: "All Brands", options: allBrands },
            ],
        };
    }

    const { groupedOptions } = splitBrands(data)

    return (
        <div className='space-y-4 px-4 py-2'>
            {/* Top Slider */}
            <Swiper
                modules={[Pagination, Autoplay]}
                loop
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                pagination={{
                    el: '.custom-pagination',
                    clickable: true,
                    bulletClass: 'swiper-custom-bullet',
                    bulletActiveClass: 'swiper-custom-bullet-active',
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            width={400}
                            height={200}
                            priority
                            className="w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-pagination flex items-center gap-2" />

            {/* Feature Tiles */}
            <div className="flex items-center justify-evenly w-full h-[243px] gap-4">
                {/* Left Tile */}
                <div
                    className="w-[150px] sm:w-full h-full bg-cover bg-center rounded-lg overflow-hidden"
                    style={{ backgroundImage: 'url("/images/on-road-price.png")' }}
                    onClick={() => { router.push('/car-on-road-price-in-india') }}
                >
                    <div className="bg-black/40 w-full h-full flex items-center justify-center px-2 text-white text-sm font-medium text-center">
                        Check on-road price
                    </div>
                </div>

                {/* Right Side Grid */}
                <div className="w-[222px] sm:w-full h-full flex flex-col justify-between gap-4">
                    <div
                        className="h-[116px] bg-[#338177] relative rounded-lg overflow-hidden flex items-end justify-end"
                        onClick={() => { router.push('/fuel-price-in-india') }}
                    >
                        <span className="absolute top-2 left-2 text-white text-sm font-medium z-20">
                            Fuel price in India
                        </span>

                        <Image
                            src="/images/fuel-price-in-india.png"
                            alt="fuel-price-in-india"
                            width={222}
                            height={116}
                            loading="lazy"
                            className="object-contain object-right w-full h-full"
                        />

                    </div>

                    {/* Bottom Two Tiles */}
                    <div className="flex gap-4 h-[116px]">

                        <div
                            className="bg-black flex-1 relative rounded-lg overflow-hidden flex flex-col border dark:border-[#262629]"
                            onClick={() => { router.push('/fuel-cost-calculator') }}
                        >
                            <span className="absolute top-2 left-2 text-white text-sm font-medium z-20">
                                Fuel cost calculator
                            </span>

                            <Image
                                src="/images/fuel-cost-calculator.png"
                                alt="fuel-cost-calculator"
                                width={100}
                                height={100}
                                loading="lazy"
                                className="object-contain object-bottom p-3 w-full h-full"
                            />
                        </div>

                        {/* Right Bottom Tile */}
                        <div
                            className="bg-[#FFC414] flex-1 relative rounded-lg overflow-hidden flex flex-col"
                            onClick={() => { router.push('/mileage-calculator') }}
                        >
                            <span className="absolute top-2 left-2 text-sm font-medium z-20">
                                Mileage calculator
                            </span>

                            <Image
                                src="/images/mileage-calculator.png"
                                alt="mileage-calculator"
                                width={100}
                                height={100}
                                loading="lazy"
                                className="object-contain object-bottom p-3 w-full h-full"
                            />

                        </div>

                    </div>
                </div>
            </div>

            {/* Filter Card */}
            <div className="bg-[#EEEEEE] dark:bg-[#171717] rounded-xl shadow-md border border-gray-300 dark:border-[#262629]">

                <div className="grid grid-cols-2 mt-2">
                    {['budget', 'model'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center justify-center gap-2 py-3 text-sm font-medium`}
                        >
                            <span
                                className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${activeTab === tab ? 'border-primary' : 'border-gray-400'
                                    }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${activeTab === tab ? 'bg-primary' : ''
                                        }`}
                                />
                            </span>
                            By {tab === 'budget' ? 'Budget' : 'Model'}
                        </button>
                    ))}
                </div>

                <div className="p-4 space-y-4">
                    {activeTab === 'budget' ? (
                        <div className='flex items-center gap-2 text-xs'>

                            <div className='w-full border-b dark:border-[#2E2E2E]'>
                                <CustomSelect
                                    options={budgetOptions}
                                    placeholder="Select Budget"
                                    labelKey="label"
                                    valueKey="value"
                                    value={budget}
                                    onSelect={(budget) => {
                                        setBudget(budget.value)
                                    }}
                                />
                            </div>

                            <div className='w-full border-b dark:border-[#2E2E2E]'>
                                <CustomSelect
                                    options={allVehicleTypes}
                                    placeholder="All Vehicle Types"
                                    labelKey="name"
                                    valueKey="id"
                                    value={vehicleType}
                                    onSelect={(bodyType: AllVehicleTypes) => {
                                        setVehicleType(bodyType.id)
                                    }}
                                />
                            </div>

                        </div>
                    ) : (
                        <div className='flex items-center gap-2 text-xs'>
                            <div className='w-full border-b dark:border-[#2E2E2E]'>
                                <CustomSelect
                                    groupedOptions={groupedOptions}
                                    placeholder="Select Brand"
                                    labelKey="displayName"
                                    valueKey="brandId"
                                    value={selectBrand}
                                    onSelect={(value: CarBrand) => { setSelectBrand(value.brandId) }}
                                />
                            </div>
                            <div className='w-full border-b dark:border-[#2E2E2E]'>
                                <CustomSelect
                                    options={models}
                                    placeholder="Select Model"
                                    labelKey="modelName"
                                    valueKey="modelId"
                                    value={modelId}
                                    onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        className="w-full font-semibold text-xs bg-primary hover:bg-primary-hover text-black py-3 rounded-md flex items-center justify-center gap-1"
                        onClick={handleSearch}
                    >
                        <CiSearch size={16} /> SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileHeroSection;
