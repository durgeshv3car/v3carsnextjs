'use client'

import FiltersSection from "@/components/responsive/advance-search/FilterSection";
import Link from "next/link";
import SearchResult from "@/components/responsive/advance-search/SearchResult";
import { useState, useEffect, useMemo } from "react";
import { useGetAdvanceSearchDataQuery } from "@/redux/api/carModuleApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

function AdvanceSearch() {
    const selectedBrands = useSelector((state: RootState) => state.filters.brands);
    const selectedPriceBucket = useSelector((state: RootState) => state.filters.priceBucket);
    const selectedBodyTypes = useSelector((state: RootState) => state.filters.bodyTypes);
    const selectedCylinders = useSelector((state: RootState) => state.filters.cylinders);
    const selectedFuel = useSelector((state: RootState) => state.filters.fuelType);
    const selectedMileage = useSelector((state: RootState) => state.filters.mileage);
    const selectedSeating = useSelector((state: RootState) => state.filters.seating);
    const selectedTransmissionType = useSelector((state: RootState) => state.filters.transmissionType);
    const selectedEngineDisplacement = useSelector((state: RootState) => state.filters.engineDisplacement);

    const [sortBy, setSortBy] = useState<SearchOption>("popular");
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<CarModel[]>([]);
    const [filtersKey, setFiltersKey] = useState(0); // key to force refetch

    // Normalize filters so empty values become undefined
    const normalizedFilters = useMemo(
        () => ({
            page,
            limit: 50,
            sortBy: String(sortBy), // 👈 SearchOption → string

            priceBucket: selectedPriceBucket
                ? String(selectedPriceBucket.id)
                : undefined,

            brandIds: selectedBrands.length
                ? selectedBrands.map((b) => Number(b.id))
                : undefined,

            bodyTypeIds: selectedBodyTypes.length
                ? selectedBodyTypes.map((b) => Number(b.id))
                : undefined,

            cylindersList: selectedCylinders.length
                ? selectedCylinders.map((c) => Number(c.id))
                : undefined,

            seatingList: selectedSeating.length
                ? selectedSeating.map((s) => Number(s.id))
                : undefined,

            mileage: selectedMileage
                ? String(selectedMileage.id)
                : undefined,

            transmissionType: selectedTransmissionType
                ? String(selectedTransmissionType.id)
                : undefined,

            fuelType: selectedFuel
                ? String(selectedFuel.id)
                : undefined,

            engineDisplacement: selectedEngineDisplacement.length
                ? selectedEngineDisplacement.map((e) => String(e.id))
                : undefined,

            key: filtersKey,
        }),
        [
            page,
            sortBy,
            selectedPriceBucket,
            selectedBrands,
            selectedBodyTypes,
            selectedCylinders,
            selectedSeating,
            selectedMileage,
            selectedTransmissionType,
            selectedFuel,
            selectedEngineDisplacement,
            filtersKey,
        ]
    );


    const { data: advanceSearchData, isFetching } =
        useGetAdvanceSearchDataQuery(normalizedFilters, {
            skip: !sortBy,
            refetchOnMountOrArgChange: true,
        });

    // Append or replace items based on page
    useEffect(() => {
        if (advanceSearchData?.rows) {
            if (page === 1) {
                setItems(advanceSearchData.rows); // replace items immediately on first page
            } else {
                setItems(prev => [...prev, ...advanceSearchData.rows]); // append for other pages
            }
        }
    }, [advanceSearchData, page]);

    // Infinite scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching) {
                if (items.length < (advanceSearchData?.total ?? 0)) {
                    setPage(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [items, isFetching, advanceSearchData]);

    // Reset page and items when filters or sort changes
    useEffect(() => {
        setPage(1);
        setItems([]);
        setFiltersKey(prev => prev + 1); // force refetch immediately
    }, [
        sortBy,
        selectedBrands,
        selectedPriceBucket,
        selectedBodyTypes,
        selectedCylinders,
        selectedFuel,
        selectedMileage,
        selectedSeating,
        selectedTransmissionType,
        selectedEngineDisplacement
    ]);

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">
                            Search / New Cars
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-full lg:min-w-[24%] space-y-10">
                            <FiltersSection />
                        </div>
                        <div className="w-auto lg:min-w-[74%]">
                            <SearchResult
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                data={items}
                                count={advanceSearchData?.total ?? 0}
                            />
                            {isFetching && <p className="text-white text-center mt-4">Loading more...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdvanceSearch;
