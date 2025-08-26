import CarLoanIntro from '@/components/responsive/car-loan/CarLoanIntro'
import ApplyForCarLoan from '@/components/responsive/car-loan/ApplyForCarLoan'
import React from 'react'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'

export default function page() {
    return (
        <div>
            <CarLoanIntro />
            <ApplyForCarLoan />
            <WhatIsCarInsurance />
            <WhatIsCarInsurance />
        </div>
    )
}
