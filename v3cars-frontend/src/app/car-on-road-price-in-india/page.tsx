'use client'

import CommonLatestCarNews from "@/components/web/common/CommonLatestCarNews";
import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import UpcomingCarInIndia from "@/components/common/UpcomingCarInIndia";
import DiscontinuedCarList from "@/components/responsive/brand/DiscontinuedCarList";
import CarInIndia from "@/components/responsive/car-on-road-price/CarsInIndia";
import FilterSection from "@/components/responsive/car-on-road-price/FilterSection";
import FuelTab from "@/components/responsive/car-on-road-price/FuelTab";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import MobileLatestCarNews from "@/components/mobile/common/LatestCarNews";

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

const discontinuedMahindraCars = [
    "Mahindra Alturas G4",
    "Mahindra KUV100",
    "Mahindra TUV 300",
    "Mahindra TUV 300 Plus",
    "Mahindra XUV500",
    "Mahindra eVerito",
    "Mahindra Xylo",
];


function CarOnRoadPrice() {

    const isMobile = useIsMobile()

    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Car On Road Price
                        </span>
                    </div>
                </div>
            </div>

            <FilterSection />

            <div className="px-4 xl:px-10">
                <div className="w-full lg:app-container py-6 mx-auto space-y-7">

                    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
                        <div className="w-auto lg:min-w-[74%] space-y-6">
                            <CarInIndia />
                        </div>
                        <div className="w-auto lg:min-w-[24%] space-y-6 lg:mt-12">
                            <FuelTab />
                            <DiscontinuedCarList title="Discontinued Mahindra Cars" cars={discontinuedMahindraCars} />
                        </div>
                    </div>

                </div>
            </div>

            {isMobile ? <MobileLatestCarNews /> : <CommonLatestCarNews />}

            <UpcomingCarInIndia />

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CommonFaqAccordion faqData={faqData} />
                </div>
            </div>

        </>
    );
}

export default CarOnRoadPrice;