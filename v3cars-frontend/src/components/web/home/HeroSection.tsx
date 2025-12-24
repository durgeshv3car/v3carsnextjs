'use client';

import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setPriceBucket, toggleBodyType, toggleBrand } from '@/redux/slices/advanceSearchSlice';
import { useGetHeroBannersQuery } from '@/redux/api/homeModuleApi';
import { IMAGE_URL } from '@/utils/constant';

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

export interface Banner {
  bannerId: number;
  imagePath: string;
  imageAltTag: string;
  redirectLink: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
}

const HeroSection: React.FC<HeroSectionProps> = ({ selectBrand, setSelectBrand, data, models }) => {
  const { data: heroBannerData } = useGetHeroBannersQuery()
  const [modelId, setModelId] = useState<number | null>(null)
  const [budget, setBudget] = useState<{ label: string, value: string }>()
  const [vehicleType, setVehicleType] = useState<{ id: number, label: string }>()
  const [selectSearchBrand, setSelectSearchBrand] = useState<{ id: number, label: string }>()
  const [activeTab, setActiveTab] = useState('budget');
  const router = useRouter()
  const dispatch = useDispatch();

  const heroBanner: Banner[] = heroBannerData?.rows ?? []

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

      dispatch(
        setPriceBucket({
          id: budget.value,
          label: budget.label,
        })
      );
      dispatch(
        toggleBodyType({
          id: vehicleType.id,
          label: vehicleType.label,
        })
      );

    } else {
      if (!selectSearchBrand) {
        alert("Brand Not Selected");
        return;
      }

      dispatch(
        toggleBrand({
          id: selectSearchBrand?.id,
          label: selectSearchBrand?.label,
        })
      );
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
    <>
      <div className="relative h-[694px] mb-36">
        {/* Swiper Background */}
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 5000, // 10 seconds
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
          {heroBanner.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className=' absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black/35 to-transparent cursor-pointer' onClick={() => { router.push(`${slide.redirectLink}`) }} />
              <div
                className="h-full w-full bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${slide.imagePath
                    ? `${IMAGE_URL}/media/bannerimages/${slide.imagePath}`
                    : "/images/banner.png"
                    })`,
                }}

              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Box Overlay */}
        <div className=" absolute w-full flex justify-center -bottom-[110px] z-30">
          <div className="w-full max-w-7xl shadow-xl rounded-2xl p-6 bg-white dark:bg-[#171717]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Search The Right Car</h2>
              <button
                onClick={() => { router.push('/search/new-cars') }}
                className="text-sm text-gray-400 hover:underline flex items-center gap-1"
              >
                Advanced Search
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>


            <div className='flex items-center mt-4 gap-4 bg-gray-100 dark:bg-[#232323] p-2 rounded-full'>
              <div className="flex bg-white dark:bg-[#171717] rounded-full p-1 relative w-fit">

                {/* Sliding Indicator */}
                <div
                  className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300`}
                  style={{
                    width: "50%",
                    transform: activeTab === "budget" ? "translateX(0%)" : "translateX(100%)",
                  }}
                />

                {/* Tabs */}
                <button
                  className={`px-10 text-nowrap py-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-200 ${activeTab === "budget"
                    ? "text-black"
                    : "text-gray-600 dark:text-gray-300"
                    }`}
                  onClick={() => setActiveTab("budget")}
                >
                  By Budget
                </button>

                <button
                  className={`px-10 text-nowrap py-4 rounded-full text-sm font-medium relative z-10 transition-colors duration-200 ${activeTab === "model"
                    ? "text-black"
                    : "text-gray-600 dark:text-gray-300"
                    }`}
                  onClick={() => setActiveTab("model")}
                >
                  By Model
                </button>

              </div>

              {activeTab === 'budget' ? (
                <>
                  <div className='border-b dark:border-[#2E2E2E] py-3 rounded-xl w-full text-sm'>
                    <CustomSelect
                      options={budgetOptions}
                      placeholder="Select Budget"
                      labelKey="label"
                      valueKey="value"
                      value={budget?.value}
                      onSelect={(budget) => {
                        setBudget({
                          label: budget.label,
                          value: budget.value
                        })
                      }}
                    />
                  </div>
                  <div className='border-b dark:border-[#2E2E2E] w-full text-sm py-3 rounded-xl'>
                    <CustomSelect
                      options={allVehicleTypes}
                      placeholder="All Vehicle Types"
                      labelKey="name"
                      valueKey="id"
                      value={vehicleType?.id}
                      onSelect={(bodyType: AllVehicleTypes) => {
                        setVehicleType({
                          id: bodyType.id,
                          label: bodyType.name
                        })
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='border-b dark:border-[#2E2E2E] w-full text-sm py-3 rounded-xl'>
                    <CustomSelect
                      groupedOptions={groupedOptions}
                      placeholder="Select Brand"
                      labelKey="displayName"
                      valueKey="brandId"
                      value={selectBrand}
                      onSelect={(value: CarBrand) => {
                        setSelectBrand(value.brandId)
                        setSelectSearchBrand({
                          id: value.brandId,
                          label: value.brandName
                        })
                      }}
                    />
                  </div>
                  <div className='border-b dark:border-[#2E2E2E] w-full text-sm py-3 rounded-xl'>
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

              <button
                onClick={handleSearch}
                className="bg-primary text-black text-sm rounded-full px-10 py-4 hover:bg-primary-hover flex items-center gap-2 text-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Search
              </button>

            </div>
          </div>
        </div>

      </div>

      {/* <div className='w-full lg:app-container px-6 lg:px-10 mx-auto mt-4'>
        <div className="custom-pagination flex justify-end items-center gap-2" />
      </div> */}


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
