'use client'

import { IMAGE_URL } from "@/utils/constant";
import React from "react";

interface ModelComparisonSimilarCarsProps {
    model: string;
    slug: string;
}

export interface CarImage {
    name: string;
    alt: string;
    url: string;
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface StandardWarranty {
    years: string;
    km: string;
}

export interface CarSpecs {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    groundClearance: number;
    safetyRating: string;
    standardWarranty: StandardWarranty;
}

export interface CarModelDetails {
    modelId: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    specs: CarSpecs;
}

// ----------------------------
// 👉 Dummy Cars Data
// ----------------------------
const cars: CarModelDetails[] = [
    {
        modelId: 1,
        name: "Hyundai Creta",
        slug: "hyundai-creta",
        image: "creta.jpg",
        price: 1150000,
        specs: {
            length: 4300,
            width: 1790,
            height: 1635,
            wheelbase: 2610,
            groundClearance: 190,
            safetyRating: "5 Star",
            standardWarranty: { years: "3 Years", km: "100,000 km" }
        }
    },
    {
        modelId: 2,
        name: "Kia Seltos",
        slug: "kia-seltos",
        image: "seltos.jpg",
        price: 1200000,
        specs: {
            length: 4315,
            width: 1800,
            height: 1620,
            wheelbase: 2610,
            groundClearance: 190,
            safetyRating: "5 Star",
            standardWarranty: { years: "3 Years", km: "100,000 km" }
        }
    },
    {
        modelId: 3,
        name: "Maruti Grand Vitara",
        slug: "maruti-grand-vitara",
        image: "grand-vitara.jpg",
        price: 1050000,
        specs: {
            length: 4345,
            width: 1795,
            height: 1645,
            wheelbase: 2600,
            groundClearance: 210,
            safetyRating: "4 Star",
            standardWarranty: { years: "2 Years", km: "50,000 km" }
        }
    },
    {
        modelId: 4,
        name: "Maruti Grand Vitara",
        slug: "maruti-grand-vitara",
        image: "grand-vitara.jpg",
        price: 1050000,
        specs: {
            length: 4345,
            width: 1795,
            height: 1645,
            wheelbase: 2600,
            groundClearance: 210,
            safetyRating: "4 Star",
            standardWarranty: { years: "2 Years", km: "50,000 km" }
        }
    },
    {
        modelId: 5,
        name: "Maruti Grand Vitara",
        slug: "maruti-grand-vitara",
        image: "grand-vitara.jpg",
        price: 1050000,
        specs: {
            length: 4345,
            width: 1795,
            height: 1645,
            wheelbase: 2600,
            groundClearance: 210,
            safetyRating: "4 Star",
            standardWarranty: { years: "2 Years", km: "50,000 km" }
        }
    },
    {
        modelId: 6,
        name: "Maruti Grand Vitara",
        slug: "maruti-grand-vitara",
        image: "grand-vitara.jpg",
        price: 1050000,
        specs: {
            length: 4345,
            width: 1795,
            height: 1645,
            wheelbase: 2600,
            groundClearance: 210,
            safetyRating: "4 Star",
            standardWarranty: { years: "2 Years", km: "50,000 km" }
        }
    }
];


// ----------------------------
// 👉 Dummy Specs Structure
// ----------------------------
const specs = [
    {
        label: "Length (mm)",
        values: cars.map(car => car.specs.length)
    },
    {
        label: "Width (mm)",
        values: cars.map(car => car.specs.width)
    },
    {
        label: "Height (mm)",
        values: cars.map(car => car.specs.height)
    },
    {
        label: "Wheelbase (mm)",
        values: cars.map(car => car.specs.wheelbase)
    },
    {
        label: "Ground Clearance (mm)",
        values: cars.map(car => car.specs.groundClearance)
    },
    {
        label: "Safety Rating",
        values: cars.map(car => car.specs.safetyRating)
    },
    {
        label: "Warranty",
        values: cars.map(car => `${car.specs.standardWarranty.years} / ${car.specs.standardWarranty.km}`)
    }
];


// ----------------------------
// 👉 Price Format Utility
// ----------------------------
const convertToLakhFormat = (price: number) => {
    return `₹ ${(price / 100000).toFixed(2)} Lakh`;
};


// ----------------------------
// 👉 Component
// ----------------------------
export default function ModelComparisonSimilarCars({ model, slug }: ModelComparisonSimilarCarsProps) {

    return (
        <div>
            <h2 className="text-xl mb-4">
                {model} <span className="font-semibold">Comparison With Similar Cars</span>
            </h2>

            <div className="flex w-full bg-white rounded-xl overflow-hidden">

                {/* FIXED FIRST COLUMN */}
                <div className="sticky left-0 z-20 bg-white shadow-md pb-4">
                    <div className="w-56 flex flex-col p-2">
                        <img
                            src={`/model/tata.png`}
                            className="object-cover rounded-xl"
                        />
                        <p className="text-sm mt-4">{cars[0].name}</p>
                        <p className="font-semibold text-md">{convertToLakhFormat(cars[0].price)}</p>
                    </div>

                    {specs.map((row, i) => (
                        <div key={i} className="pt-4 w-56 bg-white">
                            <p className="text-xs h-6 bg-[#F7F7F7] flex items-center pl-3">{row.label}</p>
                            <p className="text-gray-700 text-sm mt-4 pl-3">{row.values[0]}</p>
                        </div>
                    ))}
                </div>

                {/* OTHER SCROLLABLE COLUMNS */}
                <div className="overflow-x-auto flex scrollbar-hide pb-4">
                    {cars.slice(1).map((car, index) => (
                        <div key={index} className="w-56">
                            <div className="w-56 flex flex-col p-2">
                                <img
                                    src={`/model/tata.png`}
                                    className="object-cover rounded-xl"
                                />
                                <p className="text-sm mt-4">{car.name}</p>
                                <p className="font-semibold text-md">{convertToLakhFormat(car.price)}</p>
                            </div>

                            {specs.map((row, i) => (
                                <div key={i} className="pt-4 w-56 text-center">
                                    <p className="text-xs h-6 bg-[#F7F7F7]"></p>
                                    <p className="text-gray-700 text-sm mt-4">{row.values[index + 1]}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
