'use client'

import React from "react";

interface ReviewContantProps {
    title: string;
}

export default function ReviewContant({ title }: ReviewContantProps) {
    return (
        <div className="border rounded-xl overflow-hidden dark:border-[#2e2e2e]">
            <h2 className="text-xl font-semibold bg-[#F1F1F1] dark:bg-[#292929] px-4 py-3">{title}</h2>

            <div className="border-b dark:border-[#2e2e2e]">
                <div className="p-4 bg-white dark:bg-[#171717]">
                    <h3 className="text-lg font-semibold">
                        Tata Nexon 1.5L Diesel-MT Mileage Test: City, Highway Fuel Efficiency
                    </h3>
                    <p className="text-gray-400 mt-2 leading-relaxed">
                        The Nexon’s 1.5L diesel engine is known for its strong mid-range and better mileage, and in this review, we test
                        both efficiency and city-highway dynamics to find out just how efficient it really is. Tata’s 1.5L Revotorq diesel
                        motor has been refined over the years, and paired with a manual gearbox, it provides a balanced combination of
                        driveability and fuel efficiency.
                    </p>

                    {/* --- Image Section --- */}
                    <div className="my-6">
                        <img
                            src="/model/review.png"
                            alt="Tata Nexon 1.5L Diesel"
                            className="rounded-xl w-full shadow-md"
                        />
                        <div className="bg-yellow-400 w-max px-5 py-2 rounded-md text-sm font-semibold text-gray-900 mt-2">
                            1.5L Diesel-MT City, Hwy Mileage Test
                        </div>
                    </div>

                    {/* --- Testing Method --- */}
                    <h3 className="text-xl font-semibold mb-3">Testing Method</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        For the purpose of this practical mileage test of the Tata Nexon 1.5L diesel manual, we fully refuel our test
                        vehicle and ensure tyre pressures are set to the manufacturer’s recommended levels.
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-4">
                        We drive the Nexon in both urban and highway conditions while keeping the test route and driving style
                        consistent to offer fair, real-world results. The car is driven with the AC on and a light load to simulate normal
                        usage conditions. City runs include light to moderate traffic, while the highway leg maintains an average speed
                        between 70–90 km/h.
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-4">
                        During testing, both instantaneous and average fuel efficiency figures were recorded using the onboard trip
                        computer. Once testing concludes, the tank is refilled to the brim to measure actual consumption using the
                        tank-to-tank method.
                    </p>

                    {/* --- Result Table --- */}
                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-sm dark:border-[#292929]">
                            <thead className="bg-gray-100 dark:bg-[#292929]">
                                <tr>
                                    <th className="text-left p-4 font-semibold">Tata Nexon 1.5L Turbo Diesel-MT</th>
                                    <th className="text-left p-3 font-semibold">Claimed vs Real Mileage Comparison</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["City Fuel Cost (per km)", "₹ 3.28"],
                                    ["City Difference", "-5.3%"],
                                    ["City Mileage", "17.96 kmpl"],
                                    ["Difference", "-13.8%"],
                                    ["Claimed Mileage", "19.73 kmpl"],
                                    ["Highway Mileage", "21.76 kmpl"],
                                    ["Highway Difference", "-4.1%"],
                                    ["Fuel Type (Cost per litre)", "₹ 89.41"],
                                ].map(([label, value], idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-t border-gray-100 dark:border-[#2e2e2e] ${idx % 2 === 0 ? "bg-gray-50 dark:bg-[#171717]" : "bg-white dark:bg-[#2e2e2e]"}`}
                                    >
                                        <td className="p-3">{label}</td>
                                        <td className="p-3">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Summary --- */}
                    <p className="text-gray-400 leading-relaxed mb-4">
                        In terms of highway mileage alone, the Nexon 1.5L managed 21.7 km/l, which sits 4% below the claimed figure. The
                        Nexon returned 17.9 km/l in city testing conditions, a 13% drop against ARAI’s figure. Overall, it’s a respectable
                        performer with balanced efficiency for daily commuting and long trips alike.
                    </p>

                    <p className="text-gray-400 leading-relaxed">
                        Tata Nexon 1.5L Turbo Diesel-MT — Actual City vs Highway Mileage: Custom Real Mileage Fuel Cost Comparison was
                        done in a controlled test setup. Results may vary based on driving style, traffic, and ambient temperature. The
                        Nexon’s diesel engine continues to be among the most refined in its class, offering strong torque and excellent
                        drivability in urban and highway conditions.
                    </p>

                    {/* --- Comment Section --- */}
                    <div className="mt-10 border-t pt-6 dark:border-[#2e2e2e]">
                        <h3 className="text-lg font-semibold mb-4">Comments (3)</h3>

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Ravi Kumar",
                                    time: "2 days ago",
                                    comment: "I’ve been driving this car for 6 months — totally agree with the mileage figures here!",
                                },
                                {
                                    name: "Ankit Sharma",
                                    time: "1 day ago",
                                    comment: "Would love to see a comparison with the petrol variant next.",
                                },
                                {
                                    name: "Sneha Patel",
                                    time: "3 hours ago",
                                    comment: "Great review. Very detailed explanation about the testing method!",
                                },
                            ].map((c, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold dark:bg-[#2e2e2e]">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{c.name}</p>
                                        <p className="text-xs">{c.time}</p>
                                        <p className="text-gray-400 mt-1">{c.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-6">
                            <textarea
                                placeholder="Add a comment..."
                                className="w-full border border-gray-300 dark:border-[#2e2e2e] dark:bg-[#171717] rounded-lg p-3 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                            />
                            <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#171717]">
                <h3 className="text-lg font-semibold">
                    Tata Nexon 1.5L Diesel-MT Mileage Test: City, Highway Fuel Efficiency
                </h3>
                <p className="text-gray-400 mt-2 leading-relaxed">
                    The Nexon’s 1.5L diesel engine is known for its strong mid-range and better mileage, and in this review, we test
                    both efficiency and city-highway dynamics to find out just how efficient it really is. Tata’s 1.5L Revotorq diesel
                    motor has been refined over the years, and paired with a manual gearbox, it provides a balanced combination of
                    driveability and fuel efficiency.
                </p>

                {/* --- Image Section --- */}
                <div className="my-6">
                    <img
                        src="/model/review.png"
                        alt="Tata Nexon 1.5L Diesel"
                        className="rounded-xl w-full shadow-md"
                    />
                    <div className="bg-yellow-400 w-max px-5 py-2 rounded-md text-sm font-semibold text-gray-900 mt-2">
                        1.5L Diesel-MT City, Hwy Mileage Test
                    </div>
                </div>

                {/* --- Testing Method --- */}
                <h3 className="text-xl font-semibold mb-3">Testing Method</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                    For the purpose of this practical mileage test of the Tata Nexon 1.5L diesel manual, we fully refuel our test
                    vehicle and ensure tyre pressures are set to the manufacturer’s recommended levels.
                </p>

                <p className="text-gray-400 leading-relaxed mb-4">
                    We drive the Nexon in both urban and highway conditions while keeping the test route and driving style
                    consistent to offer fair, real-world results. The car is driven with the AC on and a light load to simulate normal
                    usage conditions. City runs include light to moderate traffic, while the highway leg maintains an average speed
                    between 70–90 km/h.
                </p>

                <p className="text-gray-400 leading-relaxed mb-4">
                    During testing, both instantaneous and average fuel efficiency figures were recorded using the onboard trip
                    computer. Once testing concludes, the tank is refilled to the brim to measure actual consumption using the
                    tank-to-tank method.
                </p>

                {/* --- Result Table --- */}
                <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-sm dark:border-[#292929]">
                        <thead className="bg-gray-100 dark:bg-[#292929]">
                            <tr>
                                <th className="text-left p-4 font-semibold">Tata Nexon 1.5L Turbo Diesel-MT</th>
                                <th className="text-left p-3 font-semibold">Claimed vs Real Mileage Comparison</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["City Fuel Cost (per km)", "₹ 3.28"],
                                ["City Difference", "-5.3%"],
                                ["City Mileage", "17.96 kmpl"],
                                ["Difference", "-13.8%"],
                                ["Claimed Mileage", "19.73 kmpl"],
                                ["Highway Mileage", "21.76 kmpl"],
                                ["Highway Difference", "-4.1%"],
                                ["Fuel Type (Cost per litre)", "₹ 89.41"],
                            ].map(([label, value], idx) => (
                                <tr
                                    key={idx}
                                    className={`border-t border-gray-100 dark:border-[#2e2e2e] ${idx % 2 === 0 ? "bg-gray-50 dark:bg-[#171717]" : "bg-white dark:bg-[#2e2e2e]"}`}
                                >
                                    <td className="p-3">{label}</td>
                                    <td className="p-3">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Summary --- */}
                <p className="text-gray-400 leading-relaxed mb-4">
                    In terms of highway mileage alone, the Nexon 1.5L managed 21.7 km/l, which sits 4% below the claimed figure. The
                    Nexon returned 17.9 km/l in city testing conditions, a 13% drop against ARAI’s figure. Overall, it’s a respectable
                    performer with balanced efficiency for daily commuting and long trips alike.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    Tata Nexon 1.5L Turbo Diesel-MT — Actual City vs Highway Mileage: Custom Real Mileage Fuel Cost Comparison was
                    done in a controlled test setup. Results may vary based on driving style, traffic, and ambient temperature. The
                    Nexon’s diesel engine continues to be among the most refined in its class, offering strong torque and excellent
                    drivability in urban and highway conditions.
                </p>

                {/* --- Comment Section --- */}
                <div className="mt-10 border-t pt-6 dark:border-[#2e2e2e]">
                    <h3 className="text-lg font-semibold mb-4">Comments (3)</h3>

                    <div className="space-y-5">
                        {[
                            {
                                name: "Ravi Kumar",
                                time: "2 days ago",
                                comment: "I’ve been driving this car for 6 months — totally agree with the mileage figures here!",
                            },
                            {
                                name: "Ankit Sharma",
                                time: "1 day ago",
                                comment: "Would love to see a comparison with the petrol variant next.",
                            },
                            {
                                name: "Sneha Patel",
                                time: "3 hours ago",
                                comment: "Great review. Very detailed explanation about the testing method!",
                            },
                        ].map((c, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold dark:bg-[#2e2e2e]">
                                    {c.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{c.name}</p>
                                    <p className="text-xs">{c.time}</p>
                                    <p className="text-gray-400 mt-1">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <div className="mt-6">
                        <textarea
                            placeholder="Add a comment..."
                            className="w-full border border-gray-300 dark:border-[#2e2e2e] dark:bg-[#171717] rounded-lg p-3 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                        />
                        <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
