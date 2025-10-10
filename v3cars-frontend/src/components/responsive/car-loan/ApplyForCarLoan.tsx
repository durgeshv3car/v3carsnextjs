'use client';

import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import { useGetAllBrandsQuery, useGetModelsQuery, useGetVariantsQuery } from '@/redux/api/carModuleApi';
import { useGetCitiesQuery } from '@/redux/api/locationModuleApi';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

interface CarImage {
  name: string
  alt: string
  url: string
}

interface CarVariant {
  variantId: number;
  variantName: string;
  modelId: number;
  modelPowertrainId: number | null;
  variantPrice: string;
  updatedDate: string; // ISO date string
  priceMin: number;
  priceMax: number;
  powertrain: string | null;
}

interface City {
  cityId: number;
  cityName: string;
  stateId: number;
  countryId: number;
  status: number;
  isPopularCity: number;
  isTopCity: number;
  ismajorCityPetrol: number;
  ismajorCityDiesel: number;
  ismajorCityCNG: number;
  isImage: string;
}

export default function ApplyForCarLoan() {
  const [selectBrand, setSelectBrand] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [variantId, setVariantId] = useState<number | null>(null);
  const [openModel, setOpenModel] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState<number | null>(null);

  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand! }, { skip: !selectBrand });
  const { data: variantsData } = useGetVariantsQuery({ modelId: modelId! }, { skip: !modelId } );
  const { data: citiesData } = useGetCitiesQuery({ query }, { skip: !query } );

  const cities = citiesData?.rows ?? [];
  const brands = brandsData?.rows ?? [];
  const models = modelsData?.rows ?? [];
  const variants = variantsData?.rows ?? [];

  const filteredCities: City[] =
    query.length >= 2
      ? cities.filter((c: City) =>
        c.cityName.toLowerCase().includes(query.toLowerCase())
      )
      : [];

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

    const sorted = [...normalizedBrands].sort((a, b) => {
      const pa = a.popularity && a.popularity.trim() !== "" ? Number(a.popularity) : Infinity;
      const pb = b.popularity && b.popularity.trim() !== "" ? Number(b.popularity) : Infinity;
      return pa - pb;
    });

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

  const { groupedOptions } = splitBrands(brands)

  function handleVariant(data: CarVariant) {
    setVariantId(data.variantId)
  }

  const handleCountryChange = (selectedOption: City) => {
    setQuery("")
    setOpenModel(false)
    setSelectedCity(selectedOption);
  };

  const handleFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your form handling logic here
  };

  return (
    <section className=" px-4 py-6 bg-gradient-to-b from-gray-100 to-white border-t border-gray-300 dark:from-[#171717] dark:to-[#171717] dark:border-t  dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center app-container mx-auto">

        {/* Left: Form Card */}
        <div className=" rounded-2xl p-5 sm:p-6 md:py-10 md:px-10">

          <h3 className="text-[20px] sm:text-[22px] font-semibold text-gray-800 dark:text-white mb-4">
            APPLY FOR CAR LOAN
          </h3>

          <form
            onSubmit={handleFormData}
            className="space-y-3 text-[14px]"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className='border dark:border-[#2E2E2E] rounded-lg text-sm bg-white dark:bg-[#171717]'>
                <CustomSelect
                  groupedOptions={groupedOptions}
                  placeholder="Select Brand"
                  labelKey="displayName"
                  valueKey="brandId"
                  value={selectBrand}
                  onSelect={(value: CarBrand) => setSelectBrand(value.brandId)}
                />
              </div>

              <div className='border dark:border-[#2E2E2E] rounded-lg text-sm bg-white dark:bg-[#171717]'>
                <CustomSelect
                  options={models}
                  placeholder="Select Model"
                  labelKey="modelName"
                  valueKey="modelId"
                  value={modelId}
                  onSelect={(value: CarModel) => setModelId(value.modelId)}
                />
              </div>

              <div className='border dark:border-[#2E2E2E] rounded-lg text-sm bg-white dark:bg-[#171717]'>
                <CustomSelect
                  options={variants}
                  placeholder="Select Variant"
                  labelKey="variantName"
                  valueKey="variantId"
                  value={variantId}
                  onSelect={(value: CarVariant) => handleVariant(value)}
                />
              </div>

            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select className="h-[36px] rounded-lg px-2 bg-white dark:bg-[#171717] border outline-none dark:border-[#2E2E2E]">
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>

              <input
                type="text"
                placeholder="Full Name As Per Pan Card"
                className="sm:col-span-2 h-[36px] rounded-lg px-2 bg-white dark:bg-[#171717] border outline-none dark:border-[#2E2E2E]"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value) }}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <input
                type="email"
                placeholder="Email*"
                className="h-[36px] rounded-lg px-2 bg-white dark:bg-[#171717] border outline-none dark:border-[#2E2E2E]"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />

              <div className="relative sm:col-span-2 rounded-lg bg-white dark:bg-[#171717] border dark:border-[#262626] transition-all duration-300 ease-in-out">
                {/* Header / Toggle */}
                <div
                  className="flex justify-between items-center px-2 h-[36px] cursor-pointer select-none"
                  onClick={() => setOpenModel(!openModel)}
                >
                  <label className="block">
                    {selectedCity?.cityName || "City"}
                  </label>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-4 transform transition-transform duration-300 ${openModel ? "rotate-180" : "rotate-0"
                      }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>

                {/* Dropdown panel with smooth animation */}
                <div
                  className={`absolute z-20 w-full bg-white dark:bg-[#171717] rounded-b-lg border dark:border-[#2E2E2E] overflow-hidden transition-all duration-300 ease-in-out origin-top ${openModel
                    ? "max-h-[300px] opacity-100 scale-y-100"
                    : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                    }`}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full border-b dark:border-[#2E2E2E] p-2 focus:outline-none bg-transparent"
                  />

                  <div className="transition-opacity duration-300 ease-in-out">
                    {query.length < 2 && (
                      <p className="text-sm p-2 text-gray-400 italic">
                        Please enter 2 or more characters
                      </p>
                    )}

                    {query.length >= 2 && (
                      <ul className="max-h-40 overflow-y-auto dark:bg-[#171717] overflow-hidden">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((city, index) => (
                            <li
                              key={index}
                              className="p-2 hover:bg-slate-50 dark:hover:bg-[#2E2E2E] cursor-pointer border-b dark:border-[#2E2E2E] transition-colors duration-200"
                              onClick={() => handleCountryChange(city)}
                            >
                              {city.cityName}
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-500">No results found</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <input
              type="number"
              placeholder="Mobile"
              className="w-full h-[36px] rounded-lg px-2 bg-white dark:bg-[#171717] border outline-none dark:border-[#2E2E2E]"
              value={Number(mobile)}
              onChange={(e) => { setMobile(Number(e.target.value)) }}
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full h-[48px] rounded-full bg-[#FFCC00] text-black font-semibold hover:brightness-95 transition mt-1"
            >
              Apply Now
            </button>

            {/* Privacy text */}
            <p className="text-[12px] text-gray-500 mt-1 text-center">
              By proceeding ahead you expressly agree to the{' '}
              <Link href="/privacy-policy" className="font-semibold underline">
                V3Cars privacy policy
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="flex items-center justify-center">
          <Image
            src="/car-loan/car.png"
            alt="Car Loan Illustration"
            width={700}
            height={520}
            className="w-full max-w-[700px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );

}
