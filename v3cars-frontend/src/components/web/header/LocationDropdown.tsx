"use client";

import { useGetAllCitiesQuery, useGetPopularCitiesQuery, useGetSearchCityQuery } from "@/redux/api/locationModuleApi";
import { setSelectedCity } from "@/redux/slices/commonSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useState, useMemo, useEffect, FC } from "react";
import { FiMapPin } from "react-icons/fi";
import { TbCurrentLocation } from "react-icons/tb";
import { useDispatch } from "react-redux";

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

interface Location {
  cityId?: number;
  cityName?: string;
}

type TabKey = null | "location" | "newCars" | "news" | "tools" | "variant";

interface LocationDropdownProps {
  location: Location;
  setLocation: (loc: Location) => void;
  setHoverTab: (tab: TabKey) => void;
}

const LocationDropdown: FC<LocationDropdownProps> = ({ location, setLocation, setHoverTab }) => {
  const [searchCity, setSearchCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // --- Search ---
  const { data: searchCityData, isFetching: isSearching } = useGetSearchCityQuery({ query: searchCity! }, { skip: !searchCity });
  const searchData: City[] = searchCityData?.rows ?? [];

  // --- Popular Cities ---
  const { data: popularCitiesData } = useGetPopularCitiesQuery();
  const popularCities: City[] = popularCitiesData?.rows ?? [];

  // --- Infinite Scroll State ---
  const [page, setPage] = useState(1);
  const [allCities, setAllCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 50;

  const { data, isFetching } = useGetAllCitiesQuery({ page, limit });

  useEffect(() => {
    if (data?.rows) {
      setAllCities((prev) => [...prev, ...data.rows]);
      setHasMore(page < data.totalPages);
    }
  }, [data, page]);

  // Scroll Listener (only when search is empty)
  useEffect(() => {
    const container = document.getElementById("all-cities-container");
    if (!container || searchCity) return;

    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50 && !isFetching && hasMore) {
        setPage((prev) => prev + 1);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore, searchCity]);

  // 🔍 Filter Popular Cities
  const filteredPopularCities = useMemo(() => {
    if (!searchCity) return popularCities;
    return popularCities.filter((city) =>
      city.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [searchCity, popularCities]);

  // Decide which cities to display
  const displayCities: City[] = searchCity ? searchData : allCities;

  // Detect Location Function
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Please on your location.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          if (data.address) {
            setHoverTab(null)
            setLocation({
              cityId: Date.now(),
              cityName: data.address.state_district || data.address.state
            })
            dispatch(setSelectedCity({
              cityId: Date.now(),
              cityName: data.address.state_district || data.address.state
            }));
          }
        } catch (err) {
          console.error("Failed to fetch city:", err);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  function handleLocation(city: City) {
    setLocation({
      cityId: city.cityId,
      cityName: city.cityName,
    })
    setHoverTab(null)
    dispatch(setSelectedCity({
      cityId: city.cityId,
      cityName: city.cityName,
    }))
  }

  return (
    <div className="w-full lg:max-w-[1600px] bg-white dark:bg-[#171717] my-1 mx-auto shadow-md z-50 rounded-xl">
      {/* Top Banner */}
      <div className="bg-[#ffe380] h-[80px] w-full flex items-center justify-between relative rounded-t-xl">
        <img
          src="/location/city-illust.png"
          alt="Cities"
          className="object-cover w-full h-full absolute top-0 left-0 opacity-50 rounded-t-xl"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* Left */}
        <div className="w-full lg:w-[50%]">
          <div className="flex gap-4 mb-6 items-center">
            <div className="flex items-center border dark:border-[#2E2E2E] rounded-lg px-4 py-2 gap-2 w-1/2 text-sm">
              <FiMapPin size={16} />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="outline-none text-sm bg-transparent w-full"
                placeholder="Enter City Name"
              />
            </div>

            <button
              className="bg-primary hover:bg-primary-hover text-black font-medium text-sm px-4 py-2 rounded-md flex items-center gap-2"
              onClick={detectLocation}
            >
              <TbCurrentLocation size={18} />
              Detect my location
            </button>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3 border-l-4 border-primary pl-2">
              POPULAR CITIES
            </h3>
            <div className="grid grid-cols-4 gap-4 max-h-[200px] lg:max-h-[300px] overflow-y-auto pr-2 scrollbar-thin-yellow">
              {filteredPopularCities.length > 0 ? (
                filteredPopularCities.map((city, index) => (
                  <div
                    key={`${city.cityId}-${index}`}
                    className={`${location.cityId === city.cityId ? "border border-primary" : "border dark:border-[#2E2E2E]"} rounded-md flex flex-col items-center justify-center p-2 text-center bg-[#fffceb] dark:bg-transparent hover:shadow transition cursor-pointer`}
                    onClick={() => handleLocation(city)}
                  >
                    <Image
                      src="/location/city-icon.png"
                      alt={city.cityName}
                      height={24}
                      width={24}
                      className="dark:invert"
                    />
                    <span className="text-[13px] font-medium mt-2">{city.cityName}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-4">No cities found</p>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[50%]">
          <h3 className="text-xs font-semibold mb-3 border-l-4 border-primary pl-2">
            CONTINUE OTHER CITIES
          </h3>

          <div
            id="all-cities-container"
            className="grid grid-cols-4 gap-3 max-h-[200px] lg:max-h-[350px] overflow-y-auto pr-2 scrollbar-thin-yellow"
          >
            {displayCities.length > 0 ? (
              displayCities.map((city, index) => (
                <button
                  key={`${city.cityId}-${index}`}
                  className={`bg-gray-100 dark:bg-[#171717] hover:bg-primary-light p-2 text-xs lg:text-sm rounded flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${location.cityId === city.cityId ? "border border-primary" : "border dark:border-[#2E2E2E]"}`}
                  onClick={() => handleLocation(city)}
                >
                  {city.cityName}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-4">No cities found</p>
            )}
            {(!searchCity && isFetching) && <p className="col-span-4 text-center text-sm mt-2">Loading...</p>}
            {(searchCity && isSearching) && <p className="col-span-4 text-center text-sm mt-2">Searching...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;
