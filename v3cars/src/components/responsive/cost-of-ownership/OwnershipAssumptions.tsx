'use client'

const OwnershipAssumptions = () => {
    return (
        <div>
            {/* Heading */}
            <h3 className="text-xl font-semibold mb-2">
                Ownership Assumptions
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-5xl">
                Set a common ownership period and running distance to compare
                maintenance, fuel cost and total ownership cost across all selected
                cars. Defaults such as 5 years and 50,000 km can be adjusted at any
                time, and all tables update instantly. Your selections will ensure that
                all cars are evaluated under identical usage conditions, making the
                total cost comparison fair and accurate.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ownership Period */}
                <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <label className="block text-xs mb-2">
                        Ownership Period
                    </label>

                    <select className="w-full border dark:bg-[#232323] dark:border-[#2e2e2e] rounded-md p-3 text-sm focus:outline-none">
                        <option>5 Years</option>
                        <option>3 Years</option>
                        <option>7 Years</option>
                    </select>
                </div>

                {/* Kilometres in Period */}
                <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <label className="block text-xs mb-2">
                        Kilometres in Period
                    </label>

                    <select className="w-full border dark:bg-[#232323] dark:border-[#2e2e2e] rounded-md p-3 text-sm focus:outline-none">
                        <option>50,000km</option>
                        <option>30,000km</option>
                        <option>70,000km</option>
                    </select>
                </div>

                {/* Monthly Running */}
                <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-[#171717] dark:border-[#2e2e2e]">
                    <label className="block text-xs mb-2">
                        Monthly Running (auto-calculated)
                    </label>

                    <div className="w-full bg-gray-300 dark:bg-[#232323] dark:border-[#2e2e2e] rounded-md p-3 text-sm font-semibold text-center">
                        834km
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnershipAssumptions;
