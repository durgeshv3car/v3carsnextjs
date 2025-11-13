'use client'

import BrandPage from "@/components/responsive/brand/BrandPage";
import FuelTypePriceInIndiaPage from "@/components/responsive/pages/FuelTypePriceInIndiaPage";
import { useParams } from "next/navigation";

interface Params {
    type: string;
    [key: string]: string;
}

export default function Page() {
    const params = useParams<Params>()
    const { type } = params

    if (type.endsWith("-price-in-india")) {
        const [fuelType] = type.split("-price-in-india");
        return <FuelTypePriceInIndiaPage fuelType={fuelType} />
    }

    return <BrandPage type={type} />
}
