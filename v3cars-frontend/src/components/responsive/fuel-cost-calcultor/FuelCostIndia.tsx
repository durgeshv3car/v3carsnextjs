'use client'

import React from "react";

export default function FuelCostIndia() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">
                Fuel Cost Calculator India
            </h1>

            <p className="mb-6 leading-relaxed">
                Plan Your Fuel Budget! Use our Fuel Cost Calculator to estimate daily,
                monthly & yearly running costs for petrol, diesel, or CNG vehicles in India.
            </p>

            <ol className="list-decimal ml-6 text-gray-400 space-y-2 leading-relaxed">
                <li>
                    <strong>Compare Costs:</strong> Easily compare fuel costs for petrol, diesel, and CNG.
                </li>
                <li>
                    <strong>Driving Distance:</strong> Enter driving distance based on your
                    daily/monthly/yearly running.
                </li>
                <li>
                    <strong>Local Fuel Prices:</strong> Enter your local fuel price for accurate results.
                </li>
                <li>
                    <strong>Customize Mileage:</strong> Input your car’s specific mileage (fuel efficiency)
                    for a personalized estimate.
                </li>
                <li>
                    <strong>Calculate:</strong> Enter driving distance (daily/monthly/yearly), fuel type
                    (petrol, diesel, CNG), fuel efficiency (mileage), and fuel price to see your estimated
                    daily, monthly, and yearly fuel costs.
                </li>
            </ol>

            <p className="text-sm text-gray-400 mt-6">
                <strong>Fuel Price Disclaimer:</strong> The displayed fuel prices are for representation only.
                Update with your local gas (fuel) station prices for a more accurate estimate.
            </p>
        </div>
    );
}
