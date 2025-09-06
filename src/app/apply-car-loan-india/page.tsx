
import ApplyForCarLoan from '@/components/responsive/car-loan/ApplyForCarLoan'
import React from 'react'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'
import TopSection from '@/components/common/TopSection'

export default function page() {
    return (
        <div className='bg-white dark:bg-[#171717]'>
             <TopSection
                            title={"Car Loan in India"}
                            description={`Gear up for exciting new car launches in India (2024-2025)! We’ve compiled a 
                                comprehensive list featuring over 164 upcoming cars across various segments like SUVs,
                                 hatchbacks, sedans, and more. Top brands like Maruti Suzuki, Hyundai, Tata, Mahindra, Kia 
                                 and others are all set to unveil their latest offerings. Explore expected prices, model image and launch dates for each car. 
                                 `}
                        />
            <ApplyForCarLoan />
            <WhatIsCarInsurance />
            <WhatIsCarInsurance />
        </div>
    )
}
