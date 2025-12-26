"use client";

interface FormData {
    issueType: string;
    otherIssue: string;
    pageAffected: string;
    issueDetail: string;
    screenshot: File | null;
}

interface FormFourProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onClose: () => void;
}

function FormFour({ formData, setFormData, onClose }: FormFourProps) {
    // Generic change handler (type-safe)
    const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // File input handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleChange("screenshot", e.target.files[0]);
        }
    };

    return (
        <>
            {/* Type of Issue */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Type of Issue <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.issueType}
                    onChange={(e) => handleChange("issueType", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                >
                    <option value="">Select Issue Type</option>
                    {issueTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                {/* Other Issue input */}
                {formData.issueType === "Other" && (
                    <input
                        type="text"
                        placeholder="Please specify the issue"
                        value={formData.otherIssue}
                        onChange={(e) => handleChange("otherIssue", e.target.value)}
                        className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2 mt-2"
                        required
                    />
                )}
            </div>

            {/* Page/Tool Affected */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Which page or tool has the issue? <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Paste the URL or mention the tool name (e.g. Car Comparison Tool, On-Road Price Calculator)"
                    value={formData.pageAffected}
                    onChange={(e) => handleChange("pageAffected", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                />
                <p className="text-xs text-gray-500">
                    Paste the URL or mention the tool name (e.g. Car Comparison Tool, On-Road Price Calculator)
                </p>
            </div>

            {/* Issue Detail */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Please describe the issue <span className="text-red-500">*</span>
                </label>
                <textarea
                    placeholder="E.g. variant missing, specs mismatch, page not opening on mobile, etc."
                    value={formData.issueDetail}
                    onChange={(e) => handleChange("issueDetail", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={4}
                    required
                />
                <p className="text-xs text-gray-500">
                    E.g. variant missing, specs mismatch, page not opening on mobile, etc.
                </p>
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Screenshot Upload (optional)</label>
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="w-full text-sm outline-none"
                />
                <p className="text-xs text-gray-500">
                    Helps your team replicate the issue faster.
                </p>
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

export default FormFour;

const issueTypeOptions = [
    "Wrong car data/specs",
    "Pricing error",
    "Comparison tool issue",
    "Website not loading properly",
    "Broken link / Missing images",
    "Other",
];
