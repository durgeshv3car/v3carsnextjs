'use client'

import Image from "next/image";

export default function LoanInfoCard() {
    return (
        <div className="rounded-2xl border dark:border-[#2E2E2E] p-3 lg:p-8 flex flex-col sm:flex-row gap-10">
            {/* Placeholder image */}
            <div className="relative w-auto lg:min-w-[483px] h-[350px] lg:h-[453px]">
                <Image
                    src="/placeholder.png" // 🔄 Replace with your image path
                    alt="Loan Info"
                    fill
                    className="object-cover rounded-2xl"
                />
            </div>

            {/* Text content */}
            <div className="w-full flex flex-col justify-evenly">
                <p>
                    You have the option of repaying your car loan through monthly instalments (EMI).
                    Before <a href="#" className="text-blue-600 underline">applying for a car loan</a>,
                    it is advisable to determine the expected monthly instalment.
                </p>
                <p>
                    Utilize V3Cars' interactive auto loan EMI calculator to estimate your monthly car loan payments.
                    Simply enter the required loan amount, the interest rate, and the desired tenure period to obtain
                    the car loan EMI. The instalment in the EMI calculator is computed on a reducing balance.
                </p>
                <p>
                    Keep in mind that, as per the rules of financing institutions, processing fees or additional charges
                    may be applicable, which are not reflected in the calculated EMI. You might be eligible for a pre-approved
                    car loan depending on your income and credit score. However, the loan amount and maximum tenure are subject to change.
                </p>
                <p>
                    Presently, banks in India offer car loans at an attractive interest rate, accompanied by a low processing
                    fee and a repayment tenure of up to 7 years. Car loans are accessible to various entities, including sole
                    proprietorship firms, partnership firms, companies, consultancy firms, consultants, trusts, and societies.
                </p>
                <p className="text-xs text-gray-500">
                    Note: The calculator's rate is only indicative, and the actual rate may vary.
                </p>
            </div>
        </div>
    );
}
