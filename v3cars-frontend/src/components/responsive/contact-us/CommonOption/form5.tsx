"use client";

interface FormFiveProps {
    formData: {
        suggestionType: string;
        otherSuggestion: string;
        suggestionDetail: string;
        whyIdea: string;
        reference: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            suggestionType: string;
            otherSuggestion: string;
            suggestionDetail: string;
            whyIdea: string;
            reference: string;
        }>
    >;
    onClose: () => void;
}

function FormFive({ formData, setFormData, onClose }: FormFiveProps) {
    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            {/* Type of Suggestion */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Type of Suggestion <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.suggestionType}
                    onChange={(e) => handleChange("suggestionType", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                    required
                >
                    <option value="">Select Suggestion Type</option>
                    {suggestionTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                {/* Other Suggestion input */}
                {formData.suggestionType === "Other" && (
                    <input
                        type="text"
                        placeholder="Please specify your suggestion"
                        value={formData.otherSuggestion}
                        onChange={(e) => handleChange("otherSuggestion", e.target.value)}
                        className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2 mt-2"
                        required
                    />
                )}
            </div>

            {/* Suggestion Detail */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Share your idea with us <span className="text-red-500">*</span>
                </label>
                <textarea
                    placeholder="Be as specific as possible — what should we improve or add, and how will it help car buyers?"
                    value={formData.suggestionDetail}
                    onChange={(e) => handleChange("suggestionDetail", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={4}
                    required
                />
                <p className="text-xs text-gray-500">
                    Be as specific as possible — what should we improve or add, and how will it help car buyers?
                </p>
            </div>

            {/* Why This Idea */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Why do you think this would help?</label>
                <textarea
                    placeholder="Helps us understand the value behind your suggestion"
                    value={formData.whyIdea}
                    onChange={(e) => handleChange("whyIdea", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={3}
                />
                <p className="text-xs text-gray-500">
                    Helps us understand the value behind your suggestion.
                </p>
            </div>

            {/* Helpful Reference */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Helpful Reference (optional)</label>
                <input
                    type="text"
                    placeholder="E.g. sample link, screenshot, or tool from another website"
                    value={formData.reference}
                    onChange={(e) => handleChange("reference", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                />
            </div>

            <div className="flex justify-center items-center">
                <button
                    onClick={onClose}
                    className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm"
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default FormFive;

const suggestionTypeOptions = [
    "Content improvement",
    "New content format/series",
    "Tool improvement",
    "Suggest a new tool",
    "Other",
];
