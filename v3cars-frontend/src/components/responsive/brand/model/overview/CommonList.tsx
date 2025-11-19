'use client'

import React from "react";
import PriceListTable from "./PriceListTable";
import VariantTable from "./VariantTable";
import DimensionsTable from "./DimensionsTable";

interface PriceListProps {
    model: string;
    title: string;
    desc: string;
    data: [] | null;
    fuelTypes?: string[];
    fuelType?: string;
    setFuelType?: React.Dispatch<React.SetStateAction<string>>;
    transmissionType?: string;
    setTransmissionType?: React.Dispatch<React.SetStateAction<string>>;
}

const CommonList: React.FC<PriceListProps> = ({ model, title, desc, data, fuelType, fuelTypes, setFuelType, transmissionType, setTransmissionType }) => {

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-2">
                <div>
                    <h2 className="text-lg">
                        {model}{" "}
                        <span className="font-semibold">
                            {
                                title === "Price List" ?
                                    "Price List" :
                                    title === "Variant To Buy" ?
                                        "Variant To Buy" :
                                        "Dimensions & Capacity"
                            }
                        </span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {desc}
                    </p>
                </div>
                {
                    title === "Price List" && (
                        <p className="text-xs whitespace-nowrap">Last Updated: 24/10/2025</p>
                    )
                }
            </div>

            {/* Table Data */}

            {
                title === "Price List" ?
                    <PriceListTable data={data} setFuelType={setFuelType} fuelType={fuelType} fuelTypes={fuelTypes} transmissionType={transmissionType} setTransmissionType={setTransmissionType} />
                    : title === "Variant To Buy" ?
                        <VariantTable data={data} />
                        :
                        <DimensionsTable model={model} data={data} />
            }

        </div>
    );
};

export default CommonList;


