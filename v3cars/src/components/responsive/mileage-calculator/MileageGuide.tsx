import React from "react";

export default function MileageGuide() {
    return (
        <div>

            {/* Title */}
            <h1 className="text-3xl font-semibold mb-4">
                Mileage Calculator – Complete Guide
            </h1>

            {/* Intro Paragraph */}
            <p className="mb-4">
                A mileage calculator helps you measure your vehicle&apos;s real-world fuel efficiency and
                understand how much it costs you to drive per kilometre. Unlike brochure numbers, this
                calculator shows actual fuel usage based on the way you drive, road conditions and fuel
                prices in your city.
            </p>

            {/* What is Mileage */}
            <h2 className="text-xl font-semibold mb-2">What is Mileage?</h2>
            <p className="mb-2">
                Mileage (or fuel efficiency) is the distance a vehicle can travel using one unit of fuel.
            </p>

            <ul className="list-disc ml-6 mb-4">
                <li>Petrol/Diesel: km/l or l/100 km</li>
                <li>CNG: km/kg</li>
                <li>Electric Vehicles: kWh per km or cost per km</li>
            </ul>

            <p className="mb-4">
                Higher mileage means better fuel efficiency and lower running costs.
            </p>

            {/* Why Use a Mileage Calculator */}
            <h2 className="text-xl font-semibold mb-2">Why Use a Mileage Calculator?</h2>
            <p className="mb-2">The tool helps you:</p>

            <ul className="list-disc ml-6 mb-4">
                <li>Calculate actual mileage based on your own driving</li>
                <li>Estimate fuel cost per month or trip</li>
                <li>Compare running cost between petrol, diesel, CNG and EVs</li>
                <li>Track mileage over time to detect engine or maintenance issues</li>
                <li>Understand the impact of traffic, AC usage and driving style</li>
            </ul>

            {/* How it works */}
            <h2 className="text-xl font-semibold mb-2">
                How the Mileage Calculator Works (Explained in Simple Steps)
            </h2>

            {/* Step 1 */}
            <h3 className="font-semibold mb-1">1. Enter Distance Travelled</h3>
            <ul className="list-disc ml-6 mb-4">
                <li>This is the distance you covered during your test drive or trip.</li>
                <li>You may use:</li>
                <ul className="list-disc ml-6">
                    <li>Odometer readings</li>
                    <li>Trip meter reset before driving</li>
                </ul>
                <li>Example: If your trip meter shows 45 km → Enter 45.</li>
            </ul>

            {/* Step 2 */}
            <h3 className="font-semibold mb-1">2. Enter Fuel Consumed</h3>
            <ul className="list-disc ml-6 mb-4">
                <li>Use the amount of fuel filled during a full-tank test or consumed for the trip.</li>
                <li>Petrol/Diesel: litres</li>
                <li>CNG: kilograms</li>
                <li>EV: kWh consumed (handled in EV tab)</li>
                <li>Example: You filled 4.2 litres → Enter 4.2.</li>
            </ul>

            {/* Step 3 */}
            <h3 className="font-semibold mb-1">3. Enter Fuel Price</h3>
            <ul className="list-disc ml-6 mb-4">
                <li>The calculator pulls real-time fuel prices for your city.</li>
                <li>You can manually enter a different price if required.</li>
            </ul>

            {/* Step 4 */}
            <h3 className="font-semibold mb-1">4. View Results</h3>
            <ul className="list-disc ml-6 mb-6">
                <li>Mileage (km/l)</li>
                <li>Total Fuel Cost</li>
                <li>Fuel Cost per km</li>
                <li>Fuel Cost per 100 km (international standard)</li>
            </ul>

            {/* Formulas */}
            <h2 className="text-xl font-semibold mb-2">
                Mileage Calculation Formulas
            </h2>

            <ul className="list-disc ml-6 mb-6">
                <li>Mileage (km/l) = Distance Travelled ÷ Fuel Consumed</li>
                <li>Total Fuel Cost = Fuel Consumed × Fuel Price</li>
                <li>Fuel Cost per km = Total Fuel Cost ÷ Distance Travelled</li>
                <li>Fuel Cost per 100 km = (Fuel Cost per km × 100)</li>
            </ul>

            {/* EV */}
            <h2 className="text-xl font-semibold mb-2">EV Mileage & Cost Formula</h2>

            <ul className="list-disc ml-6 mb-6">
                <li>Energy Used (kWh) = Distance × Efficiency (kWh/km)</li>
                <li>Charging Cost (₹) = Energy Used × Tariff</li>
                <li>Cost per km (₹/km) = Charging Cost ÷ Distance</li>
                <li>Cost per km (₹/km) = Tariff × Efficiency</li>
            </ul>

            {/* Tips */}
            <h2 className="text-xl font-semibold mb-2">Tips for More Accurate Mileage Measurement</h2>

            <ul className="list-disc ml-6 mb-4">
                <li>Always use a full-tank to full-tank method</li>
                <li>Avoid heavy traffic while testing</li>
                <li>Maintain correct tyre pressure</li>
                <li>Do not reset the trip meter accidentally</li>
                <li>Perform 2–3 tests for more accurate results</li>
            </ul>
        </div>
    );
}
