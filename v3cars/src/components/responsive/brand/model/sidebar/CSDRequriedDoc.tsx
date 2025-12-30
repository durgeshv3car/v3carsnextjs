function CSDRequriedDoc() {
    return (
        <div className="bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E2E2E]">
            <h2 className="font-semibold text-base border-b p-4 bg-[#F3F3F3] dark:bg-[#232323] dark:border-[#2E2E2E]">
                Documents Required for CSD
            </h2>

            <ol className="list-decimal py-4 px-8 space-y-2 text-sm">
                <li>CSD Canteen Smart Card</li>
                <li>PAN card</li>
                <li>Aadhaar card</li>
                <li>Availability Certificate from CSD Car Dealer</li>
                <li>
                    PPO (Pension Payment Order) / Discharge Book / Release Order
                    (For Ex-Serviceman)
                </li>
                <li>Last Pension slip (For Ex-Serviceman)</li>
            </ol>
        </div>

    );
}

export default CSDRequriedDoc;