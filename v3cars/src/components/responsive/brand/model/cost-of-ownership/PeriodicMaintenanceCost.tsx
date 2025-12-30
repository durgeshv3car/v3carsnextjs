'use client'

import React from "react";

export function PeriodicMaintenanceCost() {
  const rows = [
    { interval: "1 Year / 10,000km", cost: "₹3,248" },
    { interval: "2 Year / 20,000km", cost: "₹1,624" },
    { interval: "3 Year / 30,000km", cost: "₹3,499" },
    { interval: "4 Year / 40,000km", cost: "₹5,222" },
    { interval: "5 Year / 50,000km", cost: "₹3,499" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">
        Tata Nexon <span className="font-bold">Periodic Maintenance Cost</span>
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        See the paid service visits for your Nexon with interval, items replaced and the estimated cost at each visit. Totals update with your ownership
        period and kilometres.
      </p>

      <h2 className="p-4 font-semibold bg-[#E5E5E5] text-right">Service Schedule And Cost For Tata Nexon — 1.2L Turbo Petrol Manual (MT)</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-[#F1F1F1] text-gray-700 font-semibold border-b">
            <th className="p-5 text-left border-r">
              Service Interval
            </th>
            <th className="p-5 text-right">Cost</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b last:border-b-0 bg-white">
              <td className="p-5 border-r text-gray-700">{row.interval}</td>
              <td className="p-5 text-right font-medium">{row.cost}</td>
            </tr>
          ))}

          <tr className="bg-[#E5E5E5] font-semibold text-black border-t">
            <td className="p-5">Total Cost</td>
            <td className="p-5 text-right">₹17,092</td>
          </tr>

          <tr className="bg-[#F1F1F1] font-semibold text-black border-t">
            <td className="p-5">Average Per Year</td>
            <td className="p-5 text-right">₹3,418</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
