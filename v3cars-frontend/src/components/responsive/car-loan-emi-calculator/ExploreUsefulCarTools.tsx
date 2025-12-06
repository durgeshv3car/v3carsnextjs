'use client';

export default function ExploreUsefulCarTools() {
    return (
        <div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4">Explore Useful Car Tools</h2>

            {/* Section 1 */}
            <h3 className="font-semibold mb-2">
                Car Loan EMI Calculator – Your Complete Guide
            </h3>

            <p className="mb-4">
                When you’re planning to buy a car, knowing how much you’ll pay each month is crucial. Use this EMI calculator to get instant clarity on your monthly payments, total interest, and overall loan cost — whether you’re choosing a loan amount or selecting a car/variant.
            </p>

            {/* Section 2 */}
            <h3 className="font-semibold mb-2">How the EMI Calculator Helps</h3>

            <p className="mb-2">EMI stands for Equated Monthly Installments. It is the fixed amount you pay every month until your loan is fully repaid.</p>

            <ul className="list-disc ml-6 space-y-1 mb-4">
                <li>To calculate EMI, the calculator uses three key inputs:</li>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Loan amount</li>
                    <li>Tenure</li>
                    <li>Interest rate</li>
                </ul>
            </ul>

            <ul className="list-disc ml-6 space-y-1 mb-4">
                <li>Once you enter these, the calculator immediately shows:</li>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li>Monthly EMI</li>
                    <li>Total Interest Payable (over entire loan period)</li>
                    <li>Total Amount Payable (Principal + Interest)</li>
                </ul>
            </ul>

            <p className="mb-6">
                Use the calculator to refine your choices and instantly see how EMI changes — great for planning.
            </p>

            {/* Section 3 */}
            <h3 className="text-lg font-semibold mb-2">Two Modes — What You Can Do</h3>

            <ul className="list-disc pl-5 space-y-4 text-[15px] leading-relaxed mb-4">
                <li>
                    <p className="mb-1">Mode A: Enter Loan Amount</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Use this when you already know how much you wish to borrow.</li>
                        <li>Enter your desired loan amount.</li>
                        <li>Input down payment (if any) to reduce loan amount.</li>
                        <li>Set interest rate (p.a.) and loan tenure.</li>
                        <li>See your monthly EMI and full repayment breakdown.</li>
                        <li>This helps you check how much EMI fits your monthly budget before you decide loan amount or car.</li>
                    </ul>
                </li>

                <li>
                    <p className="mb-1">Mode B: Select a Car / Variant</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Use this when you have a specific car (or few options) in mind.</li>
                        <li>Select brand → model → variant.</li>
                        <li>The calculator auto-fills on ex showroom price.</li>
                        <li>Enter down payment, interest rate and tenure.</li>
                        <li>Get EMI estimate + total interest + total amount payable.</li>
                        <li>This is especially useful when comparing EMIs for different cars — helps you make an informed buy decision.</li>
                    </ul>
                </li>
            </ul>

            {/* Section 4 - Table */}
            <h2 className="bg-[#F2F2F2] dark:bg-[#232323] py-4 text-center font-semibold rounded-t-xl">What the Numbers Mean</h2>
            <div className="border rounded-b-xl overflow-hidden mb-8 bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="p-5 font-semibold border-r dark:border-[#2e2e2e]">Output</th>
                            <th className="p-5 font-semibold">Meaning / Why It Matters</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t text-center dark:border-[#2e2e2e]">
                            <td className="p-5 font-medium border-r dark:border-[#2e2e2e]">Monthly EMI</td>
                            <td className="p-5">Your monthly commitment — helps plan budgets.</td>
                        </tr>
                        <tr className="border-t text-center dark:border-[#2e2e2e]">
                            <td className="p-5 font-medium border-r dark:border-[#2e2e2e]">Total Interest Payable</td>
                            <td className="p-5">Cost of borrowing — how much extra you pay on the loan.</td>
                        </tr>
                        <tr className="border-t text-center dark:border-[#2e2e2e]">
                            <td className="p-5 font-medium border-r dark:border-[#2e2e2e]">Total Amount Payable</td>
                            <td className="p-5">Actual total loan repayment = interest + principal.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Section 5 */}
            <h3 className="text-lg font-semibold mb-2">EMI Calculation Formula</h3>

            <p className="mb-2">
                The calculator uses the standard “reducing balance” formula:
            </p>

            <pre className="bg-gray-100 dark:bg-[#171717] p-4 rounded-md text-sm overflow-x-auto mb-4 scrollbar-thin-yellow">
                EMI = [P × R × (1+R)ⁿ] / [(1+R)ⁿ – 1]

                Where:
                P = Principal loan amount
                R = Monthly interest rate = Annual rate / 12 / 100
                n = Loan tenure in months
            </pre>

            {/* Section 6 */}
            <h3 className="text-lg font-semibold mb-2">Why Use an Online EMI Calculator?</h3>

            <ul className="list-disc ml-6 space-y-1 mb-6">
                <li>Saves time with accurate EMI figures</li>
                <li>Helps compare different loan offers</li>
                <li>Instant EMI changes with variation in loan amount, tenure, interest</li>
                <li>Perfect for planning budget before buying a car</li>
            </ul>

            {/* Section 7 */}
            <h3 className="text-lg font-semibold mb-2">Smart Tips When Considering Car Loans to Get the Best Deal</h3>

            <ul className="list-disc ml-6 space-y-1">
                <li>Keep your credit score strong — it helps you get lower interest</li>
                <li>Shorter tenure means lower interest paid overall</li>
                <li>Compare offers from multiple lenders</li>
                <li>Check additional charges like processing fees</li>
                <li>Choose EMI that fits comfortably within your monthly income</li>
            </ul>

        </div>
    );
}
