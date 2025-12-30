import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Single comparison item (1 car)
 */
export interface ComparisonItem {
  brandId: number | null;
  modelId: number | null;
  powertrainId: number | null;
  variantId: number | null;
  brandSlug: string;
  modelSlug: string;
}

/**
 * Whole comparison state
 */
interface ComparisonState {
  items: ComparisonItem[];
}

/**
 * Empty comparison slot
 */
const emptyItem: ComparisonItem = {
  brandId: null,
  modelId: null,
  powertrainId: null,
  variantId: null,
  brandSlug: "",
  modelSlug: "",
};

/**
 * Initial state (2 cars comparison by default)
 */
const initialState: ComparisonState = {
  items: [{ ...emptyItem }, { ...emptyItem }, { ...emptyItem }, { ...emptyItem }],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    /**
     * Set Brand
     */
    setBrand(
      state,
      action: PayloadAction<{
        index: number;
        id: number | null;
        slug: string;
      }>
    ) {
      const item = state.items[action.payload.index];
      if (!item) return;

      item.brandId = action.payload.id;
      item.brandSlug = action.payload.slug;

      // reset dependent fields
      item.modelId = null;
      item.modelSlug = "";
      item.powertrainId = null;
      item.variantId = null;
    },

    /**
     * Set Model
     */
    setModel(
      state,
      action: PayloadAction<{
        index: number;
        id: number | null;
        slug: string;
      }>
    ) {
      const item = state.items[action.payload.index];
      if (!item) return;

      item.modelId = action.payload.id;
      item.modelSlug = action.payload.slug;

      item.powertrainId = null;
      item.variantId = null;
    },

    /**
     * Set Powertrain
     */
    setPowertrainId(
      state,
      action: PayloadAction<{
        index: number;
        id: number | null;
      }>
    ) {
      const item = state.items[action.payload.index];
      if (!item) return;

      item.powertrainId = action.payload.id;
      item.variantId = null;
    },

    /**
     * Set Variant
     */
    setVariantId(
      state,
      action: PayloadAction<{
        index: number;
        id: number | null;
      }>
    ) {
      const item = state.items[action.payload.index];
      if (!item) return;

      item.variantId = action.payload.id;
    },

    /**
     * Add new comparison slot (max 3)
     */
    addComparisonSlot(state) {
      if (state.items.length < 3) {
        state.items.push({ ...emptyItem });
      }
    },

    /**
     * Remove comparison slot
     */
    removeComparisonSlot(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },

    /**
     * Reset everything
     */
    resetItem(state, action: PayloadAction<number>) {
      state.items[action.payload] = { ...emptyItem };
    },
  },
});

export const {
  setBrand,
  setModel,
  setPowertrainId,
  setVariantId,
  addComparisonSlot,
  removeComparisonSlot,
  resetItem,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
