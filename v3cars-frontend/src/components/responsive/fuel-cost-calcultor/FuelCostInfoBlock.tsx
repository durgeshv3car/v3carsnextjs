export default function FuelCostInfoBlock() {
    return (
        <div className="text-sm mt-10 px-4 lg:px-10">

            <div className="app-container mx-auto">
                <h2 className="text-lg font-semibold text-black mb-3 dark:text-white">
                    Fuel Cost Calculator India
                </h2>
                <p className="mb-3">
                    Plan Your Fuel Budget! Use our Fuel Cost Calculator to estimate daily, monthly &amp; yearly running costs for petrol, diesel, or CNG vehicles in India.
                </p>
                <ul className="list-decimal pl-5 space-y-1 mb-3">
                    <li>Compare Costs: Easily compare fuel costs for petrol, diesel, and CNG.</li>
                    <li>Driving Distance: Enter driving distance based on your daily/monthly/yearly running.</li>
                    <li>Local Fuel Prices: Enter your local fuel price for accurate results.</li>
                    <li>Customize Mileage: Input your car&apos;s specific mileage (fuel efficiency) for a personalized estimate.</li>
                    <li>Calculate: Enter driving distance (daily/monthly/yearly), fuel type (petrol, diesel, CNG), fuel efficiency (mileage), and fuel price to see your estimated daily, monthly, and yearly fuel costs.</li>
                </ul>
                <p className="text-[13px] text-gray-600 dark:text-white">
                    Fuel Price Disclaimer: The displayed fuel prices are for representation only. Update with your local gas (fuel) station prices for a more accurate estimate.
                </p>
            </div>
        </div>

    );
}
