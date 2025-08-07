function UpcomingCarByTopBrands() {
    return (
        <div className="rounded-xl border border-gray-300 dark:border-[#2E2E2E] overflow-hidden h-[720px]">
            <div className="bg-[#DEE2E6] dark:bg-[#27272a] px-4 py-3 font-bold text-lg">Upcoming Cars By Top Brands</div>
            <ul className="divide-y divide-gray-200 dark:divide-[#2E2E2E] bg-white dark:bg-[#171717] overflow-y-auto scrollbar-thin-yellow">
                {[
                    "Upcoming Maruti Arena Cars In India",
                    "Upcoming Tata Cars In India",
                    "Upcoming Maruti Nexa Cars In India",
                    "Upcoming Hyundai Cars In India",
                    "Upcoming Kia Cars In India",
                    "Upcoming Mahindra Cars In India",
                    "Upcoming Maruti Arena Cars In India",
                    "Upcoming Toyota Cars In India",
                    "Upcoming Honda Cars In India",
                    "Upcoming Honda Cars In India",
                    "Upcoming Honda Cars In India",
                    "Upcoming Honda Cars In India",
                ].map((item, index) => (
                    <li key={index} className="px-4 py-3 cursor-pointer flex items-center gap-2">
                        <img src={"/logo/v3.svg"} alt="v3car" className="w-4 h-4" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UpcomingCarByTopBrands;