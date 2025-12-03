'use client'

import CSDPricePage from "@/components/responsive/brand/model/csd-price/CSDPricePage";
import DimensionsPage from "@/components/responsive/brand/model/dimensions/DimensionsPage";
import EngineSpecificationsPage from "@/components/responsive/brand/model/engine-specifications/EngineSpecificationsPage";
import MileagePage from "@/components/responsive/brand/model/mileage/MileagePage";
import MonthlySalesPage from "@/components/responsive/brand/model/monthly-sales/MonthlySalesPage";
import NewsPage from "@/components/responsive/brand/model/news/NewsPage";
import OffersDiscountsPage from "@/components/responsive/brand/model/offers-discounts/OffersDiscountsPage";
import PriceListPage from "@/components/responsive/brand/model/price/PriceListPage";
import ProsConsPage from "@/components/responsive/brand/model/pros-cons/ProsConsPage";
import ReviewsPage from "@/components/responsive/brand/model/reviews/ReviewsPage";
import VariantPage from "@/components/responsive/brand/model/variants/VariantPage";
import { ModelTab, setActiveTab } from "@/redux/slices/carModelSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideosPage from "./videos/VideosPage";
import ColorsPage from "./colors/ColorsPage";
import CompetitorsPage from "./competitors/CompetitorsPage";
import ImagesPage from "./images/ImagesPage";
import MainMaintenanceComponent from "./maintenance-cost/MainMaintenanceComponent";
import MainOwnershipComponent from "./cost-of-ownership/MainOwnershipComponent";
import { notFound, useRouter } from "next/navigation";
import { convertToSlug } from "./overview/PriceListTable";
import { setSelectedCity } from "@/redux/slices/commonSlice";

interface DynmicModelSlugProps {
    type: string;
    slug: string;
    childSlug: string;
}

const slugMapping: Record<string, string> = {
    "price-in-jaipur": "Price",
    "which-variant-to-buy": "Variants",
    "dimensions": "Dimensions",
    "csd-price": "CSD Price",
    "mileage": "Mileage",
    "news": "News",
    "pros-cons": "Pros Cons",
    "offers-discounts": "Offers Discounts",
    "monthly-sales": "Monthly Sales",
    "reviews": "Reviews",
    "videos": "Videos",
    "engine-specifications": "Specifications Features",
    "colors": "Colors",
    "competitors": "Competitors",
    "images": "Images",
    "maintenance-cost": "Maintenance Cost",
    "cost-of-ownership": "Cost Of Ownership",
};

function DynmicModelSlug({ type, slug, childSlug }: DynmicModelSlugProps) {
    const activeTab = useSelector((state: RootState) => state.carModelSlice.activeTab);
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const slugMapping: Record<string, string> = {
        [`price-in-${convertToSlug(selectedCity.cityName)}`]: "Price",
        "which-variant-to-buy": "Variants",
        "dimensions": "Dimensions",
        "csd-price": "CSD Price",
        "mileage": "Mileage",
        "news": "News",
        "pros-cons": "Pros Cons",
        "offers-discounts": "Offers Discounts",
        "monthly-sales": "Monthly Sales",
        "reviews": "Reviews",
        "videos": "Videos",
        "engine-specifications": "Specifications Features",
        "colors": "Colors",
        "competitors": "Competitors",
        "images": "Images",
        "maintenance-cost": "Maintenance Cost",
        "cost-of-ownership": "Cost Of Ownership",
    };

    const tab = slugMapping[childSlug];

    useEffect(() => {
        if (!tab) {
            notFound();
        } else {
            dispatch(setActiveTab(tab as ModelTab));
        }
    }, [tab]);

    // useEffect(() => {
    //     if (!childSlug || !selectedCity?.cityName) return;

    //     const expectedUrl = `/${type}/${slug}/price-in-${convertToSlug(selectedCity.cityName)}`;

    //     // SAME URL hai → push mat karo (warna loop lagega)
    //     if (window.location.pathname !== expectedUrl) {
    //         router.push(expectedUrl);
    //     }

    // }, [childSlug, selectedCity.cityName]);


    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <Link href={`/${type}`} className="hover:underline capitalize">
                            {type}
                        </Link>
                        <span className="text-primary">›</span>
                        <Link href={`/${type}/${slug}`} className="hover:underline capitalize">
                            {slug}
                        </Link>
                        <span className="text-primary">›</span>
                        <span className="text-primary capitalize">
                            {childSlug}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center my-4">
                <img
                    src={'/model/bannerads.png'}
                    alt="banner ads"
                    width={970}
                    height={90}
                    className="rounded-lg"
                />
            </div>

            {
                activeTab === "Price" ?
                    <PriceListPage type={type} slug={slug} childSlug={childSlug} />
                    : activeTab === "Variants" ?
                        <VariantPage type={type} slug={slug} childSlug={childSlug} />
                        : activeTab === "Dimensions" ?
                            <DimensionsPage type={type} slug={slug} childSlug={childSlug} />
                            : activeTab === "CSD Price" ?
                                <CSDPricePage type={type} slug={slug} childSlug={childSlug} />
                                : activeTab === "Mileage" ?
                                    <MileagePage type={type} slug={slug} childSlug={childSlug} />
                                    : activeTab === "News" ?
                                        <NewsPage type={type} slug={slug} childSlug={childSlug} />
                                        : activeTab === "Pros Cons" ?
                                            <ProsConsPage type={type} slug={slug} childSlug={childSlug} />
                                            : activeTab === "Offers Discounts" ?
                                                <OffersDiscountsPage type={type} slug={slug} childSlug={childSlug} />
                                                : activeTab === "Monthly Sales" ?
                                                    <MonthlySalesPage type={type} slug={slug} childSlug={childSlug} />
                                                    : activeTab === "Reviews" ?
                                                        <ReviewsPage type={type} slug={slug} childSlug={childSlug} />
                                                        : activeTab === "Specifications Features" ?
                                                            <EngineSpecificationsPage type={type} slug={slug} childSlug={childSlug} />
                                                            : activeTab === "Videos" ?
                                                                <VideosPage type={type} slug={slug} childSlug={childSlug} />
                                                                : activeTab === "Colors" ?
                                                                    <ColorsPage type={type} slug={slug} childSlug={childSlug} />
                                                                    : activeTab === "Competitors" ?
                                                                        <CompetitorsPage type={type} slug={slug} childSlug={childSlug} />
                                                                        : activeTab === "Images" ?
                                                                            <ImagesPage type={type} slug={slug} childSlug={childSlug} />
                                                                            : activeTab === "Maintenance Cost" ?
                                                                                <MainMaintenanceComponent type={type} slug={slug} childSlug={childSlug} />
                                                                                : activeTab === "Cost Of Ownership" ?
                                                                                    <MainOwnershipComponent type={type} slug={slug} childSlug={childSlug} />
                                                                                    : null
            }
        </>
    );
}

export default DynmicModelSlug;