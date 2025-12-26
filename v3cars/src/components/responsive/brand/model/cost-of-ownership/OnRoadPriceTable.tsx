'use client'

import React from "react";


export function OnRoadPriceTable() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Tata Nexon Price — On-road Breakup</h2>
      <p className="text-gray-600 mb-4 text-sm">
        See the ex-showroom price with state taxes registration insurance and mandatory fees to arrive at the on-road price in &lt;City&gt;. This total feeds the finance maintenance and fuel sections.
      </p>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full border-collapse bg-white">
          <tbody>
            {[
              { label: "Ex-Showroom Price", value: "₹7,31,890" },
              { label: "Road Tax", value: "₹58,551" },
              { label: "TCS", value: "₹600" },
              { label: "Registration Charges", value: "₹600" },
              { label: "FASTag", value: "₹600" },
              { label: "Hypothecation Endorsement", value: "₹1,500" },
              { label: "Road Safety Cess", value: "₹1,317" },
              { label: "Other Charges", value: "₹400" },
              { label: "Insurance", value: "₹36,595" }
            ].map((row, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="p-4 border-r text-gray-700">{row.label}</td>
                <td className="p-4 text-right font-medium">{row.value}</td>
              </tr>
            ))}

            <tr className="font-semibold text-black bg-[#E5E5E5]">
              <td className="p-4">On-Road Price in Gurugram:</td>
              <td className="p-4 text-right">₹8,31,453</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
