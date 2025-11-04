import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceBucket: string | null;
  brandIds: number[];
  bodyTypeIds: number[];
  cylindersList: number[];
  seatingList: number[];
  mileage: string | null;
  transmissionType: string | null;
  fuelType: string | null;
  engineDisplacement: string[];
}

const initialState: FilterState = {
  priceBucket: "",
  brandIds: [],
  bodyTypeIds: [],
  cylindersList: [],
  seatingList: [],
  mileage: "",
  transmissionType: "",
  fuelType: "",
  engineDisplacement: [],
};

const advanceSearchSlice = createSlice({
  name: "advanceSearchSlice",
  initialState,
  reducers: {
    setPriceBucket: (state, action: PayloadAction<string | null>) => {
      state.priceBucket = action.payload;
    },
    setBrandIds: (state, action: PayloadAction<number[]>) => {
      state.brandIds = action.payload;
    },
    setBodyTypeIds: (state, action: PayloadAction<number[]>) => {
      state.bodyTypeIds = action.payload;
    },
    setCylindersList: (state, action: PayloadAction<number[]>) => {
      state.cylindersList = action.payload;
    },
    setSeatingList: (state, action: PayloadAction<number[]>) => {
      state.seatingList = action.payload;
    },
    setMileage: (state, action: PayloadAction<string | null>) => {
      state.mileage = action.payload;
    },
    setTransmissionType: (state, action: PayloadAction<string | null>) => {
      state.transmissionType = action.payload;
    },
    setFuelType: (state, action: PayloadAction<string | null>) => {
      state.fuelType = action.payload;
    },
    setEngineDisplacement: (state, action: PayloadAction<string[]>) => {
      state.engineDisplacement = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPriceBucket,
  setBrandIds,
  setBodyTypeIds,
  setCylindersList,
  setSeatingList,
  setMileage,
  setTransmissionType,
  setFuelType,
  setEngineDisplacement,
  resetFilters,
} = advanceSearchSlice.actions;

export default advanceSearchSlice.reducer;
