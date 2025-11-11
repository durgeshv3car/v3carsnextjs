'use client'

import React from "react";

const FuelEfficiencyTable: React.FC = () => {
  const variants = [
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
    {
      name: "Tata Nexon 1.2",
      engine: "Turbo Petrol Manual",
      claimed: "17.40kmpl",
      realWorld: "17.40kmpl",
      city: "17.40kmpl",
      highway: "17.40kmpl",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">
        Tata Nexon Fuel Efficiency
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        See claimed and real-world mileage for Tata Nexon by powertrain with separate city and highway figures
      </p>

      <div className="overflow-x-auto border rounded-xl dark:border-[#2e2e2e]">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="bg-[#DEE2E6] dark:bg-[#292929] border-b border-gray-200 dark:border-[#2e2e2e]">
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Variants</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Claimed FE</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Real World Mileage</th>
              <th className="p-4 font-semibold border-r dark:border-[#2e2e2e]">Mileage In City</th>
              <th className="p-4 font-semibold">Highway Mileage</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-[#2e2e2e] hover:bg-gray-50 transition dark:hover:bg-[#2e2e2e]"
              >
                <td className="p-4 border-r dark:border-[#2e2e2e]">
                  <p className="font-medium">{variant.name}</p>
                  <p className="text-xs text-gray-400">{variant.engine}</p>
                </td>
                <td className="p-4 border-r dark:border-[#2e2e2e]">{variant.claimed}</td>
                <td className="p-4 border-r dark:border-[#2e2e2e]">{variant.realWorld}</td>
                <td className="p-4 border-r dark:border-[#2e2e2e]">{variant.city}</td>
                <td className="p-4">{variant.highway}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelEfficiencyTable;
