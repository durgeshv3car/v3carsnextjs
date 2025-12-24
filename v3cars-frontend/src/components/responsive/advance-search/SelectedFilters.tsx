import { SelectOption } from "@/redux/slices/advanceSearchSlice";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleBrand,
  toggleBodyType,
  toggleCylinder,
  toggleSeating,
  toggleEngineDisplacement,
  setFuelType,
  setMileage,
  setPriceBucket,
  setTransmissionType,
} from "@/redux/slices/advanceSearchSlice";

export interface SelectedFilter {
  key: string;
  value: SelectOption | SelectOption[];
}

export const useSelectedFilters = (): SelectedFilter[] => {
  const selectedBrands = useSelector(
    (state: RootState) => state.filters.brands
  );

  const selectedPriceBucket = useSelector(
    (state: RootState) => state.filters.priceBucket
  );

  const selectedBodyTypes = useSelector(
    (state: RootState) => state.filters.bodyTypes
  );

  const selectedCylinders = useSelector(
    (state: RootState) => state.filters.cylinders
  );

  const selectedFuel = useSelector(
    (state: RootState) => state.filters.fuelType
  );

  const selectedMileage = useSelector(
    (state: RootState) => state.filters.mileage
  );

  const selectedSeating = useSelector(
    (state: RootState) => state.filters.seating
  );

  const selectedTransmissionType = useSelector(
    (state: RootState) => state.filters.transmissionType
  );

  const selectedEngineDisplacement = useSelector(
    (state: RootState) => state.filters.engineDisplacement
  );

  return useMemo(() => {
    const filters: SelectedFilter[] = [];

    if (selectedBrands.length > 0) {
      filters.push({
        key: "Brand",
        value: selectedBrands,
      });
    }

    if (selectedPriceBucket) {
      filters.push({
        key: "Price",
        value: selectedPriceBucket,
      });
    }

    if (selectedBodyTypes.length > 0) {
      filters.push({
        key: "Body Type",
        value: selectedBodyTypes,
      });
    }

    if (selectedCylinders.length > 0) {
      filters.push({
        key: "Cylinders",
        value: selectedCylinders,
      });
    }

    if (selectedFuel) {
      filters.push({
        key: "Fuel",
        value: selectedFuel,
      });
    }

    if (selectedMileage) {
      filters.push({
        key: "Mileage",
        value: selectedMileage,
      });
    }

    if (selectedSeating.length > 0) {
      filters.push({
        key: "Seating",
        value: selectedSeating,
      });
    }

    if (selectedTransmissionType) {
      filters.push({
        key: "Transmission",
        value: selectedTransmissionType,
      });
    }

    if (selectedEngineDisplacement.length > 0) {
      filters.push({
        key: "Engine",
        value: selectedEngineDisplacement,
      });
    }

    return filters;
  }, [
    selectedBrands,
    selectedPriceBucket,
    selectedBodyTypes,
    selectedCylinders,
    selectedFuel,
    selectedMileage,
    selectedSeating,
    selectedTransmissionType,
    selectedEngineDisplacement,
  ]);
};



// Remove Handler Filter

export const useRemoveFilter = () => {
  const dispatch = useDispatch();

  return (key: string, value: SelectOption | SelectOption[]) => {
    if (key === "Brand") {
      if (Array.isArray(value)) {
        value.forEach((v) => dispatch(toggleBrand(v)));
      }

    } else if (key === "Body Type") {
      if (Array.isArray(value)) {
        value.forEach((v) => dispatch(toggleBodyType(v)));
      }

    } else if (key === "Cylinders") {
      if (Array.isArray(value)) {
        value.forEach((v) => dispatch(toggleCylinder(v)));
      }

    } else if (key === "Seating") {
      if (Array.isArray(value)) {
        value.forEach((v) => dispatch(toggleSeating(v)));
      }

    } else if (key === "Engine") {
      if (Array.isArray(value)) {
        value.forEach((v) =>
          dispatch(toggleEngineDisplacement(v))
        );
      }

    } else if (key === "Fuel") {
      dispatch(setFuelType(null));

    } else if (key === "Mileage") {
      dispatch(setMileage(null));

    } else if (key === "Price") {
      dispatch(setPriceBucket(null));

    } else if (key === "Transmission") {
      dispatch(setTransmissionType(null));
    }
  };

};
