'use client'

import React from "react";

export function OwnershipAssumptions() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-1">
                Tata Nexon <span className="font-bold">Ownership Assumptions</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
                Set your ownership period and kilometres to update maintenance and fuel estimates. Defaults to 5 years and 50,000 km which you can change any time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white border rounded-xl p-6">
                {/* Ownership Period */}
                <div>
                    <label className="block text-sm font-medium mb-1">Ownership period</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                        <option>Select Year</option>
                    </select>
                </div>

                {/* Kilometres in period */}
                <div>
                    <label className="block text-sm font-medium mb-1">Kilometres in period</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                        <option>50000 km</option>
                    </select>
                </div>

                {/* Monthly Running */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Monthly running</p>
                    <p className="text-4xl font-bold">2000 KM</p>
                </div>
            </div>
        </div>
    );
}
