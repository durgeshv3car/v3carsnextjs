'use client';

import Link from "next/link";
import BannerSection from "./BannerSection";
import LatestUpdates from "./overview/LatestUpdates";
import CommonModelCard from "@/components/common/ModelCards/CommonModelCard";
import CommonList from "./overview/CommonList";
import SpecsListTable from "./overview/SpecsListTable";
import ModelExpertReview from "./overview/ModelExpertReview";
import ModelProsCons from "./overview/ModelProsCons";
import ModelComparisonSimilarCars from "./overview/ModelComparisonSimilarCars";
import SideBarAdSmall from "@/components/common/SideBarAdSmall";

const data = [
    {
        id: 1,
        src: "/model/tata.png",
        name: "It has a modern design with a rugged stance.It has a modern design with a rugged stance."
    },
    {
        id: 2,
        src: "/model/tata.png",
        name: "Flat ride quality and tall ground clearance.It has a modern design with a rugged stance."
    },
    {
        id: 3,
        src: "/model/tata.png",
        name: "Large instrument cluster and responsive infotainment."
    },
]

interface ModelPageProps {
    type: string;
    slug: string;
}

export default function ModelPage({ type, slug }: ModelPageProps) {

    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <Link href={`/${type}`} className="hover:underline">
                            {type}
                        </Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            {slug}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
                    style={{ backgroundImage: "url('/model/bg.png')" }}
                />

                {/* Banner content on top */}
                <div className="lg:px-8 px-4">
                    <div className="relative w-full lg:app-container mx-auto z-10">
                        <BannerSection />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:max-w-[74%] space-y-10">
                            <LatestUpdates
                                title="Tata Nexon"
                            />

                            <CommonModelCard
                                title="Tata Nexon"
                                data={data}
                            />

                            <CommonList
                                model="Tata Nexon"
                                title="Price List"
                                desc="The Tata Nexon SUV is available with 7 engine-transmission combinations. The ex-showroom prices of the 2025 Nexon start from ₹7.32 lakh for the Smart variant (Base Model) with the 1.2L turbo petrol engine and 5-speed MT. The range tops out at ₹14.05 lakh."
                            />

                            <CommonList
                                model="Best Tata Nexon"
                                title="Variant To Buy"
                                desc="See our recommended Tata Nexon variant for each powertrain with the highest value score. Visit the Which Variant To Buy page for a complete breakdown and alternatives"
                            />

                            <CommonList
                                model="Tata Nexon"
                                title="Dimensions & Capacity"
                                desc="The 2025 Nexon is 3995mm long, 1804mm wide and 1620mm tall. Bigger exterior dimensions give a car a stronger road presence. The Nexon has a 2498mm long wheelbase. A long wheelbase makes the car more stable at high speeds and gives better legroom in the back"
                            />

                            <SpecsListTable
                                model="Tata Nexon"
                            />

                            <ModelExpertReview
                                model="Tata Nexon"
                            />

                            <ModelProsCons
                                model="Tata Nexon"
                            />

                            <ModelComparisonSimilarCars
                            // model="Tata Nexon"
                            />

                        </div>

                        {/* sidebar */}
                        <div className="w-auto lg:min-w-[24%] space-y-10 sticky top-20 self-start">
                            <SideBarAdSmall />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
