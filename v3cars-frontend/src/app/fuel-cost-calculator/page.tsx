'use client'

import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import FuelCostBarGraph from '@/components/responsive/fuel-cost-calcultor/FuelCostBarGraph'
import FuelCostInfoBlock from '@/components/responsive/fuel-cost-calcultor/FuelCostInfoBlock'
import FuelCostTable from '@/components/responsive/fuel-cost-calcultor/FuelCostTable'
import QuickLinks from '@/components/responsive/fuel-cost-calcultor/QuickLinks'
import TopControls from '@/components/responsive/fuel-cost-calcultor/TopControls'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import { RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

type FuelCostInputs = {
  drivingDistance?: number;
  country?: string;
  currencySymbol?: string;
  exchangeCurrencyRate?: number;
};

export default function Page() {
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 2 });
    const faqByModule = faqByModuleData?.rows ?? [];
    const selectedCity = useSelector((state: RootState) => state.common.selectedCity);

    const [inputs, setInputs] = useState<FuelCostInputs>({});

    const handleInputChange = (updatedValues: FuelCostInputs) => {
        setInputs((prev) => ({ ...prev, ...updatedValues }));
    };

    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-black">

            <TopControls onInputChange={handleInputChange} />

            <div className='px-4 lg:px-10'>
                <div className='app-container mx-auto'>
                    <FuelCostTable
                        inputs={inputs}
                        selectedCity={{
                            ...selectedCity,
                            cityId: selectedCity.cityId ?? 0 // or provide a default value
                        }}
                    />
                </div>
            </div>

            <FuelCostInfoBlock />
            {
                inputs.country === "India" && (
                    <FuelCostBarGraph districtId={145} />
                )
            }
            <QuickLinks />

            <div className='app-container mx-auto px-4 lg:px-10'>
                <CommonFaqAccordion faqData={faqByModule} />
            </div>

        </div>
    )
}
