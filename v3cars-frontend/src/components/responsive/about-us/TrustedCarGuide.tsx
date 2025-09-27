function TrustedCarGuide() {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold">
                India’s Most <br />
                <span className="text-yellow-400">Trusted Car Guide</span>
            </h1>
            <div className="h-[3px] bg-yellow-400 w-[100px] my-3" />

            {/* Intro */}
            <p className="leading-relaxed my-6">
                At V3Cars, we help car buyers take confident decisions with
                research-driven and simplified content. Our mission is to decode cars
                with logic, facts and unbiased analysis, ensuring that every buyer
                finds the car that truly fits their needs.
            </p>

            <p className="leading-relaxed mb-6">
                The V3 in V3Cars represents what’s at heart – {``}granularity on finer
                facts of cars and the trust we’ve built with our audience over the
                years. We are just as data point as we are a community for car buyers
                who value clarity over confusion. Since 2017, we’ve significantly
                raised the benchmark for recommendations, comparisons and buyer
                insights. V3Cars is built in India by Car Compas. Our English content,
                supported by Hindi video explainers, ensures an instant and accurate
                car connect to buyers across the country.
            </p>

            {/* Our Approach */}
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Our Approach
            </h2>
            <ul className="list-disc ml-6 space-y-1 mb-6">
                <li>Unbiased Reviews – detailed packs, free from insights that matter.</li>
                <li>Simplified Content – Turning complex knowledge into clarity.</li>
                <li>
                    Research-Driven Insights – Trusted, transparent, data-backed analysis.
                </li>
                <li>
                    Most Trusted Car Guide – Guiding industry & users with confidence.
                </li>
            </ul>

            {/* Our Reach & Community */}
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Our Reach & Community
            </h2>
            <p className="leading-relaxed mb-6">
                With a growing community across YouTube, Instagram, Facebook and
                Twitter, V3Cars has created one of the most dependable voices for car
                buyers. Millions of views, thousands of interactions and a rapidly
                growing audience are a reflection of the trust and loyalty we’ve
                earned.
            </p>
            <p className="leading-relaxed mb-6">
                We give you the right tools to:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-6">
                <li>Be decisive with facts.</li>
                <li>Be confident with clarity.</li>
                <li>Be connected with the right choices.</li>
            </ul>

            <p className="leading-relaxed mb-6">
                With this, we continue to lead the auto industry. V3Cars ensures
                platform or audience bias is never substituted for curated insights
                delivered straight to you.
            </p>

            <p className="leading-relaxed">
                For queries, reach us at <span className="font-medium">editor@v3cars.com</span>.
                For business enquiries, write to{" "}
                <span className="font-medium">biz@v3cars.com</span>.
            </p>
        </>
    );
}

export default TrustedCarGuide;