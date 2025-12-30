import { INITIAL_MAX_PRICE, INITIAL_MIN_PRICE } from "@/components/ui/custom-range-input/Slider";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectOption {
  id: number | string;
  label: string;
}

interface FilterState {
  priceBucket: SelectOption | null;

  brands: SelectOption[];
  bodyTypes: SelectOption[];
  cylinders: SelectOption[];
  seating: SelectOption[];

  mileage: SelectOption | null;
  transmissionType: SelectOption | null;
  fuelType: SelectOption | null;

  engineDisplacement: SelectOption[];
  minPrice: number | null;
  maxPrice: number | null;
}

const initialState: FilterState = {
  priceBucket: null,

  brands: [],
  bodyTypes: [],
  cylinders: [],
  seating: [],

  mileage: null,
  transmissionType: null,
  fuelType: null,

  engineDisplacement: [],
  minPrice: INITIAL_MIN_PRICE,
  maxPrice: INITIAL_MAX_PRICE,
};

/* 🔁 common toggle helper */
const toggleItem = (list: SelectOption[], item: SelectOption) => {
  const exists = list.some((i) => i.id === item.id);
  return exists
    ? list.filter((i) => i.id !== item.id)
    : [...list, item];
};

const advanceSearchSlice = createSlice({
  name: "advanceSearch",
  initialState,
  reducers: {
    /* single select */
    setPriceBucket(state, action: PayloadAction<SelectOption | null>) {
      state.priceBucket = action.payload;
    },

    setMileage(state, action: PayloadAction<SelectOption | null>) {
      state.mileage = action.payload;
    },

    setTransmissionType(state, action: PayloadAction<SelectOption | null>) {
      state.transmissionType = action.payload;
    },

    setFuelType(state, action: PayloadAction<SelectOption | null>) {
      state.fuelType = action.payload;
    },

    setPriceRange(state, action) {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },

    /* multi select */
    toggleBrand(state, action: PayloadAction<SelectOption>) {
      state.brands = toggleItem(state.brands, action.payload);
    },

    toggleBodyType(state, action: PayloadAction<SelectOption>) {
      state.bodyTypes = toggleItem(state.bodyTypes, action.payload);
    },

    toggleCylinder(state, action: PayloadAction<SelectOption>) {
      state.cylinders = toggleItem(state.cylinders, action.payload);
    },

    toggleSeating(state, action: PayloadAction<SelectOption>) {
      state.seating = toggleItem(state.seating, action.payload);
    },

    toggleEngineDisplacement(state, action: PayloadAction<SelectOption>) {
      state.engineDisplacement = toggleItem(
        state.engineDisplacement,
        action.payload
      );
    },

    resetFilters() {
      return initialState;
    },
    clearBodyTypes(state) {
      state.bodyTypes = [];
    },
    clearPriceBucket(state) {
      state.priceBucket = null;
    },
    clearBrands(state) {
      state.brands = [];
    },
    resetPriceRange(state) {
      state.minPrice = INITIAL_MIN_PRICE;
      state.maxPrice = INITIAL_MAX_PRICE;
    }
  },
});

export const {
  setPriceBucket,
  setMileage,
  setTransmissionType,
  setFuelType,
  setPriceRange,

  toggleBrand,
  toggleBodyType,
  toggleCylinder,
  toggleSeating,
  toggleEngineDisplacement,

  clearBodyTypes,
  clearPriceBucket,
  clearBrands,
  resetFilters,
  resetPriceRange
} = advanceSearchSlice.actions;

export default advanceSearchSlice.reducer;
