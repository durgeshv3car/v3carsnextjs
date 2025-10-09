"use client";

interface FormOneProps {
    formData: {
        contentTypes: string;
        otherContent: string;
        platforms: string;
        whyContent: string;
        links: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            contentTypes: string;
            otherContent: string;
            platforms: string;
            whyContent: string;
            links: string;
        }>
    >;
    onClose: () => void;
}

function FormSecond({ formData, setFormData, onClose }: FormOneProps) {

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const toggleMultiSelect = (key: string, value: string) => {
        console.log(key);
        console.log(value);
        
        // setFormData((prev) => {
        //   const selected = prev[key as keyof typeof prev] as string[];
        //   if (selected.includes(value)) {
        //     return { ...prev, [key]: selected.filter((v) => v !== value) };
        //   } else {
        //     return { ...prev, [key]: [...selected, value] };
        //   }
        // });
    };

    return (
        <>
            {/* Content Type (multi-select) */}
            <div className="space-y-1">
                <label className="text-sm">Content Type*</label>
                <div className="flex flex-wrap gap-3 py-2">
                    {contentTypeOptions.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={option}
                                checked={formData.contentTypes.includes(option)}
                                onChange={() => toggleMultiSelect("contentTypes", option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                {/* If Other is selected → show input */}
                {formData.contentTypes.includes("Other") && (
                    <input
                        type="text"
                        placeholder="Please specify..."
                        value={formData.otherContent}
                        onChange={(e) => handleChange("otherContent", e.target.value)}
                        className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2 mt-2"
                    />
                )}
            </div>

            {/* Platform Preference */}
            <div className="space-y-1">
                <label className="text-sm">Platform Preference (optional)</label>
                <div className="flex flex-wrap gap-3 py-2">
                    {platformOptions.map((platform) => (
                        <label key={platform} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={platform}
                                checked={formData.platforms.includes(platform)}
                                onChange={() => toggleMultiSelect("platforms", platform)}
                            />
                            {platform}
                        </label>
                    ))}
                </div>
            </div>

            {/* Why This Content */}
            <div className="space-y-1">
                <label className="text-sm">Why This Content? (optional)</label>
                <textarea
                    placeholder="Helps us understand user need/angle"
                    value={formData.whyContent}
                    onChange={(e) => handleChange("whyContent", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={3}
                />
            </div>

            {/* Helpful Links */}
            <div className="space-y-1">
                <label className="text-sm">Helpful Links (optional)</label>
                <input
                    type="url"
                    placeholder="Brochure, news link, forum thread, etc."
                    value={formData.links}
                    onChange={(e) => handleChange("links", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-2"
                />
            </div>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={onClose}
                    className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default FormSecond;

const contentTypeOptions = [
    "Variant Explained",
    "Review",
    "Comparison (Car AvsB)",
    "Best Variant",
    "Range/Real-world Test",
    "Explainer (features/tech)",
    "News/Update",
    "Other",
];

const platformOptions = [
    "Website Article",
    "YouTube Video",
    "Instagram Reel/Post",
];
