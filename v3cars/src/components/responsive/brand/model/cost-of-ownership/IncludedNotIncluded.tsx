'use client'

import React from "react";

export function IncludedNotIncluded() {
  const included = [
    "Ex-showroom price plus state taxes registration insurance and mandatory fees in the on-road total",
    "Scheduled service parts and labour per the recommended service plan",
    "Fuel or charging cost for your selected kilometres using ARAI mileage by default",
    "Finance outflow during the period when you enable Include finance cost in TCO",
  ];

  const notIncluded = [
    "Accidental repairs unscheduled wear or dealer add-ons",
    "Accessories tyre or brake upgrades extended warranty and insurance add-ons",
    "Parking tolls penalties and FASTag recharges beyond initial issuance",
    "Depreciation or resale value at disposal",
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">
        Tata Nexon — <span className="font-bold">What’s Included / What’s Not</span>
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Here is what we include in the cost of ownership estimate and what we leave out so you know exactly how to read the numbers.
      </p>

      <div className="border rounded-xl p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Included</h3>
            <ul className="space-y-3">
              {included.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Not included</h3>
            <ul className="space-y-3">
              {notIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-600 mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-6">
          <span className="font-bold">Note:</span> Figures are estimates based on brand data dealer quotes and public fuel prices. Actual costs can vary by city dealer insurer and driving style.
        </p>
      </div>

    </div>
  );
}
