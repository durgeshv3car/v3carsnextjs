'use client'

import React from "react";

export function RunningCost() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">
        Tata Nexon <span className="font-bold">Running Cost</span>
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        We estimate fuel spend for your period using ARAI-claimed mileage for the selected powertrain with the latest city energy price. If a real-world
        figure is available you can switch to it.
      </p>

      <div className="border rounded-xl overflow-hidden">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#F0F0F0] text-gray-700 font-semibold border-b">
            <th className="border-r"></th>
            <th className="p-6 border-r text-center">Claimed Mileage (ARAI)</th>
            <th className="p-6 text-center">Real World Mileage (Tank-to-tank Method)</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-6 border-r text-center text-gray-700">Fuel Efficiency</td>
            <td className="py-6 border-r text-center">17.01kmpl</td>
            <td className="py-6 text-center text-blue-600 cursor-pointer">13.51kmpl ✎</td>
          </tr>

          <tr className="border-b">
            <td className="py-6 border-r text-center text-gray-700">Petrol Price in Gurugram</td>
            <td className="py-6 border-r text-center">₹100</td>
            <td className="py-6 text-center">₹100</td>
          </tr>

          <tr className="bg-[#E5E5E5] font-semibold text-black border-t">
            <td className="py-6 border-r text-center">Fuel Cost</td>
            <td className="py-6 border-r text-center">₹2,93,945</td>
            <td className="py-6 text-center">₹3,70,096</td>
          </tr>

          <tr className="bg-[#F1F1F1] font-semibold text-black border-t">
            <td className="py-6 border-r text-center">Running cost</td>
            <td className="py-6 border-r text-center">₹5.88/km</td>
            <td className="py-6 text-center">₹7.40/km</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
