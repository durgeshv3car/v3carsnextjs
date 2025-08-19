import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import TopSection from "@/components/common/TopSection";
import CarLoanCalculator from "@/components/responsive/car-loan-emi-calculator/CarLoanCalculator";
import CarLoanDetails from "@/components/responsive/car-loan-emi-calculator/CarLoanDetails";
import LoanInfoCard from "@/components/responsive/car-loan-emi-calculator/LoanInfoCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Most Popular Cars in India 2024 | Top Selling Models & Prices",
    description:
        "Explore the most popular cars in India for 2024, including top-selling models, latest prices, mileage, specs, and user ratings. Find best-selling SUVs, hatchbacks, and sedans from brands like Maruti, Hyundai, Tata, Mahindra, Kia, and more.",
    keywords: [
        "popular cars India 2024",
        "best selling cars",
        "top cars in India",
        "top SUVs 2024",
        "most sold cars",
        "best cars under 10 lakhs",
        "Maruti bestsellers",
        "Hyundai popular cars",
        "Tata top models",
        "Kia popular cars",
        "Mahindra best SUVs",
        "top hatchbacks India",
        "popular sedans India",
        "V3Cars"
    ],
};

const data = [
  { year: 2024, principal: 25363, interest: 10279, balance: 424637, emi: 35642, totalPayment: 35642, loanPaidToDate: 5.64 },
  { year: 2025, principal: 79728, interest: 27199, balance: 344909, emi: 106926, totalPayment: 106926, loanPaidToDate: 23.35 },
  { year: 2026, principal: 85491, interest: 21435, balance: 259418, emi: 106926, totalPayment: 106926, loanPaidToDate: 42.35 },
  { year: 2027, principal: 91671, interest: 15255, balance: 167747, emi: 106926, totalPayment: 106926, loanPaidToDate: 62.72 },
  { year: 2028, principal: 89428, interest: 8628, balance: 69449, emi: 106926, totalPayment: 106926, loanPaidToDate: 84.57 },
  { year: 2029, principal: 69449, interest: 1835, balance: 0, emi: 71284, totalPayment: 71284, loanPaidToDate: 100.00 },
];

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

function CarLoanEMICalculator() {
    return (

        <>

            <TopSection />

            <div className="px-4 xl:px-10 bg-[#F9F8FA] dark:bg-[#171720] border-t dark:border-[#2E2E2E]">
                <div className="w-full lg:max-w-[1600px] py-6 mx-auto space-y-14">
                    <CarLoanCalculator />
                    <CarLoanDetails data={data} />
                    <LoanInfoCard />
                    <CommonFaqAccordion faqData={faqData} />
                </div>
            </div>

            {/* <BottomAd /> */}

        </>
    );
}

export default CarLoanEMICalculator;
