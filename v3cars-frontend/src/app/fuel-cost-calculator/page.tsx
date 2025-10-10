'use client'

import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import FuelCostBarGraph from '@/components/responsive/fuel-cost-calcultor/FuelCostBarGraph'
import FuelCostInfoBlock from '@/components/responsive/fuel-cost-calcultor/FuelCostInfoBlock'
import FuelCostTable from '@/components/responsive/fuel-cost-calcultor/FuelCostTable'
import QuickLinks from '@/components/responsive/fuel-cost-calcultor/QuickLinks'
import TopControls, { Currency, DistanceUnit, Period } from '@/components/responsive/fuel-cost-calcultor/TopControls'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import React, { useState } from 'react'

export default function Page() {
    const { data: faqByModuleData, error, isLoading } = useGetFAQByModuleQuery({ moduleId: 2 });

    const faqByModule = faqByModuleData?.rows ?? [];

    // shared state
    const [country, setCountry] = useState('India');
    const [currency, setCurrency] = useState<Currency>('INR');
    const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
    const [period, setPeriod] = useState<Period>('daily');
    const [distanceValue, setDistanceValue] = useState<number>(2100); // default like design

    // fuel prices (editable in table row)
    const [prices, setPrices] = useState({
        petrol: 95.08,
        diesel: 88.23,
        cng: 80.67, // per kg
    });

    // efficiencies (km per liter, km per kg for CNG)
    const [eff, setEff] = useState({
        petrol: 15,
        diesel: 15,
        cng: 15,
    });

    return (
        <div className="min-h-screen bg-[#f6f7f8] dark:bg-black">

            <TopControls
                country={country}
                setCountry={setCountry}
                currency={currency}
                setCurrency={setCurrency}
                distanceUnit={distanceUnit}
                setDistanceUnit={setDistanceUnit}
                period={period}
                setPeriod={setPeriod}
                distanceValue={distanceValue}
                setDistanceValue={setDistanceValue}
            />

            <div className='px-4 lg:px-10'>
                <div className='app-container mx-auto'>
                    <FuelCostTable
                        currency={currency}
                        distanceUnit={distanceUnit}
                        period={period}
                        distanceValue={distanceValue}
                        prices={prices}
                        setPrices={setPrices}
                        efficiencies={eff}
                        setEfficiencies={setEff}
                    />
                </div>
            </div>

            <FuelCostInfoBlock />
            <FuelCostBarGraph />
            <QuickLinks />

            <div className='app-container mx-auto px-4 lg:px-10'>
                <CommonFaqAccordion faqData={faqByModule} />
            </div>

        </div>
    )
}
