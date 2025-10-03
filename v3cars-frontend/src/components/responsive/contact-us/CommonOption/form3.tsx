"use client";

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";

interface FormThreeProps {
  formData: {
    carModel: string;
    queryDetail: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      carModel: string;
      queryDetail: string;
    }>
  >;
  onClose: () => void;
}

function FormThree({ formData, setFormData, onClose }: FormThreeProps) {
  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      {/* Car Brand Model */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Car Brand Model <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg py-1 text-sm">
          <CustomSelect
            options={carModels}
            placeholder="Select or search car model"
            labelKey="label"
            valueKey="value"
            value={formData.carModel}
            onSelect={(selected) => handleChange("carModel", selected.value)}
          />
        </div>
      </div>

      {/* Query Detail */}
      <div className="space-y-1">
        <label className="text-sm font-medium">What would you like to know about this car? <span className="text-red-500">*</span></label>
        <textarea
          placeholder="E.g. features, variant, price or mileage."
          value={formData.queryDetail}
          onChange={(e) => handleChange("queryDetail", e.target.value)}
          className="w-full text-sm outline-none bg-transparent border border-gray-800 dark:border-[#2E2E2E] rounded-lg px-4 py-3"
          rows={4}
          required
        />
        <p className="text-xs text-gray-500">E.g. features, variant, price or mileage.</p>
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

export default FormThree;

const carModels = [
  { id: 1, label: "Hyundai Creta", value: "HYUNDAI_CRETA" },
  { id: 2, label: "Maruti Brezza", value: "MARUTI_BREZZA" },
  { id: 3, label: "Tata Nexon", value: "TATA_NEXON" },
  { id: 4, label: "Kia Seltos", value: "KIA_SELTOS" },
  { id: 5, label: "Mahindra XUV700", value: "MAHINDRA_XUV700" },
  { id: 6, label: "Toyota Hyryder", value: "TOYOTA_HYRYDER" },
  { id: 7, label: "Honda Elevate", value: "HONDA_ELEVATE" },
  { id: 8, label: "MG Hector", value: "MG_HECTOR" },
];
