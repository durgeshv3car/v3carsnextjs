'use client'

import React from "react";

export default function FuelPriceGuide() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Fuel Price in India – Complete Guide</h1>

            <p className="mb-4">
                Fuel prices in India change regularly and vary from state to state due to differences in taxes,
                dealer commissions, transportation costs and government policies. Our Fuel Price Tool gives you
                the most accurate and up-to-date petrol, diesel and CNG prices across India, helping you plan your
                daily travel, monthly fuel budgets, and long-distance trips with confidence.
            </p>

            <p className="mb-6">
                Below is a detailed guide explaining how the tool works, why fuel prices vary, and how you can use
                this information effectively.
            </p>

            {/* Section: How Fuel Prices Are Determined */}
            <h2 className="text-xl font-semibold mb-3">How Fuel Prices Are Determined in India</h2>
            <p className="mb-3">
                Fuel prices in India are revised daily based on the Dynamic Fuel Pricing System. The factors
                influencing final rates include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Global Crude Oil Prices</strong> – International crude oil rates directly affect the price of petrol and diesel.</li>
                <li><strong>Exchange Rates (USD to INR)</strong> – Imported crude means rupee fluctuations affect fuel prices.</li>
                <li><strong>State Taxes & VAT</strong> – Vary by state, creating significant price differences.</li>
                <li><strong>Excise Duty (Central Government)</strong> – A uniform tax applicable across India.</li>
                <li><strong>Dealer Commission</strong> – Dealer margins added per litre.</li>
                <li><strong>Freight & Transportation Charges</strong> – Longer distances slightly increase fuel cost.</li>
            </ul>

            <p className="mb-6">These combined factors cause daily petrol, diesel and CNG price fluctuations.</p>

            {/* Section: How the Tool Works */}
            <h2 className="text-xl font-semibold mb-3">How the Fuel Price Tool Works</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Shows real-time fuel rates from every state and all major metro cities.</li>
                <li>Designed to be simple, fast, and accurate without manual searching.</li>
            </ul>

            {/* Section: Fuel Prices in Metro Cities */}
            <h2 className="text-xl font-semibold mb-3">Fuel Prices in Metro Cities</h2>
            <p className="mb-3">Displays the latest petrol, diesel and CNG rates for Delhi, Mumbai, Chennai and Kolkata.</p>
            <p className="mb-2 font-medium">Why this matters:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Metro prices influence national price trends.</li>
                <li>Useful for inter-city travellers and transport operators.</li>
                <li>Helps compare fuel costs between major cities.</li>
            </ul>

            <p className="font-medium mb-2">Each city display includes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Fuel type (Petrol/Diesel/CNG)</li>
                <li>Latest updated price</li>
                <li>Daily price change (if any)</li>
            </ul>

            {/* Section: State-Wise Fuel List */}
            <h2 className="text-xl font-semibold mb-3">State-Wise Fuel Price List</h2>
            <p className="mb-3">Fuel prices vary across states due to different VAT structures and transport conditions.</p>
            <p className="mb-3">This list helps users:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Compare prices across states</li>
                <li>Check regional trends</li>
                <li>Understand how taxes impact fuel cost</li>
                <li>Plan long trips more accurately</li>
            </ul>

            <p className="font-medium mb-2">Helpful for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Interstate travellers</li>
                <li>Fleet operators</li>
                <li>Businesses tracking daily logistics costs</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Daily Price Updates</h2>
            <p className="mb-3">
                The tool updates prices every day, reflecting the latest changes in petrol, diesel and CNG rates.
            </p>


            <p className="mb-2 font-medium">You can quickly check:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Today&apos;s fuel price</li>
                <li>Yesterday&apos;s price</li>
                <li>Daily increase/decrease (₹ or %)</li>
                <li>City or state-wise variations</li>
            </ul>


            {/* How to Use This Tool Effectively */}
            <h2 className="text-xl font-semibold mb-3">How to Use This Tool Effectively</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                    <strong>Check Prices Before Long Trips</strong><br />
                    Fuel prices vary significantly between states. Knowing the difference helps you decide where to
                    refuel to save money.
                </li>
                <li>
                    <strong>Track Monthly Fuel Budgets</strong><br />
                    Car and bike users can track rising or falling prices to plan monthly commuting expenses.
                </li>
                <li>
                    <strong>Compare Metro vs. State Prices</strong><br />
                    Useful for people who travel frequently between metro cities and nearby states.
                </li>
                <li>
                    <strong>For Businesses & Fleet Owners</strong><br />
                    Daily rate monitoring helps control running costs for delivery vehicles, trucks, taxis and fleet
                    operations.
                </li>
            </ul>


            {/* Why Prices Differ */}
            <h2 className="text-xl font-semibold mb-3">Why Fuel Prices Differ Across Cities and States</h2>
            <p className="mb-3">Fuel prices are not uniform across India. Here&apos;s why:</p>


            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                    <strong>State-Level VAT</strong><br />
                    The biggest reason for fuel price differences. For example, Maharashtra&apos;s levy is higher than
                    Delhi&apos;s → Mumbai fuel prices are higher.
                </li>
                <li>
                    <strong>Local Transport Costs</strong><br />
                    Fuel transported over long distances or difficult terrain costs more.
                </li>
                <li>
                    <strong>Dealer Margins</strong><br />
                    Each station adds its commission, creating small variations.
                </li>
                <li>
                    <strong>Demand Conditions</strong><br />
                    High-demand metro areas may have slightly higher operational costs.
                </li>
                <li>
                    <strong>Pollution Cess / Additional State Levies</strong><br />
                    Some states charge extra taxes to fund environmental or infrastructure initiatives.
                </li>
            </ul>


            {/* Understanding Fuel Types */}
            <h2 className="text-xl font-semibold mb-3">Understanding Fuel Types</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                    <strong>Petrol (Gasoline)</strong> – Commonly used in cars, scooters, motorcycles, and compact
                    SUVs.
                </li>
                <li>
                    <strong>Diesel</strong> – Used in heavy vehicles, SUVs, transport fleets and logistics.
                </li>
                <li>
                    <strong>CNG (Compressed Natural Gas)</strong> – A cheaper, cleaner fuel alternative widely used in
                    taxis and city vehicles.
                </li>
            </ul>


            {/* How Fuel Price Impacts Life */}
            <h2 className="text-xl font-semibold mb-3">How Fuel Price Impacts Your Daily Life</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Daily commuting costs</li>
                <li>Car/bike running cost per km</li>
                <li>Commercial transportation expenses</li>
                <li>Food and goods prices (due to logistics)</li>
                <li>Ride-hailing fares (Uber/Ola)</li>
                <li>Inter-city travel budgets</li>
            </ul>


            {/* Disclaimer */}
            <p className="text-sm text-gray-400 mb-6">
                <strong>Disclaimer:</strong> Fuel prices displayed on this page are based on the latest publicly
                available data. Actual prices at fuel pumps may vary slightly due to local factors, rounding or
                station-specific adjustments.
            </p>
        </div>
    );
}