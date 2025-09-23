'use client';

import React, { useState } from 'react';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { VscChevronRight } from 'react-icons/vsc';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import { useRouter } from 'next/navigation';

// Dummy Slides
const slides = [

  {
    image: '/images/banner-car.png',
    title: 'Tata Altroz Racer',
    tagline: 'More Performance,\nBig on Features',
  },
  {
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Tata Punch EV',
    tagline: 'Power meets Efficiency',
  },

  {
    image: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg',
    title: 'Tata Nexon',
    tagline: 'Next Level SUV',
  },

];

interface HeroSectionProps {
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

const HeroSection: React.FC<HeroSectionProps> = ({ selectBrand, setSelectBrand, data, models }) => {
  const [modelId, setModelId] = useState<number | null>(null)
  const [budget, setBudget] = useState<string>("")
  const [vehicleType, setVehicleType] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('budget');
  const router = useRouter()

  function normalizeBrandName(name: string) {
    const lower = name.toLowerCase();
    if (lower === "maruti arena" || lower === "maruti nexa") {
      return "Maruti Suzuki";
    }
    return name;
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
    <>
      <div className="relative h-[694px]">
        {/* Swiper Background */}
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 10000, // 10 seconds
            disableOnInteraction: false, // keeps autoplay running even after swipe
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
          }}
          className="relative h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className=' absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black/35 to-transparent' />
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Box Overlay */}
        <div className="absolute top-[125px] left-0 right-0 z-20 px-6 lg:px-10">
          <div className="app-container mx-auto">
            <div className="w-[403px] h-[430px] bg-gray-50 dark:bg-[#171717] rounded-xl shadow-md border border-gray-300 dark:border-[#2E2E2E] flex flex-col">
              {/* Header */}
              <div className="bg-gray-50 dark:bg-[#171717] px-4 py-3 flex items-center gap-2 border-b border-gray-300 dark:border-[#2E2E2E] rounded-t-xl">
                <CiFilter size={20} />
                <h2 className="font-semibold text-lg">
                  SEARCH THE RIGHT CAR
                </h2>
              </div>

              {/* Tabs */}
              <div className="p-6 flex flex-col justify-around flex-grow">

                <div className="grid grid-cols-2">
                  {['budget', 'model'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center justify-center gap-2 py-3 text-sm font-medium ${activeTab === tab
                        ? 'bg-gray-200 dark:bg-black border-b-2 border-yellow-400'
                        : 'bg-gray-100 dark:bg-[#2E2E2E]'
                        }`}
                    >
                      <span
                        className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${activeTab === tab ? 'border-yellow-400' : 'border-[#171717]'
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${activeTab === tab ? 'bg-yellow-400' : ''
                            }`}
                        />
                      </span>
                      By {tab === 'budget' ? 'Budget' : 'Model'}
                    </button>
                  ))}
                </div>

                {/* Form */}
                {activeTab === 'budget' ? (
                  <>
                    <div className='border-b dark:border-[#2E2E2E]'>
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
                    <div className='border-b dark:border-[#2E2E2E]'>
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
                  </>
                ) : (
                  <>
                    <div className='border-b dark:border-[#2E2E2E]'>
                      <CustomSelect
                        groupedOptions={groupedOptions}
                        placeholder="Select Brand"
                        labelKey="displayName"
                        valueKey="brandId"
                        value={selectBrand}
                        onSelect={(value: CarBrand) => { setSelectBrand(value.brandId) }}
                      />
                    </div>
                    <div className='border-b dark:border-[#2E2E2E]'>
                      <CustomSelect
                        options={models}
                        placeholder="Select Model"
                        labelKey="modelName"
                        valueKey="modelId"
                        value={modelId}
                        onSelect={(value: CarModel) => { setModelId(value.modelId) }}
                      />
                    </div>
                  </>
                )}

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition py-3 rounded-full flex items-center justify-center gap-2">
                  <CiSearch size={20} /> SEARCH
                </button>

                <div className="flex justify-end">
                  <button className="flex items-center text-sm gap-1 cursor-pointer hover:underline" onClick={() => { router.push('/search/new-cars') }}>
                    Advanced Search <VscChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full lg:app-container px-6 lg:px-10 mx-auto mt-4'>
        <div className="custom-pagination flex justify-end items-center gap-2" />
      </div>


      <style jsx global>{`
        .swiper-custom-bullet {
          width: 60px;
          height: 3px;
          border-radius: 9999px;
          background-color: #b3b3b3;
          transition: all 0.3s ease;
          cursor: pointer;
          margin-top: 0px;
        }

        .swiper-custom-bullet-active {
          background-color: #ffcc00;
          height: 5px;
          width: 60px;
        }
      `}</style>

    </>
  );
};

export default HeroSection;
