'use client'

import React from "react";

export default function FuelCostCalculation() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                What’s Included in Fuel Cost Calculation?
            </h1>

            <p className="mb-6">
                A car’s running cost depends on how efficiently it uses fuel and how much you
                drive every month. The Fuel Cost Calculator helps you estimate your monthly
                and yearly fuel expenses based on your driving habits, fuel type and
                real-world mileage.
            </p>

            {/* --- How Fuel Cost Is Calculated --- */}
            <h2 className="text-xl font-semibold mb-3">Here’s how the fuel cost is calculated:</h2>

            <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>
                    <strong>Start With Your Daily Running</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-400">
                        <li>Enter the number of kilometres you drive per day. This helps the calculator estimate your monthly and yearly usage.</li>
                        <li>Daily Running × 30 = Monthly Running</li>
                        <li>Monthly Running × 12 = Yearly Running</li>
                    </ul>
                </li>

                <li>
                    <strong>Add the Fuel Price</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-400">
                        <li>Fuel prices vary by city and fuel type (Petrol, Diesel, CNG, Electric).</li>
                        <li>The calculator uses the latest price for the selected fuel.</li>
                    </ul>
                </li>

                <li>
                    <strong>Enter Your Car’s Fuel Efficiency (Mileage)</strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-400">
                        <li>Fuel efficiency depends on engine type, transmission, and driving conditions.</li>
                        <li>Petrol/Diesel: Typically ranges between 10–25 kmpl.</li>
                        <li>CNG: Usually between 15–30 km/kg.</li>
                    </ul>
                </li>
            </ul>

            {/* --- How Calculator Estimates --- */}
            <h2 className="text-xl font-semibold mb-3">How the Calculator Estimates Fuel Cost</h2>

            <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>
                    <strong>For Petrol / Diesel Cars:</strong>
                    <br />
                    Fuel Cost = (Monthly Running ÷ Mileage) × Fuel Price
                </li>
                <li>
                    <strong>For CNG Cars:</strong>
                    <br />
                    Fuel Cost = (Monthly Running ÷ Mileage in km/kg) × CNG Price per kg
                </li>
            </ul>

            {/* --- Example Section --- */}
            <h2 className="text-xl font-semibold mb-3">
                Example – &#123;&#123;Brand&#125;&#125; &#123;&#123;Model&#125;&#125; &#123;&#123;Powertrain&#125;&#125; Fuel Cost in &#123;&#123;City&#125;&#125;
            </h2>

            <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Daily Running: &#123;&#123;DailyRunning&#125;&#125; km</li>
                <li>Monthly Running: &#123;&#123;MonthlyRunning&#125;&#125; km</li>
                <li>Fuel Price: ₹&#123;&#123;FuelPrice&#125;&#125;</li>
                <li>Claimed Mileage / Consumption: &#123;&#123;Mileage&#125;&#125; &#123;&#123;Unit&#125;&#125;</li>
            </ul>

            <p className="mb-1">
                <strong>Estimated Monthly Fuel Cost:</strong> ₹&#123;&#123;MonthlyFuelCost&#125;&#125;
            </p>
            <p className="mb-6">
                <strong>Estimated Yearly Fuel Cost:</strong> ₹&#123;&#123;YearlyFuelCost&#125;&#125;
            </p>

            {/* --- Note --- */}
            <p className="text-sm text-gray-400 mb-6">
                <strong>Note:</strong> These values are indicative and may vary with traffic conditions,
                driving style, AC usage, tyre pressure, and actual fuel efficiency.
            </p>

            {/* --- Tips Section --- */}
            <h2 className="text-xl font-semibold mb-3">Tips to Reduce Fuel Costs</h2>

            <ul className="list-disc ml-6 space-y-2">
                <li>Maintain optimal tyre pressure for better mileage.</li>
                <li>Avoid aggressive acceleration and braking.</li>
                <li>Get your car serviced on time to ensure peak fuel efficiency.</li>
            </ul>
        </div>
    );
}
