'use client'

import React, { useState } from "react";


export function EmiCalculator() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">
        Tata Nexon <span className="font-bold">Finance Cost — EMI Calculator</span>
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Set down payment, interest and tenure to get the EMI for your model. Turn on Include finance cost in TCO to see an ownership view that reflects EMIs paid during your selected period.
      </p>

      <div className="border rounded-xl bg-white space-y-6">
        <div className="bg-[#EFEFEF] p-4 rounded-xl flex items-center justify-evenly">
          <div>
            <p className="text-sm">Tata Nexon Smart</p>
            <p className="font-semibold">On-Road Price in Gurugram:</p>
          </div>
          <h3 className="text-5xl font-bold text-black">₹8,31,453</h3>
        </div>

        {/* Sliders Section */}
        <div className="space-y-6 mx-8">
          {/* Down Payment */}
          <div>
            <label className="text-sm font-medium">Down payment</label>
            <input type="range" min="20000" max="500000" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20K</span><span>50L</span>
            </div>
            <div className="text-right font-semibold">₹25,67,000</div>
          </div>

          {/* Car Loan */}
          <div>
            <label className="text-sm font-medium">Car Loan Amount</label>
            <input type="range" min="100000" max="10000000" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1L</span><span>1Cr</span>
            </div>
            <div className="text-right font-semibold">₹2,31,03,000</div>
          </div>

          {/* Interest */}
          <div>
            <label className="text-sm font-medium">Interest Rate (p.a.)</label>
            <input type="range" min="5" max="20" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span><span>20%</span>
            </div>
            <div className="text-right font-semibold">7%</div>
          </div>

          {/* Tenure */}
          <div>
            <label className="text-sm font-medium">Loan Tenure (Years)</label>
            <input type="range" min="1" max="10" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1Y</span><span>10Y</span>
            </div>
            <div className="text-right font-semibold">5 Year</div>
          </div>
        </div>

        {/* EMI Summary */}
        <div className="flex justify-evenly items-center bg-[#EFEFEF] rounded-xl p-4 mx-8">
          <div>
            <p className="text-gray-600">EMI per month</p>
            <p className="text-lg font-bold">₹25,000</p>
          </div>
          <span className="h-10 w-[2px] bg-[#292929]"></span>
          <div>
            <p className="text-gray-600">Total interest</p>
            <p className="text-lg font-bold">₹2,50,000</p>
          </div>
          <span className="h-10 w-[2px] bg-[#292929]"></span>
          <div>
            <p className="text-gray-600">Finance outflow during ownership period</p>
            <p className="text-lg font-bold">₹12,25,000</p>
          </div>
          <span className="h-10 w-[2px] bg-[#292929]"></span>
          <div>
            <p className="text-gray-600">Outstanding balance at end of period</p>
            <p className="text-lg font-bold">₹2,50,000</p>
          </div>
        </div>

        {/* Accordion */}
        <div className="border rounded-xl overflow-hidden mx-8 divide-y bg-[#F9F9F9]">
          <h2 className="cursor-pointer bg-[#F9F9F9] p-4 font-semibold flex items-center justify-between" onClick={() => { setOpen(!open) }}>
            <span>2025</span>
            {
              open ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )
            }
          </h2>

          {
            open && (
              <div className="border rounded-xl overflow-hidden m-4 shadow-md bg-[#F9F9F9]">
                <table className="w-full border-collapse">
                  <thead className="bg-[#DEE2E6] border-b">
                    <tr>
                      <th className="py-4 border-r">Month</th>
                      <th className="py-4 border-r">Principal (A)</th>
                      <th className="py-4 border-r">Interest (B)</th>
                      <th className="py-4 border-r">Total Payment (A+B)</th>
                      <th className="py-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b text-center">
                      <td className="py-4 border-r">Nov</td>
                      <td className="py-4 border-r">₹6,286</td>
                      <td className="py-4 border-r">₹2,525</td>
                      <td className="py-4 border-r">₹8,911</td>
                      <td className="py-4">₹4,43,714</td>
                    </tr>
                    <tr className="text-center">
                      <td className="py-4 border-r">Dec</td>
                      <td className="py-4 border-r">₹6,322</td>
                      <td className="py-4 border-r">₹2,588</td>
                      <td className="py-4 border-r">₹8,911</td>
                      <td>₹4,37,392</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          }
        </div>

        <div className="text-center pb-6">
          <a href="#" className="text-blue-600 font-medium text-sm underline">View Full Schedule</a>
        </div>
      </div>
    </div>
  );
}
