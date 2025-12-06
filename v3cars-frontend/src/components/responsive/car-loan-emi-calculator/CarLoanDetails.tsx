'use client'

import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { IoPrintOutline } from 'react-icons/io5';
import { TiLocationArrow } from 'react-icons/ti';
import { Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MonthlyRow {
  year: number;
  month: string;
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number;
  loanPaidPercent: number;
}

interface YearlyData {
  year: number;
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number;
  loanPaidToDate: number;
}

interface CarLoanRepaymentProps {
  principal: number;
  annualInterestRate: number;
  tenureYears: number;
  emi: number;
}

export default function CarLoanRepaymentDetails({ principal, annualInterestRate, tenureYears, emi }: CarLoanRepaymentProps) {
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlyRow[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [openModel, setOpenModel] = useState(false)

  // Generate monthly amortization schedule
  function generateAmortizationSchedule(
    principal: number,
    annualInterestRate: number,
    tenureYears: number,
    emi: number
  ): MonthlyRow[] {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    let balance = principal;
    let totalPrincipalPaid = 0;
    const schedule: MonthlyRow[] = [];

    const today = new Date();
    const startMonth = today.getMonth();
    const startYear = today.getFullYear();

    for (let i = 0; i < totalMonths; i++) {
      const globalMonth = startMonth + i;
      const year = startYear + Math.floor(globalMonth / 12);
      const monthName = new Date(startYear, globalMonth % 12, 1).toLocaleString('default', { month: 'short' });

      const interest = balance * monthlyInterestRate;
      const principalPayment = emi - interest;
      balance -= principalPayment;
      totalPrincipalPaid += principalPayment;

      schedule.push({
        year,
        month: monthName,
        principal: Math.round(principalPayment),
        interest: Math.round(interest),
        totalPayment: Math.round(principalPayment + interest),
        balance: Math.max(Math.round(balance), 0),
        loanPaidPercent: (totalPrincipalPaid / principal) * 100
      });
    }

    return schedule;
  }

  console.log(monthlySchedule);

  function getYearlyTotals(schedule: MonthlyRow[]): YearlyData[] {
    const yearlyTotals: Record<number, YearlyData> = {};

    schedule.forEach(row => {
      const { year, principal, interest, totalPayment, balance, loanPaidPercent } = row;

      if (!yearlyTotals[year]) {
        yearlyTotals[year] = { year, principal: 0, interest: 0, totalPayment: 0, balance: 0, loanPaidToDate: 0 };
      }

      yearlyTotals[year].principal += principal;
      yearlyTotals[year].interest += interest;
      yearlyTotals[year].totalPayment += totalPayment;
      yearlyTotals[year].balance = balance;
      yearlyTotals[year].loanPaidToDate = loanPaidPercent;
    });

    return Object.values(yearlyTotals).map(y => ({
      year: y.year,
      principal: y.principal,
      interest: y.interest,
      totalPayment: y.totalPayment,
      balance: y.balance,
      loanPaidToDate: parseFloat(y.loanPaidToDate.toFixed(2))
    }));
  }

  // Initialize data
  useEffect(() => {
    const monthly = generateAmortizationSchedule(principal, annualInterestRate, tenureYears, emi);
    setMonthlySchedule(monthly);
    setYearlyData(getYearlyTotals(monthly));
  }, [principal, annualInterestRate, tenureYears, emi]);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Car Loan Repayment Details</h2>
        <p className="text-sm text-gray-500">
          To ensure comfortable loan repayment, you can pay in monthly installments (EMI). Assessing the anticipated monthly installments before applying for a car loan is prudent.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[400px] lg:h-[600px] border dark:border-[#2E2E2E] p-6 rounded-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yearlyData}>
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
              <th className="bg-lime-500 text-white px-3 py-2 font-semibold min-w-[150px]">Principal (A)</th>
              <th className="bg-primary px-3 py-2 font-semibold min-w-[150px]">Interest (B)</th>
              <th className="bg-gray-100 dark:bg-transparent px-3 py-2 font-semibold min-w-[150px]">Total Payment (A + B)</th>
              <th className="bg-rose-600 text-white px-3 py-2 font-semibold min-w-[150px]">Balance</th>
              <th className="bg-gray-100 dark:bg-transparent px-3 py-2 font-semibold min-w-[150px]">Loan Paid To Date</th>
            </tr>
          </thead>
          <tbody>
            {yearlyData.map(row => (
              <tr key={row.year} className="border-b dark:border-[#2E2E2E] text-center">
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E] cursor-pointer" onClick={() => { setOpenModel(!openModel) }}>{row.year}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.principal.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.interest.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.totalPayment.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">₹ {row.balance.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2 border-r dark:border-[#2E2E2E]">{row.loanPaidToDate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col justify-center items-center gap-2'>
        <h2 className='font-bold'>Want to save or share your EMI calculation?</h2>
        <p>Print this repayment summary or share a custom link with all your numbers pre-filled.</p>
        <div className='flex items-center gap-4'>
          <button className='flex items-center gap-2 bg-primary px-6 py-3 rounded-lg shadow-md text-sm text-black'>
            <IoPrintOutline size={16} />
            Print
          </button>

          <button className='flex items-center gap-2 bg-primary px-6 py-3 rounded-lg shadow-md text-sm text-black'>
            <FaLocationArrow />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
