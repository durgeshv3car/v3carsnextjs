import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const fuelData = [

    {
        type: "Petrol",
        unit: "L",
        fuelCost: 95.08,
        daily: 444,
        monthly: 13311,
        yearly: 161954,
    },
    
    {
        type: "Diesel",
        unit: "L",
        fuelCost: 88.23,
        daily: 88.23,
        monthly: 9264,
        yearly: 112716,
    },

    {
        type: "CNG*",
        unit: "kg",
        fuelCost: 80.67,
        daily: 80.67,
        monthly: 7700,
        yearly: 93688,
    },



];


export default function FuelCostTable() {
    return (

        <div className="overflow-x-auto my-6">
            <table className="min-w-[1600px] mx-auto border-collapse text-sm text-gray-900">

                {/* Table Header */}
                <thead>
                    <tr className=" text-center text-[14px] font-semibold">
                        <th className="text-left p-4 rounded-tl-xl  min-w-[240px]"></th>
                        {fuelData.map((item, i) => (
                            <th
                                key={i}
                                className={`py-4 border bg-gray-200 border-[#E5E5E5] ${i === fuelData.length - 1 ? 'rounded-tr-xl' : ''}`}
                            >
                                {item.type.toUpperCase()}

                            </th>
                        ))}
                    </tr>
                </thead>


                  
                  
                {/* Table Body */}
                <tbody className="text-[14px]">

                    {/* Row 1 - Fuel Efficiency */}
                    <tr>
                        <td className="p-4 border border-[#E5E5E5] flex items-center gap-2 font-medium min-w-[240px]">
                            Enter Fuel Efficiency (kmpl)
                            <FaInfoCircle className="text-gray-500 text-xs" />
                        </td>
                        {fuelData.map((item, i) => (
                            <td key={i} className="text-center p-4 border border-[#E5E5E5]">{`15 ${item.unit}`}</td>
                        ))}
                    </tr>

                    {/* Row 2 - Fuel Cost */}
                    <tr className="bg-[#FFFAE8]">

                        <td className="p-4 border border-[#E5E5E5] min-w-[240px]">

                            <div className="flex justify-between">
                                <div>
                                    Enter Fuel Cost Per Liter
                                </div>

                                <div className="flex flex-col text-[13px]">
                                    <div className="flex items-center gap-1 font-semibold">
                                        Cost of fuel in Saharanpur
                                        <FaArrowUpRightFromSquare className="text-[10px]" />
                                    </div>
                                    <span className="text-[11px] text-gray-500">
                                        last updated on 17-08-2024
                                    </span>
                                </div>
                            </div>

                        </td>

                        {fuelData.map((item, i) => (
                            <td key={i} className="text-center p-4 font-semibold text-[15px] border border-[#E5E5E5]">
                                ₹ {item.fuelCost}
                            </td>
                        ))}

                    </tr>

                    {/* Daily */}
                    <tr>
                        <td className="p-4 border border-[#E5E5E5] min-w-[240px]">Daily Fuel Cost</td>
                        {fuelData.map((item, i) => (
                            <td key={i} className="text-center p-4 border border-[#E5E5E5]">
                                ₹ {item.daily}
                            </td>
                        ))}
                    </tr>

                    {/* Monthly */}
                    <tr>
                        <td className="p-4 border border-[#E5E5E5] min-w-[240px]">Monthly Fuel Cost</td>
                        {fuelData.map((item, i) => (
                            <td key={i} className="text-center p-4 border border-[#E5E5E5]">
                                ₹ {item.monthly.toLocaleString()}
                            </td>
                        ))}
                    </tr>

                    {/* Yearly */}
                    <tr>
                        <td className="p-4 border border-[#E5E5E5] min-w-[240px]">Yearly Fuel Cost</td>
                        {fuelData.map((item, i) => (
                            <td key={i} className="text-center p-4 border border-[#E5E5E5]">
                                ₹ {item.yearly.toLocaleString()}
                            </td>
                        ))}
                    </tr>

                </tbody>
            </table>
        </div>
    );
}
