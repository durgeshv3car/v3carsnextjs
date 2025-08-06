'use client';

import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import React, { useState, useEffect } from 'react';

const CarLoanCalculator = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');

  const [carValue, setCarValue] = useState(25670000);
  const [loanAmount, setLoanAmount] = useState(23103000);
  const [downPayment, setDownPayment] = useState(2567000);
  const [interestRate, setInterestRate] = useState(7);
  const [loanTenure, setLoanTenure] = useState(7);

  const [emi, setEmi] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);

  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

  useEffect(() => {
    const principal = loanAmount;
    const annualRate = interestRate / 100;
    const monthlyRate = annualRate / 12;
    const months = loanTenure * 12;
    const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Math.round(emiCalc));
    setInterestAmount(Math.round(emiCalc * months - principal));
  }, [loanAmount, interestRate, loanTenure]);

  const handleSelection = (value: string) => {
    console.log('Selected:', value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-6">

        <div className='space-y-1'>
          <label className='text-sm'>Select Brand</label>
          <div className='border dark:border-[#2E2E2E] rounded-lg text-sm'>
            <CustomSelect options={items} placeholder={"Select"} onSelect={handleSelection} />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Select Model</label>
          <div className='border dark:border-[#2E2E2E] rounded-lg text-sm'>
            <CustomSelect options={items} placeholder={"Select"} onSelect={handleSelection} />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Select Variant</label>
          <div className='border dark:border-[#2E2E2E] rounded-lg text-sm'>
            <CustomSelect options={items} placeholder={"Select"} onSelect={handleSelection} />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Selected Your Car Value</label>
          <div className="font-bold text-4xl">₹ {carValue.toLocaleString()}</div>
        </div>
      </div>

      <div className='flex gap-4 justify-between border-2 border-b-8 p-6 rounded-2xl'>

        <div className='w-full'>

          <div className="w-full">
            <label>Car Loan Amount</label>
            <div className="flex items-center gap-4">
              <div className='w-full space-y-2'>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400 h-2 appearance-none bg-gray-200 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #facc15 0%, #facc15 ${(loanAmount - 100000) / (10000000 - 100000) * 100}%, #e5e7eb ${(loanAmount - 100000) / (10000000 - 100000) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <div className='flex items-center justify-between gap-4'>
                  <p className="text-sm w-8">1L</p>
                  <p className="text-sm w-10 text-right">1Cr</p>
                </div>
              </div>
              <div className="p-2 rounded-full border bg-gray-100 text-black font-bold text-center min-w-[150px]">
                ₹ {loanAmount.toLocaleString()}
              </div>
            </div>
          </div>


          <div>
            <label className="block mb-1">Down Payment</label>
            <input type="range" min={20000} max={5000000} step={10000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full" />
            <div>₹ {downPayment.toLocaleString()}</div>
          </div>

          <div>
            <label className="block mb-1">Interest Rate (%)</label>
            <input type="range" min={5} max={20} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full" />
            <div>{interestRate}%</div>
          </div>

          <div>
            <label className="block mb-1">Loan Tenure (Years)</label>
            <input type="range" min={1} max={7} step={1} value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full" />
            <div>{loanTenure} Years</div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 bg-black p-3 rounded-2xl min-w-[425px] h-[481px]">
          <div className='flex flex-col justify-center items-center gap-1 flex-grow'>
            <div className="text-center text-sm text-white">Equated Monthly Installment (EMI)</div>
            <div className="text-center text-5xl text-yellow-400 font-bold">₹{emi.toLocaleString()}</div>
          </div>

          <div className='h-[256px] bg-white text-black p-3 rounded-xl flex flex-col justify-between gap-3'>

            <div className="grid grid-cols-2 divide-x-[1px] items-center">
              <div>
                <p className='text-sm'>Principal Amount</p>
                <p className='font-bold text-xl'>₹ {loanAmount.toLocaleString()}</p>
              </div>
              <div className='text-end'>
                <p className='text-sm'>Interest Amount</p>
                <p className='font-bold text-xl'>₹ {interestAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center h-[117px] bg-slate-100 rounded-2xl font-bold">
              <p>Total Amount Payable</p>
              <p className='text-4xl'>₹ {(loanAmount + interestAmount).toLocaleString()}</p>
            </div>

            <button className="w-full bg-yellow-400 text-black py-2 rounded-xl font-bold hover:bg-yellow-300">Get Bank Quotation</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarLoanCalculator;