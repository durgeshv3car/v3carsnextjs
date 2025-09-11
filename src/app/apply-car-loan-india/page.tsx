
import ApplyForCarLoan from '@/components/responsive/car-loan/ApplyForCarLoan'
import React from 'react'
import WhatIsCarInsurance from '@/components/responsive/car-insurance/WhatIsCarInsurance'
import TopSection from '@/components/common/TopSection'
import CommonFaqAccordion from '@/components/common/CommonFaqAccordion'

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

export default function page() {
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
            <WhatIsCarInsurance />
            <WhatIsCarInsurance />

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:max-w-[1600px] mx-auto">
                    <CommonFaqAccordion faqData={faqData} />
                </div>
            </div>
        </div>
    )
}
