import Image from "next/image";
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaWhatsapp,
} from "react-icons/fa6";

export default function CarSpecsBlock() {
    return (

        <div className=" space-y-6">

            {/* ===== Heading Section ===== */}
            <div className="mb-6">

                {/* ===== Mobile Layout ===== */}
                <div className="block md:hidden space-y-3 bg-gray-200 dark:bg-[#171717] p-4 border-b border-gray-600 dark:border-[#2E2E2E]">
                    {/* Title */}
                    <h1 className="text-[18px] font-bold  leading-snug">
                        MG Hector Plus Price Increased By Up To Rs. 30,000- Latest
                    </h1>


                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-y-2 text-sm  justify-between">
                        <p className="mr-6">
                            <span className="font-medium">Author :</span> Saloni Chaudhary
                        </p>

                        <p>
                            <span className="font-medium">Read Time :</span> 6 min
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-1">
                        <p className="mr-6">
                            <span className="font-medium">Published :</span> August 22, 2024
                        </p>
                        {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp].map((Icon, idx) => (
                            <span
                                key={idx}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e4e4e4] dark:bg-black border dark:border-[#2E2E2E] text-[14px] hover:opacity-80 cursor-pointer"
                            >
                                <Icon />
                            </span>
                        ))}
                    </div>

                </div>

                <div className="md:block hidden space-y-3">

                    {/* Title */}
                    <h1 className="text-[22px] md:text-[24px] font-bold  leading-snug mb-2">
                        MG Hector Plus Price Increased By Up To Rs. 30,000 - Latest
                    </h1>

                    {/* Meta Info */}
                    <p className="text-sm  mb-5">
                        Modified On Nov 16, 2024 10:57 AM By Mahesh for Tata Nexon
                    </p>

                    {/* Intro Paragraph */}
                    <p className="text-[15px]  leading-[1.7] mb-5">
                        MG India recently increased the prices of the Hector Plus by up to Rs. 30,000. After this price revision, the Hector Plus’s ex-showroom prices now start at Rs. 18.2 lakh and tops out at Rs. 22.93 lakh. The new August 2024 prices are between 0.9% and 1.76% higher than before.
                    </p>

                </div>

            </div>

            <div className="p-4 lg:p-0">

                {/* ===== Main Image ===== */}
                <div className="w-full overflow-hidden rounded-xl mb-5">

                    <Image
                        src="/car-news/car.png" // replace with your main news image
                        alt="MG Hector Plus"
                        width={800}
                        height={500}
                        className="w-full object-cover rounded-xl"
                    />

                </div>

                {/* ===== Block 1: Single Column Table ===== */}
                <div className="rounded-xl border border-gray-200 dark:border-[#2E2E2E] overflow-hidden mb-5">

                    {/* Table Header */}
                    <div className="bg-[#F5F5F5] dark:bg-[#171717] text-center py-3 px-2 border-b border-gray-200 dark:border-[#2E2E2E]">
                        <h3 className="text-[16px] font-bold ">2024 MAHINDRA THAR</h3>
                        <p className="text-xs  uppercase tracking-wide">Powertrain-Wise Mileage (ARAI)</p>
                    </div>

                    {/* Desktop Table */}
                    <table className="w-full text-sm hidden md:table bg-white dark:bg-[#171717]">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                                <td className="p-4 font-medium ">2.0L Turbo Petrol (MT, AT)</td>
                                <td className="p-4 ">12.40kmpl</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-[#2E2E2E]">
                                <td className="p-4 font-medium ">2.2L Diesel (MT, AT)</td>
                                <td className="p-4 ">15.20kmpl</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium ">1.5L Diesel (MT)</td>
                                <td className="p-4 ">NA</td>
                            </tr>
                        </tbody>
                    </table>    

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-gray-200 bg-white dark:bg-[#27272a]">
                        {[
                            { engine: "2.0L Turbo Petrol (MT, AT)", mileage: "12.40kmpl" },
                            { engine: "2.2L Diesel (MT, AT)", mileage: "15.20kmpl" },
                            { engine: "1.5L Diesel (MT)", mileage: "NA" },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center p-4">
                                <p className="font-medium  text-sm w-[65%]">{row.engine}</p>
                                <p className=" text-sm font-medium">{row.mileage}</p>
                            </div>
                        ))}
                    </div>


                </div>

                {/* ===== Paragraph ===== */}
                <p className="text-[15px]  leading-[2] mb-5">
                    The figures mentioned above are only indicative as ARAI tests cars under a laboratory-like condition at an average speed of 30kmph. The real-world mileage can vary significantly as the tests do not take into consideration factors like driving style, traffic lights, weather and road conditions. Additionally, the tests are conducted with the air conditioner switched off, and thus do not reflect real-world driving conditions.
                </p>

                {/* ===== Block 2: Powertrain Specifications Table ===== */}
                <div>
                    <h4 className="text-2xl font-semibold  mb-2">
                        Mahindra Thar Powertrain Specifications
                    </h4>
                    <p className="text-[15px]  leading-[2] mb-4">
                        The Mahindra Thar is offered with 3 engine options – a 2.0L turbo petrol, a 2.2L diesel engine and a 1.5L diesel engine. The 2.0L turbo petrol and 2.2L diesel engine are available with the option of a 6-speed manual and 6-speed torque converter automatic transmission. The smaller 1.5L diesel engine in the Thar RWD is only available with a 6-speed manual transmission.
                    </p>

                    {/* Scrollable Table Wrapper */}
                    <div className="bg-[#F8F8F8] dark:bg-[#171717] rounded-xl overflow-hidden border border-gray-200 dark:border-[#2E2E2E]">
                        {/* Table Header */}
                        <div className="border-b border-gray-300 dark:border-[#2E2E2E] text-center py-3 px-2">
                            <h3 className="text-[16px] font-bold ">2024 MAHINDRA THAR</h3>
                            <p className="text-xs  uppercase tracking-wide">Powertrain-Wise Mileage (ARAI)</p>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div className="overflow-x-auto scrollbar-hide">
                            <table className="w-full min-w-[600px] text-sm bg-white dark:bg-[#171717]">
                                <thead className=" ">
                                    <tr>
                                        <th className="p-3 text-left">Engine</th>
                                        <th className="p-3 text-left">2.0L Turbo Petrol</th>
                                        <th className="p-3 text-left">2.2L Diesel</th>
                                        <th className="p-3 text-left">1.5L Diesel</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="border-t border-gray-200 dark:border-[#2E2E2E]">
                                        <td className="p-3 font-medium">Transmission</td>
                                        <td className="p-3">6MT, 6TC</td>
                                        <td className="p-3">6MT, 6TC</td>
                                        <td className="p-3">6MT</td>
                                    </tr>
                                    <tr className="border-t border-gray-200 dark:border-[#2E2E2E]">
                                        <td className="p-3 font-medium">Drivetrain</td>
                                        <td className="p-3">4WD</td>
                                        <td className="p-3">4WD</td>
                                        <td className="p-3">RWD</td>
                                    </tr>
                                    <tr className="border-t border-gray-200 dark:border-[#2E2E2E]">
                                        <td className="p-3 font-medium">Power</td>
                                        <td className="p-3">152PS @ 5000rpm</td>
                                        <td className="p-3">132PS @ 3750rpm</td>
                                        <td className="p-3">119PS @ 3500rpm</td>
                                    </tr>
                                    <tr className="border-t dark:border-[#2E2E2E]">
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
                </div>

                {/* ===== Also Read / Note / Final Pricing ===== */}
                <div className="text-[15px]  space-y-3 mt-5" >
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
            
        </div>
    );
}
