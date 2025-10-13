'use client'

import React from 'react'

import MileageCalculatorIntro from '../../components/responsive/mileage-calculator/MileageCalcultorIntro'
import MileageCalculator from '@/components/responsive/mileage-calculator/MileageCalculator'
import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'
import { useGetMileageCalculatorQuery } from '@/redux/api/websiteContentApi'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'

type MileageCalculatorType = {
  title: string
  description: string
}

export default function Page() {
  const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 1 });
  const { data: mileageCalculatorData } = useGetMileageCalculatorQuery()

  const mileageCalculator: MileageCalculatorType[] = mileageCalculatorData?.rows ?? []
  const faqByModule = faqByModuleData?.rows ?? [];

  return (
    <div>
      <MileageCalculatorIntro />
      <MileageCalculator />

      {mileageCalculator.length > 0 && (
        mileageCalculator.map((mileage, index) => (
          <div key={index}>
            <WhatIsCarInsurance
              title={mileage.title}
              descripation={mileage.description}
            />
          </div>
        ))
      )}

      {/* <WhatIsCarInsurance /> */}

      <div className="px-4 lg:px-10 py-6">
        <div className="w-full lg:app-container mx-auto">
          <CommonFaqAccordion faqData={faqByModule} />
        </div>
      </div>

    </div>
  )
}
