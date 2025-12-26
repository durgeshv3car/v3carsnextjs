'use client'

import ApplyForCarLoan from '@/components/responsive/car-loan/ApplyForCarLoan'
import React from 'react'
import TopSection from '@/components/common/TopSection'
import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import CarLoanInfo from '@/components/responsive/car-loan/CarLoanInfo'
// import { useGetApplyCarLoanIndiaQuery } from '@/redux/api/websiteContentApi'

export default function MainCarLoanComponent() {
    const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 10 });
    // const { data: ApplyCarLoanData } = useGetApplyCarLoanIndiaQuery();

    const faqByModule = faqByModuleData?.rows ?? [];
    // const applyCarLoan = ApplyCarLoanData?.rows ?? [];

    return (
        <div className=''>
            <TopSection
                title={"Car Loan in India"}
                description={`Gear up for exciting new car launches in India (2024-2025)! We’ve compiled a 
                                comprehensive list featuring over 164 upcoming cars across various segments like SUVs,
                                 hatchbacks, sedans, and more. Top brands like Maruti Suzuki, Hyundai, Tata, Mahindra, Kia 
                                 and others are all set to unveil their latest offerings. Explore expected prices, model image and launch dates for each car. 
                                 `}
            />

            <ApplyForCarLoan />

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CarLoanInfo />
                </div>
            </div>
            {/* <WhatIsCarInsurance /> */}

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CommonFaqAccordion faqData={faqByModule} />
                </div>
            </div>
        </div>
    )
}
