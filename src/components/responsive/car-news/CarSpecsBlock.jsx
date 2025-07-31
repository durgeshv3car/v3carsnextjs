import Image from "next/image";

export default function CarSpecsBlock() {
    return (
        <div className="bg-white rounded-lg  space-y-6">

            {/* ===== Heading ===== */}
            <div className="">

                {/* Title */}
                <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 leading-snug mb-2">
                    MG Hector Plus Price Increased By Up To Rs. 30,000 - Latest
                </h1>

                {/* Meta Info */}
                <p className="text-sm text-gray-500 mb-5">
                    Modified On Nov 16, 2024 10:57 AM By Mahesh for Tata Nexon
                </p>

                {/* Intro Paragraph */}
                <p className="text-[15px] text-gray-800 leading-[1.7] mb-5">
                    MG India recently increased the prices of the Hector Plus by up to Rs. 30,000. After this price revision, the Hector Plus’s ex-showroom prices now start at Rs. 18.2 lakh and tops out at Rs. 22.93 lakh. The new August 2024 prices are between 0.9% and 1.76% higher than before.
                </p>

                {/* Main Image */}
                <div className="w-full overflow-hidden rounded-xl mt-5">

                    <Image  
                        src="/car-news/car.png" // replace with your main news image
                        alt="MG Hector Plus"
                        width={800}
                        height={500}
                        className="w-full object-cover rounded-xl"
                    />

                </div>
                
            </div>

            {/* ===== Block 1: Single Column Table ===== */}
            <div className="bg-[#F8F8F8] rounded overflow-hidden">

                <div className="border-b border-gray-300 text-center py-3">
                    <h3 className="text-[16px] font-bold text-gray-800">2024 MAHINDRA THAR</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Powertrain-Wise Mileage (ARAI)</p>
                </div>

                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium text-gray-800">2.0L Turbo Petrol (MT, AT)</td>
                            <td className="p-3 text-gray-700">12.40kmpl</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-3 font-medium text-gray-800">2.2L Diesel (MT, AT)</td>
                            <td className="p-3 text-gray-700">15.20kmpl</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-gray-800">1.5L Diesel (MT)</td>
                            <td className="p-3 text-gray-700">NA</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {/* ===== Paragraph ===== */}
            <p className="text-[15px] text-gray-800 leading-[1.7]">
                The figures mentioned above are only indicative as ARAI tests cars under a laboratory-like condition at an average speed of 30kmph. The real-world mileage can vary significantly as the tests do not take into consideration factors like driving style, traffic lights, weather and road conditions. Additionally, the tests are conducted with the air conditioner switched off, and thus do not reflect real-world driving conditions.
            </p>

            {/* ===== Block 2: Powertrain Specifications Table ===== */}
            <div>
                <h4 className="text-[16px] font-semibold text-gray-800 mb-2">
                    Mahindra Thar Powertrain Specifications
                </h4>
                <p className="text-[15px] text-gray-800 leading-[1.7] mb-4">
                    The Mahindra Thar is offered with 3 engine options – a 2.0L turbo petrol, a 2.2L diesel engine and a 1.5L diesel engine. The 2.0L turbo petrol and 2.2L diesel engine are available with the option of a 6-speed manual and 6-speed torque converter automatic transmission. The smaller 1.5L diesel engine in the Thar RWD is only available with a 6-speed manual transmission.
                </p>

                <div className="bg-[#F8F8F8] rounded overflow-hidden">
                    <div className="border-b border-gray-300 text-center py-3">
                        <h3 className="text-[16px] font-bold text-gray-800">2024 MAHINDRA THAR</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Powertrain-Wise Mileage (ARAI)</p>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Engine</th>
                                <th className="p-3 text-left">2.0L Turbo Petrol</th>
                                <th className="p-3 text-left">2.2L Diesel</th>
                                <th className="p-3 text-left">1.5L Diesel</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            <tr className="border-t">
                                <td className="p-3 font-medium">Transmission</td>
                                <td className="p-3">6MT, 6TC</td>
                                <td className="p-3">6MT, 6TC</td>
                                <td className="p-3">6MT</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">Drivetrain</td>
                                <td className="p-3">4WD</td>
                                <td className="p-3">4WD</td>
                                <td className="p-3">RWD</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">Power</td>
                                <td className="p-3">152PS @ 5000rpm</td>
                                <td className="p-3">132PS @ 3750rpm</td>
                                <td className="p-3">119PS @ 3500rpm</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">Torque</td>
                                <td className="p-3">
                                    300Nm @ 1250–3000rpm (MT)<br />
                                    320Nm @ 1500–3000rpm (AT)
                                </td>
                                <td className="p-3">300Nm @ 1600–2800rpm</td>
                                <td className="p-3">300Nm @ 1750–2500rpm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== Also Read / Note / Final Pricing ===== */}
            <div className="text-[15px] text-gray-800 space-y-3">
                <p>
                    Also Read:{" "}
                    <a href="#" className="text-blue-600 underline">
                        2024 Mahindra Thar Roxx – Variant-Wise Powertrain Options
                    </a>
                </p>
                <p>
                    Note: If you want to buy a new car,{" "}
                    <a href="#" className="text-blue-600 underline">
                        Calculate Car Loan EMI
                    </a>{" "}
                    with V3Cars
                </p>
                <p>
                    The 2024 Mahindra Thar 3-Door is priced from Rs. 11.35 lakh to Rs. 17.60 lakh (ex-showroom). It competes with off-road-oriented SUVs...
                </p>
            </div>

        </div>
    );
}
