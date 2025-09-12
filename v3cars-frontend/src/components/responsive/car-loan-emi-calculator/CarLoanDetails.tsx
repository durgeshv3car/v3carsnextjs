'use client'

import { Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
  totalPayment: number;
  loanPaidToDate: number;
}

interface CarLoanDetailsProps {
  data: YearlyData[];
}

export default function CarLoanDetails({ data }: CarLoanDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Car Loan Repayment Details</h2>
        <p className="text-sm text-gray-500">
          To ensure comfortable loan repayment, you can pay in monthly installments, known as Equated Monthly Installments (EMI). 
          Before applying for a car loan, assessing the anticipated monthly installments is prudent.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[400px] lg:h-[600px] border dark:border-[#2E2E2E] p-6 rounded-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value: number) => `₹ ${value.toLocaleString()}`} />
            <Bar yAxisId="left" dataKey="principal" stackId="a" fill="#84cc16" barSize={60} />
            <Bar yAxisId="left" dataKey="interest" stackId="a" fill="#facc15" barSize={60} />
            <Line yAxisId="right" type="monotone" dataKey="balance" stroke="#e11d48" strokeWidth={3} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Car Loan EMI Calculation</h2>
        <table className="w-full text-sm text-left border-2 border-b-4 dark:border-[#2E2E2E]">
          <thead>
            <tr className="border-b dark:border-[#2E2E2E] text-center">
              <th className="bg-gray-100 dark:bg-transparent px-3 py-2 font-semibold min-w-[100px]">Year</th>
              <th className="bg-lime-500 text-white px-3 py-2 font-semibold min-w-[150px]">Principal<br/>(A)</th>
              <th className="bg-yellow-400 px-3 py-2 font-semibold min-w-[150px]">Interest<br/>(B)</th>
              <th className="bg-gray-100 dark:bg-transparent px-3 py-2 font-semibold min-w-[150px]">Total Payment<br/>(A + B)</th>
              <th className="bg-rose-600 text-white px-3 py-2 font-semibold min-w-[150px]">Balance</th>
              <th className="bg-gray-100 dark:bg-transparent px-3 py-2 font-semibold min-w-[150px]">Loan Paid To Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.year} className="border-b dark:border-[#2E2E2E] text-center">
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">{row.year}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.principal.toLocaleString()}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.interest.toLocaleString()}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.totalPayment.toLocaleString()}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.balance.toLocaleString()}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">{row.loanPaidToDate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
