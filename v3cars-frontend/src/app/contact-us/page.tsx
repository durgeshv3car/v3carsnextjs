import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import CollaborateSupport from "@/components/responsive/contact-us/CollaborateSupport";
import HelpSection from "@/components/responsive/contact-us/HelpSection";
import OurOffices from "@/components/responsive/contact-us/OurOffices";
import Link from "next/link";

function ContactUs() {
    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Contact Us</span>
                    </div>
                </div>
            </div>

            <div className="relative mt-20">
                <div
                    className="absolute inset-x-0 bottom-0 h-[400px] bg-no-repeat bg-bottom bg-contain"
                    style={{ backgroundImage: "url('/contact-us/helpbg.png')" }}
                />

                <div className="relative lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto">
                        <HelpSection />
                    </div>
                </div>
            </div>

            <div className="lg:px-10 px-4 bg-black text-white border-t-8 border-[#FFA800]">
                <div className="w-full lg:app-container mx-auto py-16">
                    <CollaborateSupport />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-x-0 top-0 h-[700px] bg-no-repeat bg-bottom bg-cover"
                    style={{ backgroundImage: "url('/contact-us/bg-map.png')" }}>

                    {/* transparent gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9F9FB] dark:to-[#0a0a0a]" />
                </div>
                <div className=" relative lg:px-10 px-4 ">
                    <div className="w-full lg:app-container mx-auto py-16">
                        <OurOffices />
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CommonFaqAccordion faqData={faqData} />
                </div>
            </div>
        </>
    );
}

export default ContactUs;


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