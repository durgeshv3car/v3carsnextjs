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

interface CityInfo {
  districtId: number;
  name: string;
  stateId: number;
  stateName: string;
}

interface PriceRecord {
  price: number;
  date: string; // ISO date string (e.g. "2025-10-25")
}

interface MonthlyFuelData {
  month: string; // e.g. "2025-10"
  firstPrice: number;
  lastPrice: number;
  netChange: number;
  avgPrice: number;
  highest: PriceRecord;
  lowest: PriceRecord;
}

interface CityFuelTrendResponse {
  success: boolean;
  city: CityInfo | null;
  fuelType: number;
  months: MonthlyFuelData[] | [];
}

interface StateByMetroCityResponse {
  success: boolean;
  stateId: number
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
    getLatestFuelPrice: builder.query<LatestFuelPriceResponse, { districtId: number }>({
      query: ({ districtId }) => `/fuel/price/latest?fuelType=1&districtId=${districtId}`,
    }),
    getFuelPriceState: builder.query<Response, void>({
      query: () => `/fuel/states/combined?page=1&limit=50`,
    }),
    getMetroCityFuel: builder.query<Response, { fuelType: number }>({
      query: ({ fuelType }) => `/fuel/metros?fuelType=${fuelType}`,
    }),
    getMetroCityFuelByCity: builder.query<LatestFuelPriceResponse, { fuelType: number, cityId: number }>({
      query: ({ fuelType, cityId }) => `/fuel/price/latest?fuelType=${fuelType}&districtId=${cityId}`,
    }),
    getList10DaysPrice: builder.query<Response, { fuelType: number, districtId: number }>({
      query: ({ fuelType, districtId }) => `/fuel/price/history?fuelType=${fuelType}&districtId=${districtId}&days=9`,
    }),
    getCityWiseFuelPrice: builder.query<Response, { fuelType: number, stateId: number }>({
      query: ({ fuelType, stateId }) => `/fuel/cities?fuelType=${fuelType}&stateId=${stateId}&limit=100`,
    }),
    getMonthlyTrends: builder.query<CityFuelTrendResponse, { fuelType: number, districtId: number }>({
      query: ({ fuelType, districtId }) => `/fuel/monthly/trends?fuelType=${fuelType}&districtId=${districtId}&months=6`,
    }),
    getStateByMetroCity: builder.query<StateByMetroCityResponse, { fuelType: number, stateId: number }>({
      query: ({ fuelType, stateId }) => `/fuel/price/latest/popular?fuelType=${fuelType}&stateId=${stateId}`,
    }),
    getList10DaysStatePrice: builder.query<Response, { fuelType: number, stateId: number }>({
      query: ({ fuelType, stateId }) => `/fuel/price/history?fuelType=${fuelType}&stateId=${stateId}&days=9`,
    }),
    getList10DaysMetros: builder.query<Response, void>({
      query: () => `/fuel/metros?days=10`,
    }),
  }),
});

// Export hook
export const {
  useGet10DaysFuelPriceQuery,
  useGetLatestFuelPriceQuery,
  useGetFuelPriceStateQuery,
  useGetMetroCityFuelQuery,
  useGetMetroCityFuelByCityQuery,
  useGetList10DaysPriceQuery,
  useGetCityWiseFuelPriceQuery,
  useGetMonthlyTrendsQuery,
  useGetStateByMetroCityQuery,
  useGetList10DaysStatePriceQuery,
  useGetList10DaysMetrosQuery,
} = fuelModuleApi;
