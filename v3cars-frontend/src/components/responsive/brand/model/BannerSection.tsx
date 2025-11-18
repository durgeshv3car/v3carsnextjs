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
        } else if (tab === "Specifications Features") {
            router.push(`/${type}/${slug}/engine-specifications`);
        } else if (tab === "Videos") {
            router.push(`/${type}/${slug}/videos`);
        } else if (tab === "Colors") {
            router.push(`/${type}/${slug}/colors`);
        } else if (tab === "Competitors") {
            router.push(`/${type}/${slug}/competitors`);
        } else if (tab === "Images") {
            router.push(`/${type}/${slug}/images`);
        } else if (tab === "Maintenance Cost") {
            router.push(`/${type}/${slug}/maintenance-cost`);
        } else if (tab === "Cost Of Ownership") {
            router.push(`/${type}/${slug}/cost-of-ownership`);
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
                                                        : activeTab === "Specifications Features" ?
                                                            <CommonModelTopSection
                                                                title="Tata"
                                                                highlight="Nexon"
                                                                others="Specifications & Features "
                                                                description="The Tata Nexon is available with multiple engine options: a 1.2L turbo petrol, a 1.2L CNG and a 1.5L turbo diesel. Nexon's 1.2L turbo petrol engine is available with a 6-speed MT Manual, a 6-speed AMT Automatic, a 5-speed MT Manual and a 7-speed DCT"
                                                            />
                                                            : activeTab === "Videos" ?
                                                                <CommonModelTopSection
                                                                    title="Tata"
                                                                    highlight="Nexon"
                                                                    others="Videos"
                                                                    description="The Tata Nexon is available with multiple engine options: a 1.2L turbo petrol, a 1.2L CNG and a 1.5L turbo diesel. Nexon's 1.2L turbo petrol engine is available with a 6-speed MT Manual, a 6-speed AMT Automatic, a 5-speed MT MTata Nexon Videos page brings together all our expert video content in one place — including detailed reviews, variant explanation and model comparisons. Watch V3Cars’ in-depth Hindi videos covering the Nexon’s exterior, interior, features, performananual and a 7-speed DCT"
                                                                />
                                                                : activeTab === "Colors" ?
                                                                    <CommonModelTopSection
                                                                        title="Tata"
                                                                        highlight="Nexon"
                                                                        others="Colors"
                                                                        description="See all the colours available for the Tata Nexon (2025). This page showcases all the Nexon car colours offered by the manufacturer, allowing you to explore the complete selection. Visualise each stunning shade with high-quality images of the Nexon in"
                                                                    />
                                                                    : activeTab === "Competitors" ?
                                                                        <CommonModelTopSection
                                                                            title="Tata"
                                                                            highlight="Nexon"
                                                                            others="Competitors"
                                                                            description="Considering the Nexon? This page provides a comprehensive overview of its key competitors in the market. Here you'll find information about the Tata Nexon's direct rivals. Each competitor's page provides detailed information on price, engine and dime"
                                                                        />
                                                                        : activeTab === "Images" ?
                                                                            <CommonModelTopSection
                                                                                title="Tata"
                                                                                highlight="Nexon"
                                                                                others="Images (Interior & Exterior)"
                                                                                description="Uncover the Tata Nexon from top to bottom with our extensive collection of high-resolution Nexon car images. This page allows you to examine every aspect of the vehicle in detail. Explore the Tata Nexon interior and its layout to discover the perfect..."
                                                                            />
                                                                            : activeTab === "Maintenance Cost" ?
                                                                                <CommonModelTopSection
                                                                                    title="Tata"
                                                                                    highlight="Nexon"
                                                                                    others="Maintenance Cost"
                                                                                    description="Get the estimated service cost of the Tata Nexon with a year-by-year breakup for parts labour and taxes. We show the total 10-year maintenance cost, the average yearly cost and the cost per km based on the recommended service schedule. Use the ..."
                                                                                />
                                                                                : activeTab === "Cost Of Ownership" ?
                                                                                    <CommonModelTopSection
                                                                                        title="Tata"
                                                                                        highlight="Nexon"
                                                                                        others="Cost Of Ownership"
                                                                                        description="Calculate the total cost of ownership for the Tata Nexon in your city. We combine on-road price plus periodic maintenance cost plus running cost from real-world mileage to show a 5-year total and ₹/km. Edit years or kilometres to match your usage. ..."
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
