import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModelTab =
  | "Overview"
  | "Price"
  | "Variants"
  | "Dimensions"
  | "Mileage"
  | "Reviews"
  | "Compare"
  | "News"
  | "Pros Cons"
  | "Monthly Sales"
  | "Offers Discounts"
  | "Videos"
  | "Colors"
  | "Competitors"
  | "Images"
  | "Maintenance Cost"
  | "Cost Of Ownership"
  | "Specifications Features"
  | "CSD Price";

interface ModelTabsState {
  activeTab: ModelTab;
}

const initialState: ModelTabsState = {
  activeTab: "Overview",
};

const carModelSlice = createSlice({
  name: "carModelTabs",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<ModelTab>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = carModelSlice.actions;
export default carModelSlice.reducer;
