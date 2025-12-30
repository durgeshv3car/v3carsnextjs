'use client'

import React from "react";

export function TotalCostOfOwnership() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">
        Tata Nexon <span className="font-bold">Total Cost Of Ownership (TCO)</span>
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        TCO is the sum of your on-road price, periodic maintenance cost and running cost over the selected period. Turn on Include finance cost in
        TCO if you want EMIs paid during your period to replace the up-front on-road price.
      </p>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#E5E5E5] text-gray-700 font-semibold border-b">
              <th className="p-4 text-center text-lg" colSpan={3}>5 Year Cost Of Ownership</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-5 border-r text-gray-700">On-road Price in Gurugram</td>
              <td className="p-5 border-r text-center">₹1,111,008</td>
              <td className="p-5 text-center">₹1,111,008</td>
            </tr>

            <tr className="border-b">
              <td className="p-5 border-r text-gray-700">Periodic Maintenance Cost</td>
              <td className="p-5 border-r text-center">₹17,092</td>
              <td className="p-5 text-center">₹17,092</td>
            </tr>

            <tr className="border-b">
              <td className="p-5 border-r text-gray-700">Running Cost</td>
              <td className="p-5 border-r text-center">₹293,945</td>
              <td className="p-5 text-center">₹370,096</td>
            </tr>

            <tr className="bg-[#E5E5E5] font-semibold text-black border-t">
              <td className="p-5">Total Cost Of Ownership (TCO)</td>
              <td className="p-5 text-center">₹1,422,045</td>
              <td className="p-5 text-center">₹1,498,196</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
