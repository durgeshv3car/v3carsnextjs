const WhyCompareCars = () => {
    return (

        <div className="mt-7">
            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-3">
                Why Compare Cars on V3Cars?
            </h2>

            {/* Intro paragraph */}
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Comparing cars becomes easier and more meaningful on V3Cars because
                our data goes beyond basic specs. We provide variant-wise comparison,
                helping buyers evaluate real differences that affect buying
                decisions — not just high-level brochure numbers.
            </p>

            {/* Subheading */}
            <h3 className="text-sm font-semibold mb-3">
                Here’s why buyers trust our comparison tool:
            </h3>

            {/* Bullet points */}
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 mb-6">
                <li>
                    Accurate, real-time data taken directly from manufacturer listings
                </li>
                <li>
                    Variant-specific insights including features, colours,
                    powertrains and pricing
                </li>
                <li>
                    Feature-by-feature breakdowns across safety, ADAS, infotainment,
                    function and style categories
                </li>
                <li>
                    Ownership-related details such as mileage, warranty and
                    maintenance expectations
                </li>
                <li>
                    Expert interpretation that highlights which car provides better
                    value-for-money
                </li>
                <li>
                    Easy-to-use interface designed for real users comparing 2–4 cars —
                    trusted by millions of Indian car buyers
                </li>
            </ul>

            {/* Footer paragraph */}
            <p className="text-sm text-gray-400 leading-relaxed">
                Whether you’re cross-shopping hatchbacks, sedans or SUVs, or deciding
                between petrol, diesel, CNG or electric variants — V3Cars helps you
                compare smarter.
            </p>
        </div>
    );
};

export default WhyCompareCars;
