'use client'

import ModelPage from "@/components/responsive/brand/model/ModelPage";
import StateCityPage from "@/components/responsive/pages/StateCityPage";
import StatePage from "@/components/responsive/pages/StatePage";
import { useParams } from "next/navigation";

interface Params {
    type: string;
    slug: string;
    [key: string]: string;
}

export default function Page() {
    const params = useParams<Params>()
    const { type, slug } = params;

    if (slug.includes("-price-in-")) {
        const [fuelType, citySlug] = slug.split("-price-in-");
        return <StateCityPage type={type} citySlug={citySlug} fuelType={fuelType} />
    }

    if (slug.endsWith("-price")) {
        const fuelType = slug.replace("-price", "");
        return <StatePage type={type} fuelType={fuelType} />
    }

    // Otherwise treat as model
    return <ModelPage type={type} slug={slug} />
}
