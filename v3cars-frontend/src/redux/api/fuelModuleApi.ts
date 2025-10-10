import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
  success: boolean;
  rows: [];
}

// API definition
export const fuelModuleApi = createApi({
  reducerPath: "fuelModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    get10DaysFuelPrice: builder.query<Response, { districtId: number }>({
      query: ({ districtId }) => `/fuel/price/history/combined?districtId=${districtId}&days=11`,
    }),
  }),
});

// Export hook
export const {
  useGet10DaysFuelPriceQuery,
} = fuelModuleApi;
