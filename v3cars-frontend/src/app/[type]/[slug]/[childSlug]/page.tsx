'use client'

import CSDPricePage from "@/components/responsive/brand/model/csd-price/CSDPricePage";
import DimensionsPage from "@/components/responsive/brand/model/dimensions/DimensionsPage";
import MileagePage from "@/components/responsive/brand/model/mileage/MileagePage";
import MonthlySalesPage from "@/components/responsive/brand/model/monthly-sales/MonthlySalesPage";
import NewsPage from "@/components/responsive/brand/model/news/NewsPage";
import OffersDiscountsPage from "@/components/responsive/brand/model/offers-discounts/OffersDiscountsPage";
import PriceListPage from "@/components/responsive/brand/model/price/PriceListPage";
import ProsConsPage from "@/components/responsive/brand/model/pros-cons/ProsConsPage";
import ReviewsPage from "@/components/responsive/brand/model/reviews/ReviewsPage";
import VariantPage from "@/components/responsive/brand/model/variants/VariantPage";
import { setActiveTab } from "@/redux/slices/carModelSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Params {
    type: string;
    slug: string;
    childSlug: string;
    [key: string]: string;
}

function Page() {
    const params = useParams<Params>()
    const { type, slug, childSlug } = params;
    const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.carModelSlice.activeTab);

    useEffect(() => {

        function handleModelState() {
            if (childSlug === "price-in-jaipur") {
                dispatch(setActiveTab("Price"));
            }
            if (childSlug === "which-variant-to-buy") {
                dispatch(setActiveTab("Variants"));
            }
            if (childSlug === "dimensions") {
                dispatch(setActiveTab("Dimensions"));
            }
            if (childSlug === "csd-price") {
                dispatch(setActiveTab("CSD Price"));
            }
            if (childSlug === "mileage") {
                dispatch(setActiveTab("Mileage, Specs & Features"));
            }
            if (childSlug === "news") {
                dispatch(setActiveTab("News"));
            }
            if (childSlug === "pros-cons") {
                dispatch(setActiveTab("Pros Cons"));
            }
            if (childSlug === "offers-discounts") {
                dispatch(setActiveTab("Offers Discounts"));
            }
            if (childSlug === "monthly-sales") {
                dispatch(setActiveTab("Monthly Sales"));
            }
            if (childSlug === "reviews") {
                dispatch(setActiveTab("Reviews"));
            }
        }

        handleModelState()
    }, [childSlug])


    return (
        <>
            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <Link href={`/${type}`} className="hover:underline capitalize">
                            {type}
                        </Link>
                        <span className="text-yellow-500">›</span>
                        <Link href={`/${type}/${slug}`} className="hover:underline capitalize">
                            {slug}
                        </Link>
                        <span className="text-yellow-500">›</span>
                        <span className="text-yellow-500 capitalize">
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
                                : activeTab === "Mileage, Specs & Features" ?
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
                                            : null
            }
        </>
    );
}

export default Page;