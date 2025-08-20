import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Brand = {
  id: string;
  name: string;
  logo: string; // /public path, e.g. /sell-used/brands/maruti.png
};

type SellUsedState = {
  brand: Brand | null;
  year: number | null;
  model: string | null;
  variant: string | null;
  ownership: string | null;
  odometer: string | null;
  location: string | null;
};

const initialState: SellUsedState = {
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
    selectBrand(state, action: PayloadAction<Brand>) {
      state.brand = action.payload;
    },
    resetSellUsed() {
      return initialState;
    },
  },
});

export const { selectBrand, resetSellUsed } = sellUsedSlice.actions;
export default sellUsedSlice.reducer;
