'use client'

import { useParams, notFound } from "next/navigation";
import FuelTypePriceInIndiaPage from "../responsive/pages/FuelTypePriceInIndiaPage";
import StateCityPage from "../responsive/pages/StateCityPage";
import StatePage from "../responsive/pages/StatePage";
import ModelPage from "../responsive/brand/model/ModelPage";
import DynmicModelSlug from "../responsive/brand/model/DynmicModelSlug";
import BrandPage from "../responsive/brand/BrandPage";
import ModelOnRoadPrice from "../responsive/brand/model/ModelOnRoadPrice";
import ComparePage from "../responsive/compare-cars/ComparePage";
import CostOfOwnerShip from "../responsive/cost-of-ownership/CostOfOwnerShip";

type Params = {
    slug?: string[];
};

export default function DynmicSlug() {
    const params = useParams<Params>();
    const { slug } = params;

    if (!Array.isArray(slug) || slug.length === 0) {
        return notFound();
    }

    //  /fueltype-price-in-india
    if (slug[0]?.includes("price-in-india")) {
        const [fuelType] = slug[0].split("-price-in-india");
        if (!fuelType) return notFound();
        return <FuelTypePriceInIndiaPage fuelType={fuelType} />;
    }

    if (slug[0]?.startsWith("compare")) {
        return <ComparePage slug={slug} />;
    }

    if (slug[0]?.startsWith("ownership")) {
        return <CostOfOwnerShip slug={slug} />;
    }

    //  /type/fueltype-price-in-city
    if (slug[1]?.includes("-price-in-")) {
        const [fuelType, citySlug] = slug[1].split("-price-in-");
        if (!fuelType || !citySlug) return notFound();
        return <StateCityPage type={slug[0]} citySlug={citySlug} fuelType={fuelType} />;
    }

    //  /type/fueltype-price
    if (slug[1]?.endsWith("-price")) {
        const fuelType = slug[1].replace("-price", "");
        if (!fuelType) return notFound();
        return <StatePage type={slug[0]} fuelType={fuelType} />;
    }

    //  /type/model/on-road-price-in
    if (slug[2]?.startsWith("on-road-price-in-")) {
        const city = slug[2].replace("on-road-price-in-", "");

        return <ModelOnRoadPrice type={slug[0]} slug={slug[1]} cityName={city} />
    }

    //  /type/model/child
    if (slug[2]) {
        if (!slug[0] || !slug[1]) return notFound();
        return <DynmicModelSlug type={slug[0]} slug={slug[1]} childSlug={slug[2]} />;
    }

    //  /type/model
    if (slug[1]) {
        return <ModelPage type={slug[0]} slug={slug[1]} />;
    }

    //  /type
    if (slug[0]) {
        return <BrandPage type={slug[0]} />;
    }

    return notFound();
}
