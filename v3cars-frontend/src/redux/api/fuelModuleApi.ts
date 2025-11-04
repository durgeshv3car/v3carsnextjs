import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
  success: boolean;
  rows: [];
}

interface LatestFuelPriceResponse {
  success: boolean;
  data: LatestFuelPriceType;
}

type LatestFuelPriceType = {
  scope: string;
  stateId: number;
  stateName: string;
  districtId: number;
  cityName: string;
  price: number;
  prevPrice: number;
  change: number;
  updatedAt: string;
}

// API definition
export const fuelModuleApi = createApi({
  reducerPath: "fuelModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    get10DaysFuelPrice: builder.query<Response, { districtId: number }>({
      query: ({ districtId }) => `/fuel/price/history/combined?districtId=${districtId}&days=11`,
    }),
    getLatestFuelPrice: builder.query<LatestFuelPriceResponse, { districtId: number }>({
      query: ({ districtId }) => `/fuel/price/latest?fuelType=1&districtId=${districtId}`,
    }),
    getFuelPriceState: builder.query<Response, void>({
      query: () => `/fuel/states/combined?page=1&limit=50`,
    }),
  }),
});

// Export hook
export const {
  useGet10DaysFuelPriceQuery,
  useGetLatestFuelPriceQuery,
  useGetFuelPriceStateQuery,
} = fuelModuleApi;
