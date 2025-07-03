import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    selectedCity: { city_id: 1, cityName: "Delhi-NCR" },
    utmSource: "website"
  },

  reducers: {
    setSelectedCity: (state, action) => {
      if (action.payload !== undefined) {
        state.selectedCity = action.payload;
      }
    },
    setUtmSource: (state, action) => {
      state.utmSource = action.payload;
    },
  },
});

export const { setSelectedCity, setUtmSource } = commonSlice.actions;

export default commonSlice.reducer;
