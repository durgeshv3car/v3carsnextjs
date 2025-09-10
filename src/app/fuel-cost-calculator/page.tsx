'use client'

import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import FuelCostBarGraph from '@/components/responsive/fuel-cost-calcultor/FuelCostBarGraph'
import FuelCostInfoBlock from '@/components/responsive/fuel-cost-calcultor/FuelCostInfoBlock'
import FuelCostTable from '@/components/responsive/fuel-cost-calcultor/FuelCostTable'
import QuickLinks from '@/components/responsive/fuel-cost-calcultor/QuickLinks'
import TopControls, { Currency, DistanceUnit, Period } from '@/components/responsive/fuel-cost-calcultor/TopControls'
import React, { useState } from 'react'

const faqData = [
    {
        question: 'What is the Smartest Way to Finance a Car?',
        answer: 'The smartest way is to compare interest rates, check your credit score, and choose the most affordable loan option that fits your budget.'
    },

    {
        question: 'What is the Difference Between EMI in Arrears and EMI in Advance?',
        answer: 'EMI in arrears is paid at the end of the period, while EMI in advance is paid at the start of the period.'
    },

    {
        question: 'Is the Car Loan EMI Fixed or Can it Change in the Future?',
        answer: 'Most car loan EMIs are fixed, but floating rate loans may vary based on interest rate changes.'
    },

    {
        question: 'What are the Different Ways by Which the Car Loan EMI Can be Paid?',
        answer: 'You can pay via auto-debit, post-dated cheques, UPI, or direct bank transfer.'
    },
    {
        question: 'Who Can Avail of a Car Loan?',
        answer: 'Any salaried, self-employed individual, or business entity with a valid income source and documentation can apply.'
    },
    {
        question: 'What is a Car Loan Repayment Table?',
        answer: 'It shows the breakup of your loan repayment schedule including principal and interest components over time.'
    },
    {
        question: 'What are the Benefits of Using an Online Car Loan EMI Calculator?',
        answer: 'You can estimate your monthly EMI, total interest, and overall repayment schedule quickly and easily.'
    },
    {
        question: 'What are the Documents Required to Apply for a Car Loan?',
        answer: 'You need identity proof, address proof, income proof, and bank statements.'
    },
    {
        question: 'What are the Best Interest Rates for a Car Loan?',
        answer: 'Interest rates vary by bank, your credit profile, and loan amount. Always compare lenders before applying.'
    },
];

export default function Page() {

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
                <div className='max-w-[1600px] mx-auto'>
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

            <div className='max-w-[1600px] mx-auto px-4 lg:px-10'>
                <CommonFaqAccordion faqData={faqData} />
            </div>

        </div>
    )
}
