'use client'

function WhatIncluded() {
    return (
        <>
            <div className="text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Ownership Cost — What’s Included and What’s Not
                </h1>

                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                    Understanding what goes into your ownership cost estimate helps you
                    trust the numbers correctly and make a confident decision. Here’s a
                    clear view of what we include in the calculation and what we
                    intentionally leave out.
                </p>

                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    What’s Included in the Ownership Cost
                </h2>

                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    These items form the core of your total cost of ownership:
                </p>

                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                    <li>
                        Ex-showroom price plus state taxes, registration, insurance and
                        mandatory charges used to compute the on-road price
                    </li>
                    <li>
                        Scheduled service parts and labour as per the manufacturer’s
                        recommended maintenance plan
                    </li>
                    <li>
                        Fuel or charging cost based on your selected driving distance using
                        ARAI mileage by default, unless you edit it
                    </li>
                    <li>
                        Finance-related payments when you enable the option to include loan
                        EMI outflow in the calculation
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    What’s Not Included
                </h2>

                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    These expenses vary widely from owner to owner and aren’t part of the
                    estimate:
                </p>

                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                    <li>
                        Accidental repairs, unscheduled part failures or dealer-side add-ons
                    </li>
                    <li>
                        Accessories, tyre or brake upgrades, extended warranty and
                        insurance add-on covers
                    </li>
                    <li>
                        Parking charges, tolls, penalties and FASTag recharges beyond
                        initial issuance
                    </li>
                    <li>
                        Depreciation or resale value when you eventually sell or exchange
                        the car
                    </li>
                </ul>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Note: All values are based on official brand data, service schedules,
                    insurer quotes and publicly available fuel prices. Actual ownership
                    cost may differ depending on your city, dealership, insurer, driving
                    conditions and how the vehicle is maintained.
                </p>
            </div>
        </>
    );
}

export default WhatIncluded;