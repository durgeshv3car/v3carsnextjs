"use client";

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";

interface FormOneProps {
    formData: {
        budget: string;
        usage: string;
        fuel: string;
        transmission: string;
        notes: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        budget: string;
        usage: string;
        fuel: string;
        transmission: string;
        notes: string;
    }>>;
    onClose: () => void;
}

function FormOne({ formData, setFormData, onClose }: FormOneProps) {
    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {/* Budget */}
                <div className="space-y-1">
                    <label className="text-sm">Budget Range</label>
                    <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg py-1 text-sm">
                        <CustomSelect
                            options={budgetOptions}
                            placeholder="Select Budget"
                            labelKey="label"
                            valueKey="value"
                            value={formData.budget}
                            onSelect={(budget) => handleChange("budget", budget.value)}
                        />
                    </div>
                </div>

                {/* Fuel Preference */}
                <div className="space-y-1">
                    <label className="text-sm">Fuel Preference</label>
                    <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg py-1 text-sm">
                        <CustomSelect
                            options={fuelOptions}
                            placeholder="Select Fuel"
                            labelKey="label"
                            valueKey="value"
                            value={formData.fuel}
                            onSelect={(fuel) => handleChange("fuel", fuel.value)}
                        />
                    </div>
                </div>

                {/* Usage */}
                <div className="space-y-1">
                    <label className="text-sm">Intended Usage</label>
                    <div className="flex items-center gap-4 py-2">
                        {["City", "Highway", "Mixed"].map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="usage"
                                    value={option}
                                    checked={formData.usage === option}
                                    onChange={(e) =>
                                        handleChange("usage", e.target.value)
                                    }
                                    required
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Transmission */}
                <div className="space-y-1">
                    <label className="text-sm">Transmission</label>
                    <div className="flex items-center gap-4 py-2">
                        {["Manual", "Automatic"].map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="transmission"
                                    value={option}
                                    checked={formData.transmission === option}
                                    onChange={(e) =>
                                        handleChange("transmission", e.target.value)
                                    }
                                    required
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
                <label className="text-sm">
                    Anything specific you’d like us to consider?
                </label>
                <textarea
                    placeholder="E.g. features, size, brand preference, cars you’re considering."
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg px-4 py-3"
                    rows={4}
                />
            </div>

            <div className="flex justify-center items-center">
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

export default FormOne;


const budgetOptions = [
    { id: 1, label: "Below ₹5 Lakh", value: "UNDER_5L" },
    { id: 2, label: "₹5 Lakh - ₹10 Lakh", value: "BETWEEN_5_10L" },
    { id: 3, label: "₹10 Lakh - ₹20 Lakh", value: "BETWEEN_10_20L" },
    { id: 4, label: "₹20 Lakh - ₹40 Lakh", value: "BETWEEN_20_40L" },
    { id: 5, label: "Above ₹40 Lakh", value: "ABOVE_40L" },
];

const fuelOptions = [
    { id: 1, label: "Petrol", value: "PETROL" },
    { id: 2, label: "Diesel", value: "DIESEL" },
    { id: 3, label: "CNG", value: "CNG" },
    { id: 4, label: "Electric", value: "ELECTRIC" },
];
