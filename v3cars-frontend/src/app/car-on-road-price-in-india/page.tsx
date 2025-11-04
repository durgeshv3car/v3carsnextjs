'use client'


import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import DiscontinuedCarList from "@/components/responsive/brand/DiscontinuedCarList";
import CarInIndia from "@/components/responsive/car-on-road-price/CarsInIndia";
import FilterSection from "@/components/responsive/car-on-road-price/FilterSection";
import FuelTab from "@/components/responsive/car-on-road-price/FuelTab";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import UpcomingCarInIndia from "@/components/common/UpcomingCarInIndia";
import { useState } from "react";
import CommonNewsUpdate from "@/components/common/CommonNewsUpdate";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";
import { useGetLatestCarNewsQuery } from "@/redux/api/homeModuleApi";

const discontinuedMahindraCars = [
    "Mahindra Alturas G4",
    "Mahindra KUV100",
    "Mahindra TUV 300",
    "Mahindra TUV 300 Plus",
    "Mahindra XUV500",
    "Mahindra eVerito",
    "Mahindra Xylo",
];


function CarOnRoadPrice() {
    const [upcomingCount, setUpcomingCount] = useState<number | null>(null);
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 12 });
    const { data: latestCarNewsData } = useGetLatestCarNewsQuery();

    const faqByModule = faqByModuleData?.rows ?? [];
    const latestCarNews = latestCarNewsData?.rows ?? [];

    const isMobile = useIsMobile()

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Car On Road Price
                        </span>
                    </div>
                </div>
            </div>

            <FilterSection />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <CarInIndia />
                        </div>
                        <div className="w-auto lg:min-w-[24%] space-y-6 lg:mt-12">
                            <FuelTab />
                            {/* <DiscontinuedCarList title="Discontinued Mahindra Cars" cars={discontinuedMahindraCars} /> */}
                        </div>
                    </div>

                </div>
            </div>

            {isMobile ?
                <MobileLatestCarNews
                    title="Latest Car News"
                    view="Latest News"
                    data={latestCarNews}
                    link="/news"
                />
                :
                <div className="py-6 px-4 lg:px-10">
                    <div className="w-full lg:app-container mx-auto space-y-6">
                        <CommonNewsUpdate
                            title="Latest Car News"
                            view="Latest News"
                            newsList={latestCarNews}
                            link={"/news"}
                        />
                    </div>
                </div>
            }

            <div className="py-6 px-4 lg:px-10">
                <div className="w-full lg:app-container mx-auto space-y-6">
                    <UpcomingCarInIndia
                        title={`Upcoming Car News`}
                        setUpcomingCount={setUpcomingCount}
                    />
                </div>
            </div>

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CommonFaqAccordion faqData={faqByModule} />
                </div>
            </div>

        </>
    );
}

export default CarOnRoadPrice;