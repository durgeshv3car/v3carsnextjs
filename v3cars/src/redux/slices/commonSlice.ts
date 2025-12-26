import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface City {
  cityId?: number | undefined;
  cityName: string;
}

interface CommonState {
  selectedCity: City;
  utmSource: string;
}

// Initial state
const initialState: CommonState = {
  selectedCity: { cityId: 1489, cityName: 'Jaipur' },
  utmSource: 'website',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<City>) => {
      if (action.payload !== undefined) {
        state.selectedCity = action.payload;
      }
    },
    setUtmSource: (state, action: PayloadAction<string>) => {
      state.utmSource = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSelectedCity, setUtmSource } = commonSlice.actions;
export default commonSlice.reducer;
