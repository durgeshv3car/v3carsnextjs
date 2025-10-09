'use client'

import InsuranceQuoteSection from '@/components/responsive/car-insurance/CarInsuranceHeader'
import InsuranceCard from '@/components/responsive/car-insurance/InsuranceCard'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'
import { useGetCarInsuranceIndiaQuery } from '@/redux/api/websiteContentApi'
import React from 'react'

type CarInsuranceIndiaType = {
  carInsuranceHeading: string
  carInsuranceContent: string
  section1Heading: string
  section1Desc: string
  section2Heading: string
  section2Desc: string
  section3Heading: string
  section3Desc: string
  section4Heading: string
  section4Desc: string
  section5Heading: string
  section5Desc: string
  section6Heading: string
  section6SubDesc1: string
  section6SubDesc2: string
  section6SubDesc3: string
  section7Heading: string
  section7Desc: string
  section8Heading: string
  section8Desc: string
  section9Heading: string
  section9Desc: string
  section10heading: string
  section10Desc: string
}

export default function Page() {
  const { data: carInsuranceIndiaData } = useGetCarInsuranceIndiaQuery()

  const carInsuranceIndia: CarInsuranceIndiaType[] = carInsuranceIndiaData?.rows ?? []

  return (
    <div>

      <InsuranceQuoteSection />
      
      {carInsuranceIndia.length > 0 && (
        carInsuranceIndia.map((insurance, index) => (
          <div key={index}>
            <WhatIsCarInsurance title={insurance.carInsuranceHeading} descripation={insurance.carInsuranceContent} />
            <WhatIsCarInsurance title={insurance.section1Heading} descripation={insurance.section1Desc} />
            <WhatIsCarInsurance title={insurance.section2Heading} descripation={insurance.section2Desc} />
            <WhatIsCarInsurance title={insurance.section3Heading} descripation={insurance.section3Desc} />
            <WhatIsCarInsurance title={insurance.section4Heading} descripation={insurance.section4Desc} />
            <WhatIsCarInsurance title={insurance.section5Heading} descripation={insurance.section5Desc} />
            <InsuranceCard title={insurance.section6Heading} descripation1={insurance.section6SubDesc1} descripation2={insurance.section6SubDesc2} descripation3={insurance.section6SubDesc3} />
            <WhatIsCarInsurance title={insurance.section7Heading} descripation={insurance.section7Desc} />
            <WhatIsCarInsurance title={insurance.section8Heading} descripation={insurance.section8Desc} />
            <WhatIsCarInsurance title={insurance.section9Heading} descripation={insurance.section9Desc} />
            <WhatIsCarInsurance title={insurance.section10heading} descripation={insurance.section10Desc} />
          </div>
        ))
      )}

    </div>
  )
}
