import React from 'react'

import MileageCalculatorIntro from '../../components/responsive/mileage-calculator/MileageCalcultorIntro'
import MileageCalculator from '@/components/responsive/mileage-calculator/MileageCalculator'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'

export default function page() {
  return (
    <div>
        <MileageCalculatorIntro/>
        <MileageCalculator/>
        <WhatIsCarInsurance/>
        <WhatIsCarInsurance/>
        
    </div>
  )
}
