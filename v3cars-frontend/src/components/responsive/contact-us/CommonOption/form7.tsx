"use client";

interface FormSevenProps {
    formData: {
        queryDetail: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            queryDetail: string;
        }>
    >;
    onClose: () => void;
}

function FormSeven({ formData, setFormData, onClose }: FormSevenProps) {
    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            {/* Query Detail */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Please describe your query <span className="text-red-500">*</span>
                </label>
                <textarea
                    placeholder="Give us as many details as possible so we can assist you better."
                    value={formData.queryDetail}
                    onChange={(e) => handleChange("queryDetail", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
                    rows={8}
                    required
                />
                <p className="text-xs text-gray-500">
                    Give us as many details as possible so we can assist you better.
                </p>
            </div>

            <div className="flex justify-center items-center mt-6">
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

export default FormSeven;
