'use client';

import CustomSelect from '@/components/ui/custom-inputs/CustomSelect';
import React, { useState, useEffect } from 'react';
import styles from './CarLoanEMICalculator.module.css'
import { useGetAllBrandsQuery } from '@/redux/api/homeApi';
import { useGetModelsQuery, useGetVariantsQuery } from '@/redux/api/commonApi';

interface CarBrand {
  brandId: number
  brandName: string
  brandSlug: string
  logoPath: string
  popularity: string
  unquieViews: number | null
  brandStatus: number
  serviceNetwork: boolean
  brandType: number
}

interface CarModel {
  modelId: number
  modelName: string
  modelSlug: string
  brandId: number
  modelBodyTypeId: number
  isUpcoming: boolean
  launchDate: string // ISO date string
  totalViews: number
  expectedBasePrice: number
  expectedTopPrice: number
  brand: {
    id: number
    name: string
    slug: string
    logo: string
  }
  priceMin: number
  priceMax: number
  powerPS: number
  torqueNM: number
  mileageKMPL: number
  image: CarImage
  imageUrl: string
}

interface CarImage {
  name: string
  alt: string
  url: string
}

interface CarVariant {
  variantId: number;
  variantName: string;
  modelId: number;
  modelPowertrainId: number | null;
  variantPrice: string;
  updatedDate: string; // ISO date string
  priceMin: number;
  priceMax: number;
  powertrain: string | null;
}

interface CarLoanCalculatorProps {
  onLoanDataChange: (data: {
    principal: number;
    annualInterestRate: number;
    tenureYears: number;
    emi: number;
  }) => void;
}

const CarLoanCalculator = ({ onLoanDataChange }: CarLoanCalculatorProps) => {
  // Brand/Model/Variant states
  const [selectBrand, setSelectBrand] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [variantId, setVariantId] = useState<number | null>(null);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<number>(500000);

  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: modelsData } = useGetModelsQuery({ brandId: selectBrand ?? 0 });
  const { data: variantsData } = useGetVariantsQuery({ modelId: modelId ?? 0 });

  const brands = brandsData?.rows ?? [];
  const models = modelsData?.rows ?? [];
  const variants = variantsData?.rows ?? [];

  // Loan states
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

  function normalizeBrandName(name: string) {
    const lower = name.toLowerCase();
    if (lower === "maruti arena" || lower === "maruti nexa") {
      return "Maruti Suzuki";
    }
    return name;
  }

  function splitBrands(brands: CarBrand[]) {
    const normalizedBrands = brands.map((b) => ({
      ...b,
      displayName: normalizeBrandName(b.brandName),
    }));

    const sorted = [...normalizedBrands].sort((a, b) => {
      const pa = a.popularity && a.popularity.trim() !== "" ? Number(a.popularity) : Infinity;
      const pb = b.popularity && b.popularity.trim() !== "" ? Number(b.popularity) : Infinity;
      return pa - pb;
    });

    const seen = new Set<string>();
    const uniqueSorted = sorted.filter((b) => {
      if (seen.has(b.displayName)) return false;
      seen.add(b.displayName);
      return true;
    });

    const popularBrands = uniqueSorted
      .filter((b) => b.popularity && b.popularity.trim() !== "")
      .slice(0, 10);

    const allBrands = uniqueSorted
      .filter((b) => !popularBrands.includes(b))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return {
      groupedOptions: [
        { label: "Popular Brands", options: popularBrands },
        { label: "All Brands", options: allBrands },
      ],
    };
  }

  const { groupedOptions } = splitBrands(brands)

  function handleVariant(data: CarVariant) {
    setVariantId(data.variantId)
    setSelectedVariantPrice(Number(data.variantPrice))
  }

  return (
    <div className="space-y-8">
      {/* Brand, Model, Variant Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className='space-y-1'>
          <label className='text-sm'>Select Brand</label>
          <div className='border rounded-lg text-sm'>
            <CustomSelect
              groupedOptions={groupedOptions}
              placeholder="Select Brand"
              labelKey="displayName"
              valueKey="brandId"
              value={selectBrand}
              onSelect={(value: CarBrand) => setSelectBrand(value.brandId)}
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Select Model</label>
          <div className='border rounded-lg text-sm'>
            <CustomSelect
              options={models}
              placeholder="Select Model"
              labelKey="modelName"
              valueKey="modelId"
              value={modelId}
              onSelect={(value: CarModel) => setModelId(value.modelId)}
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Select Variant</label>
          <div className='border rounded-lg text-sm'>
            <CustomSelect
              options={variants}
              placeholder="Select Variant"
              labelKey="variantName"
              valueKey="variantId"
              value={variantId}
              onSelect={(value: CarVariant) => handleVariant(value)}
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm'>Selected Car Value</label>
          <div className="font-bold text-4xl">₹ {selectedVariantPrice.toLocaleString("en-IN")}</div>
        </div>
      </div>

      {/* Sliders & Results */}
      <div className='flex flex-col-reverse lg:flex-row gap-4 justify-between border-2 border-b-8 p-3 lg:p-6 rounded-2xl'>
        <div className='w-full flex flex-col justify-between gap-4'>

          {/* Loan Amount */}
          <div className="flex items-center gap-4">
            <div className='w-full'>
              <label>Loan Amount</label>
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
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 font-bold min-w-[180px] text-center">
              ₹ {principalAmount.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Down Payment */}
          <div className="flex items-center gap-4">
            <div className="w-full">
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
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 font-bold min-w-[180px] text-center">
              ₹ {downPayment.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex items-center gap-4">
            <div className="w-full">
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
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 font-bold min-w-[180px] text-center">
              {interestRate.toFixed(1)}%
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="flex items-center gap-4">
            <div className="w-full">
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
            <div className="hidden lg:block p-3 rounded-full border bg-gray-100 font-bold min-w-[180px] text-center">
              {loanTenure} Years
            </div>
          </div>
        </div>

        {/* EMI Result */}
        <div className="flex flex-col justify-between gap-2 bg-black p-3 rounded-2xl w-auto lg:min-w-[425px] h-[420px] lg:h-[481px]">
          <div className='flex flex-col justify-center items-center gap-1 flex-grow'>
            <div className="text-center text-sm text-white">Equated Monthly Installment (EMI)</div>
            <div className="text-center text-5xl text-yellow-400 font-bold">₹ {monthlyPayment.toLocaleString("en-IN")}</div>
          </div>

          <div className='h-[256px] bg-white text-black p-3 rounded-xl flex flex-col justify-between gap-3'>
            <div className="grid grid-cols-2 divide-x-[1px] items-center">
              <div>
                <p className='text-sm'>Principal Amount</p>
                <p className='font-bold text-xl'>₹ {principalAmount.toLocaleString("en-IN")}</p>
              </div>
              <div className='text-end'>
                <p className='text-sm'>Interest Amount</p>
                <p className='font-bold text-xl'>₹ {totalInterest.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center h-[117px] bg-slate-100 rounded-2xl font-bold">
              <p>Total Amount Payable</p>
              <p className='text-4xl'>₹ {totalPayment.toLocaleString("en-IN")}</p>
            </div>

            <button className="w-full bg-yellow-400 text-black py-2 rounded-xl font-bold hover:bg-yellow-300">
              Get Bank Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanCalculator;
