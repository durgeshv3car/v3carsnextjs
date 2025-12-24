'use client'

import { useState } from 'react'
import { FaThList } from 'react-icons/fa'
import CarGridCard from './card-type-show/CarGridCard'
import CarListCard from './card-type-show/CarListCard'
import { IoGrid, IoReloadSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { BiX } from 'react-icons/bi'
import { resetFilters } from '@/redux/slices/advanceSearchSlice'
import { useRemoveFilter, useSelectedFilters } from './SelectedFilters'

type SearchOption = 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'popular' | 'latest';

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
    seats: number;
    brand: {
        id: number;
        name: string;
        slug: string;
        logo: string;
    };
    priceMin: number;
    priceMax: number;
    powerPS: number;
    torqueNM: number;
    mileageKMPL: number;
    powerTrain: string;
    image: {
        name: string;
        alt: string;
        url: string;
    };
    imageUrl: string;
}

interface SearchResultProps {
    sortBy: SearchOption;
    setSortBy: React.Dispatch<React.SetStateAction<SearchOption>>;
    data: CarModel[];
    count: number
}

const SearchResult: React.FC<SearchResultProps> = ({ sortBy, setSortBy, data, count }) => {
    const filters = useSelectedFilters();
    const removeFilter = useRemoveFilter();
    const [view, setView] = useState<"grid" | "list">("grid");
    const dispatch = useDispatch()

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4">
                <div className='space-y-2'>
                    <h2 className="text-2xl font-bold">Your Search Result</h2>
                    <p>
                        <span className='bg-[#171717] rounded-md text-primary font-semibold px-2 p-1'>{count}</span>{" "}
                        Cars in India With Search Options
                    </p>
                </div>

                <div className="flex gap-2">

                    <select
                        className='w-[300px] border dark:border-[#2E2E2E] rounded-lg px-2 bg-white dark:bg-[#171717]'
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value as SearchOption) }}
                    >
                        <option value="price_asc">Price: Lowest First</option>
                        <option value="price_desc">Price: Highest First</option>
                        <option value="name_asc">A-Z</option>
                        <option value="name_desc">Z-A</option>
                        <option value="popular">Popularity</option>
                        <option value="latest">Latest</option>
                    </select>
                    <button
                        onClick={() => setView("list")}
                        className={`w-10 h-10 flex justify-center items-center border dark:border-[#2E2E2E] rounded ${view === "list" ? "bg-gray-200 dark:bg-[#27272a]" : "bg-white dark:bg-black"}`}
                    >
                        <FaThList />
                    </button>
                    <button
                        onClick={() => setView("grid")}
                        className={`w-10 h-10 flex justify-center items-center border dark:border-[#2E2E2E] rounded ${view === "grid" ? "bg-gray-200 dark:bg-[#27272a]" : "bg-white dark:bg-black"}`}
                    >
                        <IoGrid />
                    </button>
                </div>

            </div>

            {
                filters.length > 0 && (
                    <div className="hidden lg:flex items-center gap-3 flex-wrap mb-4">
                        {/* Clear All Button */}
                        <button
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black text-sm font-medium px-5 py-2 rounded transition"
                            onClick={() => dispatch(resetFilters())}
                        >
                            <IoReloadSharp />
                            Clear All
                        </button>

                        {/* Applied Filter Chip */}
                        {
                            filters.map((filter, idx) => (
                                <div key={idx} className="flex items-center gap-1 bg-white dark:bg-[#171717] text-sm font-medium px-4 py-2 rounded-md">
                                    {Array.isArray(filter.value)
                                        ? filter.value.map((v) => v.label).join(", ")
                                        : filter.value.label}
                                    <button
                                        className="hover:text-primary-hover"
                                        onClick={() => removeFilter(filter.key, filter.value)}
                                    >
                                        <BiX size={18} />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.map((car, index) => (
                        <CarGridCard key={index} car={car} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {data.map((car, index) => (
                        <CarListCard key={index} car={car} />
                    ))}
                </div>
            )}
        </>
    )
}


export default SearchResult;