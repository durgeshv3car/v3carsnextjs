function CSDPurchaseStep() {
    return (
        <div className="bg-white dark:bg-[#171717] rounded-xl shadow-sm border border-gray-200 dark:border-[#2E2E2E]">
            <h2 className="font-semibold text-base border-b p-4 bg-[#F3F3F3] dark:bg-[#232323] dark:border-[#2E2E2E]">
                Steps to Purchase through CSD
            </h2>

            <ol className="list-decimal py-4 px-8 space-y-2 text-sm">
                <li>Confirm eligibility & variant at URC </li>
                <li>Get Availability/LS Order </li>
                <li>Dealer proforma & payment </li>
                <li>Invoice & collection </li>
                <li>RTO/Insurance</li>
            </ol>
        </div>

    );
}

export default CSDPurchaseStep;