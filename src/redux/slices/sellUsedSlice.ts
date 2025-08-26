import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Brand = { id: string; name: string; logo: string };

export type StepKey =
  | "landing"
  | "brand"
  | "period"
  | "model"
  | "variant"
  | "ownership"
  | "odometer"
  | "location";

export const STEP_ORDER: Exclude<StepKey, "landing">[] = [
  "brand",
  "period",
  "model",
  "variant",
  "ownership",
  "odometer",
  "location",
];

type SellUsedState = {
  step: StepKey;        // 👈 controls what to show on the same URL
  brand: Brand | null;
  year: number | null;
  model: string | null;
  variant: string | null;
  ownership: string | null;
  odometer: string | null;
  location: string | null;
};

const initialState: SellUsedState = {
  step: "landing",
  brand: null,
  year: null,
  model: null,
  variant: null,
  ownership: null,
  odometer: null,
  location: null,
};

const sellUsedSlice = createSlice({
  name: "sellUsed",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<StepKey>) {
      state.step = action.payload;
    },
    nextStep(state) {
      if (state.step === "landing") { state.step = "brand"; return; }
      const idx = STEP_ORDER.indexOf(state.step as any);
      if (idx >= 0 && idx < STEP_ORDER.length - 1) {
        state.step = STEP_ORDER[idx + 1];
      }
    },
    prevStep(state) {
      if (state.step === "landing") return;
      if (state.step === "brand") { state.step = "landing"; return; }
      const idx = STEP_ORDER.indexOf(state.step as any);
      state.step = idx > 0 ? STEP_ORDER[idx - 1] : "brand";
    },

    // selections
    selectBrand(state, action: PayloadAction<Brand>) {
      state.brand = action.payload;
      // NOTE: view switching is handled by caller via setStep('brand')
    },

     selectYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },

     selectModel(state, action: PayloadAction<string>) {
      state.model = action.payload;
    },

      selectVariant(state, action: PayloadAction<string>) {
      state.variant = action.payload;
    },

     selectOwnership(state, action: PayloadAction<string>) {
      state.ownership = action.payload;
    },

     selectOdometer(state, action: PayloadAction<string>) {
      state.odometer = action.payload;
    },

     selectLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },

    resetSellUsed() {
      return initialState;
    },
  },
});

export const { setStep, nextStep, prevStep, selectBrand, resetSellUsed, selectYear, selectModel, selectVariant, selectOwnership, selectOdometer, selectLocation } =
  sellUsedSlice.actions;
export default sellUsedSlice.reducer;
