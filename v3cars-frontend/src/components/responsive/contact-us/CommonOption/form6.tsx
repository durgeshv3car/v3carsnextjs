"use client";

interface FormSixProps {
    formData: {
        partnershipType: string;
        otherPartnership: string;
        companyName: string;
        website: string;
        proposal: string;
        budgetRange: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            partnershipType: string;
            otherPartnership: string;
            companyName: string;
            website: string;
            proposal: string;
            budgetRange: string;
        }>
    >;
    onClose: () => void;
}

function FormSix({ formData, setFormData, onClose }: FormSixProps) {
    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            {/* Type of Partnership */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Type of Partnership <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.partnershipType}
                    onChange={(e) => handleChange("partnershipType", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                >
                    <option value="">Select Partnership Type</option>
                    {partnershipTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                {/* Other Partnership */}
                {formData.partnershipType === "Other" && (
                    <input
                        type="text"
                        placeholder="Please specify the partnership type"
                        value={formData.otherPartnership}
                        onChange={(e) => handleChange("otherPartnership", e.target.value)}
                        className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2 mt-2"
                        required
                    />
                )}
            </div>

            {/* Company / Brand Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Company / Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter company or brand name"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                />
            </div>

            {/* Website / Portfolio Link */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Website / Portfolio Link <span className="text-red-500">*</span>
                </label>
                <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                />
            </div>

            {/* Brief Proposal / Requirement */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Tell us what you’re looking for <span className="text-red-500">*</span>
                </label>
                <textarea
                    placeholder="Share campaign details, goals, or deliverables you have in mind."
                    value={formData.proposal}
                    onChange={(e) => handleChange("proposal", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={4}
                    required
                />
                <p className="text-xs text-gray-500">
                    Share campaign details, goals, or deliverables you have in mind.
                </p>
            </div>

            {/* Budget Range */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Budget Range (optional)</label>
                <select
                    value={formData.budgetRange}
                    onChange={(e) => handleChange("budgetRange", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                >
                    <option value="">Select Budget Range</option>
                    {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center items-center">
                <button
                    onClick={onClose}
                    className="w-[50%] bg-primary hover:bg-primary-hover text-black font-semibold py-3 rounded-md text-sm"
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default FormSix;

const partnershipTypeOptions = [
    "Marketing campaign / Influencer collaboration",
    "Branding activity / Sponsorship",
    "Banner ad placement",
    "Content partnership",
    "Other",
];

const budgetOptions = [
    "Under ₹5 lakh",
    "₹5–10 lakh",
    "₹10–20 lakh",
    "₹20 lakh+",
    "Prefer not to say",
];
