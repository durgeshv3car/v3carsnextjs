'use client'

import React from 'react'

import MileageCalculatorIntro from '../../components/responsive/mileage-calculator/MileageCalcultorIntro'
import MileageCalculator from '@/components/responsive/mileage-calculator/MileageCalculator'
import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'
import { useGetFAQByModuleQuery } from '@/redux/api/commonApi'

export default function Page() {
  const { data: faqByModuleData } = useGetFAQByModuleQuery({ moduleId: 1 });

  const faqByModule = faqByModuleData?.rows ?? [];

  return (
    <div>
      <MileageCalculatorIntro />
      <MileageCalculator />
      {/* <WhatIsCarInsurance /> */}
      {/* <WhatIsCarInsurance /> */}

      <div className="px-4 lg:px-10 py-6">
        <div className="w-full lg:app-container mx-auto">
          <CommonFaqAccordion faqData={faqByModule} />
        </div>
      </div>

    </div>
  )
}
