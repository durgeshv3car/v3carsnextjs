'use client';

import React, { useState, useEffect } from 'react';
import styles from './CarLoanEMICalculator.module.css'

interface CarLoanCalculatorProps {
  onLoanDataChange: (data: {
    principal: number;
    annualInterestRate: number;
    tenureYears: number;
    emi: number;
  }) => void;
  selectedVariantPrice: number
}

const CarLoanCalculator = ({ selectedVariantPrice, onLoanDataChange }: CarLoanCalculatorProps) => {
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(7);
  const [loanTenure, setLoanTenure] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const minDownPayment = selectedVariantPrice * 0.1;
  const maxPrincipal = selectedVariantPrice * 0.9;

  // Update principal/downpayment when variant changes
  useEffect(() => {
    setPrincipalAmount(maxPrincipal);
    setDownPayment(minDownPayment);
  }, [selectedVariantPrice]);

  // Recalculate EMI & notify parent
  useEffect(() => {
    calculatePayments();
  }, [principalAmount, interestRate, loanTenure]);

  const calculatePayments = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfMonths = loanTenure * 12;
    const loanAmount = principalAmount;

    if (loanAmount <= 0) return;

    const monthlyPay =
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    const totalPay = monthlyPay * numberOfMonths;
    const totalInt = totalPay - loanAmount;

    const roundedEMI = Math.round(monthlyPay);

    setMonthlyPayment(roundedEMI);
    setTotalInterest(Math.round(totalInt));
    setTotalPayment(Math.round(totalPay));

    // Send updated data to parent
    onLoanDataChange({
      principal: principalAmount,
      annualInterestRate: interestRate,
      tenureYears: loanTenure,
      emi: roundedEMI,
    });
  };

  // Handlers
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > maxPrincipal) {
      alert("Oops! Loan amount cannot be more than 90% of car value");
      setPrincipalAmount(maxPrincipal);
      setDownPayment(minDownPayment);
      return;
    }
    setPrincipalAmount(value);
    setDownPayment(selectedVariantPrice - value);
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < minDownPayment) {
      alert("Oops! Down payment cannot be less than 10% of car value");
      setDownPayment(minDownPayment);
      setPrincipalAmount(maxPrincipal);
      return;
    }
    setDownPayment(value);
    setPrincipalAmount(selectedVariantPrice - value);
  };

  return (
    <div className="space-y-8">

      <div className='flex flex-col-reverse lg:flex-row gap-4 justify-between bg-[#343A40] p-3 lg:p-6 rounded-2xl'>
        <div className='w-full flex flex-col gap-16'>

          {/* Loan Amount */}
          <div className="flex items-center gap-4">
            <div className='w-full text-left text-white'>
              <label>Car Loan Amount</label>
              <input
                type="range"
                min={0}
                max={selectedVariantPrice}
                step={10000}
                value={principalAmount}
                onChange={handleLoanAmountChange}
                className={`w-full h-2 appearance-none bg-gray-200 rounded-lg ${styles["custom-slider"]}`}
                style={{
                  background: `linear-gradient(to right, #facc15 0%, #facc15 ${(principalAmount / selectedVariantPrice) * 100}%,
                  #e5e7eb ${(principalAmount / selectedVariantPrice) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className='flex items-center justify-between gap-4'>
                <p className="text-sm">₹1L</p>
                <p className="text-sm text-right">₹1Cr</p>
              </div>
            </div>
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 text-black font-bold min-w-[180px] text-center">
              ₹ {principalAmount.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Down Payment */}
          <div className="flex items-center gap-4">
            <div className='w-full text-left text-white'>
              <label>Down Payment</label>
              <input
                type="range"
                min={20000}
                max={5000000}
                step={10000}
                value={downPayment}
                onChange={handleDownPaymentChange}
                className={`w-full h-2 appearance-none bg-gray-200 rounded-lg ${styles["custom-slider"]}`}
                style={{
                  background: `linear-gradient(to right, #facc15 0%, #facc15 ${((downPayment - minDownPayment) / (5000000 - minDownPayment)) * 100
                    }%, #e5e7eb ${((downPayment - minDownPayment) / (5000000 - minDownPayment)) * 100
                    }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm">₹20K</p>
                <p className="text-sm text-right">₹50L</p>
              </div>
            </div>
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 text-black font-bold min-w-[180px] text-center">
              ₹ {downPayment.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex items-center gap-4">
            <div className='w-full text-left text-white'>
              <label>Interest Rate (%)</label>
              <input
                type="range"
                min={5}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className={`w-full h-2 appearance-none bg-gray-200 rounded-lg ${styles["custom-slider"]}`}
                style={{
                  background: `linear-gradient(to right, #facc15 0%, #facc15 ${((interestRate - 5) / (20 - 5)) * 100
                    }%, #e5e7eb ${((interestRate - 5) / (20 - 5)) * 100
                    }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm">5%</p>
                <p className="text-sm text-right">20%</p>
              </div>
            </div>
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 text-black font-bold min-w-[180px] text-center">
              {interestRate.toFixed(1)}%
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="flex items-center gap-4">
            <div className='w-full text-left text-white'>
              <label>Loan Tenure (Years)</label>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className={`w-full h-2 appearance-none bg-gray-200 rounded-lg ${styles["custom-slider"]}`}
                style={{
                  background: `linear-gradient(to right, #facc15 0%, #facc15 ${((loanTenure - 1) / (7 - 1)) * 100
                    }%, #e5e7eb ${((loanTenure - 1) / (7 - 1)) * 100
                    }%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm">1Y</p>
                <p className="text-sm text-right">7Y</p>
              </div>
            </div>
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 text-black font-bold min-w-[180px] text-center">
              {loanTenure} Years
            </div>
          </div>
        </div>

        {/* EMI Result */}
        <div className="bg-[#2f3136] text-white p-6 rounded-xl space-y-6 w-full lg:w-[443px] flex flex-col justify-between">

          {/* Header */}
          <div className="text-center">
            <p className="text-sm text-gray-300">Monthly EMI</p>
            <p className="text-4xl font-bold text-yellow-400">₹ {monthlyPayment.toLocaleString("en-IN")}</p>
          </div>

          <hr className="border-gray-600" />

          {/* Loan Summary Rows */}
          <div className="space-y-3 text-sm">
            <Row label="Loan Amount" value={`₹ ${principalAmount.toLocaleString("en-IN")}`} />
            <Row label="Tenure" value={`${loanTenure} Years`} />
            <Row label="Total Interest Payable" value={`₹ ${totalInterest.toLocaleString("en-IN")}`} />
            <Row label="Total Amount Payable" value={`₹ ${totalPayment.toLocaleString("en-IN")}`} bold />
          </div>

          {/* Info Box */}
          <div className="bg-[#4b4e54] p-3 rounded-lg text-xs text-gray-200 border-l-4 border-yellow-500 leading-relaxed">
            `For a loan of ₹ {principalAmount.toLocaleString("en-IN")} over {`${loanTenure}`} year at {interestRate} p.a., your monthly EMI will
            be ₹ {monthlyPayment.toLocaleString("en-IN")}. You will pay ₹ {totalInterest.toLocaleString("en-IN")} in interest over the full tenure.`
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanCalculator;


function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-300">{label}</span>
      <span className={bold ? "font-bold text-white" : "text-gray-200"}>
        {value}
      </span>
    </div>
  );
}