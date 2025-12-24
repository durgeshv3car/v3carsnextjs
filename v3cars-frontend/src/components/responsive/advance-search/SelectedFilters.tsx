import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

interface SelectedFilter {
  key: string;
  value: any;
}

export const useSelectedFilters = (): SelectedFilter[] => {
  const selectedBrandIds = useSelector((state: RootState) => state.filters.brandIds);
  const selectedPriceBucket = useSelector((state: RootState) => state.filters.priceBucket);
  const selectedBodyTypeIds = useSelector((state: RootState) => state.filters.bodyTypeIds);
  const selectedCylinders = useSelector((state: RootState) => state.filters.cylindersList);
  const selectedFuel = useSelector((state: RootState) => state.filters.fuelType);
  const selectedMileage = useSelector((state: RootState) => state.filters.mileage);
  const selectedSeating = useSelector((state: RootState) => state.filters.seatingList);
  const selectedTransmissionType = useSelector((state: RootState) => state.filters.transmissionType);
  const selectedEngineDisplacement = useSelector((state: RootState) => state.filters.engineDisplacement);

  return useMemo(() => {
    const filters: SelectedFilter[] = [];

    if (Array.isArray(selectedBrandIds) && selectedBrandIds.length > 0) {
      filters.push({ key: "Brand", value: selectedBrandIds });
    }

    if (
      selectedPriceBucket &&
      typeof selectedPriceBucket === "object" &&
      Object.keys(selectedPriceBucket).length > 0
    ) {
      filters.push({ key: "Price", value: selectedPriceBucket });
    }

    if (Array.isArray(selectedBodyTypeIds) && selectedBodyTypeIds.length > 0) {
      filters.push({ key: "Body Type", value: selectedBodyTypeIds });
    }

    if (Array.isArray(selectedCylinders) && selectedCylinders.length > 0) {
      filters.push({ key: "Cylinders", value: selectedCylinders });
    }

    if (selectedFuel) {
      filters.push({ key: "Fuel", value: selectedFuel });
    }

    if (selectedMileage) {
      filters.push({ key: "Mileage", value: selectedMileage });
    }

    if (Array.isArray(selectedSeating) && selectedSeating.length > 0) {
      filters.push({ key: "Seating", value: selectedSeating });
    }

    if (selectedTransmissionType) {
      filters.push({ key: "Transmission", value: selectedTransmissionType });
    }

    if (selectedEngineDisplacement) {
      filters.push({ key: "Engine", value: selectedEngineDisplacement });
    }

    return filters;
  }, [
    selectedBrandIds,
    selectedPriceBucket,
    selectedBodyTypeIds,
    selectedCylinders,
    selectedFuel,
    selectedMileage,
    selectedSeating,
    selectedTransmissionType,
    selectedEngineDisplacement,
  ]);
};
