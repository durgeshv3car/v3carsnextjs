'use client';

import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import { useGetFuelPriceStateQuery, useGetList10DaysMetrosQuery, useGetMetroCityFuelQuery } from "@/redux/api/fuelModuleApi";
import { notFound } from "next/navigation";
import { useState } from "react";
import FuelPrices from "./FuelPrices";
import StateWiseFuelList from "./StateWiseFuelList";
import PriceInIndiaChart from "./PriceInIndiaChart";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import ToolsCommonSection from "@/components/common/ToolsCommonSection";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import PriceInputSection from "./PriceInputSection";
import CommonPriceInMajorCitiesCard from "@/components/common/CommonPriceInMajorCitiesCard";
import BottomAd from "@/components/common/BottomAd";
import CommonSellUsedCarComponent from "@/components/common/ModelCards/CommonSellUsedCarComponent";
import CommonUsefulToolComponent from "@/components/common/CommonUsefulToolComponent";
import CommonQuickLinkComponent from "@/components/common/CommonQuickLinkComponent";
import FuelPriceGuide from "./FuelPriceGuide";

interface FuelTypeDetails {
    price: number;
    prevPrice: number;
    change: number;
    updatedAt: string;
}

interface CityFuelData {
    districtId: number;
    cityName: string;
    stateId: number;
    stateName: string;
    petrol: FuelTypeDetails;
    diesel: FuelTypeDetails;
    cng: FuelTypeDetails;
}

export const getFuelTypeId = (fuel: string): number => {
    const tab = [
        { fuelType: 1, fuel: "Petrol" },
        { fuelType: 2, fuel: "Diesel" },
        { fuelType: 3, fuel: "CNG" },
    ];
    return tab.find(t => t.fuel.toLowerCase() === fuel.toLowerCase())?.fuelType ?? 1;
};

interface PageProps {
    fuelType: string;
}

const capitalize = (str: string) =>
    str === "cng" ?
        str.toUpperCase()
        :
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function FuelTypePriceInIndiaPage({ fuelType }: PageProps) {
    const [cityId, setCityId] = useState<number | null>(null)
    const [selectState, setSelectState] = useState<number | null>(null)
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 13 });
    const { data: fuelPriceStateData } = useGetFuelPriceStateQuery();
    const { data: metroCityFuelData } = useGetMetroCityFuelQuery();
    const { data: list10DaysMetrosData } = useGetList10DaysMetrosQuery();

    const list10DaysMetros = list10DaysMetrosData?.rows ?? [];
    const metroCityFuel: CityFuelData[] = metroCityFuelData?.rows ?? [];
    const faqByModule = faqByModuleData?.rows ?? [];
    const fuelPriceState = fuelPriceStateData?.rows ?? [];

    if (!fuelType) {
        notFound();
    }

    console.log(cityId);
    console.log(selectState);

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="text-primary">
                                <IoIosArrowForward />
                            </span>
                            <span className="font-medium text-primary">
                                {capitalize(fuelType) ?? "Fuel"} Price In India
                            </span>
                        </div>

                        <span className="font-medium text-primary">
                            How It Works
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="relative bg-bottom bg-cover bg-no-repeat py-6"
                style={{ backgroundImage: `url('/car-on-road-price/top-bg.png')` }}
            >
                <div
                    className="absolute top-6 right-4 w-[200px] h-[200px] bg-cover bg-no-repeat z-20 pointer-events-none opacity-30"
                    style={{ backgroundImage: `url('/car-on-road-price/Wave.png')` }}
                />

                <div className="absolute inset-0 dark:bg-black/85"></div>

                <div className="relative z-10">
                    <div className="flex justify-center items-center my-4">
                        <img
                            src="/model/bannerads.png"
                            alt="bannerads"
                            width={970}
                            height={90}
                            className="rounded-lg"
                        />
                    </div>

                    <ToolsCommonSection
                        title={
                            <span className=" capitalize">
                                Today&apos;s {fuelType} Prices in India - <span className="text-yellow-500">September 18, 2024</span>
                            </span>
                        }
                        desc={`Looking for the latest fuel prices in India? Look no further! This page provides you with up-to-date information on fuel prices across major Indian cities (as of December 2, 2025). We understand fuel prices fluctuate, so we offer daily updates to help`}
                    />
                </div>
            </div>

            <div className="relative mb-[300px] sm:mb-[170px] lg:mb-14">
                <div className="absolute -top-12 left-0 w-full px-4 lg:px-10">
                    <div className="w-full lg:app-container mx-auto">
                        <PriceInputSection type={capitalize(fuelType)} city={null} state={null} setCityId={setCityId} cityId={null} selectState={null} setSelectState={setSelectState} />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">
                    <div>
                        <div className="mb-4">
                            <h2 className="text-2xl mb-2 capitalize">{fuelType} Prices In Metro Cities</h2>
                            <p>{fuelType} prices in India’s major metro cities — Delhi, Mumbai, Chennai and Kolkata — often reflect broader national trends. This section shows the latest petrol, diesel and CNG rates in all four metros, updated regularly. Use these prices to compare fuel</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {metroCityFuel && metroCityFuel.map((item) => (
                                <FuelPrices
                                    key={item.cityName}
                                    type={fuelType}
                                    city={item.cityName}
                                    stateName={item.stateName}
                                    petrol={{
                                        price: item.petrol.price,
                                        change: item.petrol.change,
                                    }}
                                    diesel={{
                                        price: item.diesel.price,
                                        change: item.diesel.change,
                                    }}
                                    cng={{
                                        price: item.cng.price,
                                        change: item.cng.change,
                                    }}
                                    updatedAt={
                                        item.petrol.updatedAt ||
                                        item.diesel.updatedAt ||
                                        item.cng.updatedAt
                                    }
                                />
                            ))}
                        </div>

                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <StateWiseFuelList type={capitalize(fuelType)} data={fuelPriceState} />

                            <PriceInIndiaChart data={list10DaysMetros} type={capitalize(fuelType)} />
                        </div>

                        <div className="w-auto lg:min-w-[24%] space-y-10">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CommonPriceInMajorCitiesCard />
                        </div>
                    </div>
                </div>
            </div>

            <BottomAd />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-4">
                    <h2 className="text-2xl mb-4">Why This Tool Is Useful</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-400">
                        <li>
                            Helps daily commuters understand how fuel price changes impact monthly
                            running costs
                        </li>
                        <li>
                            Helps travelers decide where to refuel for cheaper fuel during long
                            trips
                        </li>
                        <li>
                            Helps businesses, logistics companies, cab drivers and transport
                            operators monitor fuel cost fluctuations
                        </li>
                        <li>
                            Helps users track regional trends driven by taxes, crude oil prices
                            and govt. policies
                        </li>
                        <li>
                            Acts as a single unified dashboard for all fuel types and regions in
                            India
                        </li>
                    </ul>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container pb-6 mx-auto space-y-7">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <CommonSellUsedCarComponent />

                            <FuelPriceGuide />

                            <CommonQuickLinkComponent data={links} />

                            <CommonFaqAccordion faqData={faqByModule} />
                        </div>

                        <div className="w-auto lg:min-w-[24%] space-y-6">
                            <div className="bg-[#E3E3E3] rounded-xl h-[340px] flex justify-center items-center dark:bg-[#171717]">
                                <img
                                    src={'/model/miniads.png'}
                                    alt="miniads"
                                    width={300}
                                    height={250}
                                    className="rounded-lg"
                                />
                            </div>

                            <CommonUsefulToolComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const links = [
    {
        title: "Mileage Calculator",
        desc: "Estimate Your Vehicle's Fuel Efficiency",
        img: "/emicalculator/mileage.png",
        bg: "bg-[#E4F3FE]",
    },
    {
        title: "Fuel Price in India",
        desc: "Check Latest Fuel Prices Across India",
        img: "/emicalculator/fuel.png",
        bg: "bg-[#FCEFFE]",
    },
    {
        title: "Car Loan EMI Calculator",
        desc: "Calculate Your Monthly Car Loan EMI",
        img: "/emicalculator/emi.png",
        bg: "bg-[#FFF8C9]",
    },
    {
        title: "Compare Cars",
        desc: "Compare Specs, Features & Prices",
        img: "/emicalculator/compare.png",
        bg: "bg-[#E0F8E8]",
    },
];