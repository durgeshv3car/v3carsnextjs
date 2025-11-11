'use client';

import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModelTab, setActiveTab } from "@/redux/slices/carModelSlice"; // ✅ import your tab slice action here
import Overview from "./overview/Overview";
import CommonModelTopSection from "@/components/common/ModelCards/CommonModelTopSection";

interface BannerSectionProps {
    type: string;
    slug: string;
}

function toSlug(name: string) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const tabs = [
    "Overview",
    "Price",
    "Variants",
    "Dimensions",
    "Mileage, Specs & Features",
    "Reviews",
    "Compare",
] as const;

const BannerSection: React.FC<BannerSectionProps> = ({ type, slug }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const activeTab = useSelector((state: RootState) => state.carModelSlice.activeTab); // ✅ fixed missing parenthesis

    function handleModelTab(tab: ModelTab) {
        dispatch(setActiveTab(tab));
        if (tab === "Overview") {
            router.push(`/${type}/${slug}`);
        } else if (tab === "Price") {
            router.push(`/${type}/${slug}/price-in-${toSlug(selectedCity.cityName)}`);
        } else if (tab === "Variants") {
            router.push(`/${type}/${slug}/which-variant-to-buy`);
        } else if (tab === "Dimensions") {
            router.push(`/${type}/${slug}/dimensions`);
        } else if (tab === "CSD Price") {
            router.push(`/${type}/${slug}/csd-price`);
        } else if (tab === "Mileage, Specs & Features") {
            router.push(`/${type}/${slug}/mileage`);
        } else if (tab === "News") {
            router.push(`/${type}/${slug}/news`);
        } else if (tab === "Pros Cons") {
            router.push(`/${type}/${slug}/pros-cons`);
        } else if (tab === "Offers Discounts") {
            router.push(`/${type}/${slug}/offers-discounts`);
        } else if (tab === "Monthly Sales") {
            router.push(`/${type}/${slug}/monthly-sales`);
        } else if (tab === "Reviews") {
            router.push(`/${type}/${slug}/reviews`);
        }
        else {
            router.push(`/${type}/${slug}/${toSlug(tab)}`);
        }
    }

    return (
        <div className="space-y-10">
            {
                activeTab === "Overview" ?
                    <Overview city={selectedCity.cityName} />
                    : activeTab === "Price" ?
                        <CommonModelTopSection
                            title="Tata"
                            highlight="Nexon"
                            others="Price List"
                            description="The Tata Nexon SUV is available with 7 engine-transmission combinations. 
                            The ex-showroom prices of the 2025 Nexon start from ₹7.32 lakh for the Smart variant (Base Model)
                            with the 1.2L turbo petrol engine and 5-speed MT. The range tops out at ₹14.05 ..."
                        />
                        : activeTab === "Variants" ?
                            <CommonModelTopSection
                                title="Tata"
                                highlight="Nexon"
                                others="Price List"
                                description="The Tata Nexon SUV is available with 7 engine-transmission combinations. 
                            The ex-showroom prices of the 2025 Nexon start from ₹7.32 lakh for the Smart variant (Base Model)
                            with the 1.2L turbo petrol engine and 5-speed MT. The range tops out at ₹14.05 ..."
                            />
                            : activeTab === "CSD Price" ?
                                <CommonModelTopSection
                                    title="Tata"
                                    highlight="Nexon"
                                    others="CSD Price"
                                    description="This page lists the CSD price of the Tata Nexon for all variants and compares it with the civilian ex-showroom and estimated on-road price to show how much you save with CSD. We also map eligibility by rank / pay level (Officers, JCOs, NCOs & ORs) so...."
                                />
                                : activeTab === "Mileage, Specs & Features" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Mileage"
                                        description="Tata Nexon mileage is 17.01kmpl to 24.08kmpl. The mileage of Nexon Petrol is 17.01kmpl to 17.44kmpl. The mileage of Nexon Diesel is 23.30kmpl to 24.08kmpl. This page empowers you with all the information you need to understand the Nexon's real-world ...."
                                    />
                                : activeTab === "News" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="News"
                                        description="Tata Nexon mileage is 17.01kmpl to 24.08kmpl. The mileage of Nexon Petrol is 17.01kmpl to 17.44kmpl. The mileage of Nexon Diesel is 23.30kmpl to 24.08kmpl. This page empowers you with all the information you need to understand the Nexon's real-world...."
                                    />
                                : activeTab === "Pros Cons" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Pros & Cons"
                                        description="Check out pros and cons about the Tata Nexon that are worth highlighting for a potential buyer. Here are some of the highlights of the benefits of buying the Tata Nexon. We'll also list out the Nexon drawbacks to help you make an informed buying deci..."
                                    />
                                : activeTab === "Offers Discounts" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Offers Discounts"
                                        description="Tata Nexon comparison review to compare price, specs, dimensions & features to know which is value for money car..."
                                    />
                                : activeTab === "Monthly Sales" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Monthly Sales"
                                        description="The Tata Nexon is a popular B2-segment SUV. Are you curious about how well the Tata Nexon is selling? Look no further! This page provides you with comprehensive data and insights on Tata Nexon's sales performance in India.. We'll delve into monthly s..."
                                    />
                                : activeTab === "Reviews" ?
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Reviews"
                                        description="The Tata Nexon is a popular B2-segment SUV. Are you curious about how well the Tata Nexon is selling? Look no further! This page provides you with comprehensive data and insights on Tata Nexon's sales performance in India.. We'll delve into monthly s..."
                                    />
                                    :
                                    <CommonModelTopSection
                                        title="Tata"
                                        highlight="Nexon"
                                        others="Dimensions"
                                        description="The Tata Nexon is a B2-segment SUV which has a seating capacity of up to 5 occupants. Here we present the Tata Nexon dimensions like length, width, height and wheelbase along with fuel tank capacity, boot space, ground clearance and tyre size. You can al..."
                                    />
            }

            {/* Bottom Tabs */}
            <div className="flex gap-10 font-medium overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleModelTab(tab)}
                        className={`${tab === activeTab
                            ? "border-b-4 border-yellow-400"
                            : "hover:text-yellow-400 text-gray-400"
                            } pb-2 border-b-4 border-transparent hover:border-yellow-400 transition whitespace-nowrap`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BannerSection;
